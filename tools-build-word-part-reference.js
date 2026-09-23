/* Build the standing word-part reference for Medical Terminology.

   Word parts are the one thing in this course that does not retire: Chapter 4
   leans on Chapter 3's myel/o, and -desis turns up in arthrodesis and tenodesis
   a chapter apart. But 81% of them were reachable only by opening a past
   chapter's chip, because the shelving is chronological and the material is
   cumulative.

   The three decks here are GENERATED from the chapter decks, never hand-typed,
   so the chapter decks stay the single source of truth and nothing retired has
   to be edited to keep this current. A test re-runs this logic and fails if the
   two ever drift. Adding Chapter 5 later means re-running this file. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
/* Relative to this file, so the tool travels with the folder rather than
   depending on one machine's absolute path. */
const FILE = path.join(__dirname, 'decks.js');

const raw = fs.readFileSync(FILE, 'utf8');
const NL = raw.includes('\r\n') ? '\r\n' : '\n';
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(raw, ctx);

const REF_IDS = ['mtref-prefixes', 'mtref-roots', 'mtref-suffixes'];

/* ------------------------------------------------------------------ extract */
/* Shared with the test, so the two cannot disagree about what a part is. */
const isPart = t => /^-|-$|\//.test(t);
const kindOf = p => p.startsWith('-') ? 'suffix' : p.endsWith('-') ? 'prefix' : 'root';

function harvest(DECKS) {
  const decks = DECKS
    .filter(d => d.course.startsWith('M159') && !REF_IDS.includes(d.id))
    .sort((a, b) => (a.added || '').localeCompare(b.added || ''));   /* course order */
  const found = new Map();
  for (const d of decks) {
    for (const card of d.cards) {
      if (card.fact || !isPart(card.term)) continue;
      for (const p of card.term.split(',').map(x => x.trim()).filter(Boolean)) {
        if (!found.has(p)) found.set(p, []);
        found.get(p).push({ chapter: d.group, def: card.def });
      }
    }
  }
  return found;
}

/* ------------------------------------------------------------------ resolve */
/* Eighteen parts appear in more than one chapter and seven of those disagree.
   A blanket "latest chapter wins" rule is wrong in both directions here — it
   would take Chapter 4's bare "two" over Chapter 1's fuller "two, both sides",
   and Chapter 4's deliberately roundabout wording for ten/o over the plain
   "tendon". The chapter decks avoid putting a term's own word in its
   definition because the suite checks for it; a lookup table has no such
   problem and reads better without the circumlocution.

   So the seven are settled by hand and written down, rather than left to a
   rule that silently picks the worse one. */
const OVERRIDE = {
  'melan/o': 'black, dark',
  'myel/o' : 'bone marrow, and also spinal cord',
  'ten/o'  : 'tendon',
  '-cyte'  : 'cell',
  '-ic'    : 'pertaining to',
  'bi-'    : 'two, both sides',
  'dys-'   : 'bad, difficult, painful or abnormal',
  /* Both readings are correct and the chapters each teach one; the reference
     carries both rather than making a lookup pick a side. */
  'hypo-'  : 'below, deficient or decreased',
  '-pathy' : 'disease, suffering, feeling, emotion',

  /* Chapter 7 (2026-09-23) reworded eight parts Chapter 1 had already taught.
     Chapter 1 is retired and frozen, so the disagreement can only be settled
     here. Left to the fallback, "last chapter wins" would have quietly traded
     Chapter 1's fuller reading of -graphy and hyper- for a thinner one, which
     is the exact failure this table exists to prevent. The other six take
     Chapter 7's wording because it is the better of the two. */
  'pneum/o' : 'lung or air',
  '-dynia'  : 'pain',
  '-graphy' : 'the process of producing a picture or record',
  '-ostomy' : 'the surgical creation of an artificial opening',
  '-otomy'  : 'a surgical incision, a cutting into',
  '-rrhea'  : 'abnormal flow or discharge',
  '-scopy'  : 'direct visual examination',
  'hyper-'  : 'excessive or increased'
};

