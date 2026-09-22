/*  Audit the SHAPE of multiple-choice options.
    ---------------------------------------------------------------------------
    Run it after writing questions, before committing:

        node tools-audit-choices.js                 # every deck
        node tools-audit-choices.js mp52-lab        # one deck, or a comma list

    A good distractor is a SIBLING of the answer: the same kind of thing, drawn
    from the same closed set, so it is only wrong if you know the material. A
    distractor that can be eliminated without knowing anything has given the
    question away. Three failures are mechanical enough to catch here:

      catchall  "All three", "None of them", "It does not matter". Never a
                sibling — a different kind of claim altogether, and one fact is
                enough to strike it out.
      shape     The answer is a measurement and an option is not, or the other
                way round. The odd one out is visible without reading it.
      outlier   The answer is far longer than every distractor. The most
                qualified option reads as the careful one and gets picked.

    Known backlog: decks written before this existed carry flags. The rule is
    that the count goes DOWN, never up, and that finished chapters are left
    alone — see the archive-drawer and finished-chapters rules. Fix a deck when
    it comes back into use, not because the auditor is noisy.
*/
const path = require('path');
const ROOT = __dirname;
global.window = {};
require(path.join(ROOT, 'decks.js'));
const DECKS = window.DECKS;

const only = (process.argv[2] || '').split(',').map(s => s.trim()).filter(Boolean);

/* A catch-all is a claim ABOUT the option set rather than a member of it. */
const CATCHALL = /^(all|none|any|both|neither|nothing|either)\b|^it does not matter$/i;
const HAS_DIGIT = /\d/;
const words = s => String(s).trim().split(/\s+/).length;

const rows = [];
for (const d of DECKS) {
  if (only.length && !only.includes(d.id)) continue;
  (d.questions || []).forEach((q, qi) => {
    const ch = q.choices || [];
    if (ch.length < 2) return;
    const ans = ch[q.answer];
    const others = ch.filter((_, i) => i !== q.answer);
    const add = (kind, detail) => rows.push({ id: d.id, qi, kind, detail, q: q.q, ch, ans });

    ch.forEach(c => { if (CATCHALL.test(String(c).trim())) add('catchall', `"${c}"`); });

    const valued = HAS_DIGIT.test(ans);
    const odd = ch.filter(c => HAS_DIGIT.test(c) !== valued);
    if (odd.length)
      add('shape', `answer ${valued ? 'carries a value' : 'carries no value'}, ${odd.length} option(s) differ: ` +
                   odd.map(o => `"${o}"`).join(', '));

    const longest = Math.max(...others.map(words));
    if (words(ans) >= 2 * longest && words(ans) - longest >= 3)
      add('outlier', `answer is ${words(ans)} words, longest distractor ${longest}`);
  });
}

const byKind = {};
rows.forEach(r => (byKind[r.kind] = (byKind[r.kind] || 0) + 1));
const byDeck = {};
rows.forEach(r => (byDeck[r.id] = (byDeck[r.id] || 0) + 1));

let last = '';
for (const r of rows) {
  const key = r.id + '#' + r.qi;
  if (key !== last) {
    console.log(`\n[${r.id}] ${String(r.q).replace(/<[^>]+>/g, '')}`);
    console.log('   ' + r.ch.map(c => (c === r.ans ? '*' : ' ') + c).join(' | '));
    last = key;
  }
  console.log(`   ${r.kind.toUpperCase()}: ${r.detail}`);
}

const asked = DECKS.filter(d => !only.length || only.includes(d.id))
                   .reduce((a, d) => a + (d.questions || []).length, 0);
console.log(`\n${rows.length} flag(s) over ${asked} hand-written question(s)`);
console.log('by kind: ' + JSON.stringify(byKind));
console.log('decks affected: ' + Object.keys(byDeck).length);
process.exit(rows.length ? 1 : 0);
