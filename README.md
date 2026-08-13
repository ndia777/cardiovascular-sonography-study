# Study Guides

An offline study app built from the notes in `../Notes`. Nothing in your notes
folder was read-only-touched — this folder is completely separate, and the app
never reads or writes your notes.

## Opening it

Double-click **`index.html`**. It runs in any browser with no internet
connection, no install, and no server. You can bookmark it, and it works on a
phone if you sync the folder.

## The six modes

| Mode | What it does |
| --- | --- |
| **Recall — Type It In** | Shows a definition, you type the term. Marked right or wrong immediately, with a running tally. Missed cards come back later in the session. |
| **Flashcards** | Classic flip cards you grade yourself, with a live count of what you've got and what still needs work. |
| **Multiple Choice** | 20 questions mixing hand-written concept questions with term questions generated from the deck. Explains why after each answer. |
| **Matching** | Six term/definition pairs at a time, against the clock. |
| **Place the Leads** | *(EKG leads deck only)* Click where each V lead goes on the chest. Shows the anatomical landmark after each answer. |
| **Review Sheet** | The whole deck as a table, with a filter box and a button to hide the definitions for self-testing. |

Your best scores are saved in the browser, so decks show what you've already
done. Clearing browser data resets them.

### Keyboard shortcuts

- **Recall** — `Enter` to check, `Enter` again for the next card
- **Flashcards** — `Space` to flip, then `1` = Again, `2` = Got it
- **Multiple choice** — `1`–`4` or `A`–`D` to answer, `Enter` for the next question
- **Anywhere** — `Esc` to back out

### How Recall grades spelling

**Every letter has to be right.** There is no typo tolerance — a single wrong
letter is marked wrong, and you'll see what you typed next to the correct
spelling so you can spot where it diverged. This is deliberate: in medical
terminology one or two letters is the difference between `hyper-` and `hypo-`,
or `-ostomy` and `-otomy`, and spelling is graded.

What it *does* ignore is notation rather than spelling — capitalization, spaces,
and the punctuation in combining forms. So `abdomin/o`, `Abdomino` and
`abdomin o` all pass, and `-algia` can be typed with or without the hyphen. The
letters themselves still have to be exact. Where a card lists several acceptable
forms (`-ac, -al, -ar`), any one of them counts.

## Adding your own material

Everything you'd edit is in **`decks.js`**, and nothing else needs to change —
the app picks up new decks on refresh. Copy an existing deck and swap the
contents:

```js
{
  id: 'mt1-ch3',                      // unique; also the key your scores save under
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 3 — Suffixes',
  source: 'Notes/TERM 1/.../Chapter 3.md',
  cards: [
    { term: 'cardi/o', def: 'heart' },
    { term: 'pleur/o', def: 'pleura', note: 'Optional footnote shown after you answer.' }
  ],
  questions: [                        // optional — for concepts, not term/definition
    { q: 'Which chamber ...?',
      choices: ['Left ventricle', 'Right atrium', 'Left atrium', 'Right ventricle'],
      answer: 0,                      // index of the correct choice
      why: 'Optional explanation shown after answering.' }
  ]
}
```

Only `id`, `course`, `title` and `cards` are required. `questions` is for things
multiple choice can't generate on its own — reasoning, ordering, "which is true"
— since the app already generates term questions from `cards` automatically.

A few things that make the generated questions better:

- **Write definitions so no two are interchangeable.** The generator refuses to
  use a wrong answer whose definition overlaps the right one, so
  near-identical definitions just mean fewer questions get generated.
- **Put the contrast in the definition itself** where two terms are easily
  confused — the way `hyperplasia` says "an increase in the NUMBER of cells" and
  `hypertrophy` says "an increase in BULK."
- **List alternates with commas** (`'-ac, -al, -ar'`) — Recall accepts any one of
  them.

Just tell me the chapter and I can add it for you.

## Tests

