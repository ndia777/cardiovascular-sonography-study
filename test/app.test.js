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
    /* Label mode measures the rendered artwork rather than trusting any
       assumed margin, so the stub has to answer with a box. Zero size is
       honest here - nothing is really laid out - and the code already has
       to cope with it, because a raster figure genuinely measures zero
       until it decodes. */
    getBoundingClientRect: () => ({ x:0, y:0, left:0, top:0, right:0, bottom:0, width:0, height:0 }),
  });
  const store = new Map();
  /* one stable #app element, so assertions can read back what was rendered */
  const app = el();
  const s = {
    console, Math, Date, JSON, Set, Map, Array, Object, String, Number, RegExp,
    parseInt, parseFloat, setTimeout: () => {}, clearTimeout: () => {},
    scrollTo() {}, requestAnimationFrame() {}, getComputedStyle: () => ({}),
    /* Label mode re-lays-out on resize and when a raster decodes, so the
       sandbox needs a listener that simply never fires. */
    addEventListener() {}, removeEventListener() {},
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
/* modesFor needs to see sibling decks to know whether the chapter sheet applies;
   set per suite run, since source and bundle carry their own deck objects */
let ALL_DECKS = [];
/* terms are HTML-escaped before rendering, so compare against escaped forms */
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const modesFor = d => {
  const cards = (d.cards || []).length;
  const steps = (d.steps || []).length;
  const written = (d.questions || []).length;
  const m = [];
  if (steps) m.push('order');
  if (recallableCards(d).length) m.push('recall');
  if (cards) m.push('learn', 'match');
  if (cards >= 4) m.push('tf');
  /* identifying a tracing needs four of them, for four choices */
  if ((d.cards || []).filter(c => c.trace).length >= 4) m.push('trace');
  /* naming a marked span needs four nameable spans present as cards */
  const PART_TERMS = ['p wave','pr segment','pr interval','qrs complex','st segment',
                      't wave','qt interval','tp segment','j point'];
  if ((d.cards || []).filter(c => PART_TERMS.includes(c.term.toLowerCase())).length >= 4)
    m.push('parts');
  if (cards || written) m.push('quiz');
  /* the whole-chapter sheet only appears where the chapter spans more than one
     deck — otherwise it would duplicate the per-deck review sheet */
  /* only decks holding terms count — a procedure has no glossary to contribute */
  if (d.group && ALL_DECKS.filter(o => o.course === d.course && o.group === d.group
                                    && (o.cards || []).length).length > 1)
    m.push('chapter');
  if (d.chest) m.push('chest');
  if (d.beat) m.push('beat');
  m.push('browse');
  return m;
};
const norm = x => x.toLowerCase().trim();
const clashes = (a, b) => {
  a = norm(a); b = norm(b);
  return a === b || a.includes(b) || b.includes(a);
};

function suite(s, label, srcCss) {
  const { DECKS, go, judge, autoQuestions, $ } = s;

  check(`[${label}] decks load`, DECKS && DECKS.length > 0, `got ${DECKS && DECKS.length}`);
  if (!DECKS || !DECKS.length) return;
  ALL_DECKS = DECKS;

  /* Course sections must RENDER alphabetically by subject name. Read the order
     out of the markup the app actually produced — comparing a sorted list to
     itself would pass no matter what the app did. */
  go('home');
  const renderedCourses = [...s.__app.innerHTML.matchAll(/class="cname">([^<]+)</g)]
    .map(m => m[1].trim().replace(/&amp;/g, '&'));
  /* Everything rendered under one course heading, up to where the next begins.
     The chip bar lives on the heading line itself, so slicing from the course
     NAME rather than from the heading element keeps the chips inside the slice
     where the checks below expect to find them. */
  const sectionOf = (html, c) =>
    (html.split(`class="cname">${c.replace(/&/g, '&amp;')}<`)[1] || '')
      .split('class="coursehead"')[0];
  /* `exam` says a deck IS a study guide and never stops being true; `retired`
     says its chapter is behind us; `reference` marks a standing deck that
     belongs to no chapter. Any of those can lead a course, so placement keys
     off the engine's own `pinned` rather than off `exam`.

     Borrowed from the page rather than restated here. This used to be a second
     copy of the rule, which quietly went stale the moment the engine learned
     about reference decks — the tests kept passing against a rule the app had
     stopped using. One definition, imported, cannot drift. */
  const pin = vm.runInContext('pinned', s);
  const guided = c => DECKS.some(d => d.course === c && pin(d));
  const hasCurrent = c => DECKS.some(d => d.course === c && !pin(d) && d.current);
  /* A course is "live" if it holds a study guide OR a chapter marked current.
     Either alone lifts it into the first tier. Guides used to be the whole test,
     which broke when a course put its finished guides away while still being
     mid-chapter — it scored zero and sank below courses nobody is taking. */
  const live = c => guided(c) || hasCurrent(c);
  const subj = c => (c.split('·')[1] || c).trim();
  /* Live courses form the first tier; alphabetical by subject decides the rest
     and the order inside each tier. Derived from the deck data rather than a
     fixed list, so it keeps holding as courses change status. */
  const expected = [...renderedCourses]
    .sort((a, b) => (live(b) - live(a)) || subj(a).localeCompare(subj(b)));
  check(`[${label}] live courses lead, then alphabetical by subject`,
        renderedCourses.length > 1 && JSON.stringify(renderedCourses) === JSON.stringify(expected),
        `rendered: ${renderedCourses.map(subj).join(' | ')}`);
  /* The assertion above only proves the tier rule while some course is dormant;
     once they are all live it silently degrades to "alphabetical". It used to
     fail in that situation, which is a check that breaks when the material
     improves. So prove the tiering directly instead: take BOTH signals away
     from one course, re-render, and confirm it drops below the ones that keep
     them. Stripping only the guide would no longer demote anything, because a
     current chapter holds the course up on its own — which is the point. */
  const demoted = renderedCourses.find(live);
  const stillLive = renderedCourses.filter(c => c !== demoted && live(c));
  if (demoted && stillLive.length) {
    const stripped = DECKS.filter(d => d.course === demoted && (d.exam || d.current));
    const was = stripped.map(d => [d.exam, d.current]);
    stripped.forEach(d => { d.exam = false; d.current = false; });
    go('home');
    const after = [...s.__app.innerHTML.matchAll(/class="cname">([^<]+)</g)]
      .map(m => m[1].trim().replace(/&amp;/g, '&'));
    stripped.forEach((d, i) => { d.exam = was[i][0]; d.current = was[i][1]; });  // restore first
    go('home');

    const lastLive = Math.max(...stillLive.map(c => after.indexOf(c)));
    check(`[${label}] a course that goes dormant falls below those still live`,
          after.indexOf(demoted) > lastLive && lastLive >= 0,
          `with ${subj(demoted)} dormant the order was: ${after.map(subj).join(' | ')}`);
  } else {
    check(`[${label}] the tier rule can be exercised`, false,
          'need at least two live courses to demote one and observe it');
  }

  /* Inside a section, decks run oldest-added first, so the list follows the
     order the material was covered. Every deck must carry a date, or it would
     silently sort to the bottom. Read the rendered order back out of the markup
     and check it against the dates — sorting the deck list and comparing it to
     itself would pass however the app behaved. */
  const undated = DECKS.filter(d => !/^\d{4}-\d{2}-\d{2}$/.test(d.added || ''));
  check(`[${label}] every deck records when it was added`, !undated.length,
        undated.map(d => d.id).join(', '));
  go('home');
  {
    const byTitle = new Map(DECKS.map(d => [d.title, d]));
    const html = s.__app.innerHTML;
    /* Each course renders up to two grids: study-guide decks first, then the
       rest inside the fold. Chronological order holds WITHIN a grid — across
       the two it does not, because the study guides are deliberately promoted
       past older decks. So check each grid separately. */
    /* Splitting each chunk at its first "</div>" used to cut the grid off after
       ONE card — a deck card closes its own meta div before the grid ends — so
       every grid came back holding a single deck and the two checks below never
       compared anything. Splitting on the grid opener alone is enough: <h3>
       appears only inside deck cards, and the next grid starts a new chunk. */
    const grids = html.split(/<div class="decks">/).slice(1)
      .map(g => [...g.matchAll(/<h3>([^<]+)<\/h3>/g)]
        .map(m => byTitle.get(m[1].replace(/&amp;/g, '&'))).filter(Boolean));
    check(`[${label}] the home screen renders deck grids`, grids.length > 1, `${grids.length} grids`);
    let broke = '', mixed = '';
    for (const g of grids) {
      for (let i = 1; i < g.length; i++)
        if (g[i].added < g[i - 1].added && !broke)
          broke = `a ${g[i].added} deck renders after a ${g[i - 1].added} one`;
      /* A PINNED guide never shares a grid with anything else — it leads its
         course on its own. A retired guide is different: it has gone back to
         sitting with the chapter it belongs to, so finding it beside that
         chapter's notes is correct, not a leak. */
      if (g.length && g.some(pin) && g.some(d => !pin(d)) && !mixed)
        mixed = `grid mixes pinned "${g.find(pin).title}" with "${g.find(d => !pin(d)).title}"`;
    }
    check(`[${label}] decks render oldest-added first within a grid`, !broke, broke);
    check(`[${label}] study-guide decks are not mixed in with the rest`, !mixed, mixed);

    /* Study-guide decks are never hidden. They are the tested material and must
       be on screen the moment the page opens, not one click behind a chip. Read
       the inside of every collapsed panel and assert none of them is in there —
       an index comparison would pass if the panel markup moved.

       A panel runs to the next panel or the next course, so splitting on the
       opener and cutting at the course heading is enough; counting </div> would
       have to track the nested grid and card divs. */
    const panelsOf = h => h.split('<div class="pastwrap"').slice(1)
      .map(p => p.split('class="coursehead"')[0]);
    const insidePanels = panelsOf(html).join('\n');
    const buried = DECKS.filter(pin)
      .filter(d => insidePanels.includes(`<h3>${d.title.replace(/&/g, '&amp;')}</h3>`))
      .map(d => d.title);
    check(`[${label}] no pinned study guide sits inside a collapsed panel`, !buried.length,
          buried.join(', '));
    /* The converse: a retired guide belongs inside the panel with its chapter.
       Without this, dropping `retired` from the engine would sail through — the
       check above only ever gets stricter when guides stop being retired. */
    const stowed = DECKS.filter(d => d.exam && d.retired)
      .filter(d => !insidePanels.includes(`<h3>${d.title.replace(/&/g, '&amp;')}</h3>`))
      .map(d => d.title);
    check(`[${label}] a retired study guide is put away with its chapter`, !stowed.length,
          stowed.join(', '));

    /* Every deck must still be reachable from the home screen — folded is fine,
       dropped is not. This is the check that catches a filtering slip turning
       "collapse" into "lose". */
    const shown = new Set([...html.matchAll(/<h3>([^<]+)<\/h3>/g)]
      .map(m => m[1].replace(/&amp;/g, '&')));
    const lost = DECKS.filter(d => !shown.has(d.title)).map(d => d.id);
    check(`[${label}] every deck is still listed on the home screen`, !lost.length, lost.join(', '));

    /* A search must not leave a match sealed inside a collapsed fold. Set the
       query the way the search box does — go() nulls the session, so calling it
       after would wipe the query being tested. */
    go('home');
    vm.runInContext('session = { q: "purkinje" }; screenHome();', s);
    const searched = s.__app.innerHTML;
    const openChips = [...searched.matchAll(/class="chip"([^>]*)>/g)].map(m => m[1]);
    check(`[${label}] searching opens every chapter`,
          openChips.length > 0 && openChips.every(a => /aria-expanded="true"/.test(a)),
          `${openChips.filter(a => !/aria-expanded="true"/.test(a)).length} of ${
            openChips.length} stayed shut`);
    /* aria-expanded and the panel's own hidden attribute have to agree, or the
       chip claims open while the decks stay invisible. */
    const sealed = (searched.match(/<div class="pastwrap"[^>]*\shidden>/g) || []).length;
    check(`[${label}] searching un-hides every panel`, !sealed,
          `${sealed} panel(s) stayed hidden while searching`);
    go('home');

    const openHtml = s.__app.innerHTML;
    /* Reads every chip rendered under one course heading, as [isOpen, label]. */
    const chipsIn = (h, c) => [...sectionOf(h, c)
      .matchAll(/class="chip"[^>]*aria-expanded="(true|false)"[^>]*>([^<]*)</g)]
      .map(m => [m[1] === 'true', m[2].trim()]);

    /* A course with nothing spotlighted — no guide, no current chapter — has
       nothing to defer to, so its chapters arrive open; the decks are simply
       visible rather than sitting behind a row of chips and nothing else.

       Every course is spotlighted today, so scanning for a dormant one would
       pass by finding nothing. Make one dormant instead and watch what happens. */
    {
      const c = renderedCourses.find(x => DECKS.some(d => d.course === x && !pin(d) && d.group));
      const flagged = DECKS.filter(d => d.course === c && (d.exam || d.current));
      const was = flagged.map(d => [d.exam, d.current]);
      flagged.forEach(d => { d.exam = false; d.current = false; });
      go('home');
      const dormant = chipsIn(s.__app.innerHTML, c);
      flagged.forEach((d, i) => { d.exam = was[i][0]; d.current = was[i][1]; });
      go('home');

      const closed = dormant.filter(([open]) => !open).map(([, t]) => t);
      check(`[${label}] a course with nothing spotlighted opens its chapters`,
            dormant.length > 0 && !closed.length,
            dormant.length ? `${closed.join(', ')} stayed shut in ${subj(c)}` :
                             `${subj(c)} rendered no chips to check`);
    }

    /* Chips remember their state for the session but must never persist it.
       Persisting meant a chapter opened once sprang back open on every later
       load and the page refilled with finished chapters. A fresh load should
       show only what is current; digging for old material is a click. */
    {
      go('home');
      const readSaved = () => vm.runInContext('JSON.stringify(load())', s);
      const before = readSaved();
      const html0 = s.__app.innerHTML;
      const kAt = html0.indexOf('data-key="');
      check(`[${label}] a chip is rendered to exercise`, kAt >= 0);
      if (kAt >= 0) {
        const key = html0.slice(kAt + 10, html0.indexOf('"', kAt + 10));
        const attrs = { 'aria-controls': 'past0', 'aria-expanded': 'false' };
        const btn = {
          dataset: { key: key.replace(/&amp;/g, '&') },
          getAttribute: k => attrs[k],
          setAttribute: (k, v) => { attrs[k] = v; }
        };
        vm.runInContext('togglePast', s)(btn);
        check(`[${label}] a chip click opens it`, attrs['aria-expanded'] === 'true');

        check(`[${label}] chip state is never written to storage`,
              readSaved().indexOf('__open') < 0,
              '__open was persisted, so a refresh would reopen finished chapters');
        check(`[${label}] toggling a chip leaves saved progress alone`,
              readSaved() === before,
              'the progress blob changed when a chip was toggled');

        /* A re-render is not a reload, so the chip must still be open. */
        go('home');
        const at = s.__app.innerHTML.indexOf('data-key="' + key + '"');
        const near = at < 0 ? '' : s.__app.innerHTML.slice(at, at + 160);
        check(`[${label}] the chip stays open across a re-render`,
              at >= 0 && near.indexOf('aria-expanded="true"') >= 0,
              'entering a deck and coming back would shut it');

        vm.runInContext('chipOpen = {}', s);   /* leave the page as we found it */
        go('home');
      }
    }

    /* A course whose guides have all been RETIRED is finished, not untouched, so
       its chips stay shut. This is the case the fallback above used to get
       backwards: it tested for a currently-pinned guide, so retiring the last
       guide in a course sprang every chip in it open — exactly undoing the
       retiring that had just been asked for. */
    {
      let wrong = '';
      for (const c of renderedCourses) {
        const inC = DECKS.filter(d => d.course === c);
        const finished = inC.some(d => d.exam && d.retired) &&
                         !inC.some(d => pin(d) || d.current);
        if (!finished) continue;
        const open = chipsIn(openHtml, c).filter(([o]) => o).map(([, t]) => t);
        if (open.length && !wrong)
          wrong = `${subj(c)} is finished but ${open.join(', ')} starts open`;
      }
      check(`[${label}] a course whose guides are all retired stays shut`, !wrong, wrong);
    }

    /* The converse, and the reason the spotlight exists: once a chapter is
       marked current it stays on screen and is never reduced to a chip, while
       every finished chapter becomes a chip that starts closed. */
    {
      let wrong = '';
      for (const c of renderedCourses.filter(hasCurrent)) {
        const groupsNow = new Set(DECKS.filter(d => d.course === c && !pin(d) && d.current)
          .map(d => d.group).filter(Boolean));
        for (const [open, title] of chipsIn(openHtml, c)) {
          if (groupsNow.has(title) && !wrong)
            wrong = `current "${title}" was reduced to a chip in ${subj(c)}`;
          if (open && !wrong) wrong = `finished "${title}" starts open in ${subj(c)}`;
        }
        /* Look for the DECKS, not the chapter name: a current chapter holding
           one deck renders bare, so its name never appears anywhere. */
        for (const d of DECKS.filter(x => x.course === c && x.current && !pin(x)))
          if (!sectionOf(openHtml, c).includes(`<h3>${d.title.replace(/&/g, '&amp;')}</h3>`) && !wrong)
            wrong = `current "${d.title}" is missing from ${subj(c)}`;
      }
      check(`[${label}] a spotlighted course keeps the current chapter on screen and chips the rest`,
            !wrong, wrong);
    }

    /* and those sections are named by subject rather than being one long run */
    const grouped = DECKS.filter(d => !pin(d) && d.group);
    if (grouped.length) {
      /* Only chapters holding more than one deck get a section of their own. A
         single-deck chapter is rendered bare, because a heading would repeat
         what the deck title already says and a stacked section of one wastes
         the width. */
      const sectsIn = (h, c) => [...sectionOf(h, c).matchAll(/<div class="sect">([^<]*)/g)]
        .map(m => m[1].trim());
      const groupsOf = c => [...new Set(DECKS.filter(d => d.course === c && !pin(d) && d.group)
        .map(d => d.group))];
      const nowIn = (c, g) => DECKS.some(d => d.course === c && d.group === g && !pin(d) && d.current);
      const sizeOf = (c, g) => DECKS.filter(d => d.course === c && d.group === g && !pin(d)).length;

      /* A chapter is titled unless it is a current one holding a single deck,
         where the heading would only repeat what the card already says. An
         opened chip renders exactly the same heading as a current chapter, so
         what you get back after clicking is indistinguishable from what would
         have been there all along. */
      const missingHead = [], spurious = [];
      for (const c of renderedCourses) {
        const sects = sectsIn(openHtml, c);
        for (const g of groupsOf(c)) {
          const titled = !(nowIn(c, g) && sizeOf(c, g) === 1);
          if (titled && !sects.includes(g)) missingHead.push(`${g} (${subj(c)})`);
          if (!titled && sects.includes(g)) spurious.push(`${g} (${subj(c)})`);
        }
      }
      check(`[${label}] every chapter is titled except a current single-deck one`,
            !missingHead.length, `missing: ${missingHead.join(', ')}`);
      check(`[${label}] a current single-deck chapter gets no heading of its own`,
            !spurious.length, `${spurious.join(', ')} rendered a heading for one deck`);

      /* Current material comes first, always — every finished chapter's panel
         sits below everything being studied now. Measured by position in the
         rendered markup rather than re-derived from the deck list, so a change
         to the order actually fails here. */
      const misordered = [];
      for (const c of renderedCourses) {
        const sec = sectionOf(openHtml, c);
        const firstPast = sec.indexOf('<div class="pastwrap"');
        if (firstPast < 0) continue;
        for (const d of DECKS.filter(x => x.course === c && x.current && !pin(x))) {
          const at = sec.indexOf(`<h3>${d.title.replace(/&/g, '&amp;')}</h3>`);
          if (at >= 0 && at > firstPast) misordered.push(`${d.title} (${subj(c)})`);
        }
      }
      check(`[${label}] current chapters render above the finished ones`,
            !misordered.length, `${misordered.join(', ')} rendered below a past panel`);

      /* Every finished chapter is reachable from a chip — that is the only way
         to it now, so a chapter without one is unreachable, not merely tidy. */
      const chipless = [];
      for (const c of renderedCourses) {
        const labels = chipsIn(openHtml, c).map(([, t]) => t);
        for (const g of groupsOf(c)) if (!nowIn(c, g) && !labels.includes(g))
          chipless.push(`${g} (${subj(c)})`);
      }
      check(`[${label}] every finished chapter has a chip`, !chipless.length, chipless.join(', '));

      /* Current single-deck chapters share one grid, so they sit beside each
         other rather than stacked. Test it by looking for a container boundary
         BETWEEN the two — a deck card has its own </div> from the badges row,
         so splitting on that would cut the grid short and report a false
         failure. */
      const bare = grouped.filter(d => d.current && sizeOf(d.course, d.group) === 1);
      if (bare.length > 1) {
        const solo = bare.map(d => d.title);
        const at = solo.map(t => openHtml.indexOf(`<h3>${t.replace(/&/g, '&amp;')}</h3>`)).sort((a, b) => a - b);
        const between = openHtml.slice(at[0], at[at.length - 1]);
        const split = /<div class="decks">|<div class="pastwrap"|class="coursehead"/.exec(between);
        check(`[${label}] single-deck chapters share one grid`, at[0] >= 0 && !split,
              split ? `${solo.join(' / ')} are separated by ${split[0]}` : 'a title was not rendered');
      }
      /* The per-chapter reset. Three things have to hold: it is absent when
         there is nothing to clear, it names exactly the decks that DO have a
         score, and it actually clears them without touching anything else.
         Driven through the real handler and the real store, so this tests the
         button rather than the markup that draws it. */
      {
        const record = s.$('record'), loadP = s.$('load'), saveP = s.$('save');
        const resetScores = s.$('resetScores');
        /* Run against an empty store and put the real one back afterwards —
           other checks in this suite record progress of their own, and reading
           their leftovers would make this pass or fail for the wrong reason. */
        const snapshot = loadP();
        saveP({});

        /* a CURRENT multi-deck chapter, so its heading renders on arrival */
        const target = DECKS.find(d => d.current && d.group &&
          DECKS.filter(o => o.group === d.group && o.course === d.course && !pin(o)).length > 1);
        const chapter = target
          ? DECKS.filter(o => o.group === target.group && o.course === target.course && !pin(o))
          : [];
        const outside = DECKS.find(o => !chapter.includes(o) && o.cards.length);
        check(`[${label}] a multi-deck current chapter exists to test the reset on`,
              chapter.length > 1, `found ${chapter.length}`);

        if (chapter.length > 1) {
          go('home');
          check(`[${label}] no reset is offered where there is nothing to clear`,
                !/class="reset"/.test(s.__app.innerHTML),
                'a reset control rendered against an empty store');

          record(chapter[0].id, { recallBest: 70 });
          record(chapter[1].id, { quizBest: 90 });
          if (outside) record(outside.id, { recallBest: 55 });
          go('home');

          const sec = (s.__app.innerHTML
            .split(`<div class="sect">${target.group.replace(/&/g, '&amp;')}`)[1] || '')
            .split('</div>')[0];
          const btn = /data-ids="([^"]*)"/.exec(sec);
          const listed = btn ? btn[1].split(' ').filter(Boolean).sort() : [];
          const expected = [chapter[0].id, chapter[1].id].sort();
          check(`[${label}] a chapter with scores offers a reset`, !!btn,
                'no reset control rendered after recording a score');
          check(`[${label}] the reset names exactly the scored decks`,
                JSON.stringify(listed) === JSON.stringify(expected),
                `listed ${listed.join(', ')} — expected ${expected.join(', ')}`);

          /* two clicks: the first arms, only the second clears */
          const fake = { dataset: { ids: listed.join(' ') }, textContent: '',
                         removeAttribute(){ delete this.dataset.armed; } };
          resetScores(fake);
          check(`[${label}] one click only arms the reset`,
                !!loadP()[expected[0]], 'a single click already erased the score');
          resetScores(fake);
          const after = loadP();
          check(`[${label}] the second click clears the chapter`,
                expected.every(id => !after[id]),
                expected.filter(id => after[id]).join(', ') + ' survived');
          check(`[${label}] a reset leaves other decks alone`,
                !outside || !!after[outside.id], `${outside && outside.id} was cleared too`);
        }

        saveP(snapshot);
        go('home');
      }

      /* every deck in a grouped course must carry a group, or it silently
         lands in a catch-all section nobody intended */
      const courses = [...new Set(grouped.map(d => d.course))];
      const ungrouped = DECKS.filter(d => courses.includes(d.course) && !pin(d) && !d.group);
      check(`[${label}] no deck is left out of its course's grouping`,
            !ungrouped.length, ungrouped.map(d => d.id).join(', '));
    }

    /* The chapter being worked on now is simply on screen. Read it out of the
       rendered markup, since a `current` flag that never reaches the page would
       look right in the deck file and change nothing for the reader. */
    const currentDecks = DECKS.filter(d => d.current);
    if (currentDecks.length) {
      const groupsWithCurrent = [...new Set(currentDecks.map(d => d.group))];
      check(`[${label}] every current deck declares a group`,
            groupsWithCurrent.every(Boolean),
            currentDecks.filter(d => !d.group).map(d => d.id).join(', '));
      /* Not merely "its panel happens to be open" — a current deck must not be
         inside a panel at all, or one stray click would put away the chapter
         being studied. */
      const stowedNow = currentDecks.filter(d =>
        insidePanels.includes(`<h3>${d.title.replace(/&/g, '&amp;')}</h3>`)).map(d => d.title);
      check(`[${label}] no current deck is filed under a chip`, !stowedNow.length,
            stowedNow.join(', '));

      /* Every current deck must be visible without a click, and must be labelled
         as current — either on the card or by the heading above it. */
      const panes = panelsOf(openHtml);
      let hidden = '', unlabelled = '';
      for (const d of currentDecks) {
        const tag = `<h3>${d.title.replace(/&/g, '&amp;')}</h3>`;
        const inPane = panes.find(p => p.includes(tag));
        if (inPane && /^[^>]*\shidden>/.test(inPane) && !hidden)
          hidden = `${d.title} sits in a hidden panel`;
        /* Labelled one way or the other: either the card carries the marker, or
           the nearest heading above it does. Take the nearest <div class="sect">
           within the same course — anything earlier belongs to another chapter
           and would credit this deck with a label it does not have. */
        const card = (openHtml.split(tag)[1] || '').split('</button>')[0];
        const before = openHtml.slice(0, openHtml.indexOf(tag));
        const secAt = before.lastIndexOf('<div class="sect">');
        const underNow = secAt > before.lastIndexOf('class="coursehead"') &&
          /^<div class="sect">[^<]*<span class="now">/.test(before.slice(secAt));
        if (!/class="badge now"/.test(card) && !underNow && !unlabelled)
          unlabelled = `${d.title} renders with no current marker on it or above it`;
      }
      check(`[${label}] every current deck is visible without a click`, !hidden, hidden);
      check(`[${label}] every current deck is marked, on the card or above it`,
            !unlabelled, unlabelled);
      /* and under a heading it does NOT repeat — the heading already says it, and
         a badge on every card of a six-deck chapter is just noise. A region runs
         from one heading to the next, or to the next course. */
      const titled = openHtml.split('<div class="sect">').slice(1)
        .map(r => r.split('class="coursehead"')[0]);
      check(`[${label}] cards under a labelled heading do not repeat the label`,
            !titled.some(r => /class="badge now"/.test(r)),
            'a chapter heading and its cards both claim to be current');

      /* Two deck grids can now render back to back, with no heading or fold
         between them to space them apart. Where that happens the stylesheet has
         to separate them, or the two rows of cards touch. Only assert the rule
         when the markup actually produces the situation. */
      const adjacent = /<\/button><\/div>\s*<div class="decks">/.test(openHtml);
      if (adjacent)
        check(`[${label}] adjacent deck grids are spaced apart`,
              /\.decks\s*\+\s*\.decks\s*\{[^}]*margin/.test(srcCss),
              'two grids render back to back with no rule separating them');
      check(`[${label}] the current chapter is labelled as such`,
            /<span class="now">current<\/span>/.test(openHtml) || /class="badge now"/.test(openHtml),
            'nothing on screen says which chapter is current');

      /* The marker breathes. Both placements have to carry it — the chip on a
         chapter heading and the badge on a bare deck card are the same signal,
         and which one renders depends on how the chapter is laid out, so
         animating only the one currently on screen would look like a bug the
         first time a chapter changed shape. */
      const frames = /@keyframes\s+nowbreathe\s*\{([\s\S]*?)\n\s*\}/.exec(srcCss);
      check(`[${label}] the current marker declares a breathing animation`, !!frames,
            'no @keyframes nowbreathe');
      const applied = /([^{}]*)\{[^{}]*animation:\s*nowbreathe\s+([\d.]+)s/.exec(srcCss);
      check(`[${label}] both current markers breathe`,
            !!applied && /\.badge\.now/.test(applied[1]) && /\.sect\s+\.now/.test(applied[1]),
            applied ? `applied to: ${applied[1].trim()}` : 'animation never applied');
      check(`[${label}] one breath takes about four seconds`,
            !!applied && Math.abs(parseFloat(applied[2]) - 4) < 0.01,
            applied && `${applied[2]}s`);
      /* A full cycle, not a half one: dim at both ends and bright in the middle,
         so 4s is one in-and-out rather than a fade that snaps back. */
      check(`[${label}] the breath returns to where it started`,
            !!frames && /0%\s*,\s*100%/.test(frames[1]) && /\b50%/.test(frames[1]),
            frames && frames[1].replace(/\s+/g, ' ').trim());
      /* Anything that moves forever must be switchable off. */
      const reduced = /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([^{}]*\{[^{}]*\}\s*)*/g;
      check(`[${label}] reduced motion stops the breathing`,
            [...srcCss.matchAll(reduced)].some(m => /\.badge\.now[^{]*\{[^}]*animation:\s*none/.test(m[0])),
            'the animation keeps running when the user asks for less motion');
    }
  }

  /* Study-guide decks are marked so they stand out — that is the material being
     tested. Read the rendered markup: a flag in the data that never reaches a
     class attribute would look right in the deck file and show nothing. The
     badge matters as much as the border, because a 1px colour difference is
     invisible to a colour-blind reader and this app is shared. */
  go('home');
  {
    const html = s.__app.innerHTML;
    const marked = DECKS.filter(d => d.exam);
    check(`[${label}] some decks are flagged as study-guide material`, marked.length > 0);
    const cards = [...html.matchAll(/<button class="deck ([^"]*)"[\s\S]*?<h3>([^<]+)<\/h3>/g)]
      .map(m => ({ cls: m[1], title: m[2].replace(/&amp;/g, '&') }));
    /* The amber border means "the professor handed this out", so it tracks
       `exam`, not pinning. A reference deck leads its course the same way but
       must never claim that provenance. */
    let wrong = '', mislabelled = '';
    for (const c of cards) {
      const deck = DECKS.find(d => d.title === c.title);
      if (!deck) continue;
      const styled = /\bexam\b/.test(c.cls);
      const wants = !!deck.exam && !deck.retired;
      if (wants !== styled && !wrong)
        wrong = `"${c.title}" ${wants ? 'should carry the exam border but renders unstyled'
                                      : 'renders with the exam border but should not'}`;
      if (deck.reference && styled && !mislabelled)
        mislabelled = `"${c.title}" is a reference deck wearing the study-guide border`;
    }
    check(`[${label}] only a live study guide renders with the exam border`, !wrong, wrong);
    check(`[${label}] a reference deck never wears the study-guide border`, !mislabelled, mislabelled);

    /* And it has to actually say so, for the same reason the study-guide badge
       exists: a border colour alone is invisible to a colour-blind reader. */
    {
      const refs = DECKS.filter(d => d.reference);
      check(`[${label}] the course carries a standing reference`, refs.length > 0);
      const badged = [...html.matchAll(/<h3>([^<]+)<\/h3>([\s\S]*?)<\/button>/g)]
        .filter(m => /badge ref">Reference/.test(m[2]))
        .map(m => m[1].replace(/&amp;/g, '&'));
      const missing = refs.filter(d => !badged.includes(d.title)).map(d => d.title);
      check(`[${label}] every reference deck renders its Reference badge`,
            !missing.length, missing.join(', '));
      const pinnedRefs = refs.every(d => pin(d));
      check(`[${label}] reference decks are pinned to the top of the course`, pinnedRefs);
    }

    /* The reference is generated from the chapter decks. Re-derive which parts
       those chapters teach and make sure the reference holds exactly them —
       no more, no fewer, each in the right deck. A part added to Chapter 5 and
       not regenerated into the reference is the silent failure this catches. */
    {
      const isPart = t => /^-|-$|\//.test(t);
      const kindOf = p => p.startsWith('-') ? 'suffix' : p.endsWith('-') ? 'prefix' : 'root';
      const refDecks = DECKS.filter(d => d.reference);
      const course = refDecks.length ? refDecks[0].course : null;
      if (course) {
        const taught = new Map();
        for (const d of DECKS) {
          if (d.course !== course || d.reference) continue;
          for (const card of d.cards) {
            if (card.fact || !isPart(card.term)) continue;
            for (const p of card.term.split(',').map(x => x.trim()).filter(Boolean))
              taught.set(p, kindOf(p));
          }
        }
        const held = new Map();
        let dupe = '';
        for (const d of refDecks) {
          const kind = /prefix/.test(d.id) ? 'prefix' : /suffix/.test(d.id) ? 'suffix' : 'root';
          for (const card of d.cards) {
            if (held.has(card.term) && !dupe) dupe = card.term;
            held.set(card.term, kind);
          }
        }
        const missing = [...taught.keys()].filter(p => !held.has(p));
        const extra   = [...held.keys()].filter(p => !taught.has(p));
        const misfiled = [...taught].filter(([p, k]) => held.has(p) && held.get(p) !== k)
                                    .map(([p, k]) => `${p} should be a ${k}`);
        check(`[${label}] every word part taught reaches the reference`,
              !missing.length, missing.join(', '));
        check(`[${label}] the reference invents no parts of its own`,
              !extra.length, extra.join(', '));
        check(`[${label}] each part sits in the right reference deck`,
              !misfiled.length, misfiled.join(', '));
        check(`[${label}] no part is listed twice across the reference`, !dupe, dupe);
        check(`[${label}] the reference is not trivially empty`, taught.size > 50,
              `only ${taught.size} parts found`);
      }
    }

    /* A deck-level note exists so a deck can qualify itself — the anatomy study
       guide is pinned as the tested set but is explicitly not the whole of it.
       A note that never reaches the markup would look right in the deck file and
       show nothing, so read the rendered deck screen. */
    {
      const noted = DECKS.filter(d => d.note);
      check(`[${label}] some deck carries a deck-level note`, noted.length > 0);
      let missing = '', addressed = '';
      for (const d of noted) {
        go('deck', d.id);
        const html = s.__app.innerHTML;
        if (!html.includes('decknote') && !missing) missing = d.title;
        const frag = d.note.slice(0, 40).replace(/&/g, '&amp;');
        if (!html.includes(frag) && !missing) missing = d.title + ' (text absent)';
        if (/your/i.test(d.note) && !addressed) addressed = d.title;
      }
      go('home');
      check(`[${label}] a deck note reaches the rendered deck screen`, !missing, missing);
      check(`[${label}] a deck note does not address one reader`, !addressed, addressed);
    }

    /* The tag, unlike the border, never goes away. A retired guide is still the
       instructor's study guide rather than a deck of notes worked up into one,
       and that distinction is the reason to keep the label after the chapter is
       behind us — the border is about what to study now, the tag about what a
       deck IS. Matching "badge exam" loosely covers the muted variant too. */
    check(`[${label}] every study guide keeps a readable label`,
          (html.match(/class="badge exam[^"]*">Study guide</g) || []).length === marked.length,
          'colour alone would not reach a colour-blind reader');
    /* and the retired ones are visibly the quieter of the two */
    const past = DECKS.filter(d => d.exam && d.retired);
    check(`[${label}] a retired guide's label is muted`,
          (html.match(/class="badge exam past">Study guide</g) || []).length === past.length,
          `${past.length} retired guide(s) should render the muted tag`);
  }

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

  /* The whole-chapter sheet gathers every deck sharing a course and chapter.
     Three things have to hold, and none of them can be checked from the deck
     data alone — read the rendered table.
       1. nothing from the chapter is missing, or it is not a chapter sheet;
       2. nothing from OUTSIDE the chapter leaks in;
       3. the per-deck Review Sheet is untouched, because for a study guide that
          is the tested scope and the whole point was not to lose it. */
  for (const d of DECKS.filter(x => modesFor(x).includes('chapter'))) {
    /* term-bearing decks only, matching what the sheet gathers */
    const siblings = DECKS.filter(o => o.course === d.course && o.group === d.group && o.cards.length);
    go('run', d.id, 'chapter');
    const html = s.__app.innerHTML;
    const shown = [...html.matchAll(/<td class="t">([^<]*)</g)].map(m => m[1].trim());
    /* Two decks can carry the same term with different capitalisation — a word
       list saying "transverse plane" and lecture slides saying "Transverse
       plane". Identical entries merge to one row under whichever spelling came
       first, so presence is judged case-insensitively. */
    const lower = new Set(shown.map(t => t.toLowerCase()));
    const want = new Set(siblings.flatMap(o => o.cards.map(c => esc(c.term).toLowerCase())));
    const missing = [...want].filter(t => !lower.has(t));
    check(`[${label}] ${d.id} chapter sheet holds every term in ${d.group}`,
          !missing.length, `${missing.length} missing, e.g. ${missing.slice(0, 3).join(', ')}`);

    const outside = new Set(DECKS.filter(o => o.course !== d.course || o.group !== d.group)
      .flatMap(o => o.cards.map(c => esc(c.term).toLowerCase()))
      .filter(t => !want.has(t)));
    const leaked = [...lower].filter(t => outside.has(t));
    check(`[${label}] ${d.id} chapter sheet holds nothing from outside ${d.group}`,
          !leaked.length, leaked.slice(0, 3).join(', '));

    /* alphabetical, same rule as the per-deck sheet */
    const key = t => t.toLowerCase().replace(/^[^a-z0-9]+/, '');
    const ordered = [...shown].sort((a, b) => key(a).localeCompare(key(b)));
    check(`[${label}] ${d.id} chapter sheet is alphabetical`,
          JSON.stringify(shown) === JSON.stringify(ordered),
          `first few: ${shown.slice(0, 4).join(' | ')}`);

    /* every row says where it came from */
    const srcs = [...html.matchAll(/<td class="src">([\s\S]*?)<\/td>/g)];
    check(`[${label}] ${d.id} every chapter row names its source deck`,
          srcs.length === shown.length && srcs.every(m => m[1].trim()),
          `${srcs.length} source cells for ${shown.length} rows`);

    /* Grouped by deck: every card sits under its own deck's heading, alphabetical
       within the block, and nothing is merged away — a term in two decks belongs
       under both. Read the rendered table, since the grouping is a render-time
       decision the deck data says nothing about. */
    go('run', d.id, 'chapter');
    vm.runInContext('chapterOrder(true);', s);
    const grouped = s.__app.innerHTML;
    const heads = [...grouped.matchAll(/<tr class="secthead"><td colspan="2">([^<]*)</g)]
      .map(m => m[1].trim());
    check(`[${label}] ${d.id} by-deck view heads every deck in ${d.group}`,
          heads.length === siblings.length,
          `${heads.length} headings for ${siblings.length} decks`);

    /* card total must equal the sum of the decks — no merging, none dropped */
    const groupedRows = [...grouped.matchAll(/<td class="t">([^<]*)</g)].length;
    const expected = siblings.reduce((n, o) => n + o.cards.length, 0);
    check(`[${label}] ${d.id} by-deck view keeps every card from every deck`,
          groupedRows === expected, `${groupedRows} rows against ${expected} cards`);

    /* alphabetical WITHIN each block, not across the table */
    const blocks = grouped.split('<tr class="secthead">').slice(1);
    let outOfOrder = '';
    for (const b of blocks) {
      const ts = [...b.matchAll(/<td class="t">([^<]*)</g)].map(m => m[1].trim());
      const sorted = [...ts].sort((x, y) => key(x).localeCompare(key(y)));
      if (JSON.stringify(ts) !== JSON.stringify(sorted) && !outOfOrder)
        outOfOrder = `block starting "${ts[0]}" is not alphabetical`;
    }
    check(`[${label}] ${d.id} by-deck blocks are alphabetical inside`, !outOfOrder, outOfOrder);

    /* the source column is redundant once each block is headed, and dropping it
       is what buys the width back */
    check(`[${label}] ${d.id} by-deck view drops the source column`,
          !/<td class="src">/.test(grouped), 'source column still rendered under deck headings');

    /* and the deck's own review sheet still shows only its own terms */
    go('run', d.id, 'browse');
    const own = [...s.__app.innerHTML.matchAll(/<td class="t">([^<]*)</g)].map(m => m[1].trim());
    check(`[${label}] ${d.id} keeps its own Review Sheet unchanged`,
          own.length === d.cards.length,
          `review sheet shows ${own.length} of the deck's ${d.cards.length} terms`);
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

  /* Recall shows a definition and asks for the term, so a definition describing
     a physiological event ("ventricular repolarization") is ambiguous when the
     answer is the WAVE that records it — diastole is an honest reading of the
     same words. Where the term declares its own category, the prompt must name
     it. Read the rendered prompt, not the helper, so removing the lead-in from
     the markup fails even though the helper still returns a value. */
  {
    const wants = [['ekg-basics', 'T wave', 'wave'], ['ekg-basics', 'ST segment', 'segment'],
                   ['ekg-basics', 'PR interval', 'interval'], ['ekg-basics', 'QRS complex', 'complex'],
                   ['heart-anatomy', 'Tricuspid valve', 'valve']];
    let bad = '';
    for (const [deckId, term, noun] of wants) {
      const deck = DECKS.find(x => x.id === deckId);
      const card = deck && deck.cards.find(c => c.term === term);
      if (!card) { bad = bad || `${deckId} has no card "${term}"`; continue; }
      go('run', deckId, 'recall');
      vm.runInContext(`session.queue.unshift(DECKS.find(d=>d.id===${JSON.stringify(deckId)})` +
        `.cards.find(c=>c.term===${JSON.stringify(term)})); render();`, s);
      const html = s.__app.innerHTML;
      if (!new RegExp(`<span class="asks">Which ${noun} —</span>`).test(html) && !bad)
        bad = `"${term}" prompt does not ask for a ${noun}`;
    }
    check(`[${label}] Recall names the category when the term declares one`, !bad, bad);

    /* and stays quiet when it does not — a lead-in on every card would be noise */
    const plain = DECKS.find(x => x.id === 'ekg-basics').cards.find(c => c.term === 'Diastole');
    if (plain) {
      go('run', 'ekg-basics', 'recall');
      vm.runInContext('session.queue.unshift(DECKS.find(d=>d.id==="ekg-basics")' +
        '.cards.find(c=>c.term==="Diastole")); render();', s);
      check(`[${label}] Recall adds no category line where there is no category`,
            !/class="asks"/.test(s.__app.innerHTML), 'unexpected lead-in on Diastole');
    }
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

  /* Wrong answers must sit in the same subject area as the right one. Drawing
     them at random leaves three obviously irrelevant choices and the question
     answers itself. Measure it: compare how close the chosen distractors are to
     the right answer against how close an average card in the same deck is.
     Random selection makes those two numbers equal, so a real margin is the
     only thing that can produce a pass here. */
  const sim = s.similarity;
  check(`[${label}] the engine exposes a similarity measure`, typeof sim === 'function');
  if (typeof sim === 'function') {
    let chosenSum = 0, chosenN = 0, poolSum = 0, poolN = 0, tooClose = '';
    for (const d of DECKS) {
      if (d.cards.length < 6) continue;
      for (let r = 0; r < 12; r++) {
        for (const q of autoQuestions(d)) {
          /* forward questions only — there the choices are definitions */
          if (!q.choices.includes(q.card.def)) continue;
          for (const ch of q.choices) {
            if (ch === q.card.def) continue;
            const v = sim(q.card.def, ch);
            chosenSum += v; chosenN++;
            if (v > 0.75 && !tooClose)
              tooClose = `${d.id} / "${q.card.term}": a wrong choice scores ${v.toFixed(2)}`;
          }
        }
      }
      for (const a of d.cards) for (const b of d.cards) {
        if (a === b) continue;
        poolSum += sim(a.def, b.def); poolN++;
      }
    }
    const chosen = chosenSum / chosenN, baseline = poolSum / poolN;
    check(`[${label}] distractors are drawn from the right answer's subject area`,
          chosenN > 100 && chosen > baseline * 1.5,
          `chosen ${chosen.toFixed(3)} vs deck average ${baseline.toFixed(3)} over ${chosenN} choices`);
    check(`[${label}] no distractor is close enough to be arguable`, !tooClose, tooClose);
  }

  /* Score colour. The design promise is that a badge never looks worse for a
     higher score — the failure mode of per-band gradients, where 79 is the
     brightest amber and 80 the darkest green. Check the ramp itself rather than
     a handful of samples. */
  {
    const scoreHue = s.$('typeof scoreHue === "function" ? scoreHue : null');
    const scoreBadge = s.$('typeof scoreBadge === "function" ? scoreBadge : null');
    check(`[${label}] the score colour ramp is reachable`, !!scoreHue && !!scoreBadge);
    if (scoreHue && scoreBadge) {
      let backwards = '';
      for (let i = 0; i < 1000; i++) {
        const a = scoreHue(i / 10), b = scoreHue((i + 1) / 10);
        if (b < a - 1e-9 && !backwards)
          backwards = `${(i / 10).toFixed(1)}% is hue ${a.toFixed(1)} but ${
            ((i + 1) / 10).toFixed(1)}% is ${b.toFixed(1)}`;
      }
      check(`[${label}] a higher score never gets a worse colour`, !backwards, backwards);

      /* The letter-grade thresholds have to land in the right family, or the
         scale is smooth but says the wrong thing. Hue rises red -> green. */
      const band = (lo, hi, want, name) => {
        const h = scoreHue(lo);
        check(`[${label}] ${name} sits in the right colour range`,
              h >= want[0] && h <= want[1], `${lo}% is hue ${h.toFixed(1)}, wanted ${want.join('-')}`);
        return hi;
      };
      band(50, 60, [20, 48], 'a failing score');      /* red */
      band(65, 70, [48, 80], 'a D');                  /* orange */
      band(75, 80, [78, 112], 'a C');                 /* amber */
      band(85, 90, [112, 150], 'a B');                /* yellow-green */
      band(95, 100, [148, 160], 'an A');              /* green */
      check(`[${label}] the ramp is clamped at both ends`,
            scoreHue(-40) === scoreHue(0) && scoreHue(140) === scoreHue(100));

      /* A badge modifier must not collide with a class that already means
         something else. "badge score" picked up `.score`, the results screen's
         big centred number — 34px of padding and a 54px font — and every check
         here still passed, because none of them can see layout. Compare the
         names instead: a modifier used on a badge must have no bare rule of its
         own, only rules qualified by .badge. */
      /* Seed a score and a match time first. Without them neither badge
         renders, and this check quietly inspected a page that contained none of
         the classes it exists to police — it passed with the collision put back
         deliberately. Restore the store afterwards. */
      const snap = s.$('load')();
      const probe = DECKS.find(d => d.cards.length);
      s.$('record')(probe.id, { recallBest: 72, quizBest: 91, matchBest: 40 });
      go('home');
      const mods = new Set();
      for (const m of s.__app.innerHTML.matchAll(/class="badge ([^"]+)"/g))
        for (const t of m[1].trim().split(/\s+/)) if (t) mods.add(t);
      check(`[${label}] the seeded score badge is on the page to be checked`,
            mods.has('scored'), `saw modifiers: ${[...mods].join(', ')}`);
      /* Only an UNQUALIFIED rule is dangerous: `.score{...}` matches any badge
         carrying that modifier, while `.sect .now{...}` cannot reach one unless
         the badge sits inside a .sect. So require the class to start a selector
         rather than merely appear in one. */
      const collide = [...mods].filter(t =>
        new RegExp(`(^|[}\\n])\\s*\\.${t}\\s*[{,]`).test(srcCss));
      check(`[${label}] badge modifiers do not collide with other classes`,
            !collide.length,
            collide.map(t => `.${t} is styled outside .badge`).join('; '));

      /* Every percentage badge carries a hue; the match TIME must not, since
         lower is better there and the same ramp would read backwards. */
      const markup = scoreBadge('Recall', 72);
      check(`[${label}] a score badge carries its hue and its number`,
            /class="badge scored"/.test(markup) && /--sh:/.test(markup) && /72%/.test(markup),
            markup);
      const home = s.__app.innerHTML;
      const timed = /<span class="badge[^"]*"[^>]*>Match \d+s<\/span>/.exec(home);
      check(`[${label}] a match time renders to be checked`, !!timed, 'no match badge found');
      check(`[${label}] the match time is not on the score scale`,
            !timed || !/--sh:/.test(timed[0]), timed && timed[0]);
      s.$('save')(snap);
      go('home');
    }
  }

  /* A note that flags a discrepancy must open with the CORRECT fact, not with
     the mistake it is flagging. All three of these used to open by quoting the
     error and only corrected it a clause later; read at speed, straight after
     answering, that lands as "this card is wrong" — which is how a correct
     calibration card came within an inch of being deleted.

     Notes that merely cite the course notes approvingly are not affected; the
     trigger is a note that says something is mistaken. */
  {
    const flags = /flagged because|cannot be right|mistyped|conflat|merging the two/i;
    const opensOnError = /^\s*(the (lecture |course )?notes|your notes)\b/i;
    const bad = [];
    for (const d of DECKS)
      for (const c of d.cards || [])
        if (flags.test(c.note || '') && opensOnError.test(c.note))
          bad.push(`${d.id} / ${c.term}`);
    check(`[${label}] a note flagging a mistake leads with the correct fact`,
          !bad.length, bad.join('; ') + ' — opens by quoting the error');
  }

  /* A comma in a term means "either of these names counts" — which is how
     "Cell body, soma" accepts each half. That convention breaks on a name that
     simply contains a comma: "Hand, foot and mouth disease" splits into "Hand"
     and "foot and mouth disease", and typing Hand is then marked correct.

     Both cards shaped like this are `fact: true` today, so Recall never asks
     them and nothing is wrong on screen. This is the guard for the day one of
     them stops being a fact card. The tell is a comma sitting in a phrase that
     also contains "and" or "&" — a list of alternative NAMES does not read that
     way. Fix such a card by rewording it so the comma goes, not by leaving it. */
  {
    const suspicious = DECKS.flatMap(d => (d.cards || [])
      .filter(c => !c.fact && /,/.test(c.term) && /\sand\s|\s&\s/.test(c.term))
      .map(c => `${d.id}: "${c.term}"`));
    check(`[${label}] no typed term splits a single name on its comma`,
          !suspicious.length,
          suspicious.join('; ') + ' — a fragment of this would be marked correct');
  }

  /* Aliases. A card whose note says "Also called X" while Recall marks X wrong
     is the app teaching a name and then refusing it — which is exactly what it
     did for a term the course notes write as "free (apical) surface". Drive the
     real judge, so this tests what a typed answer actually gets, not what the
     alias list looks like. */
  {
    const judge = vm.runInContext('typeof judge === "function" ? judge : null', s);
    check(`[${label}] the answer matcher is reachable`, !!judge);
    if (judge) {
      let rejected = '', clash = '', n = 0;
      for (const d of DECKS) {
        for (const c of d.cards || []) {
          for (const a of c.also || []) {
            n++;
            if (judge(a, c, d) !== 'exact' && !rejected)
              rejected = `${d.id}: "${a}" is listed on ${c.term} but marked wrong`;
            /* two cards in one deck must never answer to the same typed word,
               or whichever is asked first silently accepts the other's answer */
            const other = (d.cards || []).find(o => o !== c &&
              [o.term, ...(o.also || [])].some(t => t.toLowerCase() === a.toLowerCase()));
            if (other && !clash)
              clash = `${d.id}: "${a}" answers both ${c.term} and ${other.term}`;
          }
        }
      }
      check(`[${label}] some cards declare aliases`, n > 0, `${n} found`);
      check(`[${label}] every declared alias is accepted as an answer`, !rejected, rejected);
      check(`[${label}] no alias answers to two cards in one deck`, !clash, clash);

      /* And the aliases actually cover what the cards claim: a note saying
         "Also called X" has to be backed by an alias, or the card goes on
         teaching a name Recall rejects. Current chapters only — finished ones
         are frozen, and this reports rather than fails for those. */
      const stated = /\b(?:also called|also known as|older name:)\s+([^.—;]+)/i;
      const behind = [];
      for (const d of DECKS.filter(x => x.current)) {
        for (const c of d.cards || []) {
          const m = stated.exec((c.note || '') + ' ' + (c.def || ''));
          if (!m) continue;
          /* "Also called a decubitus ulcer or bedsore" names TWO aliases, and
             "Also called liver spots, though they have nothing to do with the
             liver" names one and then keeps talking. Split on the separators and
             keep the fragments short enough to be a name rather than prose. */
          for (const raw of m[1].split(/\s+or\s+|,/)) {
            const alias = raw.trim().replace(/^(a|an|the)\s+/i, '');
            if (!alias || alias.split(/\s+/).length > 4) continue;
            if (judge(alias, c, d) !== 'exact') behind.push(`${d.id} / ${c.term}: "${alias}"`);
          }
        }
      }
      check(`[${label}] a current card that names an alias accepts it`, !behind.length,
            behind.join('; '));
    }
  }

  /* True/False. Two things can quietly ruin this mode. A "false" statement whose
     definition would honestly describe the term is not false at all, so the
     answer key is wrong. And a run that comes out all-true or all-false is
     guessable without reading anything. Generate many rounds and check both. */
  {
    const tfStatements = vm.runInContext('typeof tfStatements === "function" ? tfStatements : null', s);
    const conflicts = vm.runInContext('conflicts', s);
    check(`[${label}] the true/false generator exists`, typeof tfStatements === 'function');
    if (typeof tfStatements === 'function') {
      let bogus = '', trues = 0, total = 0, empty = '';
      const sim = s.similarity, related = [];
      for (const d of DECKS.filter(x => x.cards.length >= 4)) {
        for (let r = 0; r < 25; r++) {
          const st = tfStatements(d);
          if (!st.length && !empty) empty = `${d.id} generated nothing`;
          for (const q of st) {
            total++;
            if (q.answer) { trues++; if (q.def !== q.card.def && !bogus) bogus = `${d.id}/${q.card.term}: "true" statement is not the card's own definition`; }
            else {
              /* the wrong definition must not also fit the term */
              if (conflicts(q.def, q.card.def) && !bogus)
                bogus = `${d.id}/${q.card.term}: "false" statement uses a definition that also fits`;
              if (q.def === q.card.def && !bogus)
                bogus = `${d.id}/${q.card.term}: "false" statement uses the card's own definition`;
              if (!q.actually && !bogus) bogus = `${d.id}/${q.card.term}: false statement has no attributed source`;
              related.push(sim(q.card.def, q.def));
            }
          }
        }
      }
      check(`[${label}] every true/false deck produces statements`, !empty, empty);
      check(`[${label}] ${total} true/false statements are correctly keyed`, !bogus, bogus);
      /* roughly balanced — a 50/50 coin over thousands of draws should land far
         inside these bounds, and a stuck generator lands outside immediately */
      const share = trues / total;
      check(`[${label}] true and false are roughly balanced`, share > 0.4 && share < 0.6,
            `${(share * 100).toFixed(1)}% of statements are true`);
      /* and the wrong definitions come from the same subject area, as with
         quiz distractors — otherwise every false one is obvious */
      const avg = related.reduce((a, b) => a + b, 0) / related.length;
      let poolAvg = 0, n = 0;
      for (const d of DECKS.filter(x => x.cards.length >= 6))
        for (const a of d.cards) for (const b of d.cards) { if (a !== b) { poolAvg += sim(a.def, b.def); n++; } }
      check(`[${label}] false statements are drawn from the right subject area`,
            avg > (poolAvg / n) * 1.5,
            `chosen ${avg.toFixed(3)} vs deck average ${(poolAvg / n).toFixed(3)}`);
    }
  }

  check(`[${label}] ${generated} questions well formed`, badShape === 0, `${badShape} malformed`);
  check(`[${label}] no repeated answer choice`, dupChoice === 0, `${dupChoice} hits, e.g. ${sample}`);
  check(`[${label}] no interchangeable choices`, interchangeable === 0, `${interchangeable} hits, e.g. ${sample}`);
  check(`[${label}] ${quizzes} quizzes ask each card at most once`, quizRepeats === 0, `${quizRepeats} repeated`);

  /* the heartbeat animation: every rhythm must render at every point in the
     cycle without throwing, and every trace must be a valid path */
  for (const d of DECKS.filter(x => x.beat)) {
    const rhythms = vm.runInContext('RHYTHMS.length', s);
    check(`[${label}] ${d.id} defines rhythms`, rhythms >= 10, `only ${rhythms}`);
    let broke = '', badPath = '';
    for (let r = 0; r < rhythms; r++) {
      for (const t of [0, 0.1, 0.3, 0.5, 0.7, 0.95]) {
        try {
          go('run', d.id, 'beat');
          vm.runInContext(`session.playing=false; session.rhythm=${r}; session.t=${t}; render();`, s);
          const html = s.__app.innerHTML;
          if (!/class="ecgtrace/.test(html) && !broke) broke = `rhythm ${r} at t=${t}: no trace rendered`;
        } catch (e) { if (!broke) broke = `rhythm ${r} at t=${t}: ${e.message}`; }
      }
      const p = vm.runInContext(`RHYTHMS[${r}].path`, s);
      /* a path must start with a move and contain only finite numbers */
      if (!/^M[\d.]/.test(p.trim()) && !badPath) badPath = `rhythm ${r} path does not start with M`;
      if (/NaN|undefined|Infinity/.test(p) && !badPath) badPath = `rhythm ${r} path contains NaN/undefined`;
    }
    check(`[${label}] ${d.id} every rhythm renders across the cycle`, !broke, broke);
    check(`[${label}] ${d.id} every rhythm trace is a valid path`, !badPath, badPath);

    /* the conduction walkthrough only runs for sinus rhythms */
    const sinus = vm.runInContext('RHYTHMS.filter(r=>r.sinus).length', s);
    check(`[${label}] ${d.id} sinus rhythms carry the conduction walkthrough`, sinus === 3, `got ${sinus}`);
    const phases = vm.runInContext('BEAT.length', s);
    check(`[${label}] ${d.id} the beat has its phases`, phases === 7, `got ${phases}`);
    /* phases must be ordered and cover the whole cycle */
    const ts = vm.runInContext('JSON.stringify(BEAT.map(p=>p.t))', s);
    const arr = JSON.parse(ts);
    check(`[${label}] ${d.id} phases ascend from 0`,
          arr[0] === 0 && arr.every((v, i) => i === 0 || v > arr[i - 1]), ts);
  }

  /* ---- the rhythm traces are reference images, so measure them -------------
     These are shown beside a definition as "this is what it looks like", which
     makes them teaching material rather than decoration. Parse each path, find
     the R peaks, and check the drawing actually shows what the label claims:
     the right rate, the right regularity, and P waves only where P waves exist.

     WINDOW must match the figure stated in index.html's trace comment. It is
     what turns a complex count into BPM, and getting it wrong is not cosmetic —
     at 3 s the same unchanged traces put sinus tachycardia at exactly 100 for a
     rhythm defined as "above 100", and ventricular tachycardia at 140 against
     its own stated 150–250. */
  {
    const RHYTHMS = vm.runInContext('typeof RHYTHMS !== "undefined" ? RHYTHMS : null', s);
    check(`[${label}] rhythm traces are defined`, Array.isArray(RHYTHMS));
    if (Array.isArray(RHYTHMS)) {
      const WINDOW = 2.5;
      const pts = d => {
        const t = d.match(/[A-Za-z]|-?\d*\.?\d+/g) || [];
        const out = []; let i = 0, cmd = '', cur = [0, 0];
        const n = () => parseFloat(t[i++]);
        while (i < t.length) {
          if (/^[A-Za-z]$/.test(t[i])) cmd = t[i++];
          if (cmd === 'M' || cmd === 'L') { cur = [n(), n()]; out.push(cur); }
          else if (cmd === 'H') { cur = [n(), cur[1]]; out.push(cur); }
          else if (cmd === 'V') { cur = [cur[0], n()]; out.push(cur); }
          else if (cmd === 'Q') {   /* P and T waves are quadratics */
            const p0 = cur, c = [n(), n()], p1 = [n(), n()];
            for (let k = 1; k <= 12; k++) {
              const u = k / 12, v = 1 - u;
              out.push([v*v*p0[0] + 2*v*u*c[0] + u*u*p1[0], v*v*p0[1] + 2*v*u*c[1] + u*u*p1[1]]);
            }
            cur = p1;
          } else i++;
        }
        return out;
      };
      /* R peaks: upward vertices well clear of baseline, merged at 30 units so a
         ventricular ectopic's two humps count as one beat while PAT's genuinely
         separate beats (44 apart) stay separate */
      const peaks = p => {
        const raw = [];
        for (let i = 1; i < p.length - 1; i++) {
          const [x, y] = p[i];
          if (60 - y >= 12 && y <= p[i-1][1] && y <= p[i+1][1]) raw.push({ x, h: 60 - y });
        }
        const out = [];
        for (const q of raw) {
          const last = out[out.length - 1];
          if (last && q.x - last.x < 30) { if (q.h > last.h) out[out.length - 1] = q; }
          else out.push(q);
        }
        return out;
      };
      const cv = a => {
        if (a.length < 2) return 0;
        const m = a.reduce((x, y) => x + y, 0) / a.length;
        return m ? Math.sqrt(a.reduce((n, v) => n + (v - m) ** 2, 0) / a.length) / m : 0;
      };
      const by = name => RHYTHMS.find(r => r.name === name);
      const rateOf = r => {
        const R = peaks(pts(r.path));
        return { bpm: Math.round(R.length / WINDOW * 60), R,
                 cv: cv(R.slice(1).map((p, i) => p.x - R[i].x)) };
      };

      /* stated rate vs drawn rate — skip A-fib, whose figure is the ATRIAL rate */
      let offRange = '';
      for (const r of RHYTHMS) {
        if (r.id === 'afib' || !/\d/.test(r.rate)) continue;
        const { bpm } = rateOf(r);
        const span = /(\d+)\s*[–-]\s*(\d+)/.exec(r.rate);
        const below = /below\s*(\d+)/i.exec(r.rate);
        const above = /above\s*(\d+)/i.exec(r.rate);
        let ok = true;
        if (span) ok = bpm >= +span[1] && bpm <= +span[2];
        else if (below) ok = bpm < +below[1];
        else if (above) ok = bpm > +above[1];
        if (!ok && !offRange) offRange = `${r.name} draws ~${bpm} BPM against "${r.rate}"`;
      }
      check(`[${label}] every trace draws the rate its label claims`, !offRange, offRange);

      /* irregularly irregular is THE sign of A-fib */
      const afib = by('Atrial fibrillation');
      if (afib) check(`[${label}] the A-fib trace is irregularly irregular`,
                      rateOf(afib).cv > 0.15,
                      `R-R variation is only ${rateOf(afib).cv.toFixed(3)} — reads as regular`);

      /* sinus rhythms are regular by definition */
      let notRegular = '';
      for (const id of ['nsr', 'brady', 'tachy']) {
        const r = RHYTHMS.find(x => x.id === id);
        if (r && rateOf(r).cv > 0.05 && !notRegular)
          notRegular = `${r.name} varies by ${rateOf(r).cv.toFixed(3)}`;
      }
      check(`[${label}] the sinus traces are regular`, !notRegular, notRegular);

      /* no P waves in ventricular tachycardia — the impulse never reaches the
         atria in an organised way, and their absence is a recognition point */
      const vt = by('Ventricular tachycardia');
      if (vt) {
        const small = pts(vt.path).filter((p, i, a) =>
          i > 0 && i < a.length - 1 && 60 - p[1] >= 2 && 60 - p[1] <= 9 &&
          p[1] <= a[i-1][1] && p[1] <= a[i+1][1]);
        check(`[${label}] the ventricular tachycardia trace shows no P waves`,
              small.length === 0, `${small.length} P-sized bumps drawn`);
      }

      /* a card pointing at a rhythm that does not exist loses its picture
         silently, which is exactly the kind of thing nobody notices */
      const missing = DECKS.flatMap(d => d.cards.filter(c => c.trace)
        .filter(c => !RHYTHMS.some(r => r.name === c.trace))
        .map(c => `${d.id} / "${c.term}" → "${c.trace}"`));
      check(`[${label}] every card trace names a real rhythm`, !missing.length, missing.join(', '));

      /* and the picture actually reaches the screen in Recall */
      const traced = DECKS.flatMap(d => d.cards.filter(c => c.trace && !c.fact).map(c => [d, c]))[0];
      if (traced) {
        go('run', traced[0].id, 'recall');
        vm.runInContext(`session.queue.unshift(DECKS.find(d=>d.id===${JSON.stringify(traced[0].id)})` +
          `.cards.find(c=>c.term===${JSON.stringify(traced[1].term)})); render();`, s);
        check(`[${label}] Recall draws the trace for a rhythm card`,
              /class="ecg cardtrace"/.test(s.__app.innerHTML) && /<path d="M/.test(s.__app.innerHTML),
              'no tracing rendered beside the definition');
      }
    }
  }

  /* Name the Rhythm. The whole mode rests on the tracing being on screen and
     the choices being real alternatives, so check both from the rendered page —
     a question with the right answer but no picture is not this mode at all. */
  for (const d of DECKS.filter(x => modesFor(x).includes('trace'))) {
    go('run', d.id, 'trace');
    const html = s.__app.innerHTML;
    check(`[${label}] ${d.id} trace mode draws a tracing`,
          /class="ecg cardtrace"/.test(html) && /<path d="M/.test(html),
          'no tracing rendered');
    const choices = [...html.matchAll(/onclick="answerTrace\((\d)\)"[\s\S]*?<span>([^<]*)</g)]
      .map(m => m[2].trim());
    check(`[${label}] ${d.id} offers four distinct rhythms`,
          choices.length === 4 && new Set(choices).size === 4, choices.join(' | '));
    /* every choice must be a real card in the deck, not a stray string */
    const terms = new Set(d.cards.map(c => esc(c.term)));
    check(`[${label}] ${d.id} every choice names a deck card`,
          choices.every(c => terms.has(c)), choices.filter(c => !terms.has(c)).join(', '));

    /* a full run must be answerable and must score */
    const n = vm.runInContext('session.qs.length', s);
    check(`[${label}] ${d.id} asks about every traced rhythm`,
          n === d.cards.filter(c => c.trace).length, `${n} questions`);
    let guard = 0;
    while (vm.runInContext('session.i < session.qs.length', s) && guard++ < 40) {
      s.answerTrace(vm.runInContext('session.qs[session.i].answer', s));
      s.nextTrace();
    }
    check(`[${label}] ${d.id} a perfect run scores every rhythm`,
          vm.runInContext('session.score', s) === n,
          `${vm.runInContext('session.score', s)} of ${n}`);
  }

  /* Spot the Segment. The mode is only worth anything if the highlighted band
     lands on the feature it names, and that cannot be eyeballed from the deck
     data — the band comes from ECG_PARTS while the wave comes from pqrst().
     Sample the drawn path inside each band and check the shape is right:
     a wave must leave the baseline, a segment must stay on it. */
  for (const d of DECKS.filter(x => modesFor(x).includes('parts'))) {
    const PARTS = vm.runInContext('ECG_PARTS', s);
    const W = vm.runInContext('PARTW', s);
    const path = vm.runInContext(`"M0,60 " + pqrst(0, ${W}) + pqrst(${W}, ${W})`, s);
    /* sample the polyline, including the quadratic P and T humps */
    const pts = [];
    {
      const t = path.match(/[A-Za-z]|-?\d*\.?\d+/g);
      let i = 0, cmd = '', cur = [0, 0];
      const num = () => parseFloat(t[i++]);
      while (i < t.length) {
        if (/^[A-Za-z]$/.test(t[i])) cmd = t[i++];
        if (cmd === 'M' || cmd === 'L') { cur = [num(), num()]; pts.push(cur); }
        else if (cmd === 'Q') {
          const p0 = cur, c = [num(), num()], p1 = [num(), num()];
          for (let k = 1; k <= 12; k++) {
            const u = k / 12, v = 1 - u;
            pts.push([v*v*p0[0] + 2*v*u*c[0] + u*u*p1[0], v*v*p0[1] + 2*v*u*c[1] + u*u*p1[1]]);
          }
          cur = p1;
        } else i++;
      }
    }
    const excursion = (from, to) => {
      const inBand = pts.filter(p => p[0] >= from * W - 0.5 && p[0] <= to * W + 0.5);
      return inBand.length ? Math.max(...inBand.map(p => Math.abs(p[1] - 60))) : -1;
    };
    let wrong = '';
    for (const p of PARTS) {
      const e = excursion(p.from, p.to);
      if (e < 0) { wrong = wrong || `${p.term}: band covers no part of the trace`; continue; }
      /* a segment is flat baseline; a wave or interval must contain a deflection */
      const flat = /segment$/i.test(p.term);
      if (flat && e > 3 && !wrong) wrong = `${p.term} is a segment but its band covers a ${e.toFixed(0)}-unit deflection`;
      if (!flat && !/point$/i.test(p.term) && e < 6 && !wrong)
        wrong = `${p.term} should contain a deflection but its band is flat`;
    }
    check(`[${label}] ${d.id} each highlight sits on the feature it names`, !wrong, wrong);

    /* the P wave must fall inside the PR interval, and QRS and T inside QT —
       an interval is its parts plus the segment between them */
    const by = t => PARTS.find(p => p.term === t);
    const inside = (a, b) => by(a) && by(b) && by(a).from >= by(b).from - 1e-9 && by(a).to <= by(b).to + 1e-9;
    check(`[${label}] ${d.id} the P wave sits inside the PR interval`, inside('P wave', 'PR interval'));
    check(`[${label}] ${d.id} the QRS and T wave sit inside the QT interval`,
          inside('QRS complex', 'QT interval') && inside('T wave', 'QT interval'));

    go('run', d.id, 'parts');
    const html = s.__app.innerHTML;
    check(`[${label}] ${d.id} parts mode draws a highlighted tracing`,
          /class="parthi"/.test(html) && /class="ecgtrace"/.test(html), 'no highlight rendered');
    const n = vm.runInContext('session.qs.length', s);
    let guard = 0;
    while (vm.runInContext('session.i < session.qs.length', s) && guard++ < 40) {
      s.answerParts(vm.runInContext('session.qs[session.i].answer', s));
      s.nextParts();
    }
    check(`[${label}] ${d.id} a perfect run scores every segment`,
          vm.runInContext('session.score', s) === n && n >= 4, `${vm.runInContext('session.score', s)} of ${n}`);
  }

  /* Labelled anatomical figures.

     The drawing is now a licensed medical illustration rather than something I
     authored, so the old point-in-path check is gone with it: that artwork is
     Inkscape output using relative commands and arc segments, and a parser
     good enough to test it honestly would be a bigger and more fragile thing
     than the check is worth. Label placement was verified by rendering the
     figure with its dots and looking at it, which is the only way anyone could
     have judged it anyway.

     What IS worth holding down mechanically is everything around it: labels
     that collide, a leader pointing nowhere, a missing explanation, a round
     that cannot be played — and the attribution, which is a licence
     obligation and the one thing here with consequences outside the app. */
  /* ---- Name the Highlighted Part ----
     The professor tests this chapter by showing a coloured-in region and asking
     for its name, which runs opposite to the figure mode above. Each region
     names an id or a class in the artwork; the whole question rests on that
     target existing and on the highlight rule reaching it. A region that lights
     nothing still renders a plausible-looking question, so it has to be caught
     here rather than noticed. */
  for (const d of DECKS.filter(x => x.region)) {
    const art = vm.runInContext(`REGIONS[${JSON.stringify(d.region.name)}].art`, s);
    check(`[${label}] ${d.id} the region artwork exists`, !!art, d.region.name);
    if (!art) continue;
    const items = d.region.items;

    /* A labelled diagram answers its own question. */
    check(`[${label}] ${d.id} the region artwork carries no baked-in labels`,
          !/<text[\s>]/.test(art), 'the artwork already names the structures');

    /* Four choices are offered, so there must be four things to choose from. */
    check(`[${label}] ${d.id} has enough regions for a four-way question`,
          items.length >= 4, `only ${items.length}`);

    /* The target must exist in the artwork, as an id or as a class — those are
       exactly what the highlight rule selects. */
    const missing = items.filter(p =>
      !art.includes(`id="${p.id}"`) && !art.includes(`class="${p.id}"`));
    check(`[${label}] ${d.id} every region names something in the artwork`,
          !missing.length, missing.map(p => p.id).join(', '));

    /* Two regions sharing a target would light together; two sharing a name
       would put the same answer in the list twice. */
    check(`[${label}] ${d.id} no two regions share a target`,
          new Set(items.map(p => p.id)).size === items.length, 'duplicate id');
    check(`[${label}] ${d.id} no two regions share a name`,
          new Set(items.map(p => p.name)).size === items.length, 'duplicate name');

    check(`[${label}] ${d.id} every region carries an explanation`,
          items.every(p => p.about && p.about.length > 15), 'a region has no explanation');

    go('run', d.id, 'region');
    const html = s.__app.innerHTML;

    check(`[${label}] ${d.id} the region figure renders`, /<svg/.test(html), 'no artwork drawn');

    /* The rule must select the element AND its descendants: some targets are a
       group whose child paths each carry their own fill, and a fill on the
       parent does not override that. Dropping the descendant halves of this
       selector would light nothing for the skeleton. */
    const rule = (/<style>([^<]*)<\/style>/.exec(html) || [])[1] || '';
    check(`[${label}] ${d.id} the highlight rule reaches descendants`,
          / \*\{|\ \*,/.test(rule) || /#[^,]+ \*/.test(rule),
          `rule was: ${rule.slice(0, 90)}`);
    check(`[${label}] ${d.id} the highlight rule beats the artwork's own fill`,
          /fill:[^;]*!important/.test(rule), 'without !important an inline fill wins');

    /* Four buttons, one right answer, and the right answer among them. */
    const btns = (html.match(/<button class="choice /g) || []).length;
    check(`[${label}] ${d.id} the question offers four choices`, btns === 4, `got ${btns}`);
    const answer = vm.runInContext('session.choices[session.answer]', s);
    const target = vm.runInContext('session.order[session.i]', s);
    check(`[${label}] ${d.id} the marked answer is the highlighted region`,
          answer === (items.find(p => p.id === target) || {}).name,
          `marked ${answer} for ${target}`);

    /* Distractors must come from this diagram, so a wrong answer is always a
       structure that really does sit near the right one. */
    const names = new Set(items.map(p => p.name));
    const choices = vm.runInContext('JSON.stringify(session.choices)', s);
    check(`[${label}] ${d.id} every choice is a region of this diagram`,
          JSON.parse(choices).every(c => names.has(c)), choices);

    /* Attribution is a licence obligation, not a courtesy. */
    const credit = (/<p class="figcredit">([\s\S]*?)<\/p>/.exec(html) || [])[1] || '';
    check(`[${label}] ${d.id} the diagram names its source`,
          /commons\.wikimedia\.org|href=/.test(credit) && credit.replace(/<[^>]*>/g, '').trim().length > 20,
          'no attribution rendered beneath the figure');
    if (!/public domain|CC0/i.test(credit))
      check(`[${label}] ${d.id} a licensed diagram links its licence`,
            /creativecommons\.org/.test(credit), 'licence link missing');

    /* The professor's emphasis is carried by position: this mode goes first,
       ahead of Recall, and wears the accent border. */
    go('deck', d.id);
    const modes = s.__app.innerHTML;
    const first = (/<button class="mode([^"]*)" onclick="go\('run','[^']*','([^']*)'\)/.exec(modes) || []);
    check(`[${label}] ${d.id} a diagram mode comes first`,
          first[2] === 'label' || first[2] === 'region', `first was ${first[2]}`);
    check(`[${label}] ${d.id} the diagram mode is marked out`, /hot/.test(first[1] || ''), 'no accent border');
  }

  /* ---- LABELLED FIGURES ---------------------------------------------------

     A deck may carry several. `label` is the first, kept so decks written
     before this still work, and `labels` holds the rest; each becomes its own
     entry in the deck menu.

     The checks that matter here are about PROPORTIONS and TIMING, because both
     broke the moment figures stopped being inline SVG. An SVG carries a viewBox
     and lays out instantly. A raster carries neither a viewBox nor any size
     until the browser decodes it — so it needs data-w/data-h to avoid being
     squashed to a square, and it needs a re-layout on load or the first,
     uncached paint measures zero height and silently drops every pin. Cached,
     it looks perfect, which is exactly how that would have shipped. */
  for (const d of DECKS.filter(x => x.label || (x.labels || []).length)) {
    const figs = [].concat(d.label || [], d.labels || []);
    for (const f of figs) {
      const q = JSON.stringify(f.name);
      const art = vm.runInContext(`REGIONS[${q}] && REGIONS[${q}].art`, s);
      check(`[${label}] ${d.id}/${f.name} the artwork exists`, !!art, f.name);
      if (!art) continue;

      const ratio = vm.runInContext(`figRatio(REGIONS[${q}].art)`, s);
      check(`[${label}] ${d.id}/${f.name} the artwork declares its proportions`,
            !!ratio, 'no viewBox and no data-w/data-h, so the figure renders squashed');

      if (/^<img/.test(String(art).trim()))
        check(`[${label}] ${d.id}/${f.name} a raster figure lays out again once it loads`,
              /bitmap\.addEventListener\('load'/.test(srcCss),
              'without this the first uncached paint drops every pin');

      const off = f.items.filter(p => !(p.x >= 1 && p.x <= 99 && p.y >= 1 && p.y <= 99));
      check(`[${label}] ${d.id}/${f.name} every pin sits on the figure`,
            !off.length, off.map(p => p.id).join(', '));
      check(`[${label}] ${d.id}/${f.name} every pin carries an explanation`,
            f.items.every(p => p.about && p.about.length > 15), 'a pin has no explanation');
      check(`[${label}] ${d.id}/${f.name} every pin is in a group`,
            f.items.every(p => p.group), 'a pin with no group cannot be put on a screen');
      const ids = f.items.map(p => p.id);
      check(`[${label}] ${d.id}/${f.name} pin ids are unique`,
            new Set(ids).size === ids.length, 'a duplicate id would make two slots one');
    }

    /* One mode, however many figures. A dozen near-identical rows in the deck
       menu would bury every other mode, so the figures live behind a switcher
       inside the mode instead. */
    go('deck', d.id);
    const menu = s.__app.innerHTML;
    check(`[${label}] ${d.id} the figures share a single mode`,
          (menu.match(/'label(:[0-9]+)?'\)/g) || []).length === 1,
          'expected exactly one label mode entry in the deck menu');

    if (figs.length > 1) {
      /* Each figure needs a tab, or it cannot be reached at all. */
      go('run', d.id, 'label');
      const run = s.__app.innerHTML;
      const tabs = (run.match(/class="lfigtab/g) || []).length;
      check(`[${label}] ${d.id} every figure has a switcher tab`,
            tabs === figs.length, `${tabs} tabs for ${figs.length} figures`);
      check(`[${label}] ${d.id} every figure is named for its tab`,
            figs.every(f => f.title && f.title.length > 2),
            'a figure with no title would show as "Figure n"');

      /* Progress must count every figure, not just the one on screen. */
      const total = figs.reduce((n, f) => n + f.items.length, 0);
      check(`[${label}] ${d.id} progress spans all the figures`,
            run.includes('/' + total) || run.includes('0/' + total),
            `session bar should count to ${total}`);
    }
  }


  for (const d of DECKS.filter(x => x.figure)) {
    /* a figure entry carries its artwork, caption and credit — the drawing is
       the `art` field, not the entry itself */
    const svg = vm.runInContext(`FIGURES[${JSON.stringify(d.figure.name)}].art`, s);
    check(`[${label}] ${d.id} the ${d.figure.name} figure exists`, !!svg);
    if (!svg) continue;
    const P = d.figure.parts;

    check(`[${label}] ${d.id} the figure carries no baked-in labels`,
          !/<text[s>]/.test(svg), 'the artwork already names the structures');

    /* dots are 5.2% of figure WIDTH, so centres must be that far apart in
       width-relative units or they overlap on screen */
    const box = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg);
    const ratio = box ? Number(box[2]) / Number(box[1]) : 1;
    let tooClose = '';
    for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) {
      const dx = P[i].x - P[j].x, dy = (P[i].y - P[j].y) * ratio;
      const gap = Math.hypot(dx, dy);
      if (gap < 5.2 && !tooClose) tooClose = `${P[i].id} and ${P[j].id} are ${gap.toFixed(2)}% apart`;
    }
    check(`[${label}] ${d.id} no two labels overlap`, !tooClose, tooClose);

    /* every label must sit on the figure, and any leader must land on it too */
    const off = P.filter(p => p.x < 2 || p.x > 98 || p.y < 2 || p.y > 98)
      .concat(P.filter(p => p.to && (p.to[0] < 2 || p.to[0] > 98 || p.to[1] < 2 || p.to[1] > 98)));
    check(`[${label}] ${d.id} every label and leader stays on the figure`,
          !off.length, off.map(p => p.id).join(', '));

    /* a leader that ends where it starts points at nothing */
    const stub = P.filter(p => p.to && Math.hypot(p.x - p.to[0], p.y - p.to[1]) < 2);
    check(`[${label}] ${d.id} no leader is a stub`, !stub.length, stub.map(p => p.id).join(', '));

    check(`[${label}] ${d.id} every label carries an explanation`,
          P.every(p => p.about && p.about.length > 15), 'a label has no explanation');

    go('run', d.id, 'figure');
    const html = s.__app.innerHTML;
    /* The dots are positioned in percentages of the container, so the container
       must have the artwork's own aspect ratio. Get that wrong and the SVG
       letterboxes inside the box while every label stays put — the whole set
       slides off the drawing by the size of the gap, which is exactly what
       happened when a second figure with a different shape arrived. */
    const boxAspect = (/class="figure" style="aspect-ratio:([\d.]+)\/([\d.]+)"/.exec(html) || []).slice(1);
    check(`[${label}] ${d.id} the figure box matches the artwork's aspect ratio`,
          boxAspect.length === 2 && box &&
          Math.abs(Number(boxAspect[0]) / Number(boxAspect[1]) - Number(box[1]) / Number(box[2])) < 0.001,
          `box ${boxAspect.join(':')} against viewBox ${box ? box[1] + ':' + box[2] : '?'}`);

    check(`[${label}] ${d.id} the figure renders with its dots`,
          /<svg/.test(html) && (html.match(/class="dot /g) || []).length === P.length,
          'figure or dots missing');
    check(`[${label}] ${d.id} leaders render for the labels that declare one`,
          (html.match(/<line x1=/g) || []).length === P.filter(p => p.to).length,
          'leader count does not match');

    /* Credit is a test rather than a good intention, because for a licensed
       figure it is an obligation. Every figure must name its source; one that
       is NOT public domain must additionally link the licence it is used
       under, since that is what the licence itself asks for. */
    const credit = (/<p class="figcredit">([\s\S]*?)<\/p>/.exec(html) || [])[1] || '';
    check(`[${label}] ${d.id} the diagram names its source`,
          /commons\.wikimedia\.org|href=/.test(credit) && credit.replace(/<[^>]*>/g, '').trim().length > 20,
          'no attribution rendered beneath the figure');
    if (!/public domain/i.test(credit))
      check(`[${label}] ${d.id} a licensed diagram links its licence`,
            /creativecommons\.org\/licenses/.test(credit),
            'figure is not public domain but carries no licence link');

    let guard = 0;
    while ($('session.i') < P.length && guard++ < 40) {
      s.pickPart($('session.order[session.i]')); s.nextPart();
    }
    check(`[${label}] ${d.id} a perfect round scores every structure`,
          $('session.score') === P.length, `${$('session.score')} of ${P.length}`);
  }

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

  /* Decks are allowed — encouraged, even — to cover the same ground in their own
     words, so shared terms generally may differ. The chest leads are the one
     exception: the six placements were copied verbatim into the test review so
     both decks teach the same landmarks, and two decks quietly disagreeing about
     where V4 goes is the kind of thing you only discover in a lab practical. */
  const leadDef = t => (DECKS.find(d => d.id === 'ekg-leads') || { cards: [] })
    .cards.find(c => c.term === t);
  const drift = [];
  for (const c of (DECKS.find(d => d.id === 'ekg-test-review') || { cards: [] }).cards) {
    if (!/^V[1-6]$/.test(c.term)) continue;
    const src = leadDef(c.term);
    if (!src) drift.push(`${c.term} is missing from ekg-leads`);
    else if (src.def !== c.def) drift.push(`${c.term}: "${c.def}" vs ekg-leads "${src.def}"`);
  }
  check(`[${label}] the two decks agree on where the chest leads go`,
        !drift.length, drift.join('\n      '));

  /* A Recall definition must not contain its own answer. "Lead II strip"
     defined with "Lead II" in the prompt, or "Large square" defined as "five
     large squares = 1.0 second", is a typing exercise rather than a test.

     Unlike the trailing-trivia heuristics below, this one is safe because it is
     narrow: it looks for the WHOLE term, not any word of it, and strips the
     redundant category tail first so "Tricuspid valve" is judged on
     "Tricuspid" alone. Run across every deck it flagged five cards, all of
     them real leaks and none of them defensible. Detail that only makes sense
     once you have named the thing belongs in `note`, which shows after
     answering. */
  const TAIL = /\s+(regions?|cavit(?:y|ies)|planes?|tissues?|glands?|cells?|diseases?|disorders?|syndromes?|systems?|mutations?|transmission|orders?|directives?|valves?)$/i;
  const leaks = [];
  for (const d of DECKS) for (const c of recallableCards(d)) {
    const def = c.def.toLowerCase();
    /* comma-separated alternatives are each answerable, so each must stay hidden */
    for (const form of c.term.split(',').map(x => x.replace(TAIL, '').trim())) {
      if (form.length > 3 && def.includes(form.toLowerCase())) {
        leaks.push(`${d.id} / "${c.term}" — the definition contains "${form}"`);
        break;
      }
    }
  }
  check(`[${label}] no definition gives away its own answer`, !leaks.length,
        leaks.join('\n      '));

  /* No automated check for "definition trails off into trivia". Flagging a
     semicolon with a long tail was tried and over-fired badly: "pelvic cavity —
     the space formed by the hip bones; contains reproductive and excretory
     organs" is a two-part definition, and the transport cards deliberately read
     category; mechanism; example. Whether a trailing clause helps identify the
     term is a judgment call, and a check that forces rewrites of good
     definitions to stay green is worse than no check. Detail that genuinely
     does not belong in the prompt goes in `note`, which shows after answering. */

  /* This app is shared with classmates, so nothing on a card may address the
     one person who built it. "Your notes say…", "worth checking your slides",
     or a `source` naming a file path on somebody's disk all read as noise to
     everyone else — and a source line is displayed on every deck screen.
     Second person is fine in the ordinary instructional sense ("you judge a
     segment by its shape"); what is banned is pointing at private material. */
  const PRIVATE = /\byour (?:notes?|slides?|chapter|study guide|instructor|course materials)\b|\bin your \w+ notes\b|Notes\/TERM|Assets\//i;
  const personal = [];
  for (const d of DECKS) {
    if (PRIVATE.test(d.source || '')) personal.push(`${d.id} source: "${d.source}"`);
    for (const c of d.cards) {
      if (PRIVATE.test(c.note || '')) personal.push(`${d.id} / "${c.term}" note`);
      if (PRIVATE.test(c.def)) personal.push(`${d.id} / "${c.term}" definition`);
    }
    for (const q of d.questions || [])
      if (PRIVATE.test(q.why || '') || PRIVATE.test(q.q || ''))
        personal.push(`${d.id} question: "${String(q.q).slice(0, 40)}…"`);
  }
  check(`[${label}] nothing addresses one reader's private material`, !personal.length,
        personal.join('\n      '));

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

  /* Plural tolerance must never let one typed answer satisfy two cards. If two
     terms in a deck collapse to the same singular, the second is unanswerable —
     the same trap the duplicate check above exists to prevent. */
  {
    const dp = w => w.replace(/ies$/, 'y').replace(/(ss|[sxz]|ch|sh)es$/, '$1').replace(/([^s])s$/, '$1');
    /* top-level `const` in a vm script never lands on the context object */
    const alternatives = vm.runInContext('alternatives', s);
    const normalize = vm.runInContext('normalize', s);
    const merged = [];
    for (const d of DECKS) {
      const seen = new Map();
      for (const c of recallableCards(d)) {
        for (const a of alternatives(c)) {
          const k = dp(normalize(a));
          if (!k) continue;
          if (seen.has(k) && seen.get(k) !== c.term)
            merged.push(`${d.id}: "${seen.get(k)}" and "${c.term}" both answer to "${k}"`);
          seen.set(k, c.term);
        }
      }
    }
    check(`[${label}] no two cards collapse to the same plural form`, !merged.length,
          merged.join('\n      '));
  }

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
    /* "valve" is redundant when the definition already says valve, so the bare
       name counts — same rule that lets "Hypogastric" stand for the region.
       The four valve names stay distinct, so nothing else claims them. */
    ['heart-anatomy', 'Tricuspid valve', 'Tricuspid', 'exact'],
    ['heart-anatomy', 'Mitral valve', 'Mitral', 'exact'],
    ['heart-anatomy', 'Aortic valve', 'Aortic', 'exact'],
    ['heart-anatomy', 'Mitral valve', 'Tricuspid', 'wrong'],
    /* Plural and singular are the same word — an inflection, not a misspelling.
       Strict spelling still decides everything else. */
    ['bio-ch4', 'Enzyme', 'enzymes', 'exact'],
    ['bio-ch4', 'Enzyme', 'Enzyme', 'exact'],
    ['bio-ch4', 'Enzyme', 'enzime', 'wrong'],
    ['bio-ch4', 'Enzyme', 'enzymess', 'wrong'],
    ['mt1-terms', 'hemorrhage', 'hemorages', 'wrong'],
    ['heart-anatomy', 'Pulmonary veins', 'pulmonary vein', 'exact'],
    /* Vertical/horizontal and Y/X name the same two lines, so either is taken.
       Crossing them is still wrong — vertical is Y, and X is the horizontal one. */
    ['ekg-basics', 'Vertical axis, Y axis', 'Y axis', 'exact'],
    ['ekg-basics', 'Vertical axis, Y axis', 'Vertical axis', 'exact'],
    ['ekg-basics', 'Vertical axis, Y axis', 'X axis', 'wrong'],
    ['ekg-basics', 'Horizontal axis, X axis', 'X axis', 'exact'],
    ['ekg-basics', 'Horizontal axis, X axis', 'Y axis', 'wrong'],
  ];
  const deckOf = id => DECKS.find(d => d.id === id);
  for (const [deck, term, typed, want] of spelling) {
    const got = judge(typed, card(deck, term), deckOf(deck));
    check(`[${label}] spelling "${typed}" vs ${term}`, got === want, `wanted ${want}, got ${got}`);
  }

  /* A term ending in a category word accepts the short form, but only when no
     other card in the deck answers to it. */
  const shortCases = [
    /* redundant: the definition already says "region" / "plane" */
    ['mt2-overview', 'Hypogastric region', 'Hypogastric', 'exact'],
    ['mt2-overview', 'Hypogastric region', 'Hypogastric region', 'exact'],
    ['mt2-overview', 'Umbilical region', 'Umbilical', 'exact'],
    ['mt2-overview', 'Iliac regions', 'Iliac', 'exact'],
    ['mt2-overview', 'Sagittal plane', 'Sagittal', 'exact'],
    /* NOT redundant: the definition never uses the category word */
    ['mt2-overview', 'Genetic mutation', 'Genetic', 'wrong'],
    ['mt2-overview', 'Genetic disorder', 'Genetic', 'wrong'],
    ['mt2-overview', 'Adipose tissue', 'Adipose', 'wrong'],
    ['mt2-overview', 'Organic disorder', 'Organic', 'wrong'],
    /* redundant, but the short form is another card — still blocked */
    ['mt2-overview', 'Dorsal cavity', 'Dorsal', 'wrong'],
    ['mt2-overview', 'Ventral cavity', 'Ventral', 'wrong'],
    ['mt2-overview', 'Parietal peritoneum', 'Parietal', 'wrong'],
    /* still strict on actual spelling */
    ['mt2-overview', 'Hypogastric region', 'Hypergastric', 'wrong'],
    ['mt2-overview', 'Epigastric region', 'Hypogastric', 'wrong'],
    /* a fraction glyph is typeable as ASCII, and the bare word is NOT enough */
    ['ekg-basics', 'Sensitivity ½', 'Sensitivity 1/2', 'exact'],
    ['ekg-basics', 'Sensitivity ½', 'sensitivity 1/2', 'exact'],
    ['ekg-basics', 'Sensitivity ½', 'Sensitivity ½', 'exact'],
    ['ekg-basics', 'Sensitivity ½', 'Sensitivity', 'wrong'],
    ['ekg-basics', 'Sensitivity ½', 'Sensitivity 2', 'wrong'],
    ['ekg-basics', 'Sensitivity 2', 'Sensitivity 2', 'exact'],
    ['ekg-basics', 'Sensitivity 2', 'Sensitivity 1/2', 'wrong'],
  ];

  /* A fraction must carry meaning, not vanish. Dropping the glyph from the term
     must NOT still be accepted — that is exactly how "Sensitivity ½" came to
     accept a bare "sensitivity" while rejecting the correct "Sensitivity 1/2". */
  let swallowed = '';
  for (const d of DECKS) for (const c of recallableCards(d)) {
    if (!/[½¼¾⅓⅔]/.test(c.term)) continue;
    const stripped = c.term.replace(/[½¼¾⅓⅔]/g, '').trim();
    if (stripped && judge(stripped, c, d) === 'exact' && !swallowed)
      swallowed = `${d.id} / "${c.term}" also accepts "${stripped}" — the fraction is being ignored`;
  }
  check(`[${label}] a fraction in a term is not ignored`, !swallowed, swallowed);
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
    if (judge(short, c, d) !== 'exact') continue;          /* not accepted anyway */
    const other = d.cards.find(o => o !== c && judge(short, o, d) === 'exact');
    if (other && !hijack)
      hijack = `${d.id}: "${short}" answers both "${c.term}" and "${other.term}"`;
  }
  check(`[${label}] no short form answers two cards`, !hijack, hijack);

  /* the short form is only accepted when the definition supplies the word */
  let notRedundant = '';
  for (const d of DECKS) for (const c of recallableCards(d)) {
    const sf = /\s+(regions?|cavit(?:y|ies)|planes?|tissues?|glands?|cells?|diseases?|disorders?|syndromes?|systems?|mutations?|transmission|orders?|directives?)$/i.exec(c.term);
    if (!sf) continue;
    const short = c.term.slice(0, sf.index).trim();
    const supplied = c.def.toLowerCase().includes(sf[1].toLowerCase().slice(0, 5));
    if (!supplied && judge(short, c, d) === 'exact' && !notRedundant)
      notRedundant = `${d.id}: "${c.term}" accepts "${short}" but its definition never says "${sf[1]}"`;
  }
  check(`[${label}] short form only where the definition repeats the word`,
        !notRedundant, notRedundant);

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

/* ------------------------------------------- heart contraction geometry ---
   The chambers squeeze by CSS transform, which no amount of running the engine
   can check. So sample the chamber paths, apply the transforms the stylesheet
   declares, and measure the result: the squeeze must be big enough to actually
   read as a contraction, and the contracted chambers must stay inside the
   outline and on their own side of the septum. Scaling a chamber about its own
   centre tears a gap down the midline, which is what kept the old animation too
   subtle to see — this is the check that says so out loud.                  */
function heartGeometry(html, label) {
  const pathOf = re => { const m = re.exec(html); return m ? m[1] : null; };
  const chamber = cls => pathOf(new RegExp(`class="ch ${cls}"\\s+d="([^"]+)"`));
  const myo = pathOf(/class="myo" d="([\s\S]+?)"/);
  check(`[${label}] heart has a myocardium behind the chambers`, !!myo,
        'without it a shrinking cavity just exposes the page background');
  /* the chambers must be wrapped in one group, or the outline stays put while
     the chambers move and the heart visibly comes apart */
  const body = /<g class="heartbody">([\s\S]*?)<\/g>\s*<g class="leaders"/.exec(html);
  check(`[${label}] outline, chambers and conduction share one moving group`, !!body);
  if (body) {
    for (const part of ['class="chambers"', 'class="outline"', 'class="conduct"'])
      check(`[${label}] ${part} rides inside .heartbody`, body[1].includes(part));
  }
  /* the impulse dot sits over the SVG as HTML, so it needs the same transform */
  const bodyScale = /\.heart\.x-ventricles \.heartbody[^{]*\{transform:(scale\([^)]+\))\}/.exec(html);
  check(`[${label}] the body squeezes during ventricular contraction`, !!bodyScale);
  if (bodyScale)
    check(`[${label}] the impulse dot is carried by the same squeeze`,
          new RegExp(`\\.heart\\.x-ventricles[^{]*\\.track[^{]*\\{transform:${
            bodyScale[1].replace(/[.()]/g, '\\$&')}\\}`).test(html)
          || /\.heart\.x-ventricles \.heartbody,\.heart\.x-ventricles \.track\{transform:/.test(html),
          'dot would drift off the apex mid-contraction');
  check(`[${label}] reduced motion cancels the squeeze`,
        /prefers-reduced-motion[\s\S]{0,600}\.heartbody[\s\S]{0,200}transform:none/.test(html));

  if (!chamber('vent-l') || !myo) return;

  const sample = d => {
    const toks = d.match(/[A-Za-z]|-?\d*\.?\d+/g);
    const pts = []; let i = 0, cur = [0, 0], start = [0, 0], cmd = '';
    const n = () => parseFloat(toks[i++]);
    while (i < toks.length) {
      if (/^[A-Za-z]$/.test(toks[i])) cmd = toks[i++];
      if (cmd === 'M') { cur = [n(), n()]; start = cur; pts.push(cur); }
      else if (cmd === 'L') { cur = [n(), n()]; pts.push(cur); }
      else if (cmd === 'H') { cur = [n(), cur[1]]; pts.push(cur); }
      else if (cmd === 'V') { cur = [cur[0], n()]; pts.push(cur); }
      else if (cmd === 'C') {
        const p0 = cur, p1 = [n(), n()], p2 = [n(), n()], p3 = [n(), n()];
        for (let k = 1; k <= 40; k++) {
          const t = k / 40, u = 1 - t;
          pts.push([u*u*u*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t*t*t*p3[0],
                    u*u*u*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t*t*t*p3[1]]);
        }
        cur = p3;
      } else if (/^[Zz]$/.test(cmd)) { pts.push(start); cur = start; }
      else return pts;
    }
    return pts;
  };
  const box = p => ({ x0: Math.min(...p.map(a => a[0])), x1: Math.max(...p.map(a => a[0])),
                      y0: Math.min(...p.map(a => a[1])), y1: Math.max(...p.map(a => a[1])) });
  /* transform-box:fill-box — the origin is a fraction of the element's own box */
  const scaled = (pts, ox, oy, sx, sy) => {
    const b = box(pts);
    const cx = b.x0 + (b.x1 - b.x0) * ox, cy = b.y0 + (b.y1 - b.y0) * oy;
    return pts.map(([x, y]) => [cx + (x - cx) * sx, cy + (y - cy) * sy]);
  };
  const wall = sample(myo);
  const inside = ([x, y]) => {
    let hit = false;
    for (let i = 0, j = wall.length - 1; i < wall.length; j = i++) {
      const [xi, yi] = wall[i], [xj, yj] = wall[j];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };
  /* read the declared scales rather than restating them, so the test tracks the
     stylesheet instead of drifting from it */
  const scaleOf = sel => {
    const m = new RegExp(`\\.heart\\.${sel}[^{]*\\{[^}]*?transform:scale\\(([\\d.]+),\\s*([\\d.]+)\\)`)
      .exec(html);
    return m ? [parseFloat(m[1]), parseFloat(m[2])] : null;
  };
  const STATES = [
    ['atrial contraction',      'x-atria .atria-l',            ['atria-l', 'atria-r'], .25],
    ['ventricular contraction', 'x-ventricles .vent-l',        ['vent-l', 'vent-r'],   .25],
    ['ventricular relaxation',  'x-ventricles-relax .vent-l',  ['vent-l', 'vent-r'],   0],
  ];
  for (const [name, sel, chambers, minShrink] of STATES) {
    const sc = scaleOf(sel);
    check(`[${label}] ${name} declares a scale`, !!sc, sel);
    if (!sc) continue;
    for (const c of chambers) {
      const rest = sample(chamber(c));
      const left = c.endsWith('-l');
      const pts = scaled(rest, left ? 1 : 0, 1, sc[0], sc[1]);
      const b = box(pts);
      check(`[${label}] ${c} stays inside the outline during ${name}`,
            pts.filter(p => !inside(p)).length <= 2, `${pts.filter(p => !inside(p)).length} points escape`);
      check(`[${label}] ${c} stays on its side of the septum during ${name}`,
            left ? b.x1 <= 150.5 : b.x0 >= 149.5, `x ${b.x0.toFixed(1)}–${b.x1.toFixed(1)}`);
      check(`[${label}] ${c} respects the valve plane during ${name}`,
            c.startsWith('atria') ? b.y1 <= 119.5 : b.y0 >= 118.5, `y ${b.y0.toFixed(1)}–${b.y1.toFixed(1)}`);
      if (minShrink) {
        /* the septal edge is what gaps open from — it must not move at all */
        const edge = left ? b.x1 : b.x0;
        const gap = Math.abs(edge - (left ? box(rest).x1 : box(rest).x0));
        check(`[${label}] ${c} keeps its septal edge glued during ${name}`, gap <= 0.5,
              `pulls ${gap.toFixed(1)} units off the septum`);
        const r = box(rest);
        const drop = 1 - ((b.x1-b.x0)*(b.y1-b.y0)) / ((r.x1-r.x0)*(r.y1-r.y0));
        check(`[${label}] ${c} squeeze is visible, not subtle, during ${name}`, drop >= minShrink,
              `cavity area only drops ${(drop*100).toFixed(0)}%, want ${(minShrink*100)}%+`);
      }
    }
  }
}

/* ------------------------------------------------------------------ run */
const srcHtml = read('index.html');
const decksSrc = read('decks.js');
const srcInline = inlineScripts(srcHtml);
check('index.html has exactly one inline script', srcInline.length === 1, `found ${srcInline.length}`);

suite(boot(decksSrc, srcInline[0], 'source'), 'source', srcHtml);
heartGeometry(srcHtml, 'source');

/* build.ps1 prints a card count from a regex over decks.js, because PowerShell
   cannot evaluate the deck data. That count has been wrong twice — once missing
   `{ fact: true, term: ... }` cards, once missing the JSON-quoted `"term":`
   form. Run the build's own pattern here, where the real total is known, so the
   next card style that slips past it fails the suite instead of quietly
   under-reporting. Keep this pattern identical to the one in build.ps1. */
{
  const BUILD_PATTERN = /[\{,]\s*"?term"?\s*:/g;
  const counted = (decksSrc.match(BUILD_PATTERN) || []).length;
  const bootstrapped = boot(decksSrc, srcInline[0], 'count');
  const actual = bootstrapped.DECKS.reduce((n, d) => n + (d.cards || []).length, 0);
  check('build.ps1 counts every card', counted === actual,
        `build.ps1 would report ${counted}, decks actually hold ${actual} — update the regex in build.ps1 AND here`);
}

/* The bundle is what actually gets served — test it too, and confirm it is not
   stale, since forgetting to run build.ps1 would silently ship old code. */
const bundlePath = path.join(ROOT, 'docs', 'index.html');
if (!fs.existsSync(bundlePath)) {
  check('docs/index.html exists (run build.ps1)', false, 'bundle missing');
} else {
  const bundle = read('docs/index.html');
  const parts = inlineScripts(bundle);
  check('docs/index.html has two inline scripts', parts.length === 2, `found ${parts.length}`);
  if (parts.length === 2) suite(boot(parts[0], parts[1], 'bundle'), 'bundle', bundle);
  heartGeometry(bundle, 'bundle');

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
