/* Headless test suite for the study app. No dependencies — plain Node.
 *
 *     node test/app.test.js
 *
 * Runs the real engine against a stubbed DOM and checks both the source pair
 * (index.html + decks.js) and the bundled single file (docs/index.html), then
 * verifies the bundle is actually up to date with the source.
 *
 * Exits non-zero on any failure, so CI fails before a bad deck reaches anyone.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const lf = s => s.replace(/\r\n/g, '\n');

/* Inline <script> blocks, i.e. those without a src attribute. */
const inlineScripts = html =>
  [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]);

let pass = 0;
const failures = [];
const check = (name, cond, detail) => {
  if (cond) pass++;
  else failures.push(detail ? `${name}\n      ${detail}` : name);
};

/* ---------------------------------------------------------------- sandbox */
function boot(decksSrc, engineSrc, label) {
  const el = () => ({
    innerHTML: '', value: '', selectionStart: 0, style: {}, dataset: {},
    classList: { add() {}, remove() {}, contains: () => false },
    focus() {}, blur() {}, setSelectionRange() {}, addEventListener() {},
    querySelector: () => el(), querySelectorAll: () => [],
  });
  const store = new Map();
  /* one stable #app element, so assertions can read back what was rendered */
  const app = el();
  const s = {
    console, Math, Date, JSON, Set, Map, Array, Object, String, Number, RegExp,
    parseInt, parseFloat, setTimeout: () => {}, clearTimeout: () => {},
    scrollTo() {}, requestAnimationFrame() {}, getComputedStyle: () => ({}),
    matchMedia: () => ({ matches: false }),
    localStorage: {
      getItem: k => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: k => store.delete(k),
    },
    document: {
      getElementById: id => (id === 'app' ? app : el()),
      querySelector: el, querySelectorAll: () => [],
      addEventListener() {}, documentElement: { dataset: {} }, body: el(),
    },
  };
  s.__app = app;
  s.window = s;
  vm.createContext(s);
  vm.runInContext(decksSrc, s, { filename: `${label}:decks` });
  vm.runInContext(engineSrc, s, { filename: `${label}:engine` });
  /* `session` is a top-level `let`, so it lives in the context's lexical scope
     rather than on the sandbox object — reach it by evaluating inside. */
  s.$ = expr => vm.runInContext(expr, s);
  return s;
}

/* ------------------------------------------------------------ assertions */
/* Mirrors the mode list the deck menu builds: card modes only for decks with
   cards, the ordering mode only for decks with steps. */
const recallableCards = d => (d.cards || []).filter(c => !c.fact);
const modesFor = d => {
  const cards = (d.cards || []).length;
  const steps = (d.steps || []).length;
  const written = (d.questions || []).length;
  const m = [];
  if (steps) m.push('order');
  if (recallableCards(d).length) m.push('recall');
  if (cards) m.push('learn', 'match');
  if (cards || written) m.push('quiz');
  if (d.chest) m.push('chest');
  m.push('browse');
  return m;
};
const norm = x => x.toLowerCase().trim();
const clashes = (a, b) => {
  a = norm(a); b = norm(b);
  return a === b || a.includes(b) || b.includes(a);
};