```
node test/app.test.js
```

No dependencies — plain Node. It loads the real engine into a stubbed DOM and
checks that every deck and mode renders, that generated questions never repeat
or reuse an interchangeable answer choice, that a quiz never asks about the same
card twice, that spelling is still graded strictly, that playthroughs terminate,
and that `docs/index.html` is up to date with the source.

The same suite runs on every push via GitHub Actions, so a malformed deck fails
CI instead of reaching anyone. If it complains the bundle is stale, run
`build.ps1` and commit `docs/index.html`.

## Sharing it with classmates

`build.ps1` bundles `index.html` + `decks.js` into a single self-contained file
at `docs/index.html`. Right-click `build.ps1` → **Run with PowerShell**, or:

```
powershell -ExecutionPolicy Bypass -File build.ps1
```

That one file *is* the whole app — no other files, no internet, no install.
Re-run it after every change to `decks.js`.

### Option A — just send the file (no account needed)

Email `docs/index.html`, drop it in the group chat, or put it on Google Drive.
They save it and double-click. Works offline forever.

Downside: when you add decks, everyone needs the new file.

### Option B — one link that stays current

Published with GitHub Pages, serving the bundled file from `/docs`. Every update
is three commands:

```
powershell -ExecutionPolicy Bypass -File build.ps1
git commit -am "Add Chapter 3 decks"
git push
```

Everyone's bookmark shows the new version on their next refresh. It works on
phones, and their saved scores survive updates because progress is stored per
deck id.

### Notes on the repo

- The repo covers **only this folder**. The course notes vault sits outside it
  and cannot be published by accident.
- `Notes Check.md` is gitignored on purpose — see the comment in `.gitignore`.
- Commits are authored by the GitHub username with a `users.noreply.github.com`
  address, so no personal email or real name appears in the public history.
- To undo all of this: delete the `.git` folder.

## Credits

Almost everything here is original: the engine, the decks, the ECG tracings and
the heartbeat animation are all written or drawn from scratch, and every
definition is worded independently of the textbooks and lecture slides the facts
came from.

Three pieces are not — all anatomical diagrams, all from Wikimedia Commons:

> **Heart diagram** — *"Diagram of the human heart (clean)"* by **Wnauta**, after
> **Wapcaplet**, from
> [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(clean).svg),
> used under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
> Changes: the XML prolog, editor metadata and fixed pixel dimensions were
> stripped and a viewBox added so it scales. The artwork itself is unaltered;
> the labels in the app are ours.
>
> That figure remains under CC BY-SA 3.0. The credit also appears on screen
> beneath the diagram wherever it is shown.

> **Cell diagram** — *"Animal cell structure no text"* by **LadyofHats**
> (Mariana Ruiz), from
> [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Animal_cell_structure_no_text.svg),
> released into the **public domain**. Changes: editor metadata and fixed pixel
> dimensions stripped, and the viewBox tightened to the drawing so it fills the
> space instead of floating in a wide margin. The artwork itself is unaltered;
> the labels in the app are ours.
>
> Public domain means nothing is owed here — the credit is courtesy, and it
> appears on screen beneath the diagram too. It was picked over better-looking
> candidates because it is genuinely unlabelled, which a mode about naming the
> parts requires.

> **Skin diagram** — *"Human skin structure"* by **Tomáš Kebert & umimeto.org**,
> from
> [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Human_skin_structure.svg),
> used under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
> Changes: the two label layers were removed, the drawing cropped to the block
> itself, and coordinates rounded from six decimal places to two — invisible at
> this size, and it halved the file. The artwork itself is unaltered; the labels
> in the app are ours.
>
> That figure remains under CC BY-SA 4.0, and the credit appears on screen
> beneath the diagram as well as here.

## Also here

- **`Notes Check.md`** — spots where the source notes disagree with the standard,
  and what the app teaches instead. Worth a read before your next exam.