function resolve(found) {
  const out = [], conflicts = [];
  for (const [part, uses] of found) {
    const defs = [...new Set(uses.map(u => u.def))];
    let def;
    if (OVERRIDE[part]) def = OVERRIDE[part];
    else if (defs.length === 1) def = defs[0];
    else { conflicts.push({ part, defs }); def = uses[uses.length - 1].def; }
    out.push({ part, def, kind: kindOf(part), first: uses[0].chapter, seen: uses.length });
  }
  return { entries: out, conflicts };
}

/* An override that no longer matches anything means a chapter deck was reworded
   underneath us and the hand-made decision is now stale and invisible. */
function auditOverrides(found) {
  const stale = Object.keys(OVERRIDE).filter(p => {
    const uses = found.get(p);
    if (!uses) return true;
    return [...new Set(uses.map(u => u.def))].length < 2;
  });
  return stale;
}

/* -------------------------------------------------------------------- build */
const sortKey = p => p.replace(/^-|-$/, '').toLowerCase();
const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const META = {
  prefix: { id: 'mtref-prefixes', title: 'Word Parts — Prefixes',
    blurb: 'Every prefix taught so far, from all chapters' },
  root:   { id: 'mtref-roots',    title: 'Word Parts — Roots',
    blurb: 'Every combining form taught so far, from all chapters' },
  suffix: { id: 'mtref-suffixes', title: 'Word Parts — Suffixes',
    blurb: 'Every suffix taught so far, from all chapters' }
};

/* The term the reference belongs to is taken from the decks it was harvested
   from rather than hard-coded, so this keeps working when the course moves to a
   later term. Emitting it at all is the other half of the 2026-09-23 bug: the
   field was added to the data after this generator was written, so a rebuild
   silently produced three decks with no termNo and the term checks failed. */
function termOfCourse(DECKS) {
  const terms = DECKS
    .filter(d => d.course.startsWith('M159') && !REF_IDS.includes(d.id))
    .map(d => d.termNo)
    .filter(t => t != null);
  if (!terms.length) throw new Error('no M159 chapter deck declares a termNo');
  return Math.max(...terms);
}

function renderDeck(kind, entries, termNo) {
  const m = META[kind];
  const rows = entries
    .filter(e => e.kind === kind)
    .sort((a, b) => sortKey(a.part).localeCompare(sortKey(b.part)));
  const cards = rows.map(e => `    { term: '${esc(e.part)}', def: '${esc(e.def)}' }`);
  return [
    '{',
    `  id: '${m.id}',`,
    '  reference: true,',
    `  added: '2026-08-20',`,
    `  termNo: ${termNo},`,
    `  course: 'M159 · Medical Terminology 1',`,
    `  title: '${m.title}',`,
    `  source: '${m.blurb}',`,
    '  cards: [',
    cards.join(',' + NL),
    '  ]',
    '},'
  ].join(NL);
}

/* --------------------------------------------------------------------- main */
const found = harvest(ctx.window.DECKS);
const stale = auditOverrides(found);
if (stale.length) throw new Error('override no longer resolves a real conflict: ' + stale.join(', '));

const { entries, conflicts } = resolve(found);
console.log('parts harvested :', entries.length);
for (const k of ['prefix', 'root', 'suffix'])
  console.log(`  ${k.padEnd(7)}: ${entries.filter(e => e.kind === k).length}`);
console.log('hand-resolved   :', Object.keys(OVERRIDE).length);
console.log('unresolved      :', conflicts.length, conflicts.map(c => c.part).join(' ') || '(none)');

/* Strip any previous run before inserting, so this is safe to re-run.

   This is the part that bit. It used to find the deck by searching BACKWARDS
   for the nearest '{' and forwards for the next line-initial '},', then resume
   at `close + NL.length + 3 + NL.length`. The span actually removed is NL + '}'
   + ',' — NL.length + 2 characters — so the +3 swallowed one character too
   many, and that character was the '{' opening the next deck. The next pass
   then found no '{' where it expected one, walked backwards into the PREVIOUS
   deck's cards, and deleted from the middle of that deck to the end of this
   one. On 2026-09-23 it took the tail of mt4-guide with it and left the file
   unparseable, then crashed on its own re-read pointing hundreds of lines away.

   It never fired on the first build, because there was nothing to strip.

   Anchoring on the whole opening line instead removes the backwards search, so
   nothing depends on a brace that a previous pass may already have eaten. */