function suite(s, label) {
  const { DECKS, go, judge, autoQuestions, $ } = s;

  check(`[${label}] decks load`, DECKS && DECKS.length > 0, `got ${DECKS && DECKS.length}`);
  if (!DECKS || !DECKS.length) return;

  /* Course sections must RENDER alphabetically by subject name. Read the order
     out of the markup the app actually produced — comparing a sorted list to
     itself would pass no matter what the app did. */
  go('home');
  const rendered = [...s.__app.innerHTML.matchAll(/class="coursehead">([^<]+)</g)]
    .map(m => m[1].trim())
    .map(c => (c.split('·')[1] || c).trim());
  const expected = [...rendered].sort((a, b) => a.localeCompare(b));
  check(`[${label}] course sections render alphabetically by subject`,
        rendered.length > 1 && JSON.stringify(rendered) === JSON.stringify(expected),
        `rendered: ${rendered.join(' | ')}`);

  /* The review sheet lists terms alphabetically, ignoring leading punctuation.
     Read the order out of the rendered table, not out of a re-sorted array. */
  for (const d of DECKS.filter(x => x.cards.length)) {
    go('run', d.id, 'browse');
    const shown = [...s.__app.innerHTML.matchAll(/<td class="t">([^<]*)</g)].map(m => m[1].trim());
    const key = t => t.toLowerCase().replace(/^[^a-z0-9]+/, '');
    const ordered = [...shown].sort((a, b) => key(a).localeCompare(key(b)));
    check(`[${label}] ${d.id} review sheet is alphabetical`,
          shown.length > 1 && JSON.stringify(shown) === JSON.stringify(ordered),
          `first few: ${shown.slice(0, 4).join(' | ')}`);
  }

  /* Sequence decks keep procedure order — alphabetising a procedure is wrong */
  for (const d of DECKS.filter(x => x.steps.length)) {
    go('run', d.id, 'browse');
    const nums = [...s.__app.innerHTML.matchAll(/<b>(\d+)<\/b>/g)].map(m => +m[1]);
    check(`[${label}] ${d.id} review sheet keeps step order`,
          JSON.stringify(nums) === JSON.stringify(nums.slice().sort((a, b) => a - b)),
          `got ${nums.slice(0, 6).join(',')}`);
  }

  /* A trailing "Example: …" gets its own line in Recall. Check the rendered
     markup, and confirm the definition text still arrives escaped. */
  const egCard = DECKS.flatMap(d => recallableCards(d).map(c => [d, c]))
    .find(([, c]) => /Example:/.test(c.def));
  if (egCard) {
    go('run', egCard[0].id, 'recall');
    /* force the example card to the front of the queue, then re-render */
    vm.runInContext('session.queue.unshift(DECKS.find(d=>d.id===' + JSON.stringify(egCard[0].id) +
      ').cards.find(c=>c.term===' + JSON.stringify(egCard[1].term) + ')); render();', s);
    const html = s.__app.innerHTML;
    check(`[${label}] "Example:" starts a new line in Recall`,
          /<br><span class="eg">Example:<\/span>/.test(html),
          'no line break before Example in the rendered prompt');
    check(`[${label}] definitions are still escaped`, !/<script/i.test(html), 'unescaped markup');
  }

  /* every deck/mode renders without throwing */
  for (const d of DECKS) {
    for (const m of modesFor(d)) {
      try { go('run', d.id, m); check(`[${label}] ${d.id}/${m} renders`, true); }
      catch (e) { check(`[${label}] ${d.id}/${m} renders`, false, e.message); }
    }
  }

  /* a deck is a vocabulary list or a sequence, and must offer matching modes */
  for (const d of DECKS) {
    check(`[${label}] ${d.id} has cards or steps`,
          d.cards.length > 0 || d.steps.length > 0, 'deck has neither');
    check(`[${label}] ${d.id} is not both`,
          !(d.cards.length > 0 && d.steps.length > 0),
          'mixing terms and steps makes the mode list ambiguous');
  }

  /* ordering decks: every step must be placeable, in sequence, across all
     stages, to completion — and the pool must never exceed one stage */
  const STAGE = 6;
  for (const d of DECKS.filter(x => x.steps.length)) {
    let ok = true, detail = '', maxPool = 0;
    for (let r = 0; r < 25 && ok; r++) {
      go('run', d.id, 'order');
      let guard = 0;
      while ($('session.done') < d.steps.length && guard++ < 300) {
        const remaining = $('session.remaining');
        maxPool = Math.max(maxPool, remaining.length);
        const want = d.steps[$('session.done')];
        const at = remaining.indexOf(want);
        if (at < 0) { ok = false; detail = `step ${$('session.done') + 1} not in its stage pool`; break; }
        s.placeStep(at);
      }
      if (ok && guard >= 300) { ok = false; detail = 'did not terminate'; }
      if (ok && $('session.misses') !== 0) { ok = false; detail = 'perfect run recorded misses'; }
      if (ok && $('session.done') !== d.steps.length) {
        ok = false; detail = `placed ${$('session.done')} of ${d.steps.length}`;
      }
    }
    check(`[${label}] ${d.id} staged order playthrough (25 runs)`, ok, detail);
    check(`[${label}] ${d.id} pool never exceeds one stage`, maxPool <= STAGE,
          `saw ${maxPool} options at once`);

    /* a wrong pick must be rejected and counted, not accepted */
    go('run', d.id, 'order');
    const pool = $('session.remaining');
    const wrongAt = pool.findIndex(st => st !== d.steps[0]);
    s.placeStep(wrongAt);
    check(`[${label}] ${d.id} rejects an out-of-sequence step`,
          $('session.done') === 0 && $('session.misses') === 1,
          `done=${$('session.done')} misses=${$('session.misses')}`);
  }

  /* generated questions must have four genuinely distinct choices, and a quiz
     must never ask about the same card twice */
  const ROUNDS = 40;
  let generated = 0, dupChoice = 0, interchangeable = 0, badShape = 0, sample = '';
  let quizzes = 0, quizRepeats = 0;

  for (const d of DECKS) {
    for (let r = 0; r < ROUNDS; r++) {
      for (const q of autoQuestions(d)) {
        generated++;
        if (!q.choices || q.choices.length !== 4 || !Number.isInteger(q.answer)
            || q.answer < 0 || q.answer > 3) { badShape++; continue; }
        if (new Set(q.choices).size !== 4) {
          dupChoice++;
          if (!sample) sample = `${d.id} / ${q.card.term}: ${JSON.stringify(q.choices)}`;
          continue;
        }
        outer: for (let i = 0; i < 4; i++)
          for (let j = i + 1; j < 4; j++)
            if (clashes(q.choices[i], q.choices[j])) {
              interchangeable++;
              if (!sample) sample = `${d.id} / ${q.card.term}: ${JSON.stringify(q.choices)}`;
              break outer;
            }
      }
      go('run', d.id, 'quiz');
      quizzes++;
      const seen = new Map();
      for (const q of $('session.qs')) if (q.card) seen.set(q.card, (seen.get(q.card) || 0) + 1);
      if ([...seen.values()].some(n => n > 1)) quizRepeats++;
    }
  }

  check(`[${label}] ${generated} questions well formed`, badShape === 0, `${badShape} malformed`);
  check(`[${label}] no repeated answer choice`, dupChoice === 0, `${dupChoice} hits, e.g. ${sample}`);
  check(`[${label}] no interchangeable choices`, interchangeable === 0, `${interchangeable} hits, e.g. ${sample}`);
  check(`[${label}] ${quizzes} quizzes ask each card at most once`, quizRepeats === 0, `${quizRepeats} repeated`);

  /* electrode-placement decks: every electrode must be reachable, uniquely
     positioned, and inside the figure */
  for (const d of DECKS.filter(x => x.chest)) {
    const es = d.electrodes || [];
    check(`[${label}] ${d.id} has all 10 electrodes`, es.length === 10, `found ${es.length}`);
    check(`[${label}] ${d.id} has 4 limb + 6 chest`,
          es.filter(e => e.limb).length === 4 && es.filter(e => !e.limb).length === 6,
          `${es.filter(e => e.limb).length} limb / ${es.filter(e => !e.limb).length} chest`);
    check(`[${label}] ${d.id} electrode ids unique`,
          new Set(es.map(e => e.id)).size === es.length, 'duplicate id');
    const bad = es.filter(e => !(e.x > 2 && e.x < 98 && e.y > 2 && e.y < 98) || !e.landmark);
    check(`[${label}] ${d.id} electrodes positioned and described`, bad.length === 0,
          bad.map(e => e.id).join(', '));
    /* Dots are 5.2% of figure WIDTH, so centres must sit at least that far
       apart in width-relative units. y is a % of height, and the figure is
       200x240, so a vertical 1% spans 1.2x what a horizontal 1% does.
       Scale-free: holds at every screen size, which fixed px would not. */
    const DOT = 5.2;
    let tooClose = '';
    for (let i = 0; i < es.length; i++) for (let j = i + 1; j < es.length; j++) {
      const dx = es[i].x - es[j].x, dy = (es[i].y - es[j].y) * 1.2;
      const gap = Math.hypot(dx, dy);
      if (gap < DOT && !tooClose) tooClose = `${es[i].id}/${es[j].id} only ${gap.toFixed(2)}% apart`;
    }
    check(`[${label}] ${d.id} no overlapping electrode dots`, !tooClose, tooClose);

    /* a full placement round scores every electrode */
    go('run', d.id, 'chest');
    let guard = 0;
    while ($('session.i') < es.length && guard++ < 40) {
      s.pickLead($('session.order[session.i]')); s.nextLead();
    }
    check(`[${label}] ${d.id} placement playthrough scores 10/10`,
          $('session.score') === es.length, `scored ${$('session.score')}`);
  }

  /* hand-written questions */
  let badWritten = 0;
  for (const d of DECKS) for (const q of d.questions || []) {
    if (!q.choices || q.choices.length !== 4 || !Number.isInteger(q.answer)
        || q.answer < 0 || q.answer > 3 || new Set(q.choices).size !== 4) badWritten++;
  }
  check(`[${label}] hand-written questions well formed`, badWritten === 0, `${badWritten} bad`);

  /* Recall shows the definition and asks you to type the term, so a card whose
     "term" is really a question stub ("Where protein synthesis happens") is
     unanswerable there. Those must be marked `fact: true`, which keeps them in
     flashcards and matching but takes them out of Recall. */
  /* Two shapes give a topic heading away. A question word or a trailing "?" is
     unambiguous. The "<heading> of <thing>" form needs a curated first-word
     list, not a general "X of Y" rule — "Conservation of energy" and "Citric
     acid cycle" are real names, so a blanket rule would force bad renames.
     This list grew from a manual audit; topic-vs-term stays a judgment call. */
  const STUB = /^(where|how|what|which|why|when)\b|\?$|^(size|parts|forms|uses|steps|inputs|products|order|reasons|types|kinds|causes|effects|purpose|number|control|structure|role|function|nature|storage) of\b/i;
  let stubbed = '';
  for (const d of DECKS) for (const c of recallableCards(d)) {
    if (STUB.test(c.term) && !stubbed) stubbed = `${d.id} / "${c.term}" — mark it fact: true`;
  }
  check(`[${label}] no question-stub terms reach Recall`, !stubbed, stubbed);

  /* Recall makes you type the term, so a compound list is a punishing answer.
     An "&" (or " and ") marks a term whose parts are all needed — "Pores,
     channels & carriers" — and only the first comma-piece is ever accepted,
     which no one could guess. Those belong in flashcards/matching, not Recall.
     Commas ALONE are different: they list alternative forms of one term
     ("mega-, megalo-"), and any single form is accepted, so they are fine. */
  const unwieldy = [];
  for (const d of DECKS) for (const c of recallableCards(d)) {
    if (/&| and /.test(c.term))
      unwieldy.push(`${d.id} / "${c.term}" — compound list, mark it fact: true`);
    else if (c.term.length > 40 && /,/.test(c.term))
      unwieldy.push(`${d.id} / "${c.term}" (${c.term.length} chars)`);
  }
  check(`[${label}] no compound-list Recall answers`, !unwieldy.length, unwieldy.join('\n      '));

  /* No automated check for "definition trails off into trivia". Flagging a
     semicolon with a long tail was tried and over-fired badly: "pelvic cavity —
     the space formed by the hip bones; contains reproductive and excretory
     organs" is a two-part definition, and the transport cards deliberately read
     category; mechanism; example. Whether a trailing clause helps identify the
     term is a judgment call, and a check that forces rewrites of good
     definitions to stay green is worse than no check. Detail that genuinely
     does not belong in the prompt goes in `note`, which shows after answering. */

  /* No deck may define the same term twice, and no two Recall cards may reduce
     to the same typed answer — "DNA" and "DNA", or two terms differing only in
     a parenthetical. Either way the second card is unanswerable: whatever you
     type is graded against one card while the other still waits in the queue. */
  const collisions = [];
  for (const d of DECKS) {
    const byTerm = {}, byTyped = {};
    for (const c of d.cards) {
      const t = c.term.toLowerCase();
      if (byTerm[t]) collisions.push(`${d.id} defines "${c.term}" twice`);
      byTerm[t] = 1;
      if (c.fact) continue;
      const typed = c.term.toLowerCase().replace(/\(.*?\)/g, '').replace(/[^a-z0-9]/g, '');
      if (byTyped[typed]) collisions.push(`${d.id}: "${byTyped[typed]}" and "${c.term}" take the same answer`);
      byTyped[typed] = c.term;
    }
  }
  check(`[${label}] no duplicate or colliding terms in a deck`, !collisions.length,
        collisions.join('\n      '));

  /* The answer the app displays must always be accepted when typed back. This
     is the invariant that a comma in a term name ("Pores, channels & carriers")
     used to break, trapping the card in an unclearable loop. */
  let unacceptable = '';
  for (const d of DECKS) for (const c of d.cards) {
    if (judge(c.term, c) !== 'exact' && !unacceptable) unacceptable = `${d.id} / "${c.term}"`;
  }
  check(`[${label}] every card accepts its own term`, !unacceptable, unacceptable);

  /* spelling is graded strictly — one wrong letter is wrong */
  const card = (deck, term) => DECKS.find(d => d.id === deck).cards.find(c => c.term === term);
  const spelling = [
    ['mt1-roots', 'abdomin/o', 'abdomino', 'exact'],
    ['mt1-roots', 'abdomin/o', 'ABDOMIN O', 'exact'],
    ['mt1-suffixes', '-algia', 'algia', 'exact'],
    ['mt1-suffixes', '-ac, -al, -ar, -ary, -ic, -ous', '-al', 'exact'],
    ['mt1-terms', 'hemorrhage', 'hemorage', 'wrong'],
    ['mt1-terms', 'appendectomy', 'appendecomy', 'wrong'],
    ['mt1-prefixes', 'hyper-', 'hypo-', 'wrong'],
    ['mt1-suffixes', '-ostomy', '-otomy', 'wrong'],
    ['mt1-terms', 'hypertension', 'hypotension', 'wrong'],
    ['bio-ch3', 'Metaphase', 'Anaphase', 'wrong'],
    ['mt1-roots', 'gastr/o', '', 'wrong'],
  ];
  const deckOf = id => DECKS.find(d => d.id === id);
  for (const [deck, term, typed, want] of spelling) {
    const got = judge(typed, card(deck, term), deckOf(deck));
    check(`[${label}] spelling "${typed}" vs ${term}`, got === want, `wanted ${want}, got ${got}`);
  }

  /* A term ending in a category word accepts the short form, but only when no
     other card in the deck answers to it. */
  const shortCases = [
    ['mt2-overview', 'Hypogastric region', 'Hypogastric', 'exact'],
    ['mt2-overview', 'Hypogastric region', 'Hypogastric region', 'exact'],
    ['mt2-overview', 'Umbilical region', 'Umbilical', 'exact'],
    ['mt2-overview', 'Sagittal plane', 'Sagittal', 'exact'],
    /* blocked: "Dorsal" and "Ventral" are their own cards, meaning something else */
    ['mt2-overview', 'Dorsal cavity', 'Dorsal', 'wrong'],
    ['mt2-overview', 'Ventral cavity', 'Ventral', 'wrong'],
    ['mt2-overview', 'Parietal peritoneum', 'Parietal', 'wrong'],
    /* still strict on actual spelling */
    ['mt2-overview', 'Hypogastric region', 'Hypergastric', 'wrong'],
    ['mt2-overview', 'Epigastric region', 'Hypogastric', 'wrong'],
  ];
  for (const [deck, term, typed, want] of shortCases) {
    const c = card(deck, term);
    if (!c) { check(`[${label}] short form: ${term} exists`, false, 'card missing'); continue; }
    const got = judge(typed, c, deckOf(deck));
    check(`[${label}] short form "${typed}" vs ${term} -> ${want}`, got === want, `got ${got}`);
  }

  /* The invariant that matters: every displayed answer is still accepted, and
     no short form silently answers a DIFFERENT card in the same deck. */
  let hijack = '';
  for (const d of DECKS) for (const c of recallableCards(d)) {
    const sf = /\s+(regions?|cavit(?:y|ies)|planes?|tissues?|glands?|cells?|diseases?|disorders?|syndromes?|systems?|mutations?|transmission|orders?|directives?)$/i.exec(c.term);
    if (!sf) continue;
    const short = c.term.slice(0, sf.index).trim();
    const other = d.cards.find(o => o !== c && judge(short, o, d) === 'exact');
    if (other && judge(short, c, d) === 'exact' && !hijack)
      hijack = `${d.id}: "${short}" answers both "${c.term}" and "${other.term}"`;
  }
  check(`[${label}] no short form answers two cards`, !hijack, hijack);

  /* full playthroughs terminate and reach a result */
  for (const [deck, mode] of [['bio-ch3', 'recall'], ['ekg-basics', 'quiz'], ['ekg-leads', 'chest']]) {
    try {
      go('run', deck, mode);
      let guard = 0;
      if (mode === 'recall') {
        while ($('session.queue.length') && guard++ < 500) {
          $('session.typed = session.queue[0].term'); s.checkRecall(); s.nextRecall();
        }
      } else if (mode === 'quiz') {
        while ($('session.i < session.qs.length') && guard++ < 200) {
          s.answer($('session.qs[session.i].answer')); s.nextQ();
        }
      } else {
        while ($('session.i < session.order.length') && guard++ < 50) {
          s.pickLead($('session.order[session.i]')); s.nextLead();
        }
      }
      check(`[${label}] ${deck}/${mode} playthrough terminates`, guard < 500, `guard hit ${guard}`);
    } catch (e) {
      check(`[${label}] ${deck}/${mode} playthrough terminates`, false, e.message);
    }
  }
}

/* ------------------------------------------------------------------ run */
const srcHtml = read('index.html');
const decksSrc = read('decks.js');
const srcInline = inlineScripts(srcHtml);
check('index.html has exactly one inline script', srcInline.length === 1, `found ${srcInline.length}`);

suite(boot(decksSrc, srcInline[0], 'source'), 'source');

/* The bundle is what actually gets served — test it too, and confirm it is not
   stale, since forgetting to run build.ps1 would silently ship old code. */
const bundlePath = path.join(ROOT, 'docs', 'index.html');
if (!fs.existsSync(bundlePath)) {
  check('docs/index.html exists (run build.ps1)', false, 'bundle missing');
} else {
  const bundle = read('docs/index.html');
  const parts = inlineScripts(bundle);
  check('docs/index.html has two inline scripts', parts.length === 2, `found ${parts.length}`);
  if (parts.length === 2) suite(boot(parts[0], parts[1], 'bundle'), 'bundle');

  /* Reproduce exactly what build.ps1 would emit and compare the whole file.
     Comparing only the script contents would miss edits to the CSS or markup,
     which are just as capable of going stale. */
  const needle = '<script src="decks.js"></script>';
  const at = srcHtml.indexOf(needle);
  check('index.html has the decks.js script tag', at >= 0, 'build.ps1 would fail too');
  if (at >= 0) {
    const expected = srcHtml.slice(0, at) + '<script>\n' + decksSrc + '\n</script>'
                   + srcHtml.slice(at + needle.length);
    check('docs/index.html is up to date with index.html + decks.js',
          lf(expected).trim() === lf(bundle).trim(),
          'source changed since the last build — run build.ps1 and commit docs/index.html');
  }
  check('bundle references no external files', !/<script[^>]*\bsrc=/.test(bundle)
        && !/<link[^>]*\bhref=/.test(bundle), 'bundle must be self-contained');
}

/* ---------------------------------------------------------------- report */
console.log('');
if (failures.length) {
  console.log(`FAILED  ${failures.length} check(s), ${pass} passed\n`);
  failures.forEach(f => console.log('  x ' + f));
  process.exit(1);
}
console.log(`PASSED  all ${pass} checks`);