function stripDeck(text, id) {
  const head = `{${NL}  id: '${id}',`;
  const open = text.indexOf(head);
  if (open < 0) return text;                       /* not present yet */
  const close = text.indexOf(`${NL}},`, open);
  if (close < 0) throw new Error(`unterminated deck ${id} — refusing to guess`);
  /* NL + '}' + ',' is what closes it; take the newline after it too */
  let after = close + NL.length + 2;
  if (text.startsWith(NL, after)) after += NL.length;
  return text.slice(0, open) + text.slice(after);
}

let s = raw;
for (const id of REF_IDS) s = stripDeck(s, id);

const termNo = termOfCourse(ctx.window.DECKS);
const block = ['prefix', 'root', 'suffix'].map(k => renderDeck(k, entries, termNo)).join(NL);
const end = s.lastIndexOf('];');
s = s.slice(0, end) + block + NL + s.slice(end);

/* Prove the result before it reaches disk. The old version validated only
   AFTER writing, so the first thing it did on a bad edit was destroy the file
   and then report the damage as if it had found it. */
function parseOrThrow(text, label) {
  const c = { window: {} };
  vm.createContext(c);
  try { vm.runInContext(text, c); }
  catch (e) { throw new Error(`${label} does not parse: ${e.message}`); }
  const decks = c.window.DECKS;
  if (!Array.isArray(decks)) throw new Error(`${label} produced no DECKS array`);
  return decks;
}

const before = parseOrThrow(raw, 'the file as read');
const after = parseOrThrow(s, 'the rewritten file');

const ids = after.map(d => d.id);
const dupes = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dupes.length) throw new Error('duplicate deck ids after rewrite: ' + [...new Set(dupes)].join(', '));

/* Every deck that was there before, other than the three being replaced, has
   to still be there with the same number of cards. This is the check that would
   have caught mt4-guide losing its tail. */
/* Not every deck has cards — the dosage deck carries `dose` instead. */
const nCards = d => (d.cards || []).length;
const kept = new Map(before.filter(d => !REF_IDS.includes(d.id)).map(d => [d.id, nCards(d)]));
for (const [id, n] of kept) {
  const now = after.find(d => d.id === id);
  if (!now) throw new Error(`rewrite lost deck ${id}`);
  if (nCards(now) !== n) throw new Error(`rewrite changed ${id}: ${n} cards before, ${nCards(now)} after`);
}
if (after.length !== kept.size + REF_IDS.length)
  throw new Error(`expected ${kept.size + REF_IDS.length} decks, got ${after.length}`);

fs.writeFileSync(FILE, s);
console.log(`untouched decks intact : ${kept.size}`);

/* ----------------------------------------------------------------- validate */
const c2 = { window: {} };
vm.createContext(c2);
vm.runInContext(fs.readFileSync(FILE, 'utf8'), c2);
let total = 0;
for (const id of REF_IDS) {
  const d = c2.window.DECKS.find(x => x.id === id);
  if (!d) throw new Error('missing ' + id);
  if (d.cards.some(x => !x || !x.term || !x.def)) throw new Error('bad card in ' + id);
  if (!d.reference) throw new Error('reference flag missing on ' + id);
  const dupes = d.cards.map(x => x.term).filter((t, i, a) => a.indexOf(t) !== i);
  if (dupes.length) throw new Error('duplicate parts in ' + id + ': ' + dupes.join(', '));
  total += d.cards.length;
  console.log(`${id}: ${d.cards.length} cards`);
}
console.log('reference total :', total);
if (total !== entries.length) throw new Error('emitted ' + total + ' but harvested ' + entries.length);
console.log('every harvested part is present exactly once');
