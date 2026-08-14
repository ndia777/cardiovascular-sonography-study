/* ============================================================================
   DECK DATA  —  Cardiovascular Sonography study app
   ----------------------------------------------------------------------------
   Every deck is one object in the DECKS array. To add material, copy an
   existing deck, change the id/title, and swap the cards. Nothing else to do —
   the app picks it up automatically on refresh.

     id        unique slug (used to save your progress in the browser)
     course    shown as the small label above the deck title
     title     deck name
     source    which note file it came from (shown in Browse mode)
     cards     [{ term, def, note? }]   note = optional footnote / correction
     questions [{ q, choices[], answer (index), why? }]  optional written Qs
                (multiple choice is also auto-generated from the cards, so
                 `questions` is only for concepts that aren't term/definition)
   ========================================================================== */

window.DECKS = [

/* ─────────────────────────  M159 · MEDICAL TERMINOLOGY 1  ───────────────── */

{
  id: 'mt1-roots',
  group: 'Chapter 1',

  added: '2026-07-29',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Word Roots',
  source: 'Chapter 1 — course notes',
  cards: [
    { term: 'abdomin/o', def: 'abdomen' },
    { term: 'angi/o',    def: 'blood vessel' },
    { term: 'arteri/o',  def: 'artery',
      note: 'Do not mix up with cardi/o (heart). arteri/o is the root behind arteriosclerosis and endarterial.' },
    { term: 'arthr/o',   def: 'joint' },
    { term: 'cardi/o',   def: 'heart' },
    { term: 'cyan/o',    def: 'blue' },
    { term: 'crani/o',   def: 'skull' },
    { term: 'dermat/o',  def: 'skin' },
    { term: 'enter/o',   def: 'small intestine' },
    { term: 'erythr/o',  def: 'red' },
    { term: 'gastr/o',   def: 'stomach' },
    { term: 'hem/o',     def: 'blood' },
    { term: 'hepat/o',   def: 'liver' },
    { term: 'leuk/o',    def: 'white' },
    { term: 'melan/o',   def: 'black' },
    { term: 'my/o',      def: 'muscle' },
    { term: 'myel/o',    def: 'spinal cord' },
    { term: 'neur/o',    def: 'nerve' },
    { term: 'oste/o',    def: 'bone' },
    { term: 'ot/o',      def: 'ear' },
    { term: 'pneum/o',   def: 'air or lung' },
    { term: 'poli/o',    def: 'gray' },
    { term: 'pulmon/o',  def: 'lung',
      note: 'pneumon/o and pulmon/o both mean lung — a good example of two roots sharing one meaning.' },
    { term: 'ten/o',     def: 'tendon' },
    { term: 'thorac/o',  def: 'chest' },
    { term: 'tonsill/o', def: 'tonsils' }
  ],
  questions: [
    { q: 'Which statement about word roots is TRUE?',
      choices: [
        'A root cannot stand alone — a suffix must always be added to complete the term',
        'A root can never take a prefix',
        'Every medical term has exactly one root',
        'Roots are always placed at the end of a term'
      ], answer: 0,
      why: 'Roots carry the core meaning but are never a complete term by themselves. A term may also have more than one root (gastr/o + enter/o).' },

    { q: 'Break down hemopneumothorax. What does it describe?',
      choices: [
        'Air or blood in the space surrounding the lungs in the chest',
        'Bleeding into the stomach lining',
        'Inflammation of the chest wall muscles',
        'A collapsed lung caused by infection'
      ], answer: 0,
      why: 'hem = blood, pneum = air/lung, thorac = chest.' },

    { q: 'When two word roots are joined, where does the combining vowel go?',
      choices: [
        'Always after the first root; after the second root only if the suffix starts with a consonant',
        'Always after both roots',
        'Never — combining vowels only attach to prefixes',
        'Only after the second root'
      ], answer: 0,
      why: 'gastr/o/enter/itis — the "o" stays after gastr because two roots are joined, but no vowel after enter because -itis begins with a vowel.' },

    { q: 'What is a "combining form"?',
      choices: [
        'A word root plus a combining vowel (usually o), e.g. pneum/o',
        'A prefix plus a suffix with no root',
        'Two suffixes joined together',
        'A term built from a person’s name'
      ], answer: 0 },

    { q: 'When taking an unfamiliar medical term apart, where do you start?',
      choices: [
        'At the end of the word — the suffix — and work toward the beginning',
        'At the beginning — the prefix — and work toward the end',
        'At the root in the middle, then move outward',
        'Alphabetically, by looking up each letter'
      ], answer: 0 },

    { q: 'Alzheimer’s disease is an example of what kind of term?',
      choices: [
        'An eponym — named for a person',
        'A unique medical term that cannot be broken into elements',
        'A combining form',
        'An adjectival suffix'
      ], answer: 0,
      why: 'Contrast with "unique" terms like virus or toxin, which are solid words that simply cannot be broken into elements.' }
  ]
},

{
  id: 'mt1-suffixes',
  group: 'Chapter 1',

  added: '2026-07-29',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Suffixes',
  source: 'Chapter 1 — course notes',
  cards: [
    { term: '-algia',     def: 'pain / suffering' },
    { term: '-dynia',     def: 'pain (second form)' },
    { term: '-centesis',  def: 'surgical puncture to remove fluid' },
    { term: '-cyte',      def: 'cell' },
    { term: '-ectomy',    def: 'surgical removal' },
    { term: '-gram',      def: 'picture or record' },
    { term: '-graph',     def: 'instrument used to record' },
    { term: '-graphy',    def: 'process of producing a picture or record' },
    { term: '-iatry',     def: 'treatment, medical specialty' },
    { term: '-itis',      def: 'inflammation' },
    { term: '-malacia',   def: 'abnormal softening' },
    { term: '-megaly',    def: 'enlargement' },
    { term: '-necrosis',  def: 'tissue death' },
    { term: '-osis',      def: 'abnormal condition or disease' },
    { term: '-ostomy',    def: 'create an artificial opening' },
    { term: '-otomy',     def: 'cut or make a surgical incision' },
    { term: '-plasty',    def: 'surgical repair' },
    { term: '-rrhage',    def: 'abnormal excessive fluid discharge' },
    { term: '-rrhagia',   def: 'sudden severe bleeding' },
    { term: '-rrhaphy',   def: 'surgical suturing' },
    { term: '-rrhea',     def: 'flow or discharge' },
    { term: '-sclerosis', def: 'abnormal hardening' },
    { term: '-scopy',     def: 'visual examination' },
    { term: '-stenosis',  def: 'abnormal narrowing' },
    { term: '-ac, -al, -ar, -ary, -ic, -ous', def: 'pertaining to (adjectival suffixes)',
      note: 'There are 28 of these. Full list: -ac, -al, -an, -ar, -ary, -eal, -ical, -ial, -ic, -ine, -ior, -ory, -ous, -tic.' },
    { term: '-a, -um, -y, -e, -us', def: 'noun endings (turn the root into a noun)',
      note: 'e.g. crani- (skull) + -um = cranium.' }
  ],
  questions: [
    { q: 'A suffix that produces a term describing a symptom or SIGN of a disease process is classified as:',
      choices: ['Pathologic', 'Diagnostic', 'Surgical', 'Adjectival'], answer: 0,
      why: 'path = disease. Arthralgia and tonsillitis are pathologic-suffix terms. Diagnostic suffixes name a test or procedure that identifies illness; surgical suffixes name an invasive procedure.' },

    { q: 'Cardiograph uses which type of suffix?',
      choices: ['Diagnostic', 'Pathologic', 'Surgical', 'Noun'], answer: 0,
      why: 'A cardiograph is the instrument used to record heart activity — it identifies the nature of an illness, so the suffix is diagnostic.' },

    { q: 'The "Double R" suffixes (-rrhage, -rrhagia, -rrhaphy, -rrhea) come from which language?',
      choices: ['Greek', 'Latin', 'Arabic', 'Old English'], answer: 0,
      why: 'Most medical terms derive from Greek and Latin; the Double R suffixes are specifically Greek rather than Latin in origin.' },

    { q: 'Which pair correctly contrasts -ostomy and -otomy?',
      choices: [
        '-ostomy creates an artificial opening; -otomy is simply a cut or incision',
        '-ostomy is an incision; -otomy creates a permanent opening',
        'Both mean surgical removal',
        '-ostomy removes fluid; -otomy repairs tissue'
      ], answer: 0,
      why: 'Colostomy = an artificial opening between colon and body surface. The extra "s" is the one to watch on an exam.' },

    { q: 'Which term means "abnormal narrowing"?',
      choices: ['-stenosis', '-sclerosis', '-malacia', '-necrosis'], answer: 0,
      why: 'Worth locking in for sonography: aortic stenosis = narrowed valve, atherosclerosis = hardening.' }
  ]
},

{
  id: 'mt1-prefixes',
  group: 'Chapter 1',

  added: '2026-07-29',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Prefixes',
  source: 'Chapter 1 — course notes',
  cards: [
    { term: 'ab-',            def: 'away from, negative, absent' },
    { term: 'ad-',            def: 'toward, to, in the direction of' },
    { term: 'bi-',            def: 'two, both sides' },
    { term: 'dextro-',        def: 'right side' },
    { term: 'sinistro-',      def: 'left side' },
    { term: 'dys-',           def: 'bad, difficult or painful' },
    { term: 'eu-',            def: 'good, normal' },
    { term: 'epi-',           def: 'above, over or upon' },
    { term: 'ex-',            def: 'out of, outside, away from' },
    { term: 'in-',            def: 'in, into, not, without' },
    { term: 'hyper-',         def: 'excessive or increased' },
    { term: 'hypo-',          def: 'deficient or decreased' },
    { term: 'inter-',         def: 'between or among' },
    { term: 'intra-',         def: 'within or inside' },
    { term: 'macro-',         def: 'large, abnormal size or long' },
    { term: 'micro-',         def: 'small' },
    { term: 'mega-, megalo-', def: 'large, great' },
    { term: 'oligo-',         def: 'scanty, few' },
    { term: 'peri-',          def: 'around, surrounding' },
    { term: 'pre-',           def: 'before' },
    { term: 'post-',          def: 'after, behind' },
    { term: 'sub-',           def: 'under, less or below' },
    { term: 'super-, supra-', def: 'above or excessive' }
  ],
  questions: [
    { q: 'Which is TRUE of prefixes?',
      choices: [
        'They attach to the beginning of a root and do not require a combining vowel',
        'Every medical term must contain one',
        'They always indicate a body part',
        'They require a combining vowel just as roots do'
      ], answer: 0,
      why: 'Not all terms have a prefix — but changing the prefix changes the meaning of the whole term (hypertension vs. hypotension).' },

    { q: 'Abduction means:',
      choices: [
        'Movement away from the midline',
        'Movement toward the midline',
        'Rotation of the forearm so the palm faces up',
        'Movement between two joints'
      ], answer: 0,
      why: 'ab- = away from. Its opposite, adduction (ad- = toward), ADDs the limb back to the body.' },

    { q: 'Perinatal refers to the time:',
      choices: [
        'Just before, during, and right after birth',
        'The first year after birth only',
        'The entire pregnancy up to delivery',
        'Any time after infancy'
      ], answer: 0 },

    { q: 'A patient chart says the finding is "supracostal." Where is it?',
      choices: ['Above or outside the ribs', 'Below the ribs', 'Between the ribs', 'Behind the sternum'], answer: 0,
      why: 'supra- = above; cost/o = rib. Compare intercostal (between the ribs) — the space you count for V1 and V2 electrodes.' }
  ]
},

{
  id: 'mt1-terms',
  group: 'Chapter 1',

  added: '2026-07-29',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Medical Terms',
  source: 'Chapter 1 — course notes',
  cards: [
    { term: 'abdominocentesis', def: 'surgical puncture of the abdominal cavity to remove fluid' },
    { term: 'acute',            def: 'a condition with rapid onset, severe course and relatively short duration' },
    { term: 'angiography',      def: 'x-ray study of the blood vessels after injection of a contrast medium',
      note: 'angi/o means vessel and -graphy means the process of recording.' },
    { term: 'appendectomy',     def: 'surgical removal of the appendix' },
    { term: 'arteriosclerosis', def: 'abnormal hardening of the walls of an artery' },
    { term: 'arthralgia',       def: 'pain in a joint' },
    { term: 'colostomy',        def: 'surgical creation of an artificial opening between the colon and the body surface' },
    { term: 'cyanosis',         def: 'blue discoloration of the skin caused by a lack of adequate oxygen in the blood' },
    { term: 'dermatologist',    def: 'a physician who specializes in diagnosing and treating disorders of the skin' },
    { term: 'diagnosis',        def: 'the identification of a disease' },
    { term: 'diarrhea',         def: 'the frequent flow of loose or watery stools' },
    { term: 'edema',            def: 'swelling caused by abnormal accumulation of fluid in cells, tissues or body cavities' },
    { term: 'endarterial',      def: 'pertaining to the interior or lining of an artery' },
    { term: 'eponym',           def: 'a disease, structure, operation or procedure named for the person who first described it' },
    { term: 'erythrocyte',      def: 'a mature red blood cell' },
    { term: 'fissure',          def: 'a groove or crack-like sore of the skin; also the normal folds in the contours of the brain' },
    { term: 'fistula',          def: 'an abnormal passage between two internal organs, or from an organ to the body surface' },
    { term: 'gastralgia',       def: 'pain in the stomach' },
    { term: 'gastritis',        def: 'inflammation of the stomach lining' },
    { term: 'gastroenteritis',  def: 'inflammation of the stomach and small intestine' },
    { term: 'gastrosis',        def: 'any disease of the stomach' },
    { term: 'hemorrhage',       def: 'the loss of a large amount of blood in a short time' },
    { term: 'hepatomegaly',     def: 'abnormal enlargement of the liver' },
    { term: 'hypertension',     def: 'higher than normal blood pressure' },
    { term: 'hypotension',      def: 'lower than normal blood pressure' },
    { term: 'infection',        def: 'invasion of the body by a pathogenic organism' },
    { term: 'inflammation',     def: 'a localized response to injury or to the destruction of tissues' },
    { term: 'interstitial',     def: 'between, but not within, the parts of a tissue' },
    { term: 'intramuscular',    def: 'within the muscle' },
    { term: 'laceration',       def: 'a torn or jagged wound; an accidental cut' },
    { term: 'lesion',           def: 'a pathologic change of tissue due to disease or injury' },
    { term: 'malaise',          def: 'general discomfort or uneasiness, often the first indication of an infection or disease' },
    { term: 'mycosis',          def: 'any abnormal condition or disease caused by a fungus' },
    { term: 'myelopathy',       def: 'any injury, degeneration or disease of the spinal cord' },
    { term: 'myopathy',         def: 'any pathologic change or disease of muscle tissue' },
    { term: 'natal',            def: 'pertaining to birth' },
    { term: 'neonatology',      def: 'the study of disorders of the newborn' },
    { term: 'neurorrhaphy',     def: 'suturing together the ends of a severed nerve' },
    { term: 'otorhinolaryngology', def: 'the study of the ears, nose and throat' },
    { term: 'palpitation',      def: 'a pounding or racing heart' },
    { term: 'pathology',        def: 'the study of all aspects of disease' },
    { term: 'phalanges',        def: 'the bones of the fingers and toes' },
    { term: 'poliomyelitis',    def: 'a viral infection of the gray nerve tissue of the spinal cord' },
    { term: 'prognosis',        def: 'a prediction of the probable course and outcome of a disease' },
    { term: 'pyoderma',         def: 'any acute, inflammatory, pus-forming bacterial skin infection' },
    { term: 'pyrosis',          def: 'discomfort from regurgitation of stomach acid up into the esophagus (heartburn)' },
    { term: 'remission',        def: 'temporary, partial or complete disappearance of symptoms without a cure' },
    { term: 'sign',             def: 'OBJECTIVE evidence of disease — something measurable, e.g. fever' },
    { term: 'symptom',          def: 'SUBJECTIVE evidence of disease — what the patient reports, e.g. pain or headache' },
    { term: 'supination',       def: 'rotating the arm so the palm of the hand is forward or upward' },
    { term: 'suppuration',      def: 'the formation of pus' },
    { term: 'supracostal',      def: 'above or outside the ribs' },
    { term: 'syndrome',         def: 'a set of signs and symptoms that occur together as part of a specific disease process' },
    { term: 'tenorrhaphy',      def: 'surgical suturing of a tendon' },
    { term: 'tonsillitis',      def: 'inflammation of the tonsils' },
    { term: 'trauma',           def: 'a wound or injury' },
    { term: 'triage',           def: 'medical screening of patients to determine relative priority of need and proper place of treatment' },
    { term: 'viral',            def: 'pertaining to a virus' }
  ],
  questions: [
    { q: 'A patient reports a headache and rates it 7/10. The nurse records a temperature of 101.4°F. Which is the SIGN?',
      choices: [
        'The temperature of 101.4°F',
        'The headache',
        'Both are signs',
        'Neither — both are symptoms'
      ], answer: 0,
      why: 'Signs are objective (observable/measurable by someone else). Symptoms are subjective (only the patient experiences them). Pain is the classic symptom; fever is the classic sign.' },

    { q: 'Which pair of terms is correctly matched?',
      choices: [
        'Diagnosis = identifying the disease; Prognosis = predicting its course and outcome',
        'Diagnosis = predicting the outcome; Prognosis = identifying the disease',
        'Both mean the identification of disease',
        'Diagnosis = a set of symptoms; Prognosis = a single symptom'
      ], answer: 0 },

    { q: 'Remission means:',
      choices: [
        'Symptoms have temporarily or completely disappeared, but the disease is not cured',
        'The disease has been permanently cured',
        'The disease has suddenly worsened',
        'The patient has developed a second disease'
      ], answer: 0 },

    { q: 'Which term describes suturing a severed nerve?',
      choices: ['Neurorrhaphy', 'Neuropathy', 'Neurectomy', 'Neurorrhea'], answer: 0,
      why: '-rrhaphy = surgical suturing. Compare tenorrhaphy (suturing a tendon).' },

    { q: 'The plural of "diagnosis" is:',
      choices: ['diagnoses', 'diagnosises', 'diagnosae', 'diagnosi'], answer: 0,
      why: 'Singular -is becomes plural -es. Compare metastasis → metastases.' },

    { q: 'The plural of "alveolus" is:',
      choices: ['alveoli', 'alveolae', 'alveola', 'alveoluses'], answer: 0,
      why: 'Singular -us becomes plural -i (malleolus → malleoli).' },

    { q: 'The plural of "ovum" is:',
      choices: ['ova', 'ovae', 'ovi', 'ovices'], answer: 0,
      why: 'Singular -um becomes plural -a (diverticulum → diverticula). Same rule turns -on into -a: ganglion → ganglia.' },

    { q: 'The plural of "phalanx" is:',
      choices: ['phalanges', 'phalanxes', 'phalangices', 'phalanga'], answer: 0,
      why: 'Singular -nx becomes plural -ges (meninx → meninges).' },

    { q: 'The plural of "appendix" is:',
      choices: ['appendices', 'appendixes', 'appendicae', 'appendica'], answer: 0,
      why: 'Singular -ex or -ix becomes plural -ices (index → indices).' },

    { q: 'The plural of "vertebra" is:',
      choices: ['vertebrae', 'vertebras', 'vertebri', 'vertebrices'], answer: 0,
      why: 'Singular -a becomes plural -ae (bursa → bursae).' }
  ]
},

{
  id: 'mt2-parts',
  group: 'Chapter 2',

  added: '2026-07-29',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 2 — Word Parts (Body Structure)',
  source: 'Chapter 2 — course notes',
  cards: [
    { term: 'end-, endo-', def: 'in, within, inside' },
    { term: 'exo-',        def: 'out of, outside, away from' },
    { term: 'aden/o',      def: 'gland' },
    { term: 'adip/o',      def: 'fat' },
    { term: 'anter/o',     def: 'before, front' },
    { term: 'caud/o',      def: 'lower part of the body, tail' },
    { term: 'cephal/o',    def: 'head' },
    { term: 'cyt/o',       def: 'cell' },
    { term: 'hist/o',      def: 'tissue' },
    { term: 'path/o',      def: 'disease, suffering, feeling, emotion' },
    { term: 'plas/i, plas/o', def: 'development, growth, formation',
      note: 'The root behind aplasia, hyperplasia and dysplasia.' },
    { term: 'poster/o',    def: 'behind, toward the back' },
    { term: '-cyte',       def: 'cell (suffix form)' },
    { term: '-ologist',    def: 'specialist' },
    { term: '-ology',      def: 'the science or study of' },
    { term: '-pathy',      def: 'disease, suffering, feeling, emotion' },
    { term: '-plasia',     def: 'development, growth, formation' },
    { term: '-stasis, -static', def: 'control, maintenance of a constant level' },
    { term: 'ventr/o',   def: 'belly side of the body' },
    { term: 'dors/o',    def: 'back of the body' },
    { term: 'chondr/i',  def: 'cartilage' },
    { term: 'lumb/o',    def: 'lower back' },
    { term: 'ili/o',     def: 'hip bone' },
    { term: 'gastr/o',   def: 'stomach' },
    { term: 'periton/o', def: 'peritoneum' },
    { term: 'home/o',    def: 'constant' },
    { term: 'embry/o',   def: 'fertilized ovum' },
    { term: 'physi/o',   def: 'nature or physical' },
    { term: 'gene',      def: 'producing' },
    { term: 'hypo-',     def: 'below' },
    { term: 'retro-',    def: 'behind' },
    { term: '-ior',      def: 'pertaining to (as in anterior and posterior)' },
    { term: '-eal',      def: 'pertaining to (as in retroperitoneal)' },
    { term: '-plasm',    def: 'formative material of cells' },
    { term: '-tics',     def: 'pertaining to (as in genetics)' }
  ]
},

{
  id: 'mt2-terms',
  group: 'Chapter 2',

  added: '2026-07-29',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 2 — Body Structure & Disease',
  source: 'Chapter 2 — course notes',
  cards: [
    { term: 'anatomy',    def: 'the study of the STRUCTURES of the body' },
    { term: 'physiology', def: 'the study of the FUNCTIONS within the structures of the body' },
    { term: 'pathology',  def: 'the study of disease' },
    { term: 'etiology',   def: 'the study of the CAUSES of diseases or abnormal conditions' },
    { term: 'histology',  def: 'microscopic study of the structure, composition and function of tissues' },
    { term: 'homeostasis',def: 'the processes through which the body maintains a constant internal environment' },
    { term: 'autopsy',    def: 'postmortem examination' },
    { term: 'anomaly',    def: 'a deviation from what is regarded as normal' },
    { term: 'cytoplasm',  def: 'material within the cell membrane that is not part of the nucleus' },
    { term: 'chromosome', def: 'genetic structure located within the nucleus of each cell' },
    { term: 'stem cells', def: 'unspecialized cells able to renew themselves for long periods by cell division' },

    { term: 'anaplasia',   def: 'change in the structure of cells and in their orientation to each other' },
    { term: 'aplasia',     def: 'defective development, or the congenital absence, of an organ or tissue' },
    { term: 'hypoplasia',  def: 'UNDERdevelopment of an organ or tissue, usually from too few cells' },
    { term: 'hyperplasia', def: 'an INCREASE in the NUMBER of cells in a tissue or organ' },
    { term: 'hypertrophy', def: 'a general increase in BULK (size), not cell number' },
    { term: 'dysplasia',   def: 'abnormal development or growth of cells, or abnormal cells within a tissue' },
    { term: 'atresia',     def: 'congenital absence or narrowing of a normal body opening or passage' },

    { term: 'adenoma',        def: 'a BENIGN tumor starting in the epithelial tissue of a gland or gland-like structure' },
    { term: 'adenocarcinoma', def: 'a MALIGNANT tumor originating in the glands that may spread to other parts of the body' },
    { term: 'endocrine glands', def: 'produce hormones and have NO ducts — they secrete directly into the bloodstream' },
    { term: 'exocrine glands',  def: 'secrete chemical substances INTO DUCTS leading to other organs or out of the body' },

    { term: 'congenital disorder', def: 'an abnormal condition that exists at the time of birth' },
    { term: 'genetic disorder',    def: 'a pathological condition caused by an absent or defective gene' },
    { term: 'hemophilia',          def: 'a hereditary bleeding disorder in which a blood-clotting factor is missing' },
    { term: 'functional disorder', def: 'physical symptoms for which no disease or organic cause can be identified' },
    { term: 'idiopathic disease',  def: 'any disease without a known cause' },
    { term: 'iatrogenic illness',  def: 'an unfavorable response DUE TO prescribed medical treatment' },
    { term: 'infectious disease',  def: 'an illness caused by living pathogenic organisms such as bacteria and viruses' },
    { term: 'communicable disease',def: 'a condition transmitted person to person, directly or by contact with contaminated objects' },
    { term: 'nosocomial infection',def: 'a disease acquired in a hospital or clinical setting' },
    { term: 'endemic',             def: 'the ONGOING presence of a disease within a population, group or area' },
    { term: 'epidemic',            def: 'a SUDDEN and widespread outbreak within a specific population group or area' },
    { term: 'pandemic',            def: 'an outbreak occurring over a LARGE GEOGRAPHIC AREA, sometimes worldwide' },
    { term: 'bloodborne transmission',  def: 'the spread of pathogens through infected blood or other body fluids' },
    { term: 'vector-borne transmission',def: 'the spread of disease through blood-sucking vectors' },
    { term: 'syndrome',            def: 'a set of signs and symptoms occurring together as part of a specific disease process' },
    { term: 'geriatrician',        def: 'a physician who specializes in the care of older people' },

    { term: 'anterior',  def: 'situated in the FRONT' },
    { term: 'posterior', def: 'situated in the BACK, or on the back part of the organ' },
    { term: 'ventral',   def: 'the front, or belly side, of the organ or body' },
    { term: 'dorsal',    def: 'the back of the organ or body' },
    { term: 'medial',    def: 'the direction TOWARD or nearer the midline' },
    { term: 'proximal',  def: 'situated NEAREST the midline or beginning of a body structure' },
    { term: 'distal',    def: 'situated FARTHEST from the midline or beginning of a body structure' },
    { term: 'cephalic',  def: 'toward the HEAD' },
    { term: 'caudal',    def: 'toward the LOWER part of the body' },
    { term: 'midsagittal plane', def: 'the midline — the sagittal plane dividing the body into EQUAL left and right halves' },
    { term: 'transverse plane',  def: 'a horizontal plane dividing the body into superior (upper) and inferior (lower) portions' },

    { term: 'thoracic cavity',  def: 'the chest cavity — surrounds and protects the heart and lungs' },
    { term: 'abdominal cavity', def: 'contains the major organs of digestion' },
    { term: 'pelvic cavity',    def: 'the space formed by the hip bones; contains reproductive and excretory organs' },
    { term: 'peritoneum',       def: 'a multilayered membrane that protects and holds the organs in place within the abdominal cavity' },
    { term: 'peritonitis',      def: 'inflammation of the peritoneum' },
    { term: 'retroperitoneal',  def: 'located BEHIND the peritoneum' },
    { term: 'mesentery',        def: 'a fused double layer of parietal peritoneum attaching the intestine to the interior abdominal wall' },
    { term: 'epigastric region',def: 'the region located ABOVE the stomach' },
    { term: 'hypogastric region', def: 'the region located BELOW the stomach' },
    { term: 'inguinal',         def: 'relating to the groin; refers to the entire lower area of the abdomen' },
    { term: 'umbilicus',        def: 'the belly button / navel — marks where the umbilical cord attached before birth' },
    { term: 'anatomical',       def: 'referring to anatomy' },
    { term: 'anatomical position', def: 'standing erect and facing forward, arms at the sides, palms turned toward the front' },
    { term: 'sagittal plane',   def: 'a VERTICAL plane dividing the body into UNEQUAL left and right portions' },
    { term: 'frontal plane',    def: 'a vertical plane dividing the body into anterior (front) and posterior (back) portions — also called the coronal plane' },
    { term: 'superior',         def: 'uppermost, above, or toward the head' },
    { term: 'inferior',         def: 'lowermost, below, or toward the feet' },
    { term: 'lateral',          def: 'toward, or nearer, the side of the body, away from the midline' },
    { term: 'dorsal cavity',    def: 'the cavity running along the back of the body and head, holding the organs of the nervous system' },
    { term: 'cranial',          def: 'pertaining to the skull' },
    { term: 'cranial cavity',   def: 'lies within the skull, surrounding and protecting the brain' },
    { term: 'spinal cavity',    def: 'lies within the vertebral column, surrounding and protecting the cord that runs from the brain down the back',
      note: 'Holds the spinal cord.' },
    { term: 'ventral cavity',   def: 'the cavity running along the front of the body, holding the organs that sustain homeostasis' },
    { term: 'abdominopelvic cavity', def: 'the abdominal and pelvic cavities treated as one unit, since no physical division separates them' },
    { term: 'hypochondriac regions', def: 'the left and right regions covered by the lower ribs',
      note: 'Hypochondriac also describes someone with an abnormal concern about their own health. hypo- = below, chondr/i = cartilage, -ac = pertaining to.' },
    { term: 'lumbar regions',   def: 'the left and right regions near the inward curve of the spine',
      note: 'Lumbar also names the part of the back between the ribs and the pelvis.' },
    { term: 'umbilical region', def: 'the region surrounding the umbilicus' },
    { term: 'iliac regions',    def: 'the left and right regions near the hip bones' },
    { term: 'RUQ',              def: 'right upper quadrant' },
    { term: 'LUQ',              def: 'left upper quadrant' },
    { term: 'RLQ',              def: 'right lower quadrant' },
    { term: 'LLQ',              def: 'left lower quadrant' },
    { term: 'membrane',         def: 'a thin layer of tissue that covers a surface, lines a cavity, or divides a space or organ' },
    { term: 'parietal',         def: 'cavity wall' },
    { term: 'parietal peritoneum', def: 'the OUTER layer of the peritoneum, lining the interior of the abdominal wall' },
    { term: 'visceral',         def: 'relating to the internal organs' },
    { term: 'visceral peritoneum', def: 'the INNER layer of the peritoneum, surrounding the organs of the abdominal cavity' },
    { term: 'cytology',         def: 'the study of the anatomy, physiology, pathology and chemistry of the cell' },
    { term: 'cytologist',       def: 'a specialist in the study and analysis of cells' },
    { term: 'cell membrane',    def: 'the tissue surrounding a cell and protecting its contents from the external environment' },
    { term: 'nucleus',          def: 'the structure within the cell, enclosed by the nuclear membrane, that controls the cell’s activities and helps it divide' },
    { term: 'adult stem cells', def: 'undifferentiated cells sitting among the differentiated cells of a tissue or organ, whose main role is to maintain and repair it — also called somatic stem cells' },
    { term: 'embryonic stem cells', def: 'undifferentiated cells unlike any specific adult cell, able to form ANY adult cell' },
    { term: 'embryo',           def: 'a developing fetus during its first eight weeks in the womb' },
    { term: 'cord blood',       def: 'the blood in the umbilical cord and placenta of a newborn, harvested as a source of embryonic stem cells' },
    { term: 'in vitro',         def: 'in the test tube — outside the living body, in an artificial environment',
      note: 'Literally "in glass". Surplus embryos from in vitro fertilization are another source of embryonic stem cells.' },
    { term: 'stem cell therapy', def: 'using stem cells to heal injuries and treat disease — also called regenerative medicine' },
    { term: 'hematopoietic',    def: 'blood-forming — describes the bone marrow tissue stem cells are usually harvested from' },
    { term: 'graft versus host disease', def: 'the rejection that can follow when transplanted stem cells come from another individual' },
    { term: 'gene',             def: 'the fundamental physical and functional unit of heredity, controlling hereditary disease and physical traits such as hair, skin and eye colour' },
    { term: 'genetics',         def: 'the study of how genes pass from parents to their children, and the part genes play in health and disease' },
    { term: 'geneticist',       def: 'a specialist in genetics' }
  ],
  questions: [
    { q: 'A patient develops a wound infection three days after being admitted to the hospital. This is best described as:',
      choices: ['A nosocomial infection', 'An idiopathic disease', 'A congenital disorder', 'A functional disorder'], answer: 0 },

    { q: 'A patient has a severe allergic reaction to a medication the physician prescribed. This is:',
      choices: ['Iatrogenic', 'Idiopathic', 'Congenital', 'Endemic'], answer: 0,
      why: 'Iatrogenic = caused by the treatment itself. Idiopathic = cause unknown.' },

    { q: 'What is the key difference between hyperplasia and hypertrophy?',
      choices: [
        'Hyperplasia is an increase in the NUMBER of cells; hypertrophy is an increase in BULK',
        'Hyperplasia is an increase in bulk; hypertrophy is an increase in cell number',
        'They are two words for the same process',
        'Hyperplasia only occurs in glands; hypertrophy only in muscle'
      ], answer: 0,
      why: 'This distinction matters in echo: left ventricular hypertrophy is thickened muscle — bigger cells, not more of them.' },

    { q: 'Which term means the study of the CAUSES of disease?',
      choices: ['Etiology', 'Pathology', 'Physiology', 'Histology'], answer: 0,
      why: 'Pathology is the study of disease itself; etiology is specifically its cause.' },

    { q: 'Endemic, epidemic, and pandemic differ mainly by:',
      choices: [
        'Scale and suddenness — ongoing local presence, sudden local outbreak, and very large geographic spread',
        'The type of pathogen involved',
        'Whether the disease is communicable',
        'How the disease is treated'
      ], answer: 0 },

    { q: 'The kidneys sit behind the peritoneum. The correct term is:',
      choices: ['Retroperitoneal', 'Intraperitoneal', 'Mesenteric', 'Epigastric'], answer: 0 },

    { q: 'On the arm, the wrist is ___ to the elbow.',
      choices: ['Distal', 'Proximal', 'Medial', 'Ventral'], answer: 0,
      why: 'Distal = farther from the point of origin/attachment. The elbow is proximal to the wrist.' },

    { q: 'A transverse plane divides the body into:',
      choices: [
        'Superior and inferior portions',
        'Equal left and right halves',
        'Anterior and posterior portions',
        'Proximal and distal portions'
      ], answer: 0,
      why: 'Midsagittal divides left/right; transverse divides upper/lower. You will use these constantly in imaging planes.' },

    { q: 'Which gland type secretes hormones directly into the bloodstream with no ducts?',
      choices: ['Endocrine', 'Exocrine', 'Both', 'Neither'], answer: 0,
      why: 'endo- = within. Exocrine (exo- = outside) uses ducts — sweat and salivary glands.' }
  ]
},

{
  id: 'mt2-overview',
  group: 'Chapter 2',

  added: '2026-07-31',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 2 — Overview (Lecture Slides)',
  source: 'Chapter 2 — lecture slides',
  cards: [
    /* ---- anatomical reference systems ---- */
    { term: 'Anatomical position', def: 'standing erect and facing forward, arms at the sides, palms turned to the front' },
    { fact: true, term: 'The body planes', def: 'sagittal, midsagittal, frontal (coronal) and transverse' },
    { term: 'Sagittal plane', def: 'a VERTICAL plane dividing the body into UNEQUAL left and right portions' },
    { term: 'Midsagittal plane', def: 'the vertical plane dividing the body into EQUAL left and right halves — the midline' },
    { term: 'Frontal plane', def: 'a vertical plane dividing the body into anterior (front) and posterior (back) portions — also called coronal' },
    { term: 'Transverse plane', def: 'a HORIZONTAL plane dividing the body into superior (upper) and inferior (lower) portions' },
    { term: 'Superior', def: 'uppermost, above, or toward the head' },
    { term: 'Inferior', def: 'lowermost, below, or toward the feet' },
    { term: 'Lateral', def: 'toward the side of the body, away from the midline' },
    { term: 'Medial', def: 'toward, or nearer, the midline' },
    { term: 'Proximal', def: 'nearest the midline or the beginning of a body structure' },
    { term: 'Distal', def: 'farthest from the midline or the beginning of a body structure' },
    { term: 'Ventral', def: 'the front, or belly side' },
    { term: 'Dorsal', def: 'the back of the body or organ' },
    { term: 'Cephalic', def: 'toward the head' },
    { term: 'Caudal', def: 'toward the lower part of the body' },
    { term: 'Anterior', def: 'situated in the front' },
    { term: 'Posterior', def: 'situated in the back' },

    /* ---- body cavities ---- */
    { fact: true, term: 'The two major body cavities', def: 'the dorsal (back) and the ventral (front)' },
    { term: 'Dorsal cavity', def: 'the cavity along the back of the body and head, holding the organs of the nervous system' },
    { term: 'Cranial cavity', def: 'the space within the skull that surrounds and protects the brain' },
    { term: 'Spinal cavity', def: 'the space within the vertebral column that surrounds and protects the cord running from the brain down the back',
      note: 'Holds the spinal cord.' },
    { term: 'Ventral cavity', def: 'the cavity along the front of the body, holding the organs that sustain homeostasis' },
    { term: 'Thoracic cavity', def: 'the chest cavity, surrounding and protecting the heart and lungs' },
    { term: 'Diaphragm', def: 'the muscle separating the thoracic cavity from the abdominal cavity' },
    { term: 'Abdominal cavity', def: 'holds the major organs of digestion' },
    { term: 'Pelvic cavity', def: 'the space formed by the hip bones, holding the reproductive and excretory organs' },
    { term: 'Abdominopelvic cavity', def: 'the abdominal and pelvic cavities treated as a single unit' },
    { term: 'Inguinal', def: 'relating to the groin — the entire lower area of the abdomen' },

    /* ---- regions and quadrants ---- */
    { fact: true, term: 'The nine abdominal regions', def: 'hypochondriac, epigastric, lumbar, umbilical, iliac and hypogastric — right and left where paired' },
    { term: 'Hypochondriac regions', def: 'the upper regions on each side, covered by the lower ribs' },
    { term: 'Epigastric region', def: 'the region above the stomach' },
    { term: 'Lumbar regions', def: 'the regions on each side, near the inward curve of the spine' },
    { term: 'Umbilical region', def: 'the region surrounding the navel' },
    { term: 'Iliac regions', def: 'the regions on each side, near the hip bones' },
    { term: 'Hypogastric region', def: 'the region below the stomach' },
    { term: 'Quadrant', def: 'divided into four — the scheme used to say roughly where abdominal pain or an organ sits' },
    { term: 'RUQ', def: 'right upper quadrant' },
    { term: 'LUQ', def: 'left upper quadrant' },
    { term: 'RLQ', def: 'right lower quadrant' },
    { term: 'LLQ', def: 'left lower quadrant' },

    /* ---- peritoneum ---- */
    { term: 'Parietal', def: 'referring to the wall of a cavity' },
    { term: 'Visceral', def: 'relating to the internal organs' },
    { term: 'Parietal peritoneum', def: 'the OUTER layer of the peritoneum, lining the interior of the abdominal wall' },
    { term: 'Visceral peritoneum', def: 'the INNER layer of the peritoneum, wrapping the organs of the abdominal cavity' },
    { term: 'Mesentery', def: 'a fused double layer of parietal peritoneum that anchors parts of the intestine to the abdominal wall' },
    { term: 'Retroperitoneal', def: 'located behind the peritoneum' },
    { term: 'Peritonitis', def: 'inflammation of the peritoneum' },

    /* ---- cells ---- */
    { term: 'Cytology', def: 'the study of the anatomy, physiology, pathology and chemistry of cells' },
    { term: 'Cytologist', def: 'a specialist in the study and analysis of cells' },
    { term: 'Cell membrane', def: 'the tissue surrounding a cell, protecting its contents from the external environment' },
    { term: 'Cytoplasm', def: 'the material inside the cell membrane that is not part of the nucleus' },
    { term: 'Nucleus', def: 'the structure inside the cell, wrapped in the nuclear membrane, that controls the cell’s activities and helps it divide' },

    /* ---- stem cells ---- */
    { term: 'Stem cells', def: 'unspecialized cells able to renew themselves by division for long periods, and to become cells with special functions' },
    { term: 'Undifferentiated', def: 'not having a specialized function or structure' },
    { term: 'Differentiated', def: 'having a specialized function or structure' },
    { term: 'Adult stem cells', def: 'undifferentiated cells sitting among the differentiated cells of a tissue, whose usual job is to maintain and repair it — also called somatic stem cells' },
    { term: 'Embryonic stem cells', def: 'undifferentiated cells able to become ANY adult cell, taken from cord blood or from surplus embryos' },
    { term: 'Stem cell therapy', def: 'using stem cells to heal injuries and treat disease — also called regenerative medicine' },
    { term: 'Hematopoietic', def: 'blood-forming — describes the bone marrow tissue stem cells are usually harvested from' },
    { term: 'Graft-versus-host disease', def: 'the rejection that can follow a transplant when donor and recipient are not well matched' },

    /* ---- genetics ---- */
    { term: 'Dominant gene', def: 'produces its trait when inherited from EITHER parent' },
    { term: 'Recessive gene', def: 'produces its trait only when the same gene comes from BOTH parents' },
    { term: 'Genome', def: 'the complete set of an organism’s genetic information' },
    { fact: true, term: 'The Human Genome Project', def: 'first complete mapping of the human genome, published in 2003 after 13 years of work' },
    { term: 'Chromosome', def: 'a genetic structure inside the nucleus, made of DNA molecules carrying the body’s genes' },
    { term: 'Somatic cell', def: 'any body cell except a sex cell — carries 46 chromosomes in 23 pairs' },
    { term: 'Gamete', def: 'a sex cell, sperm or egg — the only cell type carrying 23 single chromosomes rather than 46' },
    { term: 'DNA', def: 'deoxyribonucleic acid — the main component of chromosomes, carrying the body’s genetic information',
      note: 'Found in every cell type except erythrocytes (red blood cells). No two patterns are alike except in identical twins.' },
    { term: 'Genetic mutation', def: 'a change in the sequence of a DNA molecule' },
    { term: 'Somatic cell mutation', def: 'a change within body cells — affects the individual but is NOT passed to the next generation' },
    { term: 'Gametic cell mutation', def: 'a change within a sex cell — CAN be passed from a parent to their children' },
    { term: 'Genetic engineering', def: 'manipulating or splicing genes for scientific or medical purposes' },
    { term: 'Genetic disorder', def: 'a pathological condition caused by an absent or defective gene — also called a hereditary disease' },
    { term: 'Down syndrome', def: 'a genetic disorder usually caused by a third copy of chromosome 21, which is why it is also called trisomy 21' },

    /* ---- tissues ---- */
    { term: 'Tissue', def: 'a group or layer of similarly specialized cells joined together to carry out a specific function' },
    { term: 'Histology', def: 'the microscopic study of the structure, composition and function of tissues' },
    { term: 'Histologist', def: 'a non-physician specialist who studies the microscopic structure of tissues' },
    { fact: true, term: 'The four main tissue types', def: 'epithelial, connective, muscle and nerve' },
    { term: 'Epithelial tissue', def: 'forms a protective covering over every internal and external body surface, and forms the glands' },
    { term: 'Epithelium', def: 'the epithelial tissue forming the epidermis of the skin and the surface layer of mucous membranes' },
    { term: 'Endothelium', def: 'the epithelial tissue lining the blood and lymph vessels, body cavities, glands and organs' },
    { term: 'Connective tissue', def: 'supports and connects the organs and other body tissues' },
    { term: 'Dense connective tissue', def: 'forms the joints and the framework of the body — bone and cartilage' },
    { term: 'Adipose tissue', def: 'fat — provides protective padding, insulation and support' },
    { term: 'Loose connective tissue', def: 'holds organs in place and binds tissue together' },
    { term: 'Fluid connective tissue', def: 'blood and lymph — carries nutrients and waste around the body' },
    { term: 'Muscle tissue', def: 'contains cells with the specialized ability to contract and relax' },
    { term: 'Nerve tissue', def: 'contains cells specialized to react to stimuli and conduct electrical impulses' },
    { term: 'Aplasia', def: 'the defective development, or congenital absence, of an organ or tissue' },
    { term: 'Hypoplasia', def: 'incomplete development of an organ or tissue, from too few cells' },
    { term: 'Anaplasia', def: 'a change in the structure of cells and in how they are oriented to each other' },
    { term: 'Dysplasia', def: 'abnormal development or growth of cells, or abnormal cells within a tissue' },
    { term: 'Hyperplasia', def: 'an increase in the NUMBER of cells in a tissue or organ' },
    { term: 'Hypertrophy', def: 'an increase in BULK from cells growing larger, not from there being more of them' },

    /* ---- glands ---- */
    { term: 'Gland', def: 'a group of specialized epithelial cells able to produce secretions' },
    { term: 'Secretion', def: 'the substance a gland produces' },
    { term: 'Exocrine glands', def: 'secrete substances into DUCTS leading to other organs or out of the body' },
    { term: 'Endocrine glands', def: 'produce hormones and have NO ducts, pouring their secretions straight into the bloodstream' },
    { term: 'aden', def: 'the word root meaning gland' },
    { term: 'Adenitis', def: 'inflammation of a gland' },
    { term: 'Adenoma', def: 'a BENIGN tumor starting in the epithelial tissue of a gland or gland-like structure' },
    { term: 'Adenocarcinoma', def: 'a MALIGNANT tumor originating in the glands, able to spread elsewhere in the body' },
    { term: 'Adenosis', def: 'any disease or condition of a gland' },

    /* ---- organs and systems ---- */
    { term: 'Organ', def: 'a somewhat independent part of the body that performs a specific function' },
    { term: 'Body system', def: 'related tissues and organs grouped together because they share a specialized function' },

    /* ---- pathology ---- */
    { term: 'Pathology', def: 'the study of disease — its nature and cause, and the changes it produces in structure and function' },
    { term: 'Pathologist', def: 'a physician who specializes in laboratory analysis of diseased tissue to confirm a diagnosis' },
    { term: 'Etiology', def: 'the study of the CAUSES of diseases or abnormal conditions' },
    { term: 'Pathogen', def: 'a disease-producing microorganism, such as a virus' },
    { term: 'Communicable disease', def: 'any condition transmitted from one person to another' },

    /* ---- modes of transmission ---- */
    { term: 'Direct transmission', def: 'human-to-human contact, or exchange of body fluids' },
    { term: 'Bloodborne transmission', def: 'infected blood or body fluid entering the bloodstream.\nExample: HIV and hepatitis B' },
    { term: 'Droplet transmission', def: 'infected moisture sprayed from the airway reaching someone standing nearby.\nExample: measles, colds, COVID-19 and flu' },
    { term: 'Indirect contact transmission', def: 'contact with a contaminated surface — which is why hand washing matters so much' },
    { term: 'Airborne transmission', def: 'pathogens floating in the air, which stay aloft and can infect someone long after the infected person has left.\nExample: tuberculosis, measles and chicken pox' },
    { term: 'Foodborne transmission', def: 'consuming contaminated food or water — also called fecal-oral transmission' },
    { term: 'Vector-borne transmission', def: 'an insect bite from a blood-sucking vector.\nExample: mosquitoes carrying malaria and West Nile virus' },

    /* ---- outbreaks ---- */
    { term: 'Epidemiologist', def: 'a specialist in the study of disease outbreaks within a population group' },
    { term: 'CDC', def: 'Centers for Disease Control and Prevention — the national agency tracking outbreaks and working to prevent their spread' },
    { term: 'Endemic', def: 'the ONGOING presence of a disease within a population, group or area' },
    { term: 'Epidemic', def: 'a SUDDEN, widespread outbreak within a specific population group or area' },
    { term: 'Pandemic', def: 'an outbreak spreading over a LARGE geographic area, possibly worldwide' },

    /* ---- types of disease ---- */
    { term: 'Organic disorder', def: 'produces symptoms that are detectable PHYSICAL changes in the body' },
    { term: 'Functional disorder', def: 'produces physical symptoms for which NO disease or organic cause can be found' },
    { term: 'Iatrogenic illness', def: 'an unfavorable response caused BY the prescribed medical treatment' },
    { term: 'Idiopathic disease', def: 'a disease with no known cause' },
    { term: 'Infectious disease', def: 'an illness caused by living pathogenic organisms such as bacteria and viruses' },
    { term: 'Nosocomial infection', def: 'a disease acquired in a hospital or clinical setting — also called a hospital-acquired infection' },
    { term: 'Syndrome', def: 'signs and symptoms that occur together as part of a specific disease process' },
    { term: 'Metabolic syndrome', def: 'a cluster of risk factors — raised blood pressure, abdominal fat, high insulin and high cholesterol — that together raise the risk of heart disease, stroke and type 2 diabetes' },

    /* ---- congenital, aging, death ---- */
    { term: 'Congenital disorder', def: 'an abnormal condition present at the time of birth' },
    { term: 'Anomaly', def: 'a deviation from what is regarded as normal' },
    { term: 'Premature birth', def: 'birth before the 37th week' },
    { term: 'Aging', def: 'the normal progression of the life cycle, eventually ending in death' },
    { term: 'Geriatrics', def: 'the study of the medical problems and care of older people — also called gerontology' },
    { term: 'Postmortem', def: 'after death' },
    { term: 'Autopsy', def: 'a postmortem examination, usually done to determine the cause of death' },

    /* ---- advance directives ---- */
    { term: 'Advance directives', def: 'documents setting out what treatment someone wants, and who may decide for them, if they cannot speak for themselves' },
    { term: 'Health care proxy', def: 'a durable power of attorney for health care — appoints a trusted person to make treatment decisions' },
    { term: 'Living will', def: 'a statement of wishes for end-of-life medical care, also known as a POLST' },
    { term: 'Do Not Resuscitate order', def: 'states that the person does not wish to receive CPR — also called no code, or allow natural death' },

    /* ---- abbreviations ---- */
    { term: 'GP', def: 'general practitioner' },
    { term: 'HD', def: 'Huntington’s disease' },
    { term: 'PA', def: 'physician assistant' }
  ],
  questions: [
    { q: 'Which plane divides the body into EQUAL left and right halves?',
      choices: ['Midsagittal', 'Sagittal', 'Frontal', 'Transverse'], answer: 0,
      why: 'A plain sagittal plane is also vertical and front-to-back, but it divides the body UNEQUALLY. Only the midsagittal runs down the midline.' },

    { q: 'The frontal (coronal) plane divides the body into:',
      choices: [
        'Anterior and posterior portions',
        'Superior and inferior portions',
        'Equal left and right halves',
        'Proximal and distal portions'
      ], answer: 0 },

    { q: 'Which cavity contains the organs of the nervous system?',
      choices: ['The dorsal cavity', 'The ventral cavity', 'The thoracic cavity', 'The abdominopelvic cavity'], answer: 0,
      why: 'The dorsal cavity splits into the cranial cavity (brain) and the spinal cavity (spinal cord). The ventral cavity holds the organs that sustain homeostasis.' },

    { q: 'What separates the thoracic cavity from the abdominal cavity?',
      choices: ['The diaphragm', 'The peritoneum', 'The mesentery', 'The pelvic girdle'], answer: 0 },

    { q: 'Which correctly pairs the two layers of the peritoneum?',
      choices: [
        'Parietal lines the abdominal wall; visceral wraps the organs',
        'Parietal wraps the organs; visceral lines the abdominal wall',
        'Both line the abdominal wall, at different depths',
        'Both wrap the organs, at different depths'
      ], answer: 0,
      why: 'The word roots give it away: parietal means cavity WALL, visceral means relating to the internal ORGANS.' },

    { q: 'A somatic cell and a gamete differ how?',
      choices: [
        'A somatic cell has 46 chromosomes in 23 pairs; a gamete has 23 single chromosomes',
        'A gamete has 46 chromosomes; a somatic cell has 23',
        'Both have 46, but a gamete carries no DNA',
        'A somatic cell is a sex cell; a gamete is any other body cell'
      ], answer: 0,
      why: 'Each parent contributes 23, so the offspring gets 46. The X or Y from the father determines the sex of the child.' },

    { q: 'Which mutation CAN be passed on to a person’s children?',
      choices: [
        'A gametic cell mutation',
        'A somatic cell mutation',
        'Both can be inherited',
        'Neither can be inherited'
      ], answer: 0,
      why: 'Gametes are the sex cells, so a change there travels to the next generation. A somatic mutation affects only the individual.' },

    { q: 'A recessive genetic condition appears in the offspring when:',
      choices: [
        'The same recessive gene is inherited from BOTH parents',
        'The recessive gene is inherited from either parent',
        'One parent contributes a recessive and the other a normal gene',
        'Neither parent carries the gene'
      ], answer: 0,
      why: 'Sickle cell anemia is the example given. A dominant gene, by contrast, needs to come from only one parent.' },

    { q: 'Which tissue type forms the glands?',
      choices: ['Epithelial', 'Connective', 'Muscle', 'Nerve'], answer: 0,
      why: 'Epithelial tissue also forms the protective covering over every internal and external body surface.' },

    { q: 'Endothelium differs from epithelium in that it:',
      choices: [
        'Lines the blood and lymph vessels, body cavities, glands and organs',
        'Forms the epidermis of the skin',
        'Is a type of connective rather than epithelial tissue',
        'Contains cells that contract and relax'
      ], answer: 0 },

    { q: 'Adipose tissue is classified as which kind of tissue?',
      choices: ['Connective', 'Epithelial', 'Muscle', 'Nerve'], answer: 0,
      why: 'It is one of the four connective types, alongside dense, loose and fluid. Its job is padding, insulation and support.' },

    { q: 'What is the difference between hyperplasia and hypertrophy?',
      choices: [
        'Hyperplasia is more cells; hypertrophy is larger cells',
        'Hyperplasia is larger cells; hypertrophy is more cells',
        'They describe the same process',
        'Hyperplasia affects glands only; hypertrophy affects muscle only'
      ], answer: 0 },

    { q: 'A patient develops a drug-resistant infection three days into a hospital stay. This is:',
      choices: [
        'A nosocomial infection',
        'An idiopathic disease',
        'An organic disorder',
        'A congenital disorder'
      ], answer: 0,
      why: 'Also called a hospital-acquired infection. MRSA is the standard example.' },

    { q: 'Tuberculosis spreading through particles that stay suspended in a room is which mode of transmission?',
      choices: [
        'Airborne',
        'Droplet',
        'Indirect contact',
        'Vector-borne'
      ], answer: 0,
      why: 'The distinction from droplet transmission is persistence: airborne microparticles linger and can infect someone after the source has left the room.' },

    { q: 'Which describes an organic disorder rather than a functional one?',
      choices: [
        'It produces detectable physical changes in the body',
        'It produces symptoms with no identifiable physical cause',
        'It is caused by prescribed medical treatment',
        'It has no known cause at all'
      ], answer: 0,
      why: 'Chickenpox is the organic example; chronic fatigue syndrome the functional one. Iatrogenic means caused by treatment, and idiopathic means cause unknown.' },

    { q: 'A living will and a health care proxy differ how?',
      choices: [
        'A living will states treatment wishes; a proxy appoints someone to decide',
        'A living will appoints someone to decide; a proxy states treatment wishes',
        'They are two names for the same document',
        'Only a living will applies to end-of-life care'
      ], answer: 0,
      why: 'Both are advance directives. A DNR order is narrower still — it addresses CPR specifically.' }
  ]
},

/* The two instructor study guides are Q-and-A sheets: each line poses a prompt
   and gives the answer. That maps straight onto Recall, so the prompt becomes
   the definition and the answer becomes the term. Kept as their own decks per
   chapter, because being asked the way the exam will ask is the point. */
{
  id: 'mt1-guide',
  exam: true,
  retired: true,
  group: 'Chapter 1',
  added: '2026-08-05',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Study Guide',
  source: 'Chapter 1 — instructor study guide',
  cards: [
    { term: 'disease', def: 'a condition in which one or more body parts are not functioning normally' },
    { term: 'word root', def: 'the foundation of a medical term, carrying its primary meaning' },
    { term: 'appendectomy', def: 'the surgical removal of the appendix' },
    { term: '-pathy', def: 'the suffix meaning disease',
      note: 'As in myopathy — disease of muscle tissue.' },
    { term: 'symptom', def: 'a change in the body that the PATIENT notices and reports, such as pain' },
    { term: 'arteriosclerosis', def: 'the abnormal hardening of the walls of an artery or arteries' },
    { fact: true, term: 'The four types of word parts',
      def: 'word roots, combining forms, suffixes and prefixes' },
    { term: 'gastritis', def: 'an inflammation of the stomach lining' },
    { term: 'myelopathy', def: 'any pathologic change or disease in the spinal cord' },
    { term: 'myopathy', def: 'any pathologic change or disease of muscle tissue' },
    { term: 'natal', def: 'pertaining to birth' },
    { term: 'trauma', def: 'a wound or injury' },
    { term: 'mycosis', def: 'any abnormal condition or disease caused by a fungus' },
    { term: 'cyanosis', def: 'blue discoloration of the skin caused by a lack of adequate oxygen in the blood' },
    { term: 'hypertension', def: 'higher-than-normal blood pressure' },
    { term: 'hypotension', def: 'lower-than-normal blood pressure' },
    { term: 'suppuration', def: 'the formation or discharge of pus' },
    { term: 'angiography', def: 'the process of producing a radiographic study of blood vessels after contrast injection' },
    { term: 'myorrhexis', def: 'the rupture of a muscle',
      note: 'my/o means muscle and -rrhexis means rupture.' },
    { term: 'pathology', def: 'the study of all aspects of diseases' },
    { term: 'abdominocentesis', def: 'the surgical puncture of the abdominal cavity to remove fluid' },
    { term: 'gastralgia', def: 'pain in the stomach, also known as a stomachache' },
    { term: 'pyrosis', def: 'discomfort caused by stomach acid regurgitating up into the esophagus',
      note: 'Better known as heartburn.' },
    { term: 'neonatology', def: 'the study of disorders of the newborn' },
    { term: 'interstitial', def: 'between, but not within, the parts of a tissue' },
    { term: 'melanosis', def: 'any condition of unusual deposits of black pigment',
      note: 'melan/o means black and -osis means abnormal condition.' },
    { term: 'poliomyelitis', def: 'a viral infection of the gray nerve tissue of the spinal cord' },
    { term: 'dys-', def: 'bad, painful, difficult, or abnormal' }
  ],
  questions: [
    { q: 'Pain is classified as which of these?',
      choices: ['A symptom', 'A sign', 'A syndrome', 'A diagnosis'], answer: 0,
      why: 'A symptom is what the PATIENT feels and reports. A sign is what an examiner can observe or measure.' },

    { q: 'Which term means the rupture of a muscle?',
      choices: ['Myorrhexis', 'Myopathy', 'Myelopathy', 'Myalgia'], answer: 0,
      why: '-rrhexis is rupture. -pathy is disease, and myel/o points at the spinal cord rather than muscle.' },

    { q: 'Myelopathy and myopathy differ in which way?',
      choices: [
        'Myelopathy affects the spinal cord; myopathy affects muscle tissue',
        'Myelopathy affects muscle; myopathy affects the spinal cord',
        'Myelopathy is acute; myopathy is chronic',
        'They mean the same thing'
      ], answer: 0,
      why: 'One letter block changes the organ: myel/o is spinal cord (or bone marrow), my/o is muscle.' },

    { q: 'Which describes an abnormal condition caused by a fungus?',
      choices: ['Mycosis', 'Melanosis', 'Cyanosis', 'Suppuration'], answer: 0 },

    { q: 'A patient is described as cyanotic. What are you seeing?',
      choices: [
        'Blue discoloration of the skin from inadequate oxygen in the blood',
        'Yellow discoloration of the skin from excess bilirubin',
        'Unusual deposits of black pigment',
        'Discharge of pus from a wound'
      ], answer: 0 }
  ]
},

{
  id: 'mt2-guide',
  exam: true,
  retired: true,
  group: 'Chapter 2',
  added: '2026-08-05',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 2 — Study Guide',
  source: 'Chapter 2 — instructor study guide',
  cards: [
    { term: 'cell', def: 'the basic structural and functional unit of the body' },
    { term: 'cytoplasm', def: 'the material within the cell membrane, not counting the nucleus' },
    { term: 'adenoma', def: 'a benign tumor that arises in or resembles glandular tissue',
      note: 'More precisely, it starts in the epithelial tissue of a gland or gland-like structure.' },
    { term: 'Adenocarcinoma', def: 'a malignant tumor of glandular tissue' },
    { term: 'Adenomalacia', def: 'the abnormal softening of a gland' },
    { term: 'adenosclerosis', def: 'the abnormal hardening of a gland' },
    { term: 'endocrine glands', def: 'the glands that produce hormones and have no ducts' },
    { term: 'exocrine glands', def: 'the glands that secrete substances into ducts, such as sweat glands' },

    { term: 'dysplasia', def: 'the abnormal development or growth of cells, tissues or organs — a change in the structure of cells and in their orientation to each other' },
    { term: 'hypertrophy', def: 'a general increase in bulk due to increased cell size' },
    { term: 'hyperplasia', def: 'enlargement due to an increased number of cells' },
    { term: 'hypoplasia', def: 'incomplete development of an organ or tissue',
      note: 'Usually due to a deficiency in the NUMBER of cells — the opposite of hyperplasia.' },

    { term: 'epidemic', def: 'a sudden and widespread outbreak of a disease within a specific population group or area' },
    { term: 'pandemic', def: 'a worldwide outbreak',
      note: 'More broadly, an outbreak over a large geographic area, sometimes even worldwide.' },
    { term: 'endemic', def: 'the ongoing presence of a disease' },
    { term: 'communicable', def: 'describing a disease passed from one person to another by direct or indirect contact' },
    { term: 'congenital', def: 'describing an abnormal condition that exists at the time of birth' },
    { term: 'idiopathic disease', def: 'an illness without known cause' },
    { term: 'nosocomial infection', def: 'a disease acquired in a hospital or clinical setting' },
    { term: 'vector-borne transmission', def: 'transmission of disease by the bite of a carrier such as a mosquito or tick' },
    { term: 'hemophilia', def: 'a group of hereditary bleeding disorders',
      note: 'Specifically, a blood-clotting factor is missing.' },
    { term: 'Phenylketonuria (PKU)', def: 'an inherited metabolic disorder',
      note: 'Autosomal recessive: the enzyme phenylalanine hydroxylase is missing, so phenylalanine builds up and can damage the central nervous system. This is why every newborn is screened for it.' },

    { term: 'abdominal cavity', def: 'the cavity containing the major organs of digestion' },
    { term: 'pelvic cavity', def: 'the cavity formed by the hip bones',
      note: 'It holds the organs of the reproductive and excretory systems.' },
    { term: 'thoracic cavity', def: 'the cavity of the chest, also called the thorax',
      note: 'It surrounds and protects the heart and lungs.' },
    { term: 'ventral cavity', def: 'the cavity located along the front of the body' },
    { term: 'mesentery', def: 'a fused double layer of the parietal peritoneum' },
    { term: 'epigastric region', def: 'the region located above the stomach' },
    { term: 'inguinal', def: 'relating to the groin and lower abdomen' },

    { term: 'body planes', def: 'the imaginary flat surfaces that divide the anatomy into sections for description' },
    { term: 'midsagittal plane', def: 'the plane running down the midline, dividing the body into equal left and right halves' },
    { term: 'directional terms', def: 'the words that describe where structures sit in relation to one another' },
    { term: 'anterior', def: 'situated toward the front of the body — the belly side' },
    { term: 'posterior', def: 'situated toward the back of the body' },
    { term: 'cephalad', def: 'toward the head' },
    { term: 'caudal', def: 'toward the lower part of the body' },
    { term: 'medial', def: 'toward the midline' },
    { term: 'proximal', def: 'nearest the midline, or the beginning of a body structure',
      note: 'The opposite of distal.' },
    { term: 'distal', def: 'farthest from the midline, or the beginning of a body structure',
      note: 'The opposite of proximal.' }
  ],
  questions: [
    { q: 'Hyperplasia and hypertrophy both enlarge a tissue. What is the difference?',
      choices: [
        'Hyperplasia is more cells; hypertrophy is bigger cells',
        'Hyperplasia is bigger cells; hypertrophy is more cells',
        'Hyperplasia is benign; hypertrophy is malignant',
        'Hyperplasia affects glands only; hypertrophy affects muscle only'
      ], answer: 0,
      why: '-plasia is about formation and number, -trophy is about growth and bulk. Hypoplasia, by the same logic, is too few or underdeveloped.' },

    { q: 'An outbreak spreading worldwide is called:',
      choices: ['A pandemic', 'An epidemic', 'An endemic disease', 'A nosocomial infection'], answer: 0,
      why: 'Epidemic is a sudden outbreak in one population or area; endemic is a disease that is simply always present there.' },

    { q: 'A patient develops an infection during a hospital admission. This is:',
      choices: [
        'A nosocomial infection',
        'An idiopathic disease',
        'A congenital disorder',
        'A communicable disease'
      ], answer: 0 },

    { q: 'Which pair of terms is measured from the MIDLINE?',
      choices: [
        'Medial and lateral',
        'Proximal and distal',
        'Anterior and posterior',
        'Cephalad and caudal'
      ], answer: 0,
      why: 'Medial is toward the midline, lateral is away from it. Proximal and distal describe position along a body structure — nearest to, or farthest from, its beginning.' },

    { q: 'Endocrine and exocrine glands differ how?',
      choices: [
        'Endocrine glands have no ducts and release hormones; exocrine glands secrete into ducts',
        'Endocrine glands secrete into ducts; exocrine glands have no ducts',
        'Endocrine glands are benign; exocrine glands are malignant',
        'Only exocrine glands are found in the abdomen'
      ], answer: 0,
      why: 'Endo- is within: the secretion goes straight into the bloodstream. Exo- is outward, through a duct — sweat, saliva, tears.' },

    { q: 'Which cavity contains the major organs of digestion?',
      choices: ['The abdominal cavity', 'The thoracic cavity', 'The pelvic cavity', 'The spinal cavity'], answer: 0 }
  ]
},

/* Built from the Chapter 12 lecture slides, which carry an all-rights-reserved
   notice and an explicit bar on posting to a public website. This app is public,
   so nothing here reproduces the slides: the FACTS are taken (a fact is not
   copyrightable — that squamous cell carcinoma arises in the epidermis is simply
   true), while every definition below is written from scratch. Same practice as
   the other slide-derived decks. */
/* From the course notes rather than the slides, and the one part of Chapter 12
   the slides never covered. Chapters 1 and 2 each have a word-parts deck; this
   is the same thing for Chapter 12, and it leads the chapter because the terms
   in every other Chapter 12 deck are built out of these pieces. */
{
  id: 'mt12-parts',
  group: 'Chapter 12',
  current: true,
  added: '2026-08-10',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 12 — Skin: Word Parts',
  source: 'Chapter 12 — course notes',
  cards: [
    { term: 'cutane/o', def: 'skin' },
    { term: 'derm/o, dermat/o', def: 'skin' },
    { term: 'seb/o', def: 'sebum, the oily secretion of the skin' },
    { term: 'hidr/o', def: 'sweat' },
    { term: 'pil/i, pil/o', def: 'hair' },
    { term: 'hirsut/o', def: 'hairy, rough' },
    { term: 'onych/o', def: 'fingernail or toenail' },
    { term: 'ungu/o', def: 'nail' },
    { term: 'melan/o', def: 'black, dark' },
    { term: 'myc/o', def: 'fungus' },
    { term: 'py/o', def: 'pus' },
    { term: 'lip/o', def: 'fat, lipid' },
    { term: 'xer/o', def: 'dry' },
    { term: 'rhytid/o', def: 'wrinkle' },
    { term: 'urtic/o', def: 'rash, hives' },
    { term: 'cry/o', def: 'cold' },
    { fact: true, term: 'Two roots that both mean skin', def: 'cutane/o and derm/o (dermat/o)' },
    { fact: true, term: 'Two roots that both mean nail', def: 'onych/o and ungu/o' }
  ],
  questions: [
    { q: 'Onychomycosis breaks down into which parts?',
      choices: [
        'onych/o (nail) + myc/o (fungus) — a fungal nail infection',
        'onych/o (nail) + myc/o (pus) — a pus-filled nail infection',
        'onych/o (hair) + myc/o (fungus) — a fungal hair infection',
        'onych/o (nail) + myc/o (dry) — a brittle nail'
      ], answer: 0 },

    { q: 'Rhytidectomy removes what?',
      choices: ['Wrinkles — rhytid/o means wrinkle', 'Fat — rhytid/o means fat',
                'Hair — rhytid/o means hair', 'Dry skin — rhytid/o means dry'], answer: 0,
      why: 'Add -ectomy, surgical removal, and you have the facelift.' },

    { q: 'Which root would you expect in a term about excessive sweating?',
      choices: ['hidr/o', 'hirsut/o', 'seb/o', 'xer/o'], answer: 0,
      why: 'Hyperhidrosis. Careful with hirsut/o, which looks similar but means hairy.' },

    { q: 'Xeroderma describes skin that is:',
      choices: ['Excessively dry', 'Unusually dark', 'Covered in hives', 'Producing too much oil'], answer: 0,
      why: 'xer/o is dry. Those others would call for melan/o, urtic/o and seb/o.' },

    { q: 'Pyoderma is an infection producing:',
      choices: ['Pus', 'Wrinkles', 'Scales', 'Cold sores'], answer: 0,
      why: 'py/o is pus — the same root behind pyrosis is NOT related; that one comes from fire.' },

    { q: 'Cryosurgery destroys tissue by which means?',
      choices: ['Freezing', 'Burning', 'An electric spark', 'A chemical solution'], answer: 0,
      why: 'cry/o is cold.' }
  ]
},

/* Chapter 12 runs to roughly 200 terms, which is more than one Recall sitting
   should ever be. Split along the chapter's own divisions — structure, then the
   three pathology blocks it separates, then procedures — so each deck is a
   session rather than a marathon. Every title still names Chapter 12. */
{
  id: 'mt12-structure',
  group: 'Chapter 12',
  current: true,
  added: '2026-08-06',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 12 — Skin: Structure & Function',
  source: 'Chapter 12 — lecture slides',
  cards: [
    /* ---- structure ---- */
    { term: 'Integumentary system', def: 'the organ system made up of the skin together with the hair, nails and glands attached to it' },
    { term: 'Epidermis', def: 'the outermost layer of skin, the one you can see and touch' },
    { term: 'Dermis',
      also: ['corium'], def: 'the layer beneath the outer surface, carrying vessels, nerves and connective tissue',
      note: 'Also called the corium.' },
    { term: 'Subcutaneous layer', def: 'the fatty layer lying under the dermis' },
    { term: 'Basal layer', def: 'the deepest stratum of the epidermis, where new cells are generated' },
    { term: 'Squamous epithelial tissue', def: 'the flat, scale-like tissue forming the upper part of the epidermis' },
    { term: 'Keratin', def: 'the tough, water-repellent protein that hardens skin, hair and nails' },
    { term: 'Melanocytes', def: 'the cells that manufacture and hold the pigment giving skin its colour' },
    { term: 'Melanin', def: 'the pigment that determines how dark or light skin and hair appear' },
    { term: 'Collagen', def: 'the fibrous protein that makes the dermis both tough and flexible' },
    { term: 'Mast cells', def: 'dermal cells that release heparin and histamine' },
    { term: 'Heparin', def: 'an anticoagulant released in response to injury' },
    { term: 'Histamine', def: 'the substance released in response to allergens that drives the allergic reaction' },
    { term: 'Adipose tissue', def: 'body fat' },
    { term: 'Lipocytes', def: 'the cells that manufacture and store fat' },
    { term: 'Cellulite', def: 'dimpled fat, typically over the buttocks and thighs' },
    { term: 'Sensory nerve endings', def: 'the receptors in the dermis that pick up touch, pressure and temperature' },

    /* ---- glands, hair, nails ---- */
    { term: 'Sebaceous glands', def: 'the glands, sitting beside hair follicles, that release an oily lubricant onto the surface' },
    { term: 'Sebum', def: 'the oily secretion that lubricates the surface and, being slightly acidic, discourages bacteria' },
    { term: 'Sudoriferous glands', def: 'the tiny coiled glands that produce perspiration' },
    { term: 'Apocrine glands', def: 'the perspiration glands that open into hair follicles' },
    { term: 'Eccrine glands', def: 'the perspiration glands that open directly onto the surface' },
    { term: 'Pores', def: 'the openings on the surface through which perspiration escapes' },
    { term: 'Perspiration', def: 'the fluid secreted to cool the body, up to about a quart a day' },
    { term: 'Hidrosis', def: 'the production and excretion of perspiration' },
    { term: 'Mammary glands', def: 'milk-producing modified perspiration glands' },
    { term: 'Hair follicle', def: 'the sac holding the root of each strand, its shape deciding whether growth is straight or curly' },
    { term: 'Arrector pili', def: 'the tiny muscle fibres that contract in cold or fright and stand the hair on end' },
    { term: 'Unguis', def: 'the keratin plate protecting the back of the last bone of a finger or toe' },
    { term: 'Nail plate', def: 'the translucent, moulded surface of the unguis' },
    { term: 'Nail bed', def: 'the skin lying directly underneath the plate' },
    { term: 'Free edge', def: 'the part of the unguis not attached to the bed underneath' },
    { term: 'Lunula', def: 'the pale half-moon at the base of the unguis, where new keratin cells form' },
    { term: 'Cuticle', def: 'the band of epidermis attached to the surface of the unguis' },
    { term: 'Nail root', def: 'the part fastening the unguis to the finger or toe' },

    /* ---- specialists ---- */
    { term: 'Dermatologist', def: 'the physician who diagnoses and treats disorders of the skin' },
    { term: 'Plastic surgeon', def: 'the physician who surgically restores and reconstructs body structures' },
    { term: 'Cosmetic surgery', def: 'operations performed for appearance rather than medical need, such as liposuction or a facelift' },

  ],
  questions: [
    { q: 'Which layer of the skin can you actually see and touch?',
      choices: ['The epidermis', 'The dermis', 'The subcutaneous layer', 'The basal layer'], answer: 0,
      why: 'Epi- means upon. The dermis lies beneath it, and the basal layer is the deepest stratum of the epidermis itself.' },

    { q: 'Melanin is produced by which cells?',
      choices: ['Melanocytes', 'Lipocytes', 'Mast cells', 'Squamous epithelial cells'], answer: 0,
      why: 'Lipocytes store fat; mast cells release heparin and histamine.' },

    { q: 'Sebum is produced by which glands, and what does it do?',
      choices: [
        'Sebaceous glands — it lubricates the surface and discourages bacteria',
        'Sudoriferous glands — it cools the body',
        'Apocrine glands — it regulates water content',
        'Mammary glands — it lubricates the surface'
      ], answer: 0,
      why: 'Sudoriferous, apocrine and eccrine glands all deal with perspiration. Sebum is oil, and its slight acidity is what discourages bacterial growth.' },

    { q: 'Apocrine and eccrine glands differ how?',
      choices: [
        'Apocrine glands open into hair follicles; eccrine glands open onto the surface',
        'Apocrine glands open onto the surface; eccrine glands open into hair follicles',
        'Apocrine glands make oil; eccrine glands make perspiration',
        'Apocrine glands are found only on the palms and soles'
      ], answer: 0 },

    { q: 'What is the lunula?',
      choices: [
        'The pale half-moon at the base of a nail, where new keratin cells form',
        'The skin lying directly under the nail plate',
        'The band of epidermis attached to the nail surface',
        'The part of the nail not attached to the bed underneath'
      ], answer: 0,
      why: 'Those describe the nail bed, the cuticle and the free edge.' }
  ]
},

{
  id: 'mt12-glands-hair-nails',
  group: 'Chapter 12',
  current: true,
  added: '2026-08-06',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 12 — Skin: Disorders of the Glands, Hair & Nails',
  source: 'Chapter 12 — lecture slides',
  cards: [
    /* ---- sebaceous and sweat pathology ---- */
    { term: 'Acne vulgaris', def: 'pustular eruptions triggered by hormones at puberty, driven by overproduction of oil around the hair shaft' },
    { term: 'Comedo', def: 'a non-infected blocked follicle — a whitehead when closed, a blackhead when open' },
    { term: 'Epidermoid cyst', def: 'a closed sac just under the surface containing yellow fatty material' },
    { term: 'Seborrheic dermatitis', def: 'inflammation caused by overactive oil glands' },
    { term: 'Seborrheic keratosis', def: 'a benign growth with a waxy, stuck-on appearance' },
    { term: 'Anhidrosis', def: 'an inability to perspire normally in response to heat' },
    { term: 'Diaphoresis', def: 'profuse perspiration' },
    { term: 'Hyperhidrosis', def: 'perspiring far more than normal' },
    { term: 'Sleep hyperhidrosis', def: 'drenching perspiration at night, commonly called night sweats' },
    { term: 'Heat rash', def: 'an intensely itchy rash brought on by blocked perspiration ducts' },
    { term: 'Heat stroke', def: 'a life-threatening collapse of temperature control after too long in extreme heat' },

    /* ---- hair pathology ---- */
    { term: 'Folliculitis', def: 'inflammation of the sacs the hair grows from' },
    { term: 'Trichomycosis axillaris', def: 'a superficial bacterial infection of the shafts of underarm hair' },
    { term: 'Hirsutism', def: 'excessive facial and body hair in women, usually in a male pattern' },
    { term: 'Alopecia', def: 'loss of hair, commonly called baldness' },
    { term: 'Alopecia areata', def: 'an autoimmune disorder attacking the follicles, producing patchy loss' },
    { term: 'Alopecia totalis', def: 'complete loss of all scalp hair' },
    { term: 'Alopecia universalis', def: 'complete loss of hair from every part of the body' },
    { term: 'Androgenic alopecia', def: 'the commonest pattern of hair loss — a receding hairline in men, thinning in women' },

    /* ---- nail pathology ---- */
    { term: 'Clubbing', def: 'abnormal curving of the nails, often a sign of chronic low oxygen' },
    { term: 'Koilonychia',
      also: ['spoon nail'], def: 'a nail whose outer surface is concave, sometimes called spoon nail' },
    { term: 'Onychia', def: 'inflammation of the bed beneath the nail' },
    { term: 'Onychocryptosis', def: 'an ingrown toenail' },
    { term: 'Onychomycosis', def: 'a fungal infection of the nail' },
    { term: 'Onycholysis', def: 'a nail lifting away from the bed it normally sits on' },
    { term: 'Paronychia', def: 'an infection of the soft tissue bordering a nail, either sudden or long-standing' },

  ],
  questions: [
    { q: 'Which term means an inability to perspire in response to heat?',
      choices: ['Anhidrosis', 'Hyperhidrosis', 'Diaphoresis', 'Hidrosis'], answer: 0,
      why: 'An- is without. Hyper- is excessive, diaphoresis is profuse sweating, and hidrosis is the normal process.' },

    { q: 'Onychomycosis affects which structure, and what causes it?',
      choices: [
        'The nail, caused by a fungus',
        'The nail, caused by bacteria',
        'The hair follicle, caused by a fungus',
        'The sebaceous gland, caused by a fungus'
      ], answer: 0,
      why: 'Onych/o is nail and myc/o is fungus. Follicle inflammation is folliculitis.' },

    { q: 'Which describes alopecia universalis?',
      choices: [
        'Complete loss of hair from every part of the body',
        'Complete loss of all scalp hair',
        'Patchy loss caused by an autoimmune attack on the follicles',
        'A receding hairline in men and thinning in women'
      ], answer: 0,
      why: 'Those are alopecia totalis, alopecia areata and androgenic alopecia.' },

    { q: 'A patient has an ingrown toenail. The term is:',
      choices: ['Onychocryptosis', 'Onycholysis', 'Onychia', 'Koilonychia'], answer: 0,
      why: 'Crypt- is hidden. Onycholysis is a nail lifting away, onychia is inflammation of the bed, koilonychia is a spooned nail.' },

    { q: 'What distinguishes a comedo from a pustule?',
      choices: [
        'A comedo is a blocked follicle with no infection; a pustule contains pus',
        'A comedo contains pus; a pustule is a blocked follicle',
        'A comedo appears only on the face',
        'They are two names for the same lesion'
      ], answer: 0,
      why: 'A whitehead is a closed comedo, a blackhead an open one. Neither is infected — that is what separates them from a pustule.' }
  ]
},

{
  id: 'mt12-lesions',
  group: 'Chapter 12',
  current: true,
  added: '2026-08-06',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 12 — Skin: Lesions, Wounds & Skin Marks',
  source: 'Chapter 12 — lecture slides',
  cards: [
    /* ---- pigmentation ---- */
    { term: 'Albinism', def: 'a genetic condition producing a deficiency or complete absence of pigment' },
    { term: 'Vitiligo', def: 'patchy loss of colour caused by destruction of the pigment-producing cells' },
    /* one condition, two names — an accepted alternative rather than a second
       card that would sit beside its own synonym in a quiz */
    { term: 'Chloasma, melasma',
      also: ['mask of pregnancy'], def: 'patchy darkening of the face during pregnancy, also called the mask of pregnancy' },
    { term: 'Lentigo', def: 'a flat brown spot on sun-exposed skin, commonly called an age spot or liver spot' },
    { term: 'Acanthosis nigricans', def: 'dark, velvety thickening in body folds, often linked to insulin resistance' },

    /* ---- bleeding into the skin ---- */
    { term: 'Contusion', def: 'an injury that pools blood beneath an unbroken surface' },
    { term: 'Ecchymosis', def: 'a large, irregular purplish patch — a bruise' },
    { term: 'Purpura', def: 'multiple purple discolorations, larger than pinpoint but smaller than a bruise' },
    { term: 'Petechiae', def: 'very small pinpoint hemorrhages' },
    { term: 'Hematoma', def: 'a pocket of clotted blood collected inside tissue, usually following an injury' },

    /* ---- surface lesions ---- */
    { term: 'Lesion', def: 'any pathologic change in tissue caused by disease or injury' },
    { term: 'Crust', def: 'dried serum and blood hardened over a healing wound — a scab' },
    { term: 'Eschar', def: 'the dark, crust-like tissue covering a full-thickness wound' },
    { term: 'Erosion', def: 'the wearing away of a surface' },
    { term: 'Macule', def: 'a flat discoloured spot under 1 cm across, such as a freckle' },
    { term: 'Nodule', def: 'a solid raised lump, deeper and firmer than a papule' },
    { term: 'Papule', def: 'a small raised red bump' },
    { term: 'Plaque', def: 'a scaly, solid raised area' },
    { term: 'Scales', def: 'flakes or dry patches shedding from the surface' },
    { term: 'Verrucae', def: 'small hard growths caused by a virus, commonly called warts' },
    { term: 'Wheal', def: 'a small itching bump, a welt; many together appear as hives' },
    { term: 'Urticaria', def: 'an outbreak of itchy welts caused by an allergic reaction, commonly called hives' },

    /* ---- fluid-filled lesions ---- */
    { term: 'Abscess', def: 'a closed pocket of pus produced by a bacterial infection' },
    { term: 'Purulent', def: 'producing or containing pus' },
    { term: 'Exudate', def: 'fluid leaking out of an infected wound' },
    { term: 'Cyst', def: 'an abnormal sac holding gas, fluid or semisolid material' },
    { term: 'Pustule', def: 'a small circumscribed lesion filled with pus — a pimple' },
    { term: 'Vesicle', def: 'a small blister of watery fluid, under 0.5 cm across' },
    { term: 'Bulla', def: 'a blister bigger than half a centimetre across' },

    /* ---- lesions through the skin ---- */
    { term: 'Abrasion', def: 'a scrape that removes the superficial layers' },
    { term: 'Fissure', def: 'a groove or crack-like break' },
    { term: 'Laceration', def: 'a wound with torn, ragged edges, or an accidental cut' },
    { term: 'Pressure ulcer',
      also: ['bedsore', 'decubitus ulcer'], def: 'an open wound caused by prolonged pressure, also called a bedsore or decubitus ulcer' },
    { term: 'Needlestick injury', def: 'an accidental puncture from a used hypodermic needle' },
    { term: 'Ulcer', def: 'an open lesion with tissue loss around its edges' },

    /* ---- birthmarks ---- */
    { term: 'Nevus', def: 'a small dark growth developing from pigment cells — a mole' },
    { term: 'Slate grey nevus', def: 'a benign blue-grey birthmark' },
    { term: 'Macular stains',
      also: ['salmon patches', 'angel kisses'], def: 'flat, red, irregularly shaped birthmarks, also called salmon patches or angel kisses' },
    { term: 'Capillary hemangioma', def: 'a raised, spongy red birthmark of clustered vessels, commonly called a strawberry mark' },
    { term: 'Port-wine stain', def: 'a flat vascular birthmark made of dilated capillaries' },

  ],
  questions: [
    { q: 'Petechiae, purpura and ecchymosis are all bleeding into the skin. Which is largest?',
      choices: ['Ecchymosis', 'Purpura', 'Petechiae', 'They are all the same size'], answer: 0,
      why: 'Smallest to largest: petechiae are pinpoint, purpura sit in between, ecchymosis is the large irregular bruise.' },

    { q: 'A vesicle and a bulla differ in what way?',
      choices: [
        'Size — a vesicle is under 0.5 cm, a bulla is larger',
        'Contents — a vesicle holds pus, a bulla holds water',
        'Depth — a vesicle is superficial, a bulla reaches the dermis',
        'Cause — a vesicle is viral, a bulla is bacterial'
      ], answer: 0,
      why: 'Both are blisters of watery fluid. Only the size separates them. A pus-filled lesion is a pustule.' },

    { q: 'Which lesion is flat rather than raised?',
      choices: ['A macule', 'A papule', 'A nodule', 'A wheal'], answer: 0,
      why: 'A freckle is the standard example of a macule. Papules, nodules and wheals are all raised.' },

    { q: 'Vitiligo results from:',
      choices: [
        'Destruction of the pigment-producing cells, leaving pale patches',
        'A genetic absence of pigment throughout the body',
        'Darkening of the face during pregnancy',
        'Flat brown spots on sun-exposed skin'
      ], answer: 0,
      why: 'Those describe albinism, chloasma and lentigines.' },

    { q: 'A pressure ulcer is caused by:',
      choices: [
        'Prolonged pressure on one area, breaking the skin open',
        'A scrape removing the superficial layers',
        'A crack-like break in the surface',
        'An accidental puncture from a used needle'
      ], answer: 0,
      why: 'Also called a decubitus ulcer or bedsore. The others are an abrasion, a fissure and a needlestick injury.' }
  ]
},

{
  id: 'mt12-conditions',
  group: 'Chapter 12',
  current: true,
  added: '2026-08-06',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 12 — Skin: Conditions, Infections & Cancer',
  source: 'Chapter 12 — lecture slides',
  cards: [
    /* ---- dermatitis and erythema ---- */
    { term: 'Contact dermatitis', def: 'a localized rash from repeated exposure to an irritant' },
    { term: 'Intertrigo', def: 'inflammation caused by two surfaces rubbing together' },
    { term: 'Eczema',
      also: ['atopic dermatitis'], def: 'an itchy inflammatory condition arising from an immune malfunction, also called atopic dermatitis' },
    { term: 'Exfoliative dermatitis', def: 'widespread scaling and shedding over the body' },
    { term: 'Pruritus', def: 'itching' },
    { term: 'Erythema infectiosum',
      also: ['fifth disease'], def: 'a viral infection producing a red, lace-like rash, also called fifth disease' },
    { term: 'Erythema multiforme', def: 'a generalized allergic reaction producing target-shaped lesions' },
    { term: 'Erythema pernio',
      also: ['chilblains'], def: 'purple-red inflammation caused by cold exposure, also called chilblains' },
    { term: 'Erythroderma', def: 'abnormal redness covering the entire body surface' },
    { term: 'Exanthem', def: 'a widespread rash, most often seen in children' },
    { term: 'Sunburn', def: 'damage to skin cells from ultraviolet exposure' },

    /* ---- general conditions ---- */
    { term: 'Dermatosis', def: 'any lesion or eruption not involving inflammation' },
    { term: 'Ichthyosis', def: 'dry, thickened, scaly skin' },
    { term: 'Lipedema', def: 'a painful build-up of fat and fluid in the tissues beneath the surface' },
    { term: 'Systemic lupus erythematosus', def: 'an autoimmune disease producing a red scaly rash across the face and upper trunk' },
    { term: 'Psoriasis', def: 'red papules covered with silvery scales' },
    { term: 'Rosacea',
      also: ['adult acne'], def: 'tiny red pimples and enlarged vessels across the face, sometimes called adult acne' },
    { term: 'Rhinophyma', def: 'overgrowth of the tissues of the nose, usually in older men with advanced rosacea' },
    { term: 'Scleroderma', def: 'an autoimmune disorder in which connective tissues thicken and harden' },
    { term: 'Xeroderma', def: 'excessively dry skin' },
    /* --- from the course notes, not on the slides --- */
    { term: 'Dermatitis', def: 'inflammation of the skin, whatever the cause' },
    { term: 'Erythema', def: 'redness caused by the capillaries widening beneath the surface' },

    /* ---- infections ---- */
    /* a three-part name nobody could type as an answer, so it earns its keep in
       flashcards and the review sheet rather than in Recall */
    { fact: true, term: 'Hand, foot and mouth disease', def: 'a viral illness producing sores in the mouth and throat with a rash on the hands and feet' },
    { term: 'Molluscum contagiosum', def: 'a viral infection producing small raised lesions' },
    { term: 'Cellulitis', def: 'an acute, rapidly spreading bacterial infection of the deeper layers' },
    { term: 'Furuncles', def: 'large, tender, swollen staphylococcal lesions, commonly called boils' },
    { term: 'Carbuncle', def: 'a cluster of connected furuncles' },
    { term: 'Gangrene', def: 'death of tissue' },
    { term: 'Impetigo', def: 'a highly contagious bacterial infection producing honey-coloured crusts' },
    { term: 'Necrotizing fasciitis', def: 'a group A strep infection destroying tissue rapidly, known popularly as flesh-eating bacteria' },
    { term: 'Pyoderma', def: 'any acute pus-forming bacterial infection of the skin' },
    { term: 'Mycosis', def: 'any condition caused by a fungus' },
    { term: 'Tinea', def: 'a fungal infection commonly called ringworm' },
    { term: 'Tinea capitis', def: 'ringworm of the scalp' },
    { term: 'Tinea corporis', def: 'ringworm on the body' },
    { term: 'Tinea cruris', def: 'ringworm of the genital area, known as jock itch' },
    { term: 'Tinea pedis', def: 'ringworm between the toes, known as athlete’s foot' },
    { term: 'Tinea versicolor', def: 'painless discoloured patches caused by a yeast overgrowth' },
    { term: 'Infestation', def: 'microscopic parasites dwelling on the outer surface of the body' },
    { term: 'Pediculosis', def: 'an infestation of lice' },
    { term: 'Pediculosis capitis', def: 'head lice' },
    { term: 'Pediculosis corporis', def: 'body lice' },
    { term: 'Pediculosis pubis', def: 'lice in the pubic region' },
    { term: 'Scabies', def: 'an infestation of itch mites that burrow into the top layer to lay eggs' },

    /* ---- growths ---- */
    { term: 'Callus', def: 'a thickened patch formed by repeated friction or pressure' },
    { term: 'Cicatrix', def: 'a normal scar' },
    { term: 'Granulation tissue', def: 'the new tissue that normally forms while a wound heals' },
    { term: 'Keloid', def: 'a scar raised or thickened well beyond the original wound' },
    { term: 'Keratosis', def: 'an overgrowth and thickening of the skin' },
    { term: 'Lipoma', def: 'a benign, slow-growing fatty tumour' },
    { term: 'Dysplastic nevi', def: 'atypical moles, irregular in shape or colour' },
    { term: 'Papilloma', def: 'a benign, superficial, wart-like growth' },
    { term: 'Polyp', def: 'a mushroom-like growth projecting from a surface' },
    { term: 'Skin tags', def: 'small flesh-coloured or light-brown polyps hanging by a fine stalk' },

    /* ---- cancer and burns ---- */
    { term: 'Actinic keratosis',
      also: ['solar keratosis'], def: 'a precancerous growth arising on sun-damaged skin, also called solar keratosis' },
    { term: 'Basal cell carcinoma', def: 'a malignant tumour of the deepest layer of the epidermis' },
    { term: 'Squamous cell carcinoma', def: 'a malignancy beginning as a lesion that looks like a sore refusing to heal, often crusted' },
    { term: 'Malignant melanoma', def: 'the most serious skin cancer, arising in the pigment-producing cells' },
    { fact: true, term: 'The ABCDE signs of melanoma',
      def: 'Asymmetry, Border irregularity, Colour variation, Diameter larger than a pencil eraser, and Evolving — changing in size, shape or shade' },
    { fact: true, term: 'What determines the severity of a burn',
      def: 'two things — how much of the body is involved, with anything past 15% counted serious, and how deep the injury reaches through the layers' },

  ],
  questions: [
    { q: 'A patient has a fungal infection between the toes. The term is:',
      choices: ['Tinea pedis', 'Tinea cruris', 'Tinea capitis', 'Tinea corporis'], answer: 0,
      why: 'Ped- is foot. Cruris is the groin, capitis the scalp, corporis the body.' },

    { q: 'Which is the most serious form of skin cancer?',
      choices: [
        'Malignant melanoma, arising in the pigment-producing cells',
        'Basal cell carcinoma, arising in the deepest epidermal layer',
        'Squamous cell carcinoma, arising in the upper epidermis',
        'Actinic keratosis, arising on sun-damaged skin'
      ], answer: 0,
      why: 'Actinic keratosis is precancerous rather than cancer. Basal cell carcinoma is the most common but rarely spreads.' },

    { q: 'Which describes a keloid?',
      choices: [
        'A scar raised or thickened well beyond the original wound',
        'A normal, flat scar',
        'The new tissue that forms while a wound heals',
        'A thickened patch caused by repeated friction'
      ], answer: 0,
      why: 'A normal scar is a cicatrix, healing tissue is granulation tissue, and a friction thickening is a callus.' },

    { q: 'What does the D stand for in the ABCDE signs of melanoma?',
      choices: [
        'Diameter larger than a pencil eraser',
        'Depth of invasion into the dermis',
        'Discolouration around the border',
        'Duration of more than six months'
      ], answer: 0,
      why: 'Asymmetry, Border irregularity, Colour variation, Diameter, Evolving.' },

    { q: 'A carbuncle is best described as:',
      choices: [
        'A cluster of connected furuncles',
        'A single large boil',
        'A rapidly spreading infection of the deeper layers',
        'A highly contagious infection producing honey-coloured crusts'
      ], answer: 0,
      why: 'Those are a furuncle, cellulitis and impetigo.' },

    { q: 'Psoriasis is recognised by:',
      choices: [
        'Red papules covered with silvery scales',
        'Tiny red pimples and enlarged vessels across the face',
        'Thickened, hardened connective tissue',
        'Dry, thickened, scaly skin over the whole body'
      ], answer: 0,
      why: 'Those describe rosacea, scleroderma and ichthyosis.' }
  ]
},

{
  id: 'mt12-procedures',
  group: 'Chapter 12',
  current: true,
  added: '2026-08-06',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 12 — Skin: Procedures & Abbreviations',
  source: 'Chapter 12 — lecture slides',
  cards: [
    /* ---- diagnostic procedures ---- */
    { term: 'Biopsy', def: 'taking a sample of living tissue so it can be examined and a diagnosis settled' },
    { term: 'Incisional biopsy', def: 'removal of only a portion of a tumour or lesion' },
    { term: 'Excisional biopsy', def: 'removal of an entire tumour or lesion together with surrounding tissue' },
    { term: 'Needle biopsy', def: 'removal of a core of tissue through a hollow needle' },
    { term: 'Exfoliative cytology', def: 'scraping cells from a surface to examine them microscopically' },
    { term: 'Exfoliation', def: 'removal of dead epidermal cells, often by sanding, sometimes for cosmetic reasons' },

    /* ---- treatment ---- */
    { term: 'Sun protection factor', def: 'the rating describing how much protection a sunscreen gives' },
    { term: 'Dermatoplasty', def: 'replacement of damaged skin with healthy tissue — a graft' },
    { term: 'Cauterization', def: 'destruction of tissue by burning' },
    { term: 'Chemabrasion', def: 'removal of the outer layers using a chemical solution — a peel' },
    { term: 'Cryosurgery', def: 'destruction of abnormal tissue by freezing' },
    { term: 'Curettage', def: 'removal of material from a surface by scraping' },
    { term: 'Debridement', def: 'cleaning a wound out — taking away dead tissue, grit and anything foreign left behind' },
    { term: 'Dermabrasion', def: 'sanding a surface smooth with a revolving wire brush or abrasive paper' },
    { term: 'Electrodesiccation', def: 'destroying tissue with an electric spark and then scraping it away' },
    { fact: true, term: 'Incision and drainage', def: 'cutting a lesion open and letting the contents out — abbreviated I&D' },
    { term: 'Mohs surgery', def: 'removing and examining tissue one layer at a time until no malignant cells remain' },
    { term: 'Phototherapy', def: 'using natural or artificial light to treat conditions such as vitiligo and eczema' },
    { term: 'Photodynamic therapy', def: 'a light-sensitizing drug activated by blue light, generating reactive oxygen that destroys the cells around it' },
    { term: 'Fluorouracil', def: 'a topical chemotherapy cream targeting fast-growing cells in basal cell carcinoma and actinic keratoses' },
    { term: 'Retinoids', def: 'a class of compounds derived from vitamin A, used against acne and sun damage' },
    { term: 'Isotretinoin', def: 'the retinoid used for severe acne, sold as Accutane' },
    { term: 'Tretinoin', def: 'the retinoid used for sun-damaged skin, acne and wrinkles' },
    { term: 'Topical steroids', def: 'hydrocortisone and stronger relatives, which can permanently thin the skin with prolonged use' },
    { term: 'Blepharoplasty', def: 'trimming away drooping lid skin, sometimes to clear the field of vision' },
    { term: 'Collagen replacement therapy', def: 'soft-tissue augmentation by injection' },
    { term: 'Electrolysis', def: 'using electric current to destroy hair follicles permanently' },
    { term: 'Lipectomy', def: 'surgical removal of fat from beneath the skin' },
    { term: 'Liposuction', def: 'suction-assisted removal of fat' },
    { term: 'Rhytidectomy', def: 'taking away slack skin and fat so wrinkles pull flat — a facelift' },
    { term: 'Sclerotherapy', def: 'injection treatment for spider veins' },

    /* ---- abbreviations ---- */
    { term: 'AK', def: 'actinic keratosis' },
    { term: 'AT', def: 'alopecia totalis' },
    { term: 'BCC', def: 'basal cell carcinoma' },
    { term: 'CD', def: 'contact dermatitis' },
    { term: 'MM', def: 'malignant melanoma' },
    { term: 'Ps', def: 'psoriasis' },
    { term: 'SCC', def: 'squamous cell carcinoma' },
    { term: 'SLE', def: 'systemic lupus erythematosus' },
    { term: 'SPF', def: 'sun protection factor' },
    { term: 'NF', def: 'necrotizing fasciitis' }
  ],
  questions: [
    { q: 'Mohs surgery is distinctive because:',
      choices: [
        'Tissue is removed and examined one layer at a time until no malignant cells remain',
        'The entire lesion is frozen before removal',
        'The lesion is destroyed with an electric spark',
        'A chemical solution dissolves the outer layers'
      ], answer: 0,
      why: 'Those others describe cryosurgery, electrodesiccation and chemabrasion.' },

    { q: 'An incisional and an excisional biopsy differ how?',
      choices: [
        'Incisional takes part of the lesion; excisional takes all of it plus surrounding tissue',
        'Incisional takes all of it; excisional takes only part',
        'Incisional uses a hollow needle; excisional uses a scalpel',
        'Incisional is diagnostic; excisional is cosmetic'
      ], answer: 0,
      why: 'A needle biopsy is the third kind — a core of tissue drawn through a hollow needle.' },

    { q: 'Which destroys tissue by freezing?',
      choices: ['Cryosurgery', 'Cauterization', 'Electrodesiccation', 'Curettage'], answer: 0,
      why: 'Cauterization burns, electrodesiccation uses an electric spark, and curettage scrapes.' },

    { q: 'What does SPF measure?',
      choices: [
        'How much protection a sunscreen provides',
        'How long a sunscreen stays on in water',
        'The percentage of skin surface a burn covers',
        'The depth of a burn through the skin layers'
      ], answer: 0 },

    { q: 'Isotretinoin and tretinoin are both:',
      choices: [
        'Retinoids, derived from vitamin A',
        'Topical steroids, derived from corticosteroid hormones',
        'Topical chemotherapy creams',
        'Photosensitizing drugs used in blue-light therapy'
      ], answer: 0,
      why: 'Isotretinoin treats severe acne; tretinoin treats sun damage, acne and wrinkles. Fluorouracil is the chemotherapy cream.' },

    { q: 'BCC, SCC and MM stand for which three, in that order?',
      choices: [
        'Basal cell carcinoma, squamous cell carcinoma, malignant melanoma',
        'Basal cell carcinoma, sebaceous cell carcinoma, malignant melanoma',
        'Benign cell carcinoma, squamous cell carcinoma, malignant mole',
        'Basal cell carcinoma, squamous cell carcinoma, molluscum'
      ], answer: 0 }
  ]
},

/* ─────────────────────────  BIO101 · ANATOMY & PHYSIOLOGY 1  ─────────────── */

{
  id: "bio-ch3",
  /* Percentages of the figure box. Two structures take a leader out to legible
     space: the nucleolus, because anything sitting inside the nucleus lands too
     close to the nucleus dot to be a separate target, and the cytoskeleton,
     because it is a hair-thin thread. The rest are big enough to point at
     directly. Positions were measured off a percent grid laid over the artwork
     and then checked by rendering the dots and looking at them — the first set
     was estimated by eye off a crop and every one of them was wrong. */
  figure: {
    name: 'cell',
    parts: [
      { id: 'Nucleus', x: 44.4, y: 27.1, about: 'the control centre, holding the cell’s DNA and directing everything it does' },
      { id: 'Nucleolus', x: 59.3, y: 41.1, to: [46.2, 33.5], about: 'the dense region inside the nucleus where ribosomes are assembled' },
      { id: 'Nuclear envelope', x: 51.3, y: 30.6, about: 'the double membrane enclosing the nucleus, pierced by pores that let material in and out' },
      { id: 'Golgi apparatus', x: 56.2, y: 16.4, about: 'the stack that modifies, sorts and packages proteins for delivery' },
      { id: 'Mitochondria', x: 30.7, y: 29.9, about: 'the sites of aerobic respiration, where most of the cell’s ATP is produced' },
      { id: 'Rough ER', x: 37.3, y: 25, about: 'the folded membrane studded with ribosomes, where proteins are made and processed' },
      { id: 'Ribosomes', x: 47.9, y: 45.5, about: 'the specks that assemble amino acids into proteins, free in the cytosol or stuck to the ER' },
      { id: 'Centrioles', x: 65.3, y: 31.6, about: 'the paired bundles of microtubules that organise the spindle during cell division' },
      { id: 'Lysosomes', x: 31.7, y: 58, about: 'sacs of digestive enzymes that break down worn-out parts and engulfed material' },
      { id: 'Vesicles', x: 67.4, y: 16.8, about: 'small membrane sacs that carry material between compartments and to the surface' },
      { id: 'Cytoplasm', x: 73, y: 28.5, about: 'everything between the membrane and the nucleus — the fluid plus the organelles suspended in it' },
      { id: 'Cell membrane', x: 18.7, y: 35.5, about: 'the selectively permeable boundary deciding what enters and leaves' },
      { id: 'Flagellum', x: 10.4, y: 89, about: 'the long whip-like tail that propels the cell' },
      { id: 'Cytoskeleton', x: 27, y: 47.4, to: [21.2, 43.1], about: 'the protein framework that holds the cell’s shape and moves organelles about' },
    ],
  },
  exam: true,
  retired: true,
  group: 'Chapter 3',

  added: "2026-07-30",
  course: "BIO101 · Anatomy & Physiology 1 Lecture",
  title: "Ch. 3 — Study Guide",
  source: "Chapter 3 — study guide slides and course notes",
  cards: [
    {"term":"Nucleus","def":"the innermost control center, enclosed by a double-layered nuclear envelope"},
    {"term":"Nuclear envelope","def":"the thin double membrane (inner + outer lipid bilayer) enclosing the nucleus"},
    {"term":"Nucleolus","def":"small dense body of RNA and protein with NO membrane — the site of ribosome production"},
    {"term":"Chromatin","def":"extremely long DNA molecules complexed with proteins, wound like thread around spools"},
    {"term":"Cytoplasm","def":"the cell contents holding the organelles, suspended in a liquid called cytosol"},
    {"term":"Cytosol","def":"the liquid in which the cytoplasmic organelles are suspended"},
    {"term":"Cell membrane","def":"the thin, flexible, elastic outermost limit of the cell separating the two major fluid compartments"},
    {"term":"Phospholipid bilayer","def":"the double layer of phospholipid molecules forming the basic framework of the cell membrane"},
    {"term":"Ribosomes","def":"tiny spherical structures of protein and RNA that SYNTHESIZE proteins"},
    {"term":"Rough ER","def":"endoplasmic reticulum studded with ribosomes — makes PROTEINS"},
    {"term":"Smooth ER","def":"endoplasmic reticulum with no ribosomes — makes FATS (lipids)"},
    {"term":"Vesicles","def":"membranous sacs that store or transport substances within a cell or between cells"},
    {"term":"Golgi apparatus","def":"a stack of 5–8 flattened sacs (cisternae) that refines, packages and transports proteins"},
    {"term":"Mitochondria","def":"the \"powerhouse\" — produces ATP by cellular respiration"},
    {"term":"ATP","def":"adenosine triphosphate — the cell’s energy currency, supplied by mitochondria"},
    {"term":"Lysosomes","def":"the \"garbage disposals\" — enzymes inside dismantle cellular debris"},
    {"term":"Autophagy","def":"literally \"eating self\" — the process by which lysosomes break down the cell’s own debris"},
    {"term":"Cilia","def":"motile extensions of the cell membrane that beat in a coordinated wave, driving mucus along the respiratory tract and moving an egg toward the uterus","note":"Built from nine groups of three microtubules, the same as a flagellum."},
    {"term":"Flagellum","def":"a motile extension of the cell membrane that whips to move the WHOLE cell","note":"The sperm tail is the only flagellum in the human body, and a cell has just one."},
    {"term":"Cytoskeleton","def":"the supporting framework inside the cell, built from thread-like microfilaments, microtubules and intermediate filaments"},
    {"term":"Centrioles","def":"build the spindle fibres during cell division, which drag the chromosomes into the daughter cells"},
    {"term":"Selectively permeable","def":"describing a barrier that lets some substances through while blocking others","note":"This is the property that lets the cell membrane regulate entry and exit."},
    {"fact":true,"term":"What the bilayer admits","def":"lipid-soluble substances cross freely; water-soluble ones cannot and need a channel or carrier"},
    {"fact":true,"term":"Cell size","def":"measured in micrometers"},
    {"fact":true,"term":"Faulty ion channels","def":"channel mutations can disturb heart rhythm, impair hearing, or cause cystic fibrosis","note":"Which ion channel goes with which condition is worth checking against the lecture slides."},
    {"term":"Cystic fibrosis","def":"caused by abnormal chloride channels — thick mucus, breathing difficulty, a clogged pancreas and salty sweat"},
    {"term":"Differentiated","def":"describing a cell that has taken on specialized characteristics"},
    {"term":"Receptors (membrane protein)","def":"respond to extracellular signals"},
    {"fact":true,"term":"Pores, channels & carriers","def":"transport small molecules and ions across the membrane","note":"They also transduce signals."},
    {"term":"Enzymes (membrane protein)","def":"catalyze chemical reactions"},
    {"term":"Cell surface proteins","def":"establish \"self\" — cellular identity"},
    {"term":"Cellular adhesion molecules","def":"enable cells to stick to each other"},
    {"term":"Diffusion","def":"PASSIVE — molecules move through the bilayer from higher to lower concentration. Energy: molecular motion. Example: O₂/CO₂ exchange in the lungs"},
    {"term":"Facilitated diffusion","def":"PASSIVE — \"helped diffusion\"; ions use channels or carrier proteins to move high → low. Example: glucose entering a cell"},
    {"term":"Osmosis","def":"PASSIVE — water moves through aquaporins/the bilayer toward the solution with more impermeant solute. Example: distilled water entering a cell"},
    {"term":"Filtration","def":"PASSIVE — smaller molecules forced through porous membranes from high to low PRESSURE. Energy: hydrostatic pressure. Example: molecules leaving blood capillaries"},
    {"term":"Active transport","def":"ACTIVE (ATP) — carrier molecules move substances from LOWER to HIGHER concentration, against the gradient"},
    {"term":"Endocytosis","def":"ACTIVE (ATP) — particles too large to diffuse are brought in by a vesicle that forms from the cell membrane"},
    {"term":"Pinocytosis","def":"ACTIVE (ATP) — \"cell drinking\"; the membrane engulfs droplets of liquid with dissolved solutes"},
    {"term":"Phagocytosis","def":"ACTIVE (ATP) — \"cell eating\"; the membrane engulfs SOLID particles. Example: a white blood cell engulfing bacteria"},
    {"term":"Receptor-mediated endocytosis","def":"ACTIVE (ATP) — the membrane engulfs selected molecules bound to receptor proteins. Example: removing LDL cholesterol particles"},
    {"term":"Exocytosis","def":"ACTIVE (ATP) — the opposite of endocytosis; vesicles fuse with the membrane and release contents outside. Example: neurotransmitter release"},
    {"term":"Transcytosis","def":"ACTIVE (ATP) — endocytosis in, through the cytoplasm, then exocytosis out the other side. Example: HIV crossing a cell layer"},
    {"term":"Isotonic solution","def":"the SAME solute concentration as the cell — equal salt inside and out, so the cell keeps its shape"},
    {"term":"Hypertonic solution","def":"a HIGHER solute concentration than body fluids — more salt outside, so water leaves and the cell SHRINKS (crenation)"},
    {"term":"Hypotonic solution","def":"a LOWER solute concentration than body fluids — less salt outside, so water enters and the cell SWELLS or bursts"},
    {"term":"Crenation","def":"the shrivelling of a cell after water leaves it in a hypertonic solution"},
    {"term":"Hemolysis","def":"the bursting of a red blood cell that has taken on too much water in a hypotonic solution"},
    {"term":"Physiological steady state","def":"concentrations of diffusing substances are unequal but STABLE — what organisms reach instead of true equilibrium"},
    {"term":"Interphase","def":"the cell grows and its genetic material replicates (before mitosis begins)"},
    {"term":"Prophase","def":"chromatin condenses into visible chromosomes; the nuclear envelope and nucleolus disperse; the spindle apparatus forms"},
    {"term":"Metaphase","def":"chromosomes align along the MIDLINE of the cell"},
    {"term":"Anaphase","def":"centromeres separate and sister chromatids are pulled apart — each is now an individual chromosome"},
    {"term":"Telophase","def":"nuclear envelopes reassemble, chromosomes decondense, the spindle disappears"},
    {"term":"Cytokinesis","def":"division of the cytoplasm into two separate cells"},
    {"term":"Stem cells","def":"cells that keep dividing repeatedly WITHOUT specializing, allowing continual growth and renewal"},
    {"term":"Self-renewal","def":"a stem cell dividing to make two new stem cells, keeping the supply topped up"},
    {"term":"Progenitor cell","def":"a partly specialized daughter of a stem cell, able to become only a RESTRICTED set of cell types"},
    {"term":"Differentiation","def":"the process guiding cell specialization, by activating and suppressing the functions of many genes"},
    {"fact":true,"term":"Cytokinesis vs mitosis","def":"mitosis divides the NUCLEUS; cytokinesis divides the CYTOPLASM into two cells"},
    {"term":"Apoptosis","def":"PROGRAMMED cell death — the planned option for a cell that does not divide or differentiate"},
    {"term":"Necrosis","def":"cell death resulting from DAMAGE (unplanned)"},
    {"fact":true,"term":"Control of cell division","def":"how often a cell divides is tightly regulated, and the rate differs from one cell type to the next"},
    {"fact":true,"term":"Cells that divide continually","def":"skin, the intestinal lining, and the blood-forming cells of the marrow"},
    {"fact":true,"term":"Neurons","def":"divide a set number of times and then stop for good"},
    {"term":"Tumor","def":"a mass produced when cell division escapes its normal controls"},
    {"term":"Benign tumor","def":"stays put in one local area"},
    {"term":"Malignant tumor","def":"invasive and cancerous — able to spread beyond its original site"},
    {"term":"Metastasize","def":"to spread from the original site to somewhere else in the body"},
    {"term":"Oncogene","def":"a faulty version of a gene that drives the cell cycle, stuck switched ON far too strongly"},
    {"term":"Tumor suppressor gene","def":"normally puts the BRAKES on mitosis; lose it or switch it off and division runs unchecked"},
    {"fact":true,"term":"The two gene types behind cancer","def":"oncogenes, which are overactive, and tumor suppressor genes, which are disabled"},

    /* --- from the full Chapter 3 lecture deck, beyond the study guide --- */
    { term: 'Osmotic pressure', def: 'the pull a solution exerts on water — it rises as the concentration of solutes that cannot cross the membrane rises, and water always moves toward the higher one' },
    { term: 'Tonicity', def: 'the power of a solution outside a cell to change the volume of water inside it' },
    { term: 'Microtubules', def: 'hollow tubes of tubulin that hold the cell’s shape, shift organelles about, and build cilia, flagella and centrioles' },
    { term: 'Peroxisomes', def: 'membranous sacs resembling lysosomes, holding enzymes that break down lipids, alcohol and hydrogen peroxide' },
    { term: 'Inclusions', def: 'stored chemicals found only in certain cell types and not required for survival — melanin granules in the epidermis, fat in fat cells' },
    { term: 'Cleavage furrow', def: 'the constriction that pinches a dividing cell into two during cytoplasmic division' },
    { term: 'Contact inhibition', def: 'the way healthy cells stop dividing once they become crowded' },
    { term: 'Telomeres', def: 'the chromosome tips that shorten with every division, acting as a mitotic clock' },
    { term: 'Selectins', def: 'adhesion proteins coating white blood cells, giving them the friction to anchor against a capillary wall' },
    { term: 'Integrins', def: 'the adhesion receptors that bind the anchoring proteins and help a white blood cell squeeze out of a capillary' },
    { fact: true, term: 'What makes a tumor malignant rather than benign',
      def: 'loss of contact inhibition, the ability to recruit its own blood supply, invasiveness, and the ability to spread' }
  ],
  questions: [
    {"q":"The cytoskeleton is built from which three thread-like structures?","choices":["Microfilaments, microtubules and intermediate filaments","Cilia, flagella and centrioles","Ribosomes, vesicles and lysosomes","Actin, keratin and collagen fibres"],"answer":0,"why":"Centrioles are separate — they build the spindle fibres during cell division, not the cytoskeleton."},
    {"q":"Which organelle has NO surrounding membrane?","choices":["The nucleolus","The Golgi apparatus","A lysosome","A mitochondrion"],"answer":0,"why":"The nucleolus is formed in specialized regions of certain chromosomes and is the site of ribosome production."},
    {"q":"Rough ER is to ___ as smooth ER is to ___.","choices":["proteins … fats","fats … proteins","ATP … proteins","fats … ATP"],"answer":0},
    {"q":"Which sequence correctly describes protein handling in the cell?","choices":["Ribosomes on rough ER synthesize it → Golgi refines and packages it → vesicles transport it","Golgi synthesizes it → ribosomes package it → lysosomes transport it","Smooth ER synthesizes it → mitochondria package it → vesicles transport it","Lysosomes synthesize it → rough ER packages it → Golgi transports it"],"answer":0},
    {"q":"Roughly how much ATP does one glucose molecule yield with oxygen, and what are the byproducts?","choices":["36–38 ATP, with CO₂ and H₂O as byproducts","2 ATP, with lactic acid as the byproduct","100 ATP, with O₂ as the byproduct","12 ATP, with glucose as the byproduct"],"answer":0},
    {"q":"Skeletal muscle cells contain many thousands of mitochondria, while a typical cell has about 1,700. Why?","choices":["Because they have very high energy requirements","Because they need extra storage for fats","Because they lack a nucleus","Because they divide more often than other cells"],"answer":0},
    {"q":"What is the single biggest difference between active transport and facilitated diffusion?","choices":["Active transport moves particles from LOW to HIGH concentration and costs ATP","Active transport uses no carrier proteins","Facilitated diffusion only moves water","Facilitated diffusion requires ATP; active transport does not"],"answer":0,"why":"Both use carriers in the membrane. Only active transport pushes against the gradient, which is why it needs energy."},
    {"q":"A red blood cell is placed in a hypertonic solution. What happens?","choices":["Water leaves the cell and it shrinks — crenation","Water enters the cell and it swells or bursts","Nothing — the cell stays the same size","The cell actively pumps solute inward"],"answer":0,"why":"The rule to hold onto: \"where salt goes, water follows.\" Hypertonic = more salt outside → water follows it out → crenation."},
    {"q":"A cell is placed in a hypotonic solution. What happens?","choices":["Water enters the cell and it swells, possibly bursting","Water leaves the cell and it shrivels","Nothing — the concentrations are already equal","The cell membrane becomes impermeable to water"],"answer":0,"why":"Hypo = less solute outside than in the cell, so water moves inward. This is the opposite of crenation."},
    {"q":"Which process is driven by hydrostatic pressure rather than molecular motion?","choices":["Filtration","Osmosis","Diffusion","Facilitated diffusion"],"answer":0,"why":"Filtration forces smaller molecules through a porous membrane from high pressure to low — the way fluid leaves a blood capillary."},
    {"q":"A white blood cell engulfing a bacterium is an example of:","choices":["Phagocytosis","Pinocytosis","Exocytosis","Filtration"],"answer":0,"why":"Phago = eating (solids). Pino = drinking (liquid droplets)."},
    {"q":"Why does diffusional equilibrium NOT normally occur in living organisms?","choices":["Organisms maintain a physiological steady state — concentrations stay unequal but stable","Molecules stop moving inside the body","Cell membranes block all diffusion","Body temperature is too high for diffusion"],"answer":0},
    {"q":"Delivering antibodies from a mother’s milk into the blood of a nursing infant is an example of:","choices":["Transcytosis","Filtration","Osmosis","Active transport"],"answer":0,"why":"Transcytosis moves material into, through, and out of a cell — bridging two different environments."},
    {"q":"Put the four phases of mitosis in order.","choices":["Prophase → Metaphase → Anaphase → Telophase","Metaphase → Prophase → Telophase → Anaphase","Anaphase → Prophase → Metaphase → Telophase","Telophase → Anaphase → Metaphase → Prophase"],"answer":0,"why":"PMAT. Interphase (growth + DNA replication) comes before all four."},
    {"q":"During which phase do chromosomes line up along the midline of the cell?","choices":["Metaphase","Prophase","Anaphase","Telophase"],"answer":0,"why":"Metaphase = Middle."},
    {"q":"What is the key difference between apoptosis and necrosis?","choices":["Apoptosis is programmed cell death; necrosis results from damage","Apoptosis results from damage; necrosis is programmed","Both are programmed; only the speed differs","Apoptosis only occurs in stem cells"],"answer":0,"why":"This distinction shows up again in cardiology — myocardial infarction kills tissue by necrosis."},
    {"q":"What is the difference between a benign and a malignant tumor?","choices":["A benign tumor stays local; a malignant one is invasive and can metastasize","A malignant tumor stays local; a benign one spreads","Benign tumors are made of oncogenes; malignant ones are not","There is no structural difference, only size"],"answer":0},
    {"q":"An oncogene and a tumor suppressor gene fail in opposite ways. Which describes it?","choices":["An oncogene is overactive; a tumor suppressor gene is inactivated","An oncogene is inactivated; a tumor suppressor gene is overactive","Both are overactive","Both are inactivated"],"answer":0,"why":"Think accelerator versus brakes: cancer can come from flooring the accelerator OR from cutting the brake line."},
    {"q":"Which cells keep dividing throughout life?","choices":["Skin, intestinal lining, and blood-forming cells","Neurons and cardiac muscle cells","Only stem cells in the marrow","None — all division stops after development"],"answer":0,"why":"Neurons are the contrast: they divide a set number of times, then stop permanently."},
    {"q":"How does a progenitor cell differ from a stem cell?","choices":["A progenitor cell is partly specialized and can become only a restricted set of cell types","A progenitor cell can become any cell type; a stem cell cannot","A progenitor cell cannot divide at all","They are two names for the same thing"],"answer":0,"why":"A stem cell self-renews and keeps every option open; a progenitor has already narrowed its choices."}
  ]
},

{
  id: 'bio-ch4',
  exam: true,
  retired: true,
  group: 'Chapter 4',

  added: '2026-07-30',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 4 — Study Guide',
  source: 'Chapter 4 — study guide slides and course notes',
  cards: [
    { term: 'Metabolism',  def: 'the sum of all the chemical reactions in the body' },
    { term: 'Cellular metabolism', def: 'the sum of the chemical reactions inside a single cell, usually organised into pathways or cycles' },
    { term: 'Anabolism',   def: 'building small molecules UP into larger ones — REQUIRES energy' },
    { term: 'Catabolism',  def: 'breaking larger molecules DOWN into smaller ones — RELEASES energy' },
    { term: '-ase',        def: 'the word ending that tells you a molecule is an enzyme' },
    { term: 'Enzyme',      def: 'speeds up a chemical reaction' },

    { term: 'Energy',      def: 'the capacity to change something — the ability to do work' },
    { fact: true, term: 'Forms of energy', def: 'heat, light, sound, electrical, mechanical and chemical' },
    { term: 'Conservation of energy', def: 'energy cannot be created or destroyed, only converted from one form into another' },
    { fact: true, term: 'Energy most metabolic reactions use', def: 'chemical energy' },
    { term: 'ATP',         def: 'adenosine triphosphate — energy in a form the cell can actually spend' },
    { fact: true, term: 'Parts of ATP',def: 'an adenine, a ribose sugar, and a chain of THREE phosphates' },
    { term: 'ADP',         def: 'adenosine diphosphate — what ATP becomes after losing its terminal phosphate, leaving TWO' },
    { term: 'Phosphorylation', def: 'attaching a third phosphate back onto ADP to rebuild ATP, paid for with energy from cellular respiration' },
    { fact: true, term: 'The ATP–ADP cycle', def: 'the two shuttle back and forth between cellular respiration and the reactions that spend energy' },

    { term: 'Cellular respiration', def: 'the process that transfers energy out of molecules and makes it available for the cell to use' },
    { fact: true, term: 'Three stages of cellular respiration', def: 'glycolysis, then the citric acid cycle, then the electron transport chain' },
    { term: 'Glycolysis',  def: '"the breaking of glucose" — the ANAEROBIC first stage, splitting one 6-carbon glucose into two 3-carbon pyruvic acid molecules' },
    { fact: true, term: 'Where glycolysis happens', def: 'in the CYTOPLASM; the product then moves into the mitochondrion' },
    { term: 'Pyruvic acid',def: 'the intermediate product of carbohydrate oxidation' },
    { term: 'Citric acid cycle', def: 'the AEROBIC second stage — the 3-carbon pyruvic acids from glycolysis enter the mitochondria separately' },
    { term: 'Electron transport chain', def: 'the AEROBIC final stage, where MOST of the ATP is produced',
      note: 'Also called oxidative phosphorylation. Two yields are in circulation: an older theoretical maximum of 36–38 ATP per glucose, and a newer figure of about 32 that subtracts the cost of shuttling NADH into the mitochondrion. Both are approximations of a range, not exact counts.' },
    { term: 'Anaerobic reactions', def: 'need no oxygen, and yield little ATP' },
    { term: 'Aerobic reactions', def: 'need oxygen, and produce most of the ATP' },
    { fact: true, term: 'Inputs of cellular respiration', def: 'a supply of glucose and oxygen' },
    { fact: true, term: 'Products of cellular respiration', def: 'carbon dioxide, water, ATP and heat' },
    { fact: true, term: 'Energy split in respiration', def: 'only about 40% of the energy released is captured as ATP — the other 60% is lost as heat' },

    { fact: true, term: 'Carbohydrate storage', def: 'hydrolysis breaks dietary carbohydrates into monosaccharides, which are then burned for energy or put into storage' },
    { term: 'Glycogen',    def: 'the storage form of excess glucose — most cells hold some, but liver and muscle hold the most' },
    { fact: true, term: 'Fat storage', def: 'excess glucose can also be converted into fat and stored in adipose tissue' },

    { term: 'DNA',         def: 'deoxyribonucleic acid — the genetic material, whose sequence stores the instructions for building proteins' },
    { fact: true, term: 'What DNA codes for', def: 'enzymes, blood proteins, antibodies, the parts a cell membrane is assembled from, and the proteins that give muscle and connective tissue their structure' },
    { term: 'Nucleotides', def: 'the building blocks that DNA is assembled from' },
    { term: 'Double helix', def: 'a ladder twisted into a spiral — the two-stranded shape DNA takes' },
    { term: 'Gene',        def: 'a stretch of DNA carrying the information for making ONE protein' },
    { term: 'Gene expression', def: 'the control over which proteins a cell makes, in what amount, and under which circumstances' },
    { term: 'Genetic information', def: 'the instructions telling cells how to construct proteins, held in the DNA sequence' },
    { fact: true, term: 'Size of the human genome', def: '3.2 billion bits of information' },
    { term: 'DNA profiling', def: 'comparing the most variable parts of the genome between individuals' },
    { fact: true, term: 'Uses of DNA profiling', def: 'identifying human remains, checking family relationships and paternity, and establishing innocence in criminal cases' },

    { term: 'DNA replication', def: 'making an exact copy of a DNA molecule so each daughter cell receives identical DNA — happens during INTERPHASE' },
    { term: 'Transcription', def: 'copying a DNA sequence onto an RNA sequence — happens in the NUCLEUS' },
    { fact: true, term: 'Steps of transcription', def: 'DNA unwinds to expose the gene, complementary mRNA nucleotides pair with the exposed bases, then the new strand is released and the DNA rewinds' },
    { term: 'mRNA',        def: 'messenger RNA — carries the genetic code from the DNA out to a ribosome' },
    { fact: true, term: 'How mRNA leaves the nucleus', def: 'through a nuclear pore, then attaches to a ribosome in the cytoplasm' },
    { term: 'Translation', def: 'reading the messenger strand three bases at a time and stringing together the amino acids it calls for — happens in the CYTOPLASM' },
    { fact: true, term: 'Where protein synthesis happens', def: 'on the ribosomes' },
    { term: 'tRNA',        def: 'transfer RNA — carries an amino acid to the ribosome and binds the mRNA to add it to the growing chain' },

    { term: 'Mutation',    def: 'a change produced when DNA replication results in an error' },
    { fact: true, term: 'Harmless mutations', def: 'some produce no effect on health at all' },
    { fact: true, term: 'Harmful mutations', def: 'change the amino acid sequence, leaving a protein nonfunctional or missing altogether' },
    { term: 'Duchenne muscular dystrophy', def: 'caused by a mutation in the gene for dystrophin — muscle cells collapse, producing severe weakness' },
    { fact: true, term: 'A beneficial mutation', def: 'rarely one helps: an incomplete receptor leaves some people protected against HIV' },
    { fact: true, term: 'How alike human genomes are', def: '99.9% of the sequence is identical between any two people' },
    { fact: true, term: 'What the varying 0.1% includes', def: 'sequences affecting health, sequences affecting appearance, and variations with no observable effect' },

    /* --- from the full Chapter 4 lecture deck, beyond the study guide --- */
    { term: 'Dehydration synthesis', def: 'joining smaller molecules into a larger one, releasing water in the process — how polysaccharides, proteins and triglycerides get built' },
    { term: 'Active site', def: 'the pocket on an enzyme whose shape decides which substrate it can recognize and hold' },
    { term: 'Substrate', def: 'the molecule an enzyme acts on',
      note: 'Many enzymes are named for theirs, with -ase on the end: lipase works on lipids.' },
    { term: 'Metabolic pathway', def: 'a chain of enzyme-controlled reactions where each product becomes the next reaction’s starting material, every step run by a different enzyme' },
    { term: 'Cofactor', def: 'a non-protein helper that switches an enzyme on, either by folding its pocket into shape or by helping it grip' },
    { term: 'Coenzyme', def: 'an organic cofactor — most are vitamins, which is why the diet has to supply them' },
    { term: 'Denaturation', def: 'the irreversible change in shape that inactivates a protein, leaving an enzyme unable to grip what it acts on' },
    { fact: true, term: 'Where ATP keeps its usable energy',
      def: 'in the high-energy bonds holding the second and third phosphates, which can be handed off quickly' },
    { term: 'Lactic acid', def: 'what pyruvic acid becomes when oxygen runs short; it builds up, shuts glycolysis down and cuts energy production' },
    { term: 'Codon', def: 'a three-base sequence on the messenger strand that specifies one amino acid' },
    { term: 'Anticodon', def: 'the matching three-base sequence on a transfer molecule, which pairs it to the right spot on the messenger strand' },
    { term: 'ATP synthase', def: 'the enzyme that takes the energy stripped from electrons and uses it to bolt a third phosphate back onto ADP' }
  ],
  questions: [
    { q: 'Which correctly pairs the two halves of metabolism?',
      choices: [
        'Anabolism builds up and requires energy; catabolism breaks down and releases energy',
        'Anabolism breaks down and releases energy; catabolism builds up and requires energy',
        'Both build molecules up; only the speed differs',
        'Both break molecules down; only the location differs'
      ], answer: 0,
      why: 'Memory hook: "A" for Assemble, "C" for Cut.' },

    { q: 'Which stage of cellular respiration is the anaerobic one?',
      choices: [
        'Glycolysis',
        'The citric acid cycle',
        'The electron transport chain',
        'Oxidative phosphorylation'
      ], answer: 0,
      why: 'Glycolysis alone runs without oxygen. The citric acid cycle and the electron transport chain are both aerobic.' },

    { q: 'Where does glycolysis take place?',
      choices: [
        'In the cytoplasm, with the product then entering the mitochondrion',
        'Inside the mitochondrion from start to finish',
        'In the nucleus',
        'On the rough endoplasmic reticulum'
      ], answer: 0 },

    { q: 'Glycolysis splits one glucose molecule into:',
      choices: [
        'Two 3-carbon pyruvic acid molecules',
        'Three 2-carbon acetyl molecules',
        'One 6-carbon pyruvic acid molecule',
        'Six 1-carbon carbon dioxide molecules'
      ], answer: 0,
      why: 'Glucose has 6 carbons, so it splits evenly into two 3-carbon pieces.' },

    { q: 'What is the difference between ATP and ADP, and what converts one to the other?',
      choices: [
        'ATP has three phosphates, ADP two; phosphorylation adds the third back',
        'ADP has three phosphates, ATP two; hydrolysis adds the third back',
        'ATP contains ribose, ADP deoxyribose; transcription converts them',
        'They are two names for the same molecule'
      ], answer: 0 },

    { q: 'Roughly how much of the energy released by cellular respiration is captured as ATP?',
      choices: [
        'About 40% — the rest is lost as heat',
        'About 90% — very little is wasted',
        'About 10% — most goes into building glycogen',
        'All of it — energy cannot be destroyed'
      ], answer: 0,
      why: 'Energy is conserved, but 60% leaves as heat rather than usable chemical energy. That heat is what keeps you warm.' },

    { q: 'Excess glucose is stored as glycogen mainly in which tissues?',
      choices: [
        'Liver and muscle',
        'Brain and kidney',
        'Skin and bone',
        'Blood and lymph'
      ], answer: 0,
      why: 'Most cells store some glycogen, but liver and muscle hold by far the most. Beyond that, the surplus becomes fat in adipose tissue.' },

    { q: 'Transcription and translation happen where, respectively?',
      choices: [
        'Transcription in the nucleus, translation in the cytoplasm',
        'Transcription in the cytoplasm, translation in the nucleus',
        'Both in the nucleus',
        'Both in the cytoplasm'
      ], answer: 0,
      why: 'The mRNA is written in the nucleus, exits through a nuclear pore, and is read at a ribosome in the cytoplasm.' },

    { q: 'What is the job of tRNA?',
      choices: [
        'To carry an amino acid to the ribosome and bind the mRNA so it can be added to the chain',
        'To carry the genetic code from DNA out to the ribosome',
        'To unwind the DNA during transcription',
        'To copy DNA during replication'
      ], answer: 0,
      why: 'mRNA carries the message; tRNA delivers the building blocks.' },

    { q: 'During which part of the cell cycle does DNA replication occur?',
      choices: ['Interphase', 'Prophase', 'Metaphase', 'Telophase'], answer: 0,
      why: 'Interphase is the growth phase where genetic material replicates — before mitosis begins.' },

    { q: 'What exactly is a gene?',
      choices: [
        'A stretch of DNA carrying the information for making one protein',
        'An entire chromosome',
        'The protein that DNA produces',
        'The double helix structure itself'
      ], answer: 0 },

    { q: 'Which sequence describes protein synthesis correctly?',
      choices: [
        'DNA → transcription → mRNA → travels to ribosome → translation → protein',
        'DNA → translation → mRNA → travels to nucleus → transcription → protein',
        'RNA → transcription → DNA → translation → protein',
        'DNA → replication → RNA → translation → protein'
      ], answer: 0 },

    { q: 'How do harmful mutations usually cause disease?',
      choices: [
        'They change the amino acid sequence, leaving a protein nonfunctional or missing',
        'They delete the entire chromosome',
        'They prevent the cell from entering interphase',
        'They convert DNA into RNA permanently'
      ], answer: 0,
      why: 'Duchenne muscular dystrophy is the example: a mutation in the dystrophin gene, so muscle cells collapse.' },

    { q: 'How much of the human genome sequence is identical between any two people?',
      choices: ['99.9%', '75%', '50%', '100%'], answer: 0,
      why: 'The 0.1% that varies covers health, appearance, and a great many differences with no observable effect at all.' }
  ]
},

/* Chapter 5 from the course notes. The notes stop partway through 5.3, so the
   connective-tissue half is only sketched here — this deck grows as they do. */
{
  /* Section 5.1. The four tissue types and the three junctions that hold cells together. Small on purpose — it is the frame the rest of the chapter hangs on. */
  id: 'bio-ch5-1',
  group: 'Chapter 5',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 5.1 — Tissue Types & Junctions',
  source: 'Chapter 5.1 — course notes',
  cards: [
    { term: 'Tissue', def: 'a group of similar cells working together on the same job' },
    { term: 'Histology', def: 'the study of tissues' },
    { term: 'Epithelial tissue', def: 'the type that protects, secretes, absorbs and excretes — covering body surfaces, lining organs and composing glands',
      note: 'Has no blood vessels of its own, divides readily, and its cells sit tightly packed.' },
    { term: 'Connective tissue', def: 'the type that binds, supports, fills spaces, stores fat and produces blood cells',
      note: 'Mostly well supplied with blood, and its cells sit far apart with extracellular matrix between them. The most abundant type by weight.' },
    { term: 'Muscle tissue', def: 'the type that generates the forces for movement, able to contract in response to a stimulus' },
    { term: 'Nervous tissue', def: 'the type that carries signals — sensing the world, then coordinating, integrating and regulating what the body does about it' },
    { fact: true, term: 'Where nervous tissue is found', def: 'the brain, the spinal cord and the nerves' },
    { term: 'Intercellular junctions', def: 'the structures forming the site of union between neighbouring cells' },
    { term: 'Tight junctions', def: 'joins where the membranes of neighbouring cells fuse outright, sealing the gap — as in the lining of the small intestine and the blood-brain barrier' },
    { term: 'Desmosome', def: 'a junction that rivets cells together like a spot weld, letting them act as one reinforced unit' },
    { term: 'Gap junctions', def: 'tubular channels letting molecules pass directly between neighbouring cells, as in cardiac muscle' }
  ],
  questions: [
    { q: 'Which tissue type has no blood vessels of its own?',
      choices: ['Epithelial', 'Connective', 'Muscle', 'Nervous'], answer: 0,
      why: 'It is fed by diffusion from the connective tissue beneath it, which is well supplied.' },
    { q: 'Carcinogens act mainly on cells that are dividing. Which tissue is therefore most vulnerable?',
      choices: [
        'Epithelium, which replaces itself continuously',
        'Nervous tissue',
        'Cartilage',
        'Dense regular connective tissue',
      ], answer: 0,
      why: 'Epithelium regenerates constantly, which is why most cancers are carcinomas. Nervous tissue is the least vulnerable, because neurons barely divide — and that is also why brain tumours usually arise from neuroglia, which do divide.' }
  ],
},

{
  /* Section 5.2, first half: what makes an epithelium, the two axes it is classified on, and the eight types. */
  id: 'bio-ch5-2',
  group: 'Chapter 5',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 5.2 — Epithelial Tissues',
  source: 'Chapter 5.2 — course notes',
  cards: [
    { term: 'Free surface',
      also: ['apical surface'], def: 'the exposed side of an epithelium, facing either the outside or an open internal space',
      note: 'Also called the apical surface.' },
    { term: 'Basement membrane', def: 'the thin extracellular layer anchoring an epithelium to the connective tissue beneath it' },
    { fact: true, term: 'How epithelium is fed without blood vessels',
      def: 'nutrients diffuse into it from the connective tissue underneath' },
    { term: 'Lumen', def: 'the hollow interior of a tubular structure such as a vessel or the intestine' },
    { term: 'Microvilli', def: 'tiny cylindrical projections that multiply the surface area available for absorption' },
    { term: 'Goblet cells', def: 'scattered secretory cells that produce mucus, which the cilia then sweep along' },
    { term: 'Keratinization', def: 'the process where cells pushed toward the surface fill with protein, harden and die, forming a dry, tough, waterproof covering' },
    { term: 'Squamous', def: 'a cell shape: flattened and scale-like, the thinnest of the three' },
    { term: 'Cuboidal', def: 'a cell shape: cube-like, about as tall as it is wide' },
    { term: 'Columnar', def: 'a cell shape: elongated, taller than it is wide' },
    { term: 'Simple', def: 'a layering pattern: one layer only, every cell touching the basement membrane and reaching the free surface' },
    { term: 'Stratified', def: 'a layering pattern: two or more layers, where only the deepest cells touch the basement membrane and only the topmost reach the free surface' },
    { term: 'Simple squamous epithelium', def: 'a single layer of thin flat cells, built for diffusion and filtration — the alveoli, capillary walls and the linings of blood and lymph vessels' },
    { term: 'Simple cuboidal epithelium', def: 'a single layer of cube-shaped cells with round central nuclei, lining kidney tubules, thyroid follicles, the ducts of certain glands and the surface of the ovaries' },
    { term: 'Simple columnar epithelium', def: 'a single layer of tall cells lining the uterus, stomach and intestines, secreting digestive fluids and absorbing nutrients' },
    { term: 'Pseudostratified columnar epithelium', def: 'looks layered but is not — every cell reaches the basement membrane while the nuclei sit at different heights; lines the respiratory passages' },
    { term: 'Stratified squamous epithelium', def: 'many layers with the outermost flattened, forming the epidermis and lining the mouth, esophagus, vagina and anal canal' },
    { term: 'Stratified cuboidal epithelium', def: 'two or three layers of cube-shaped cells lining the ducts of the mammary, sweat and salivary glands and the pancreas' },
    { term: 'Stratified columnar epithelium', def: 'several layers, tall cells on top and cube-shaped ones beneath, found in part of the male urethra and the larger ducts of excretory glands' },
    { term: 'Transitional epithelium', def: 'the stretchable lining of the bladder and ureters, bunched into several layers when relaxed and thinned out when the organ fills' },
    { term: 'Metaplasia', def: 'the replacement of one mature tissue by another — as in the airways of smokers, where the ciliated lining gives way to layers of flat cells',
      note: 'Protective but costly: the replacement has neither cilia nor mucus, so the airway loses the mechanism that sweeps debris out.' }
  ],
  questions: [
    { q: 'Simple versus stratified describes what about an epithelium?',
      choices: [
        'The number of cell layers',
        'The shape of the cells',
        'Whether it has cilia',
        'Whether it lines a duct'
      ], answer: 0,
      why: 'Shape is the other axis — squamous, cuboidal or columnar. The two combine to name each tissue.' },
    { q: 'Gas exchange in the alveoli happens across which epithelium?',
      choices: [
        'Simple squamous',
        'Simple cuboidal',
        'Stratified squamous',
        'Transitional'
      ], answer: 0,
      why: 'One layer of the flattest cells is the shortest path a gas can cross. Thin means fragile, which is why it damages easily.' },
    { q: 'Pseudostratified columnar epithelium is called "pseudo" because:',
      choices: [
        'It looks layered, but every cell actually reaches the basement membrane',
        'It has layers that come and go with stretching',
        'Its cells change shape depending on the organ',
        'It is a mix of cuboidal and columnar cells'
      ], answer: 0,
      why: 'The nuclei sit at different heights, which reads as layering. Some cells do not reach the free surface, but all of them touch the base.' },
    { q: 'Which epithelium lines the urinary bladder?',
      choices: ['Transitional', 'Simple columnar', 'Stratified squamous', 'Pseudostratified columnar'], answer: 0,
      why: 'It has to change shape as the bladder fills, and it also stops urine diffusing back into the body.' },
    { q: 'Keratinization produces what, and where does it NOT occur?',
      choices: [
        'A dry, tough waterproof covering — absent from the lining of the mouth, esophagus and vagina',
        'A layer of mucus — absent from the skin',
        'A stretchable lining — absent from the bladder',
        'A layer of cilia — absent from the respiratory tract'
      ], answer: 0,
      why: 'Those linings are stratified squamous too, but stay soft, moist and alive at the surface.' },
    { q: 'In the airways of smokers, the ciliated lining is replaced by layers of flat cells. Why does that matter?',
      choices: [
        'The replacement has neither cilia nor mucus, so debris is no longer swept out',
        'The replacement is thinner and tears more easily',
        'The replacement cannot absorb oxygen',
        'The replacement blocks the airway mechanically',
      ], answer: 0,
      why: 'Pseudostratified ciliated columnar epithelium traps particles in mucus and sweeps them up and out. Stratified squamous is tougher, but it has no cilia and no goblet cells, so the airway loses its cleaning mechanism. A protective change that costs a function.' }
  ],
},

{
  /* Section 5.2, second half. Split from the epithelia because the gland classifications are their own vocabulary — structure, then mode of secretion — and 43 cards in one deck was the complaint that prompted all this. */
  id: 'bio-ch5-3',
  group: 'Chapter 5',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 5.2 — Glandular Epithelium',
  source: 'Chapter 5.2 — course notes',
  cards: [
    { term: 'Glandular epithelium', def: 'cells specialized to produce and secrete substances, sitting within columnar or cuboidal tissue' },
    { term: 'Gland', def: 'one or more secretory cells acting together to produce a substance' },
    { term: 'Exocrine gland', def: 'one that releases its product into a duct opening onto a surface, such as the skin or the digestive lining' },
    { term: 'Endocrine gland', def: 'one that releases its product into tissue fluid or blood rather than into a duct' },
    { term: 'Unicellular gland', def: 'a single secretory cell sitting in otherwise non-secretory tissue — the goblet cell is the common example' },
    { term: 'Multicellular gland', def: 'one built from many cells, which is what most exocrine glands are' },
    { term: 'Simple gland', def: 'one whose duct runs to the surface without branching on the way' },
    { term: 'Compound gland', def: 'one whose duct branches repeatedly before it reaches the secretory portion' },
    { term: 'Tubular gland', def: 'one whose secretory portion is an epithelium-lined tube' },
    { term: 'Alveolar gland',
      also: ['acinar gland'], def: 'one whose secretory portion swells into saclike dilations',
      note: 'Also called an acinar gland.' },
    { term: 'Simple tubular gland', def: 'a straight tube opening directly onto the surface — the intestinal glands of the small intestine' },
    { term: 'Simple branched tubular gland', def: 'a branched tube whose duct is short or absent altogether — the gastric glands' },
    { term: 'Simple coiled tubular gland', def: 'a long coiled tube with a long duct — the sweat glands of the skin' },
    { term: 'Simple branched alveolar gland', def: 'one whose secretory portions swell into saclike compartments along the duct — the sebaceous glands of the skin' },
    { term: 'Compound tubular gland', def: 'one whose secretory tubules extend from branches that combine into a single duct — the bulbourethral glands' },
    { term: 'Compound alveolar gland', def: 'one built of irregularly branched tubules carrying many saclike outgrowths — the mammary glands' },
    { term: 'Merocrine glands',
      also: ['eccrine glands'], def: 'those releasing a fluid product through the cell membrane by exocytosis, the cell itself staying intact',
      note: 'Also called eccrine glands. Salivary, pancreatic and sweat glands. Most secretory cells work this way.' },
    { term: 'Apocrine glands', def: 'those that pinch off part of the cell body along with the product — the mammary glands and the wax glands of the ear canal' },
    { term: 'Holocrine glands', def: 'those releasing whole cells, which then burst to liberate what they held — the sebaceous glands of the skin' },
    { term: 'Serous fluid', def: 'a watery, slippery secretion, associated with the membranes lining the thoracic and abdominopelvic cavities' },
    { term: 'Mucus', def: 'the thick protective secretion rich in the glycoprotein mucin, produced by the linings of the digestive, respiratory and reproductive systems' },
    { term: 'Mucin', def: 'the glycoprotein that makes mucus what it is' }
  ],
  questions: [
    { q: 'An exocrine gland differs from an endocrine gland how?',
      choices: [
        'Exocrine secretes into a duct; endocrine secretes into tissue fluid or blood',
        'Exocrine secretes into blood; endocrine secretes into a duct',
        'Exocrine glands are unicellular; endocrine glands are multicellular',
        'Exocrine glands produce mucus; endocrine glands produce serous fluid'
      ], answer: 0,
      why: 'Exo- is outward, through a duct to a surface. Endo- is within — straight into the internal environment.' },
    { q: 'Merocrine, apocrine and holocrine describe:',
      choices: [
        'How much of the cell is given up during secretion',
        'The shape of the gland’s secretory portion',
        'Whether the duct branches',
        'Whether the product is watery or thick'
      ], answer: 0,
      why: 'Merocrine gives up nothing, apocrine pinches off part of the cell, holocrine sacrifices the whole cell. Sebaceous glands are the holocrine example.' }
  ],
},

{
  /* Section 5.3, first half: the cells, the three fibres, and connective tissue proper. */
  id: 'bio-ch5-4',
  group: 'Chapter 5',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 5.3 — Connective Tissues',
  source: 'Chapter 5.3 — course notes',
  cards: [
    { fact: true, term: 'The two categories of connective tissue',
      def: 'connective tissue proper, and the specialized connective tissues' },
    { term: 'Extracellular matrix', def: 'the non-cellular material filling the space between cells, made of protein fibres and ground substance, ranging from fluid to semisolid to solid' },
    { term: 'Ground substance', def: 'the non-fibrous portion of the matrix — protein, other molecules and a varying amount of fluid — filling the space around cells and fibres' },
    { term: 'Fixed cells', def: 'the connective tissue cells that reside in the tissue for a long period — fibroblasts and mast cells' },
    { term: 'Wandering cells', def: 'the connective tissue cells that appear only temporarily, in response to injury or infection — chiefly macrophages' },
    { term: 'Fibroblasts', def: 'the large star-shaped cells, commonest of the fixed cells, that secrete the fibres of the matrix',
      note: 'They multiply and step up fibre production after an injury, and they build the scar tissue that replaces damaged muscle after a heart attack.' },
    { term: 'Macrophages',
      also: ['histiocytes'], def: 'the wandering scavengers that clear foreign particles by engulfing them and defend against infection',
      note: 'Also called histiocytes. Usually attached to fibres, but able to detach and move.' },
    { term: 'Mast cells', def: 'the large fixed cells scattered through connective tissue, usually close to blood vessels, that release heparin and histamine' },
    { term: 'Heparin', def: 'the compound released by mast cells that stops blood from clotting' },
    { term: 'Histamine', def: 'the compound released by mast cells that drives the inflammatory response' },
    { term: 'Collagen fibres',
      also: ['white fibres'], def: 'thick threads of the protein that gives the body most of its structure — enormously strong under a pull, only slightly stretchy, and the bulk of ligaments and tendons',
      note: 'Also called white fibres.' },
    { term: 'Elastic fibres',
      also: ['yellow fibres'], def: 'branching threads of elastin that stretch and spring back, weaker than collagen, found in the vocal cords and airways',
      note: 'Also called yellow fibres.' },
    { term: 'Reticular fibres', def: 'thin branching threads of collagen forming delicate supporting networks in the spleen and liver' },
    { term: 'Areolar connective tissue', def: 'thin delicate membrane of mostly fibroblasts in a gel-like ground substance, sitting in the subcutaneous layer and beneath most epithelia, which it nourishes' },
    { term: 'Adipose tissue', def: 'fat-storing cells whose contents push the nucleus to one side, cushioning and insulating beneath the skin, behind the eyeballs and around the kidneys and heart' },
    { term: 'Adipocytes', def: 'the cells that store fat in droplets until their nuclei are pushed to one side' },
    { term: 'Reticular connective tissue', def: 'a supporting web of thin fibres holding up the walls of internal organs such as the liver and spleen' },
    { term: 'Dense regular connective tissue', def: 'closely packed parallel collagen, very strong against pulling, forming tendons and ligaments — poorly supplied with blood, so slow to heal' },
    { term: 'Dense irregular connective tissue', def: 'thick collagen interwoven at random so it withstands tension from any direction, forming the deep layer of skin and the wrapping around skeletal muscles' },
    { term: 'Elastic connective tissue', def: 'abundant yellow fibres giving stretch, found between the bones of the spinal column and in the walls of large arteries and airways' }
  ],
},

{
  /* Section 5.3, second half: the specialised connective tissues. Kept apart from the rest of 5.3 because the vascular contrast running through them — cartilage has no blood supply, bone is rich in it, blood IS the matrix — is easiest to see when they sit together. */
  id: 'bio-ch5-5',
  group: 'Chapter 5',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 5.3 — Cartilage, Bone & Blood',
  source: 'Chapter 5.3 — course notes',
  cards: [
    { term: 'Cartilage', def: 'a rigid specialized tissue with collagen in a gel-like matrix, giving support and framework, and serving as the model on which bone develops',
      note: 'Has no blood supply of its own and heals slowly. The perichondrium covering it supplies some nutrients.' },
    { term: 'Chondrocytes', def: 'cartilage cells, each sitting in a small chamber surrounded by matrix' },
    { term: 'Lacunae', def: 'the small chambers that house cartilage or bone cells within the matrix' },
    { term: 'Hyaline cartilage', def: 'the commonest kind, with fine collagen fibres — the ends of bones at joints, the nose, the respiratory passages and the embryonic skeleton' },
    { term: 'Elastic cartilage', def: 'the flexible kind, carrying elastic fibres in its matrix — the external ear and part of the larynx' },
    { term: 'Fibrocartilage', def: 'the toughest kind, packed with collagen and acting as a shock absorber — the intervertebral discs and the pads of the knee and pelvis' },
    { term: 'Bone',
      also: ['osseous tissue'], def: 'the most rigid connective tissue, its solid matrix of mineral salts and collagen supporting and protecting, producing blood cells, storing calcium and anchoring muscles',
      note: 'Also called osseous tissue. Comes in compact and spongy forms.' },
    { term: 'Osteocytes', def: 'bone cells, each occupying a lacuna within the solid matrix' },
    { term: 'Osteon', def: 'the cylindrical unit of compact bone — rings of matrix around a central canal, with the cells between them' },
    { fact: true, term: 'Why bone heals faster than cartilage',
      def: 'the central canals of compact bone carry blood vessels, so it is well nourished; cartilage has no blood supply at all' },
    { term: 'Blood', def: 'the connective tissue whose cells are suspended in a fluid matrix, carrying gases, defending against infection and clotting' },
    { term: 'Plasma', def: 'the fluid matrix that the cells of blood are suspended in' }
  ],
  questions: [
    { q: 'Why are shoulder, elbow and knee injuries so often slow to heal?',
      choices: [
        'Those joints are largely cartilage and dense regular connective tissue, both poorly supplied with blood',
        'Joints have no nerve supply, so damage goes unnoticed',
        'Synovial fluid keeps repair cells from reaching the injury',
        'Cartilage cells divide too quickly to organise properly',
      ], answer: 0,
      why: 'Repair depends on blood delivering cells and nutrients. Cartilage has no blood supply of its own at all — it feeds by diffusion from the perichondrium around it — and dense regular connective tissue is poorly vascular. Little blood means slow healing.' }
  ],
},

{
  /* The last three sections together. Alone they are 4, 7 and 5 cards, and a four-card deck cannot build a quiz — every card would appear as a choice on every question. */
  id: 'bio-ch5-6',
  group: 'Chapter 5',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 5.4–5.6 — Membranes, Muscle & Nervous Tissue',
  source: 'Chapter 5.4-5.6 — course notes',
  cards: [
    { term: 'Serous membranes', def: 'the linings of cavities that do not open to the outside, secreting a watery fluid that reduces friction on the organs they cover' },
    { term: 'Mucous membranes', def: 'the linings of the passages that do open to the outside — digestive, respiratory, urinary and reproductive — where goblet cells produce a protective coating' },
    { term: 'Cutaneous membrane', def: 'the covering over the whole body surface, better known as the skin' },
    { term: 'Synovial membranes', def: 'the linings of joint cavities, made entirely of connective tissue rather than including an epithelium' },
    { term: 'Excitable', def: 'responding to stimulation — the property shared by muscle tissue and nervous tissue' },
    { term: 'Muscle fibres', def: 'the elongated cells of muscle tissue, which shorten and thicken to pull on their attached ends' },
    { fact: true, term: 'How much of body weight is skeletal muscle', def: 'about 40 percent, with smooth and cardiac muscle together adding roughly another 10' },
    { term: 'Skeletal muscle tissue', def: 'long cylindrical cells with many nuclei, striated and under voluntary control, attached to bone' },
    { term: 'Smooth muscle tissue', def: 'spindle-shaped cells without striations, working involuntarily in the walls of hollow organs and blood vessels' },
    { term: 'Cardiac muscle tissue', def: 'branching striated cells joined by intercalated discs, working involuntarily and found only in the wall of the heart' },
    { term: 'Intercalated discs', def: 'the junctions joining the branching cells of heart muscle end to end' },
    { term: 'Neurons', def: 'the cells specialized for communication, conducting impulses to coordinate, integrate and regulate the body' },
    { term: 'Neuroglia', def: 'the supporting cells that nourish and hold up the impulse-conducting ones, carry on phagocytosis, and link them to blood vessels',
      note: 'Unlike neurons they divide by mitosis — which is why most brain tumours arise from these rather than from nerve cells.' },
    { term: 'Cell body, soma', def: 'the part of a nerve cell holding the nucleus and most of the organelles' },
    { term: 'Dendrites', def: 'the short, numerous, branching processes that RECEIVE stimuli',
      note: 'From dendro, “tree”. The branching is the giveaway.' },
    { term: 'Axon', def: 'the single long process that carries the signal AWAY toward other cells' }
  ],
  questions: [
    { q: 'Which description identifies cardiac muscle?',
      choices: [
        'Striated, branched, involuntary, with intercalated discs',
        'Striated, unbranched, voluntary, many nuclei per cell',
        'Unstriated, spindle-shaped, involuntary, one central nucleus',
        'Unstriated, branched, voluntary',
      ], answer: 0,
      why: 'Take them one distinguishing feature at a time: skeletal is the only voluntary type, smooth is the only one without striations, and cardiac is the only one with intercalated discs — and the only one confined to a single organ.' },
    { q: 'Which membrane is built entirely of connective tissue, with no epithelium at all?',
      choices: [
        'Synovial',
        'Serous',
        'Mucous',
        'Cutaneous',
      ], answer: 0,
      why: 'Serous, mucous and cutaneous membranes are all epithelium sitting on connective tissue. The synovial membrane lining a joint is the exception — connective tissue only.' }
  ],
},

/* Chapter 6 lecture slides. Same treatment as every other publisher deck: the
   facts are taken, the wording is written from scratch, because the slides carry
   an all-rights-reserved notice and this app is public.

   Worth knowing this overlaps Medical Terminology Chapter 12, which is also the
   integumentary system. That is not duplication to clean up — one course tests
   the anatomy and physiology, the other tests the vocabulary, and they are
   examined separately. */
{
  /* The structural half of 6.1: the three layers, the five strata, and the two dermal layers. Holds the skin diagram, which labels accessory structures filed under 6.2 as well — the figure is a map of the whole chapter and only needs one home. */
  id: 'bio-ch6-1',
  group: 'Chapter 6',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 6.1 — Skin & Its Layers',
  source: 'Chapter 6.1 — course notes',
  figure: {
    name: 'skin',
    parts: [
      { id: 'Hair shaft', x: 36, y: 14, about: 'the visible part of the hair, above the surface of the skin' },
      { id: 'Sweat pore', x: 31.7, y: 24.2, about: 'the opening where a sweat duct reaches the surface' },
      { id: 'Epidermis', x: 11, y: 19, to: [22, 31.5], about: 'the outer layer — no blood supply of its own, and the layer that keratinises' },
      { id: 'Arrector pili', x: 27, y: 48, about: 'the small muscle that pulls the follicle upright, raising a goosebump' },
      { id: 'Sebaceous gland', x: 51, y: 49, about: 'the oil gland attached to the follicle, secreting sebum onto the hair' },
      { id: 'Hair follicle', x: 66, y: 55, to: [48, 63], about: 'the sheath the hair grows inside, running down into the dermis' },
      { id: 'Hair bulb', x: 45, y: 69, about: 'the swollen base of the follicle, where the hair is actually made' },
      { id: 'Dermis', x: 56, y: 62, about: 'the layer holding the vessels, nerves, glands and follicles' },
      { id: 'Lamellated corpuscle', x: 10, y: 59, about: 'the onion-layered receptor for deep pressure and vibration, sitting deep in the dermis' },
      { id: 'Tactile corpuscle', x: 90, y: 36, about: 'the receptor for light touch, sitting just under the epidermis' },
      { id: 'Sweat gland', x: 82, y: 67, about: 'the coiled gland deep in the skin that produces perspiration' },
      { id: 'Subcutaneous layer', x: 20, y: 73, about: 'the fatty layer beneath the dermis, insulating the body and storing energy' },
      { id: 'Nerve fiber', x: 12, y: 46, to: [17, 62], about: 'the threads carrying sensation from the skin back to the spinal cord' },
      { id: 'Artery', x: 29, y: 86, about: 'the vessel bringing oxygenated blood up into the skin' },
    ],
  },
  cards: [
    { term: 'Integumentary system', def: 'the skin together with its accessory structures — hair, nails, glands and sensory receptors' },
    { fact: true, term: 'The two layers of the skin', def: 'the epidermis on the outside and the dermis beneath it' },
    { term: 'Epidermis', def: 'the outer layer, built of stratified squamous epithelium and carrying no blood vessels of its own' },
    { term: 'Dermis', def: 'the inner layer, thicker than the one above, holding connective tissue, muscle, blood and nervous tissue' },
    { term: 'Subcutaneous layer',
      also: ['hypodermis'], def: 'the insulating layer of areolar and adipose tissue beneath the skin, carrying the vessels that supply it',
      note: 'Also called the hypodermis. Not counted as part of the skin itself.' },
    { term: 'Stratum basale', def: 'the deepest epidermal layer — a single row of dividing cuboidal or columnar cells, and where the pigment cells live' },
    { term: 'Stratum spinosum', def: 'the many-layered stratum above the deepest, its cells holding large oval nuclei and beginning to build keratin' },
    { term: 'Stratum granulosum', def: 'a band of three to five flattened layers, grainy with shrunken protein fibres, the nuclei already shrivelling' },
    { term: 'Stratum lucidum', def: 'the clear stratum found only in thick skin, on the soles and palms, where nuclei and organelles are no longer visible' },
    { term: 'Stratum corneum', def: 'the outermost stratum — many layers of dead, flattened, keratinized cells with no nuclei, continually shed' },
    { term: 'Keratinocytes', def: 'the epidermal cells that flatten and die as they are pushed away from their blood supply' },
    { term: 'Keratinization', def: 'the hardening and drying that fills a cell with tough protein as it migrates toward the surface' },
    { term: 'Dermal papillae', def: 'the projections between the ridges above them, which form fingerprints' },
    { term: 'Papillary layer', def: 'the thinner, superficial half of the dermis, made of areolar connective tissue' },
    { term: 'Reticular layer', def: 'the thicker, deeper half of the dermis, made of dense irregular connective tissue' },
    { term: 'Lamellated corpuscles',
      also: ['Pacinian corpuscles'], def: 'the dermal receptors that register pressure',
      note: 'Also called Pacinian corpuscles.' },
    { term: 'Tactile corpuscles',
      also: ['Meissner’s corpuscles', 'Meissner\'s corpuscles'], def: 'the dermal receptors that register light touch',
      note: 'Also called Meissner’s corpuscles.' },
    { term: 'Intradermal injection', def: 'an injection given into the skin itself' },
    { term: 'Subcutaneous injection', def: 'an injection given through a hollow needle into the fatty layer beneath the skin',
      note: 'Absorbed faster than an intradermal one, because that layer is richly supplied with blood vessels while the epidermis has none at all.' }
  ],
  questions: [
    { q: 'Which layer of the epidermis is the only one whose cells divide?',
      choices: ['Stratum basale', 'Stratum corneum', 'Stratum granulosum', 'Stratum lucidum'], answer: 0,
      why: 'It is the deepest, closest to the dermal blood supply. Everything above it is on a one-way trip outward, flattening and dying as it goes.' },
    { q: 'Which stratum is found ONLY in thick skin?',
      choices: ['Stratum lucidum', 'Stratum spinosum', 'Stratum granulosum', 'Stratum basale'], answer: 0,
      why: 'Palms and soles only.' },
    { q: 'The subcutaneous layer is:',
      choices: [
        'Beneath the dermis, and not counted as part of the skin',
        'Between the epidermis and dermis',
        'The deepest layer of the epidermis',
        'The outermost layer of the dermis'
      ], answer: 0,
      why: 'Also called the hypodermis. It insulates and carries the vessels that supply the skin above it.' }
  ],
},

{
  /* The rest of 6.1: what lives in the epidermis besides keratinocytes, what decides skin colour, and the conditions that follow from those cells misbehaving. */
  id: 'bio-ch6-2',
  group: 'Chapter 6',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 6.1 — Pigment, Cells & Skin Conditions',
  source: 'Chapter 6.1 — course notes',
  cards: [
    { term: 'Melanocytes', def: 'the pigment-producing cells of the deepest epidermal layer, whose product is passed to neighbouring cells to shield their DNA' },
    { term: 'Eumelanin', def: 'the brownish-black pigment of the epidermis' },
    { term: 'Pheomelanin', def: 'the reddish-yellow pigment found in certain areas' },
    { term: 'Dendritic cells',
      also: ['Langerhans cells'], def: 'phagocytes sitting in the spiny stratum, defending the skin and the tissue beneath it from infection',
      note: 'Also called Langerhans cells.' },
    { term: 'Tactile cells',
      also: ['Merkel cells'], def: 'sensory receptors in the deepest stratum that register light touch, working with nerve endings in the layer below',
      note: 'Also called Merkel cells.' },
    { fact: true, term: 'Why people differ in skin colour',
      def: 'not the NUMBER of pigment cells, which is the same in everyone, but how much pigment they make and how it is distributed — under genetic control' },
    { fact: true, term: 'Physiological factors that change skin colour',
      def: 'how oxygenated the dermal blood is, whether those vessels are dilated or constricted, dietary carotene, and jaundice' },
    { term: 'Cyanosis', def: 'the bluish cast the skin takes on when its blood is poorly oxygenated' },
    { term: 'ABCDE rule', def: 'the five warning signs of melanoma: asymmetry, an irregular border, more than one colour, a diameter over 6 mm, and evolution or change' },
    { term: 'Calluses', def: 'the thickened areas raised on palms and soles where skin is rubbed or pressed regularly, from increased cell division' },
    { term: 'Corns', def: 'the keratinized conical masses that form on the toes' },
    { term: 'Psoriasis', def: 'the chronic disease in which epidermal cells divide about seven times faster than normal, leaving bright red patches under silvery scales',
      note: 'The scales are the excess keratinized cells. Treated with drugs that block tumor necrosis factor, an inflammatory protein.' },
    { term: 'Pressure ulcer',
      also: ['decubitus ulcer', 'bedsore'], def: 'the breakdown that follows when body weight presses skin against a surface long enough to cut off its blood supply, killing the tissue',
      note: 'Also called a decubitus ulcer or bedsore. Forms over bony points — hip, heel, elbow, shoulder. Prevented by shifting position often, massaging those areas, motorised beds, clean skin, good diet and not smoking.' }
  ],
  questions: [
    { q: 'Two people differ in skin colour. What differs between them?',
      choices: [
        'How much pigment their melanocytes produce, not how many melanocytes they have',
        'The number of melanocytes in the epidermis',
        'The thickness of the stratum corneum',
        'The number of layers in the dermis'
      ], answer: 0,
      why: 'Everyone has roughly the same number of pigment cells. Output and distribution are what vary, and both are under genetic control.' }
  ],
},

{
  /* Nails, hair and glands. Everything the skin grows rather than everything it is. */
  id: 'bio-ch6-3',
  group: 'Chapter 6',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 6.2 — Accessory Structures',
  source: 'Chapter 6.2 — course notes',
  cards: [
    { term: 'Nail plate', def: 'the visible keratinized portion lying over the bed beneath it' },
    { term: 'Nail bed', def: 'the skin surface lying directly beneath the visible part of a nail' },
    { term: 'Nail matrix', def: 'the hidden growth region at the proximal end of the bed, where new cells are produced' },
    { term: 'Free edge', def: 'the part of the nail plate that extends past the bed it grew over' },
    { term: 'Hair follicle', def: 'the tube-like depression of epidermal cells, reaching down into the dermis, from which a strand develops' },
    { term: 'Hair bulb', def: 'the deepest part of the root, holding the dividing cells that build the strand' },
    { term: 'Hair shaft', def: 'the portion extending beyond the surface, made of dead epidermal cells' },
    { term: 'Hair papilla', def: 'the projection carrying the blood vessels that nourish a growing strand' },
    { term: 'Hair bulge', def: 'the region near the bottom of a follicle where its epidermal stem cells originate' },
    { fact: true, term: 'What determines hair colour', def: 'the type and amount of melanin present' },
    { term: 'Arrector pili', def: 'the small muscle attached to a follicle that contracts in cold or fear, raising goosebumps' },
    { fact: true, term: 'Where hair does not grow',
      def: 'the palms, the soles, the lips, the nipples and parts of the external reproductive organs' },
    { term: 'Sebaceous glands', def: 'holocrine glands beside the hair follicles, producing an oily mix of fat and cell debris that keeps hair and skin soft and waterproof',
      note: 'Absent from the palms and soles. Excess output is what produces acne.' },
    { term: 'Eccrine glands',
      also: ['merocrine glands'], def: 'the most numerous sweat glands, opening onto the surface through pores and responding to a rise in body temperature',
      note: 'Also called merocrine glands. Their secretion is mostly water with some salts and waste, and it is odourless.' },
    { term: 'Apocrine sweat glands', def: 'the sweat glands of the armpit and groin, opening into hair follicles and responding to emotion and pain rather than heat',
      note: 'Their secretions are the ones that develop an odour. Despite the name they secrete by exocytosis.' },
    { term: 'Ceruminous glands', def: 'modified sweat glands of the ear canal that produce wax' },
    { fact: true, term: 'How sweat helps protect the skin', def: 'it is slightly acidic, which inhibits the growth of certain microorganisms' }
  ],
  questions: [
    { q: 'Which glands respond to emotion rather than to heat?',
      choices: ['Apocrine sweat glands', 'Eccrine sweat glands', 'Sebaceous glands', 'Ceruminous glands'], answer: 0,
      why: 'Eccrine glands answer to a rise in temperature. Apocrine glands sit in the armpit and groin, open into follicles, and their secretions are the ones that develop odour.' }
  ],
},

{
  /* What the skin does. The four routes of heat loss are the part worth drilling — they are easy to name and easy to mix up. */
  id: 'bio-ch6-4',
  group: 'Chapter 6',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 6.3 — Skin Functions & Temperature',
  source: 'Chapter 6.3 — course notes',
  cards: [
    { fact: true, term: 'The five functions of the skin',
      def: 'a protective barrier, sensation, excretion of some wastes, the start of vitamin D production, and regulation of body temperature' },
    { term: 'Dehydrocholesterol', def: 'the precursor made by skin cells that sunlight converts into an inactive form of vitamin D' },
    { fact: true, term: 'How vitamin D becomes active', def: 'sunlight converts the skin’s precursor into an inactive form, then the liver and kidneys modify that into the active vitamin' },
    { fact: true, term: 'Normal deep body temperature',
      def: 'about 37 degrees Celsius, or 98.6 Fahrenheit, held to a set point monitored by the hypothalamus' },
    { term: 'Radiation', def: 'the main route of heat loss — infrared rays travelling from warmer skin into cooler surroundings' },
    { term: 'Conduction', def: 'heat moving from the skin directly into a cooler object it touches' },
    { term: 'Convection', def: 'heat carried away from the skin by moving air' },
    { term: 'Evaporation', def: 'heat carried off as sweat turns to vapour' },
    { fact: true, term: 'What the body does when it overheats',
      def: 'thermoreceptors signal the hypothalamus, the dermal vessels dilate while the deep ones constrict, and the sweat glands switch on' },
    { term: 'Hyperthermia', def: 'body temperature ABOVE 101°F — the skin turns dry and the person becomes weak, dizzy and nauseous with a rapid pulse' },
    { term: 'Hypothermia', def: 'body temperature BELOW 95°F, progressing through shivering to confusion, lethargy and loss of consciousness' },
    { term: 'Pyrogens', def: 'substances released by phagocytes that push the hypothalamic set point up, producing a fever that helps destroy pathogens' }
  ],
  questions: [
    { q: 'What is the PRIMARY route by which the skin loses heat?',
      choices: ['Radiation', 'Conduction', 'Convection', 'Evaporation'], answer: 0,
      why: 'Infrared rays travelling from warm skin to cooler surroundings. The others contribute, and evaporation takes over when the air is as warm as you are.' },
    { q: 'A fever differs from hyperthermia how?',
      choices: [
        'In fever the set point itself is raised deliberately; in hyperthermia the set point is normal and the body cannot keep up',
        'Fever is always more dangerous than hyperthermia',
        'Hyperthermia is caused by infection, fever by heat exposure',
        'They are two names for the same thing'
      ], answer: 0,
      why: 'Phagocytes release pyrogens and the hypothalamus raises the target, which helps destroy pathogens. In hyperthermia the target never moved — heat simply built up faster than it could be shed.' }
  ],
},

{
  /* Healing, burns and life-span changes together: one deck about the skin being damaged and the skin wearing out. */
  id: 'bio-ch6-5',
  group: 'Chapter 6',
  current: true,
  added: '2026-08-10',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 6.4 — Wounds, Burns & Ageing',
  source: 'Chapter 6.4 - Life-Span Changes — course notes',
  cards: [
    { term: 'Inflammation', def: 'the normal response to injury — vessels widen and leak fluid into the damaged tissue, leaving it red, swollen, warm and painful' },
    { fact: true, term: 'How a deep cut heals',
      def: 'a clot of fibrin, blood cells and platelets forms and dries into a scab; epithelial cells multiply to fill the gap while fibroblasts lay down collagen, and phagocytes clear the debris before the scab falls away' },
    { term: 'Scar', def: 'the raised mass left where excess collagen fibres formed during healing' },
    { term: 'Superficial partial-thickness burn', def: 'a burn injuring only the outer layer, as sunburn does — red, hot and inflamed, healing in days to weeks with no scarring',
      note: 'First degree.' },
    { term: 'Deep partial-thickness burn', def: 'a burn destroying the outer layer and some of the one beneath, often blistering; stem cells surviving in follicles and glands regenerate the surface',
      note: 'Second degree.' },
    { term: 'Full-thickness burn', def: 'a burn destroying both layers and the accessory structures, healing only from the margins and usually needing a graft',
      note: 'Third degree.' },
    { term: 'Autograft', def: 'skin moved from elsewhere on the patient’s own body — the permanent repair for a full-thickness burn' },
    { term: 'Allograft', def: 'skin from another person, used only as a TEMPORARY cover until an autograft can be done' },
    { term: 'Botox', def: 'the toxin from Clostridium botulinum — the bacterium behind a form of food poisoning — used to smooth facial wrinkles' },
    { term: 'Why skin wrinkles and sags with age', fact: true, def: 'the dermis loses collagen and elastic fibres, so the skin thins and no longer springs back',
      note: 'Sun exposure accelerates all of it — which is why the change shows first on the face, neck and hands.' },
    { term: 'Why hair turns grey', fact: true, def: 'melanocytes die off and the ones remaining produce less melanin, so less pigment reaches the hair' },
    { term: 'Why older skin is drier', fact: true, def: 'the sebaceous glands become less active, so less sebum reaches the surface' },
    { term: 'Why the elderly tolerate cold poorly', fact: true, def: 'the subcutaneous fat layer thins, and that layer is the body’s insulation',
      note: 'The same loss makes bony points more prone to pressure ulcers.' },
    { term: 'Why the elderly overheat more easily', fact: true, def: 'sweat glands decline in number and activity, so evaporative cooling is less effective' },
    { term: 'Age spots',
      also: ['liver spots'], def: 'the flat pigmented patches that appear on sun-exposed skin with age, from melanocytes clustering unevenly',
      note: 'Also called liver spots, though they have nothing to do with the liver.' },
    { term: 'Why wounds heal more slowly with age', fact: true, def: 'cell division slows, circulation to the skin decreases, and fewer immune cells are on hand' }
  ],
  questions: [
    { q: 'A second-degree burn is best described as:',
      choices: [
        'Destroying the epidermis and part of the dermis, often blistering',
        'Injuring only the epidermis, like sunburn',
        'Destroying epidermis, dermis and accessory structures',
        'Affecting only the subcutaneous layer'
      ], answer: 0,
      why: 'It usually recovers without scarring, because stem cells surviving in the follicles and glands regenerate the surface.' },
    { q: 'Why does a full-thickness burn usually need a graft?',
      choices: [
        'The accessory structures are destroyed, so there are no stem cells left to regenerate skin',
        'The burn is too painful to heal naturally',
        'The subcutaneous layer cannot produce collagen',
        'Inflammation is absent in third-degree burns'
      ], answer: 0,
      why: 'Follicles and glands are the reservoir a partial-thickness burn heals from. Lose them and healing can only creep in from the margins.' }
  ],
},

/* ─────────────────────────  M103 · MEDICAL PROCEDURES  ──────────────────── */

/* Placed first in the course because the EKG decks all assume this anatomy —
   which chamber a valve sits between, and which way the blood is going. */
{
  id: 'heart-anatomy',
  group: 'The Heart',

  added: '2026-08-03',
  course: 'M103 · Medical Procedures',
  title: 'The Heart — Anatomy & Blood Flow',
  source: 'The Circulatory System — lecture notes',
  /* Positions are percentages of the 650x650 diagram, so they hold at any size.
     The four valves used to be pushed out into open space with leader lines,
     because a dot as wide as the hotspot then was covered the leaflet it was
     meant to mark. Now that the ring is drawn smaller than its hit area, each
     valve dot sits on its own cusp — which is what the question is actually
     asking for — and none of them collide. */
  figure: {
    name: 'heart',
    parts: [
      { id: 'Superior vena cava', x: 29.2, y: 16.6,
        about: 'brings deoxygenated blood down from the head, neck and arms into the right atrium' },
      { id: 'Inferior vena cava', x: 28.8, y: 86.2,
        about: 'brings deoxygenated blood up from the trunk and legs into the right atrium' },
      { id: 'Aorta', x: 40.3, y: 17.2,
        about: 'carries oxygenated blood from the left ventricle out to the body; the branches off its arch supply the head and arms' },
      { id: 'Pulmonary trunk', x: 46.2, y: 36.6,
        about: 'carries deoxygenated blood from the right ventricle to the lungs, dividing into a left and a right pulmonary artery' },
      { id: 'Pulmonary veins', x: 19.1, y: 44.8,
        about: 'return oxygenated blood from the lungs to the left atrium — the only veins in the body carrying oxygenated blood' },
      { id: 'Right atrium', x: 32.9, y: 50.8,
        about: 'receives deoxygenated blood from the whole body through the venae cavae and the coronary sinus' },
      { id: 'Right ventricle', x: 46.2, y: 74.8,
        about: 'pumps deoxygenated blood the short distance to the lungs, so its wall is thinner than the left' },
      { id: 'Left atrium', x: 66.2, y: 46.2,
        about: 'receives oxygenated blood back from the lungs through the four pulmonary veins' },
      { id: 'Left ventricle', x: 67.1, y: 68.9,
        about: 'pumps oxygenated blood to the entire body, which is why its wall is the thickest of the four chambers' },
      { id: 'Tricuspid valve', x: 36.9, y: 72.3,
        about: 'the atrioventricular valve on the RIGHT — blood crosses it leaving the right atrium' },
      { id: 'Mitral valve', x: 65.0, y: 53.8,
        about: 'the atrioventricular valve on the LEFT, also called the bicuspid valve' },
      { id: 'Pulmonic valve', x: 44.3, y: 58.1,
        about: 'the semilunar valve guarding the way out of the right ventricle into the pulmonary trunk' },
      { id: 'Aortic valve', x: 55.2, y: 59.6,
        about: 'the semilunar valve guarding the way out of the left ventricle into the aorta' },
      { id: 'Interventricular septum', x: 61.5, y: 79.4,
        about: 'the muscular wall separating the right ventricle from the left' },
    ],
  },
  cards: [
    { term: 'Endocardium', def: 'the innermost layer of the heart wall — the smooth lining in direct contact with the blood inside the chambers' },
    { term: 'Myocardium', def: 'the thick middle layer of the heart wall — the cardiac muscle that does the actual contracting' },
    { term: 'Epicardium', def: 'the outermost layer of the heart wall, covering its external surface' },
    { term: 'Atrium', def: 'an upper receiving chamber of the heart — there are two, one on each side' },
    { term: 'Ventricle', def: 'a lower pumping chamber of the heart — there are two, one on each side' },
    { term: 'Septum', def: 'the muscular wall dividing the right side of the heart from the left' },

    { term: 'Tricuspid valve', def: 'the atrioventricular valve on the RIGHT side, sitting between the right atrium and the right ventricle' },
    { term: 'Mitral valve', def: 'the atrioventricular valve on the LEFT side, sitting between the left atrium and the left ventricle',
      note: 'Also called the bicuspid valve — two cusps rather than three.' },
    { term: 'Pulmonic valve', def: 'the semilunar valve the right ventricle ejects through, at the mouth of the main pulmonary artery' },
    { term: 'Aortic valve', def: 'the semilunar valve the left ventricle ejects through, at the mouth of the aorta' },
    { fact: true, term: 'The atrioventricular valves',
      def: 'the tricuspid on the right and the mitral (bicuspid) on the left — the two valves between an atrium and its ventricle' },
    { fact: true, term: 'The semilunar valves',
      def: 'the pulmonic and the aortic — the two valves guarding the exits out of the ventricles' },

    { term: 'Pulmonic circulation', def: 'the circuit driven by the RIGHT side of the heart, carrying deoxygenated blood to the lungs under low pressure' },
    { term: 'Systemic circulation', def: 'the circuit driven by the LEFT side of the heart, carrying oxygenated blood out to the body under much higher pressure' },
    { fact: true, term: 'Why the left ventricle is the thickest chamber',
      def: 'it drives the systemic circulation against far higher pressure, while the right side only has to push blood as far as the lungs' },

    { term: 'Superior vena cava', def: 'the great vein returning deoxygenated blood from the head, neck and arms to the right atrium' },
    { term: 'Inferior vena cava', def: 'the great vein returning deoxygenated blood from the trunk and legs to the right atrium' },
    { term: 'Coronary sinus', def: 'the large cardiac vein returning blood from the heart muscle itself, opening directly into the right atrium' },
    { term: 'Coronary arteries', def: 'the vessels branching off the aorta that supply the heart muscle itself with oxygenated blood' },
    { term: 'Pulmonary veins', def: 'the four veins carrying oxygenated blood from the lungs back to the left atrium',
      note: 'The only veins in the body carrying oxygenated blood — veins are defined by flowing TOWARD the heart, not by what they carry.' },
    { fact: true, term: 'The three openings into the right atrium',
      def: 'superior vena cava, inferior vena cava and coronary sinus — three separate inlets side by side, not a chain feeding one into the next' },

    { fact: true, term: 'Path of blood through the heart',
      def: 'vena cavae → right atrium → tricuspid valve → right ventricle → pulmonic valve → pulmonary artery → lungs → pulmonary veins → left atrium → mitral valve → left ventricle → aortic valve → aorta → body' }
  ],
  questions: [
    { q: 'Blood leaving the right ventricle passes through which valve?',
      choices: ['The pulmonic valve', 'The tricuspid valve', 'The aortic valve', 'The mitral valve'], answer: 0,
      why: 'The tricuspid sits BEFORE the right ventricle, on the way in. The pulmonic guards the way out, into the pulmonary artery.' },

    { q: 'Which vessels carry OXYGENATED blood into the heart?',
      choices: [
        'The pulmonary veins, returning from the lungs to the left atrium',
        'The venae cavae, returning from the body to the right atrium',
        'The coronary arteries, returning from the myocardium',
        'The pulmonary artery, returning from the lungs'
      ], answer: 0,
      why: 'A vein is any vessel running toward the heart, whatever it carries. The pulmonary veins are the exception that proves it — oxygenated blood, but still veins.' },

    { q: 'How does blood from the coronary sinus reach the right atrium?',
      choices: [
        'It empties straight into the right atrium through its own opening',
        'It drains into the superior vena cava first, then into the right atrium',
        'It drains into the inferior vena cava first, then into the right atrium',
        'It returns through the pulmonary veins'
      ], answer: 0,
      why: 'The right atrium has three separate inlets — superior vena cava, inferior vena cava and coronary sinus. The coronary sinus is the myocardium’s own venous drainage and arrives independently, near the tricuspid opening.' },

    { q: 'Why is the myocardium thicker on the left side of the heart?',
      choices: [
        'The left side pumps against the higher pressure of the systemic circulation',
        'The left side holds a larger volume of blood',
        'The left side has to pump oxygenated blood, which is heavier',
        'The left side contains more of the conduction system'
      ], answer: 0 },

    { q: 'The tricuspid and mitral valves are classed together as:',
      choices: ['The atrioventricular valves', 'The semilunar valves', 'The coronary valves', 'The pulmonary valves'], answer: 0,
      why: 'Each sits between an atrium and its ventricle. The semilunar pair — pulmonic and aortic — guard the exits out of the ventricles instead.' },

    { q: 'Which sequence is correct?',
      choices: [
        'Right ventricle → pulmonic valve → pulmonary artery → lungs',
        'Right ventricle → pulmonary vein → lungs → pulmonic valve',
        'Right ventricle → tricuspid valve → pulmonary artery → lungs',
        'Right ventricle → aortic valve → aorta → lungs'
      ], answer: 0 },

    { q: 'The right side of the heart drives which circulation, at what pressure?',
      choices: [
        'Pulmonic circulation, at low pressure',
        'Systemic circulation, at low pressure',
        'Pulmonic circulation, at high pressure',
        'Systemic circulation, at high pressure'
      ], answer: 0 },

    { q: 'Which layer of the heart wall is in direct contact with the blood in the chambers?',
      choices: ['The endocardium', 'The myocardium', 'The epicardium', 'The pericardium'], answer: 0,
      why: 'Endo- means within. The myocardium is the muscle in the middle, the epicardium the outer surface.' }
  ]
},

{
  id: 'blood-flow',
  group: 'The Heart',

  added: '2026-08-03',
  course: 'M103 · Medical Procedures',
  title: 'The Heart — Trace a Drop of Blood',
  source: 'The Circulatory System — lecture notes',
  /* A sequence rather than a vocabulary list, so this gets the "Put in Order"
     mode. The pathway is the one thing here that is genuinely ORDERED, and
     dragging it into sequence tests it far better than reciting it as a card.

     The coronary sinus is deliberately NOT a step. It drains the heart muscle
     straight into the right atrium alongside the venae cavae, so putting it in
     a single-file chain would rebuild the exact error flagged in Notes Check —
     it lives in the detail on step 2 instead. */
  steps: [
    { text: 'Deoxygenated blood returns from the body through the superior and inferior venae cavae.',
      detail: 'Superior vena cava from the head, neck and arms; inferior vena cava from the trunk and legs.' },
    { text: 'It empties into the right atrium.',
      detail: 'Three separate openings feed this chamber — the two venae cavae, plus the coronary sinus returning blood from the heart muscle itself. They arrive side by side, not one through another.' },
    { text: 'It passes through the tricuspid valve.',
      detail: 'The atrioventricular valve of the right side. Three cusps — hence tri-.' },
    { text: 'It fills the right ventricle.' },
    { text: 'The right ventricle contracts, ejecting blood through the pulmonic valve.',
      detail: 'A semilunar valve, guarding the way out of the ventricle.' },
    { text: 'Blood travels along the main pulmonary artery.',
      detail: 'The one artery in the body carrying deoxygenated blood — an artery is defined by leading AWAY from the heart, not by what it carries.' },
    { text: 'It reaches the lungs and picks up oxygen.',
      detail: 'Gas exchange at the alveolar capillaries. This is the whole point of the pulmonic circulation, which the RIGHT side of the heart drives at low pressure.' },
    { text: 'Oxygenated blood returns through the four pulmonary veins.',
      detail: 'The only veins in the body carrying oxygenated blood — a vein is defined by running TOWARD the heart.' },
    { text: 'It empties into the left atrium.' },
    { text: 'It passes through the mitral valve.',
      detail: 'The atrioventricular valve of the left side, also called the bicuspid valve — two cusps rather than three.' },
    { text: 'It fills the left ventricle.',
      detail: 'The thickest-walled chamber, because it drives the systemic circulation against far higher pressure than the right side ever meets.' },
    { text: 'The left ventricle contracts, ejecting blood through the aortic valve.',
      detail: 'The other semilunar valve.' },
    { text: 'Blood enters the ascending aorta.',
      detail: 'The coronary arteries branch off here, at the very base — the heart feeds itself first.' },
    { text: 'It rounds the aortic arch and out into the systemic circulation.' }
  ],
  questions: [
    { q: 'Which valve does blood cross immediately BEFORE entering the right ventricle?',
      choices: ['The tricuspid valve', 'The pulmonic valve', 'The mitral valve', 'The aortic valve'], answer: 0,
      why: 'The tricuspid is the way in, from the right atrium. The pulmonic is the way out, into the pulmonary artery.' },

    { q: 'The pulmonary ARTERY is unusual because:',
      choices: [
        'It is an artery carrying deoxygenated blood',
        'It is an artery carrying blood toward the heart',
        'It is the only artery without a valve at its opening',
        'It carries blood at higher pressure than the aorta'
      ], answer: 0,
      why: 'Artery and vein describe DIRECTION, not oxygen. Arteries lead away from the heart; the pulmonary artery leads away, toward the lungs, carrying blood that has not been oxygenated yet.' },

    { q: 'How many pulmonary veins return blood to the left atrium?',
      choices: ['Four', 'Two', 'One', 'Six'], answer: 0 },

    { q: 'Blood in the coronary sinus reaches the right atrium by:',
      choices: [
        'Emptying directly into it through its own opening',
        'Joining the superior vena cava first',
        'Joining the inferior vena cava first',
        'Passing through the tricuspid valve'
      ], answer: 0,
      why: 'The coronary sinus is the venous drainage of the heart muscle itself, and arrives independently of the venae cavae.' },

    { q: 'A drop of blood has just left the left ventricle. Where is it?',
      choices: [
        'Crossing the aortic valve into the ascending aorta',
        'Crossing the mitral valve into the left atrium',
        'Crossing the pulmonic valve into the pulmonary artery',
        'In a pulmonary vein on its way to the lungs'
      ], answer: 0 },

    { q: 'The right side of the heart drives which circulation?',
      choices: [
        'Pulmonic — to the lungs, at low pressure',
        'Systemic — to the body, at low pressure',
        'Pulmonic — to the lungs, at high pressure',
        'Systemic — to the body, at high pressure'
      ], answer: 0 }
  ]
},

{
  id: 'ekg-basics',
  group: 'EKG',

  added: '2026-07-29',
  course: 'M103 · Medical Procedures',
  title: 'EKG — Waves, Intervals & Paper',
  source: 'Chapter 45 — lecture notes and EKG lab notes',
  cards: [
    { term: 'Electrocardiogram (ECG/EKG)', def: 'a recording of the electrical impulses of the heart muscle; noninvasive, painless and safe' },
    { term: 'P wave',       def: 'ATRIAL DEPOLARIZATION (contraction) — the first impulse recorded, begun by the SA node' },
    { term: 'QRS complex',  def: 'VENTRICULAR DEPOLARIZATION (contraction); atrial relaxation also happens here' },
    { term: 'Q wave',       def: 'a NEGATIVE deflection wave' },
    { term: 'R wave',       def: 'a POSITIVE deflection wave' },
    { term: 'S wave',       def: 'a NEGATIVE deflection wave (after R)' },
    { term: 'T wave',       def: 'VENTRICULAR REPOLARIZATION (relaxation) — recovery time before the next contraction' },
    { term: 'U wave',       def: 'a positive deflection associated with repolarization, only occasionally seen in some patients' },
    /* "contraction" and "relaxation" alone were too thin to identify — and
       "relaxation" invites repolarization, which is the ELECTRICAL recovery,
       not the mechanical event. Naming the muscle keeps the two apart. */
    { term: 'Systole',      def: 'contraction — the phase where the heart muscle squeezes and pumps blood out',
      note: 'MECHANICAL, not electrical. Depolarization is the electrical signal that triggers systole; systole is the squeeze itself.' },
    { term: 'Diastole',     def: 'relaxation — the phase where the heart muscle relaxes and the chambers refill',
      note: 'MECHANICAL, not electrical. Repolarization is the electrical recovery that allows diastole; diastole is the relaxation and filling itself. An echo measures diastole; an ECG records repolarization.' },
    { term: 'Isoelectric line', def: 'the flat baseline separating the waves — periods with no current; precedes the P wave and follows the T wave' },
    /* "the time between events" read as though the interval EXCLUDED the waves,
       which is backwards and is the thing people get inverted. Say plainly what
       each one contains. */
    { term: 'Segment',      def: 'a FLAT stretch of baseline lying between two waves — it contains no wave at all',
      note: 'Because a segment holds no wave, you judge it by its SHAPE: elevated, depressed, or sitting on the baseline.' },
    { term: 'Interval',     def: 'a span of time that contains one or more WAVES plus a segment',
      note: 'Because an interval contains waves, you judge it by its DURATION in seconds — never by its shape.' },
    { fact: true, term: 'Segment versus interval',
      def: 'a segment is flat and contains NO waves; an interval contains one or more waves PLUS a segment. So an interval is always the bigger piece, and you measure it in seconds, while a segment you describe as elevated or depressed' },
    { fact: true, term: 'Which are segments and which are intervals',
      def: 'segments — PR, ST, TP. Intervals — PR, QRS, QT. PR appears on both lists: the PR interval starts at the beginning of the P wave, the PR segment starts at the end of it' },
    { term: 'PR interval',  def: 'beginning of the P wave to the beginning of the QRS — normal 0.12–0.20 seconds',
      note: 'An interval, so it INCLUDES the P wave itself as well as the flat PR segment after it.' },
    { term: 'PR segment',   def: 'end of the P wave to the beginning of the QRS — the flat stretch while the AV node holds the impulse',
      note: 'A segment, so it is only the flat part: the P wave is NOT inside it. This is the piece the PR interval has on top of it.' },
    { term: 'QT interval',  def: 'beginning of the QRS to the end of the T wave — normal 0.36–0.44 seconds' },
    { term: 'ST segment',   def: 'end of the QRS to the beginning of the T wave; should sit on the baseline' },
    { term: 'ST elevation / depression', def: 'ST segment above or below baseline — indicative of ischemia, a lack of blood flow to the heart' },
    { term: 'Sinoatrial (SA) node', def: 'in the upper right atrium — the "pacemaker of the heart"; where the impulse originates and what makes the atria contract' },
    { fact: true, term: 'Conduction pathway',   def: 'SA node → AV node → Bundle of His → Purkinje fibers' },
    { term: 'Purkinje fibers',      def: 'cause the ventricles to contract and produce the QRS complex' },
    { term: 'Paper speed',          def: '25 mm/sec is standard; the horizontal axis measures TIME' },
    /* Both namings are accepted — the lecture notes say vertical/horizontal, the
       lab notes say Y axis / X axis, and either is the same line on the paper. */
    { term: 'Vertical axis, Y axis',   def: 'records voltage (gain / amplitude) — the HEIGHT of the tracing' },
    { term: 'Horizontal axis, X axis', def: 'records time, set by the paper speed — the WIDTH of the tracing' },
    { term: 'Small square',         def: '1 mm × 1 mm = 0.04 seconds' },
    { term: 'Large square',         def: '5 mm × 5 mm on ECG paper = 0.2 seconds',
      note: 'Five of them make 1.0 second, which is the fastest way to step out a rate.' },
    { term: 'Standardization mark', def: '2 mm wide × 10 mm high at sensitivity 1; should appear in front of each lead' },

    /* --- added from The Circulatory System notes --- */
    { term: 'Waveform', def: 'any movement away from the baseline, upward for a positive deflection or downward for a negative one' },
    { term: 'J point', def: 'the junction where the QRS complex ends and the ST segment begins' },
    { term: 'TP segment', def: 'the flat segment running from the end of one T wave to the start of the next P wave' },
    { term: 'Cardiac cycle', def: 'one complete heartbeat, start of one beat to the start of the next — about 0.8 seconds' },
    { term: 'Calibration', def: '1 millivolt of input should produce exactly 10 mm of height on the paper',
      note: 'The lecture notes write this as 1 mV = 1 mm, which cannot be right — the same page says the standardization mark is 10 mm high, and that mark IS the 1 mV signal. Standard gain is 10 mm per millivolt.' },
    { fact: true, term: 'What an ECG can show you',
      def: 'the orientation of the heart in the chest, conduction disturbances, the electrical effects of medications and electrolytes, the mass of cardiac muscle, and any ischemic damage' },
    { fact: true, term: 'Normal T wave height',
      def: 'no more than 5 mm in any limb lead, and no more than 10 mm in any chest lead; the shape is slightly asymmetrical' },
    { fact: true, term: 'What an inverted T wave suggests', def: 'myocardial ischemia' },
    { fact: true, term: 'What tall, peaked T waves suggest', def: 'hyperkalemia — too much potassium in the blood' },
    { fact: true, term: 'How the QT interval changes with heart rate',
      def: 'it shortens as the rate climbs and lengthens as the rate falls; it also varies with age and gender' },
    { fact: true, term: 'The T wave after an abnormal QRS',
      def: 'usually points the opposite way to that QRS complex' },
    { term: 'Sensitivity ½',        def: 'if the tracing is too LARGE, turn the dial to this setting — the standardization mark then measures 2 mm wide × 5 mm high' },
    { term: 'Sensitivity 2',        def: 'if the tracing is too SMALL, turn the dial to this setting — the standardization mark then measures 2 mm wide × 20 mm high' },
    { term: 'Galvanometer',         def: 'transforms the electrical current into mechanical motion inside the machine' },
    { term: 'Stylus',               def: 'the heated pen-like instrument on non-digital machines that prints the tracing' },
    { term: 'Holter monitor',       def: 'a portable "ambulatory / walking ECG" recording the heart for 24+ hours; patient keeps a diary and presses an event button for symptoms' },
    { term: 'Event monitor',        def: 'a version the patient activates only when symptoms occur; can be worn for several days' },
    { term: 'Stress test',          def: 'exercise ECG for patients at high risk of heart disease; no food, smoking, caffeine or alcohol for 3+ hours before' },
    { term: 'Echocardiography',     def: 'a noninvasive diagnostic tool that tests the STRUCTURE and FUNCTION of the heart using sound waves' },
    { term: 'Defibrillator',        def: 'delivers a countershock to convert cardiac arrhythmias back into a regular sinus rhythm' },

    /* --- added from the test-review section of the notes --- */
    { term: 'Cardioversion', def: 'the procedure that resets a fast, irregular rhythm back to a normal one' },
    { term: 'Thallium stress test', def: 'the exercise test requiring an injection of a radioactive tracer so blood flow to the muscle can be imaged' },
    { fact: true, term: 'Electrodes used for a Holter monitor',
      def: 'fewer than a 12-lead ECG uses, and placed on the chest and torso rather than the limbs, so ordinary walking does not corrupt a 24-hour recording',
      note: 'The test review counts “6 to 7 electrodes” as the statement that is NOT true. How many are used depends on how many channels the recorder runs, so a fixed number is not a safe answer.' },
    { term: 'Coronary balloon angioplasty', def: 'threading a catheter with a balloon at its tip, usually in through the femoral artery, and inflating it to press plaque aside and reopen the vessel',
      note: 'The lecture notes call this "balloon angiography", which conflates two procedures. Angiography is the diagnostic picture — catheter, contrast dye and x-ray. Angioplasty is the balloon that treats what the picture found. Both go in through the femoral artery, which is probably where the wires crossed.' },
    { term: 'Coronary artery bypass', def: 'grafting a length of vein into the heart’s own circulation to carry blood around a blocked stretch' },
    { term: 'Implantable cardioverter defibrillator', def: 'a small implanted device that watches the rhythm and shocks the heart back into line when it turns dangerous',
      note: 'Abbreviated ICD. Worth keeping apart from a pacemaker: a pacemaker sends small, regular impulses to set the rate, while an ICD sits quiet and delivers a real shock only when a life-threatening rhythm appears.' }
  ],
  questions: [
    { q: 'One cardiac cycle on an ECG consists of:',
      choices: [
        'P wave → QRS complex → T wave',
        'QRS complex → P wave → T wave',
        'T wave → P wave → QRS complex',
        'P wave → T wave → QRS complex'
      ], answer: 0 },

    { q: 'The T wave represents:',
      choices: [
        'Repolarization (relaxation) of the ventricles',
        'Depolarization of the atria',
        'Depolarization of the ventricles',
        'Contraction of the SA node'
      ], answer: 0 },

    { q: 'Atrial REPOLARIZATION is hidden inside which part of the tracing?',
      choices: ['The QRS complex', 'The P wave', 'The T wave', 'The isoelectric line'], answer: 0,
      why: 'Relaxation of the atria happens during the QRS — it is buried under the much larger ventricular signal.' },

    { q: 'A PR interval measures 0.28 seconds. Is that within normal limits?',
      choices: [
        'No — normal is 0.12 to 0.20 seconds',
        'Yes — normal is 0.20 to 0.36 seconds',
        'Yes — any value under 0.44 seconds is normal',
        'No — normal is 0.36 to 0.44 seconds'
      ], answer: 0,
      why: '0.36–0.44 sec is the normal QT interval, not the PR.' },

    { q: 'On standard ECG paper at 25 mm/sec, how much time does ONE LARGE square represent?',
      choices: ['0.2 seconds', '0.04 seconds', '1.0 second', '0.5 seconds'], answer: 0,
      why: 'Small square = 0.04 s, large square = 0.2 s, five large squares = 1.0 s.' },

    { q: 'An ST segment sitting below the baseline is called ST depression and suggests:',
      choices: [
        'Ischemia — a lack of blood flow to the heart',
        'Normal repolarization',
        'An artifact from a loose electrode',
        'Atrial enlargement'
      ], answer: 0 },

    { q: 'The tracing is too large to fit on the paper. What do you do?',
      choices: [
        'Set the sensitivity dial to ½, producing a 2 mm × 5 mm standardization mark',
        'Set the sensitivity dial to 2, producing a 2 mm × 20 mm mark',
        'Increase paper speed to 50 mm/sec',
        'Move the electrodes closer to the shoulders'
      ], answer: 0 },

    { q: 'If you change the paper speed from 25 mm/sec to 50 mm/sec, what must you do?',
      choices: [
        'Note the change in pen directly on the tracing',
        'Nothing — the machine records it automatically on every model',
        'Rerun the tracing at standard speed as well',
        'Reduce the sensitivity to ½'
      ], answer: 0,
      why: 'Whoever interprets the strip has to know the timebase, or every interval will be misread.' },

    { q: 'Which statement about echocardiography is correct?',
      choices: [
        'It is noninvasive and uses sound waves to assess heart structure and function',
        'It records the electrical impulses of the heart',
        'It requires injection of a contrast medium',
        'It is another name for a stress test'
      ], answer: 0,
      why: 'This is the distinction between the ECG (electrical activity) and the echo (structure and function) — the core of your program.' },

    { q: 'A Holter monitor is best described as:',
      choices: [
        'An ambulatory ECG worn for 24 hours or more while the patient keeps a symptom diary',
        'A single 12-lead tracing taken in the office',
        'A device that delivers countershock during arrhythmias',
        'An exercise test performed on a treadmill'
      ], answer: 0 }
  ]
},

{
  id: 'ekg-leads',
  group: 'EKG',

  added: '2026-07-29',
  course: 'M103 · Medical Procedures',
  title: 'EKG — The 12 Leads & Electrode Placement',
  source: 'Chapter 45 — lecture notes',
  chest: true,          /* unlocks the Place the Leads mode */
  cards: [
    { term: '12-lead ECG',  def: '12 recordings of the heart’s electrical activity from different angles, using 10 electrodes — 4 limb, 6 chest' },
    { fact: true, term: 'What the ECG machine actually is',
      def: 'a voltmeter — it records the electrical voltages produced when heart muscle depolarizes' },
    { term: 'Einthoven’s triangle', def: 'the triangle the three standard limb leads (I, II and III) form around the heart, with the right leg serving as ground' },
    { term: 'Lead I',       def: 'BIPOLAR — voltage difference between the LEFT ARM and the RIGHT ARM' },
    { term: 'Lead II',      def: 'BIPOLAR — voltage difference between the RIGHT ARM and the LEFT LEG',
      note: 'This is the main lead read for heart rate and rhythm, and the one a rhythm strip is run from. The right leg is the GROUND electrode and is never part of any lead — a fast way to sanity-check any lead question.' },
    { term: 'Lead III',     def: 'BIPOLAR — voltage difference between the LEFT ARM and the LEFT LEG' },
    /* The expansion moved to the note. Spelling out "augmented Voltage Right
       arm" in the prompt makes typing aVR a transcription exercise; asked by
       what it measures, it tests the lead. The expansion is still shown, just
       after answering, where it works as the reason rather than the giveaway. */
    { term: 'aVR', def: 'the augmented lead measuring the RIGHT ARM against a central point between the left arm and left leg',
      note: 'Stands for augmented Voltage Right arm — the R names the exploring electrode.' },
    { term: 'aVL', def: 'the augmented lead measuring the LEFT ARM against a central point between the right arm and left leg',
      note: 'Stands for augmented Voltage Left arm.' },
    { term: 'aVF', def: 'the augmented lead measuring the LEFT LEG against a central point between the right arm and left arm',
      note: 'Stands for augmented Voltage Foot — the foot standing in for the left leg.' },
    { fact: true, term: 'Why "augmented"?', def: 'these three leads produce small impulses that must be amplified (augmented) by the machine to be recorded' },
    /* A contrast, not a term — "Bipolar vs. unipolar" typed exactly, punctuation
       and all, tests nothing worth testing. It still carries its full weight in
       flashcards, the review sheet and the quiz. */
    { fact: true, term: 'Bipolar vs. unipolar', def: 'BIPOLAR (I, II, III) — both poles are real electrodes on the patient. UNIPOLAR (aVR, aVL, aVF, V1–V6) — one real "exploring" electrode measured against a CALCULATED central reference point',
      note: 'All voltage is a difference between two points, so "measures a difference" cannot be what separates them — what separates them is whether the negative pole is a physical electrode or a computed average. By that convention the augmented leads are unipolar, and most references describe them that way — as an exploring electrode measured against "a central point between" the other two. Some course materials group them with the bipolar leads instead, so follow the convention your own textbook uses.' },
    /* Was "Lead II strip" — a name I invented, defined with "Lead II" sitting in
       the prompt, so the honest answer to it was "Lead II", which is already its
       own card. Chapter 45 calls this a rhythm strip; the definition now
       describes it without using either word. */
    /* The prompt is only what identifies the thing. The two-foot Lead II request
       is detail that follows once you have named it, so it sits in the note.
       Neither "rhythm" nor "strip" may appear in the definition — that is the
       whole reason this card was rewritten. */
    { term: 'Lead II rhythm strip', def: 'the long single-lead recording printed along the bottom of most ECG reports',
      note: 'Lead II is not incidental: its axis (+60°) runs almost parallel to the impulse travelling from the SA node, so it gives the tallest, clearest P waves — exactly what you need to read the beat. Providers may request an extra two-foot-long one to assess for abnormalities.' },
    { term: 'V1', def: 'FOURTH intercostal space at the RIGHT margin of the sternum' },
    { term: 'V2', def: 'FOURTH intercostal space at the LEFT margin of the sternum' },
    { term: 'V3', def: 'midway between V2 and V4 — placed AFTER V4' },
    { term: 'V4', def: 'FIFTH intercostal space at the junction of the left midclavicular line' },
    { term: 'V5', def: 'horizontal level of V4 at the left ANTERIOR AXILLARY line' },
    { term: 'V6', def: 'horizontal level of V4 at the left MIDAXILLARY line' },
    { fact: true, term: 'Order of chest placement', def: 'V1 → V2 → V4 → V3 → V5 → V6 (V4 goes on before V3, because V3 is defined by where V4 lands)' },
    /* Asked the other way round. "RL electrode color" defined as "GREEN (the
       ground)" hands you the colour in the prompt and then makes you type a
       label nobody says out loud. What is worth knowing is WHICH electrode
       wears the colour, so the electrode is the answer — by abbreviation or by
       name, since both get used. */
    { term: 'RA, Right arm', def: 'the WHITE electrode' },
    { term: 'LA, Left arm',  def: 'the BLACK electrode' },
    { term: 'LL, Left leg',  def: 'the RED electrode' },
    { term: 'RL, Right leg', def: 'the GREEN electrode — the ground',
      note: 'The ground is never part of any lead, which is the quickest way to rule out a wrong answer on a lead question.' },
    /* Placement facts, not vocabulary — the term is a heading, so these belong
       in flashcards and the review sheet rather than as something to type. */
    { fact: true, term: 'Arm electrode position', def: 'fleshy outer area of the UPPER arm with the connectors pointing DOWN' },
    { fact: true, term: 'Leg electrode position', def: 'fleshy inner area of the LOWER leg near the calf with the connectors pointing UP' },

    /* --- added from The Circulatory System notes --- */
    { term: 'Frontal plane leads', def: 'the six that view the heart from the front as though the body were flat — three bipolar and three augmented',
      note: 'They see superior, inferior, right and left.' },
    { term: 'Horizontal plane leads', def: 'the six chest leads, viewing the heart as though the body were sliced across',
      note: 'They see anterior, posterior, right and left.' },
    { fact: true, term: 'Polarity of the limb electrodes',
      def: 'in the standard limb leads the right arm is negative and the left leg is positive; the right leg is the ground and is never part of a lead',
      note: 'The "right arm is always negative" rule holds for Leads I and II only. In aVR the right arm is the POSITIVE exploring electrode — that is what the R in aVR means, and it is why aVR normally points downward while the other leads point up.' },
    { term: 'Semi-Fowler’s position', def: 'propped at roughly 30 to 45 degrees — used when a patient is short of breath' },
    { term: 'Full Fowler’s position', def: 'sitting upright at 60 to 90 degrees, effectively straight up at the top of that range',
      note: 'Also called high Fowler’s. Ranges vary between sources; 45 and 90 are the round numbers usually taught.' },
    { fact: true, term: 'Where sensors must never be placed',
      def: 'on wounds, open areas, sutures or staples' },
    { term: 'Electrolyte gel', def: 'the conductive medium between electrode and patient, needed because dry skin resists electricity badly enough to swamp the signal',
      note: 'The lecture notes read "the skin is a core conductor of electricity" — almost certainly POOR, mistyped. Skin is a poor conductor; that is the entire reason the gel exists. Applying it drops skin impedance from roughly 8,600 ohms to about 2,000.' },
    { fact: true, term: 'Patients needing modified placement',
      def: 'those who are obese, have a limb amputation, or are in a cast' }
  ],
  questions: [
    { q: 'How many electrodes and how many leads are used in a standard 12-lead ECG?',
      choices: [
        '10 electrodes producing 12 leads',
        '12 electrodes producing 12 leads',
        '6 electrodes producing 12 leads',
        '12 electrodes producing 10 leads'
      ], answer: 0,
      why: '4 limb + 6 chest = 10 electrodes. A "lead" is a viewing angle calculated from those electrodes, not a wire.' },

    { q: 'Which lead is described as bipolar?',
      choices: [
        'Lead II — it monitors two electrodes',
        'aVR — it monitors two electrodes',
        'V1 — it monitors two electrodes',
        'aVF — it monitors two electrodes'
      ], answer: 0,
      why: 'Leads I, II and III are bipolar under every convention: both poles are real electrodes on the patient. The augmented leads are the contested ones — standard references call aVR/aVL/aVF unipolar because their negative pole is a calculated central point rather than an electrode, while some course materials group them with the bipolar leads. Nothing calls Lead II anything but bipolar.' },

    { q: 'You are placing the chest electrodes. What is the correct ORDER?',
      choices: [
        'V1 → V2 → V4 → V3 → V5 → V6',
        'V1 → V2 → V3 → V4 → V5 → V6',
        'V6 → V5 → V4 → V3 → V2 → V1',
        'V1 → V3 → V2 → V4 → V6 → V5'
      ], answer: 0,
      why: 'V3 sits midway between V2 and V4, so V4 has to be on the chest first to know where V3 goes.' },

    { q: 'Where exactly does V1 go?',
      choices: [
        'Fourth intercostal space, right margin of the sternum',
        'Fourth intercostal space, left margin of the sternum',
        'Fifth intercostal space, left midclavicular line',
        'Fifth intercostal space, right midclavicular line'
      ], answer: 0 },

    { q: 'Which two chest leads sit at the same horizontal level as V4?',
      choices: ['V5 and V6', 'V1 and V2', 'V2 and V3', 'V3 and V5'], answer: 0,
      why: 'V4 (midclavicular) → V5 (anterior axillary) → V6 (midaxillary) all run along one horizontal line.' },

    { q: 'The RIGHT LEG electrode is what color, and what is its role?',
      choices: [
        'Green — it is the ground electrode',
        'Red — it forms Lead II',
        'White — it forms Lead I',
        'Black — it is the ground electrode'
      ], answer: 0,
      why: 'Memory aid: on each side, "smoke over fire" (black over red, left side) and "snow over grass" (white over green, right side).' },

    { q: 'Which color goes on the LEFT LEG?',
      choices: ['Red', 'Green', 'Black', 'White'], answer: 0 },

    { q: 'How should the arm electrodes be oriented?',
      choices: [
        'On the fleshy outer upper arm with the connectors pointing DOWN',
        'On the fleshy outer upper arm with the connectors pointing UP',
        'On the wrist with the connectors pointing down',
        'On the shoulder with the connectors pointing outward'
      ], answer: 0,
      why: 'Connectors down on arms, up on legs — this reduces tension on the electrodes. Placing arm electrodes close to the shoulders also cuts down on muscle-voltage artifact.' },

    { q: 'A patient has a below-knee amputation on one side. What do you do with the limb electrodes?',
      choices: [
        'Keep the placement symmetrical — move the electrode on the intact limb to match',
        'Place both leg electrodes on the intact leg',
        'Omit the leg electrodes and run a 10-lead tracing',
        'Place the missing leg electrode on the abdomen'
      ], answer: 0,
      why: 'Symmetry is what preserves the geometry of the lead calculations.' },

    { q: 'aVF records the voltage difference between:',
      choices: [
        'The left leg and a central point between the right arm and left arm',
        'The right arm and a central point between the left arm and left leg',
        'The left arm and a central point between the right arm and left leg',
        'The left leg and the right leg'
      ], answer: 0,
      why: 'F = Foot. R = Right arm, L = Left arm. Each augmented lead compares its own electrode against the average of the other two.' }
  ],

  /* Data for the "Place the Leads" mini-game — all 10 electrodes, 4 limb and 6
     chest. x/y are % of the figure, which is drawn facing the viewer, so the
     patient's RIGHT side is on the LEFT of the graphic. */
  electrodes: [
    { id: 'RA', limb: true, x: 20.5, y: 30,    landmark: 'Fleshy OUTER area of the right UPPER ARM, connector pointing DOWN · colour WHITE' },
    { id: 'LA', limb: true, x: 79.5, y: 30,    landmark: 'Fleshy OUTER area of the left UPPER ARM, connector pointing DOWN · colour BLACK' },
    { id: 'RL', limb: true, x: 44,   y: 83.33, landmark: 'Fleshy INNER area of the right LOWER LEG near the calf, connector pointing UP · colour GREEN — this is the ground electrode' },
    { id: 'LL', limb: true, x: 56,   y: 83.33, landmark: 'Fleshy INNER area of the left LOWER LEG near the calf, connector pointing UP · colour RED' },
    { id: 'V1', x: 46.5, y: 36.67, landmark: 'Fourth intercostal space, RIGHT margin of the sternum' },
    { id: 'V2', x: 53.5, y: 36.67, landmark: 'Fourth intercostal space, LEFT margin of the sternum' },
    { id: 'V3', x: 58,   y: 39.17, landmark: 'Midway between V2 and V4 (placed after V4)' },
    { id: 'V4', x: 62.5, y: 41.67, landmark: 'Fifth intercostal space, left MIDCLAVICULAR line' },
    { id: 'V5', x: 68,   y: 41.67, landmark: 'Level of V4, left ANTERIOR AXILLARY line' },
    { id: 'V6', x: 74,   y: 41.67, landmark: 'Level of V4, left MIDAXILLARY line' }
  ]
},

{
  id: 'ekg-conduction',
  group: 'EKG',

  added: '2026-08-03',
  course: 'M103 · Medical Procedures',
  title: 'EKG — The Conduction System',
  source: 'Chapter 45 — lecture notes, with conduction velocities and intrinsic rates from standard references',
  beat: true,
  cards: [
    { term: 'Sinoatrial node', def: 'the pacemaker of the heart, in the upper right atrium, where each normal impulse begins',
      note: 'Also written SA node, sinus node.' },
    { term: 'Internodal pathways', def: 'the specialized tracts carrying the impulse from the SA node across the atria to the AV node' },
    { term: 'Atrioventricular node', def: 'the gateway between atria and ventricles, which deliberately slows the impulse before letting it through',
      note: 'Also written AV node.' },
    { term: 'AV node delay', def: 'the roughly 0.1 second pause that lets the atria finish emptying before the ventricles contract' },
    { term: 'Bundle of His', def: 'carries the impulse from the AV node down into the interventricular septum' },
    { term: 'Bundle branches', def: 'the left and right pathways carrying the impulse down either side of the septum, all the way to the apex' },
    { term: 'Purkinje fibers', def: 'the network running from the apex UP through the ventricular walls, making the ventricles contract from the bottom upward' },
    { fact: true, term: 'The conduction pathway in order',
      def: 'SA node → internodal pathways → AV node → bundle of His → bundle branches → Purkinje fibers' },

    { term: 'Depolarization', def: 'the electrical discharge that triggers a chamber to contract' },
    { term: 'Repolarization', def: 'the electrical recovery that lets a chamber relax and refill' },
    { term: 'P wave', def: 'atrial depolarization on the tracing' },
    { term: 'PR segment', def: 'the flat stretch of tracing while the impulse is being held at the AV node' },
    { term: 'QRS complex', def: 'ventricular depolarization on the tracing' },
    { term: 'T wave', def: 'ventricular repolarization on the tracing' },

    { fact: true, term: 'Intrinsic rate of the SA node', def: '60–100 beats per minute — the fastest, which is why it leads' },
    { fact: true, term: 'Intrinsic rate of the AV node', def: '40–60 beats per minute' },
    { fact: true, term: 'Intrinsic rate of the Purkinje fibers', def: '20–40 beats per minute' },
    { term: 'Escape pacemaker', def: 'a lower site taking over when the site above it fails, pacing at its own slower intrinsic rate' },
    { fact: true, term: 'Conduction speed through the AV node', def: 'about 0.05 metres per second (0.05 m/s) — roughly 5 centimetres a second, the slowest anywhere in the heart, which is what creates the delay',
      note: 'm/s is metres per SECOND, a speed — not milliseconds. Bigger number = faster.' },
    { fact: true, term: 'Conduction speed through the Purkinje fibers', def: 'about 4 metres per second (4 m/s) — the fastest anywhere in the heart, about eighty times the AV node, so both ventricles fire almost together' },

    /* from The Circulatory Systen.md — which branch feeds which ventricle, and
       the AV junction as a named structure rather than a vague region */
    { term: 'Right bundle branch', def: 'carries the impulse to the RIGHT ventricle' },
    { term: 'Left bundle branch', def: 'carries the impulse to the LEFT ventricle' },
    { term: 'AV junction', def: 'the AV node together with the bundle of His — the only electrical connection running from the atria down into the ventricles',
      note: 'It links TOP to BOTTOM. The septum is the wall separating right from left — a different structure entirely.' },

    { term: 'Polarization', def: 'the heart at rest, with the cells charged and waiting between beats' },
    { term: 'Automaticity', def: 'the ability of pacemaker cells to start an electrical impulse on their own, without being stimulated from another source' },
    { term: 'Excitability', def: 'the ability of cardiac muscle cells to respond to an outside stimulus',
      note: 'Also called irritability.' },
    { term: 'Conductivity', def: 'the ability of a cardiac cell to receive an electrical stimulus and pass it along to the next cell' },
    { term: 'Contractility', def: 'the ability of cardiac cells to shorten, producing muscle contraction in response to an electrical stimulus' },
    { fact: true, term: 'Causes of conduction disturbances',
      def: 'trauma, drug toxicity, electrolyte disturbances (sodium and potassium), and myocardial ischemia or infarction' }
  ],
  questions: [
    { q: 'Put the conduction pathway in order.',
      choices: [
        'SA node → AV node → bundle of His → bundle branches → Purkinje fibers',
        'AV node → SA node → bundle of His → Purkinje fibers → bundle branches',
        'SA node → bundle of His → AV node → bundle branches → Purkinje fibers',
        'Purkinje fibers → bundle branches → bundle of His → AV node → SA node'
      ], answer: 0 },

    { q: 'Why does the AV node deliberately slow the impulse?',
      choices: [
        'So the atria can finish emptying into the ventricles before the ventricles contract',
        'To protect the ventricles from electrical damage',
        'To give the SA node time to recharge',
        'To let the tracing return to baseline'
      ], answer: 0,
      why: 'The pause is about 0.1 second, and it is what you are looking at during the flat PR segment.' },

    { q: 'The SA node leads the heart because:',
      choices: [
        'Its intrinsic rate of 60–100 is faster than anything below it',
        'It is physically largest',
        'It is the only tissue that can generate an impulse',
        'It sits closest to the ventricles'
      ], answer: 0,
      why: 'The AV node runs 40–60 and the Purkinje fibers 20–40. Whichever fires fastest sets the pace, so the SA node normally wins.' },

    { q: 'If the SA node fails, what happens?',
      choices: [
        'A lower site takes over as an escape pacemaker, at its own slower rate',
        'The heart stops immediately',
        'The atria continue but the ventricles stop',
        'The Purkinje fibers speed up to 60–100'
      ], answer: 0 },

    { q: 'Which part of the tracing corresponds to the AV node delay?',
      choices: ['The PR segment', 'The P wave', 'The QRS complex', 'The T wave'], answer: 0 },

    { q: 'Conduction is SLOWEST through which structure, and fastest through which?',
      choices: [
        'Slowest through the AV node, fastest through the Purkinje fibers',
        'Slowest through the Purkinje fibers, fastest through the AV node',
        'Slowest through the bundle of His, fastest through atrial muscle',
        'It travels at the same speed throughout'
      ], answer: 0,
      why: 'The AV node creeps along at about 0.05 m/s — 5 centimetres per second — while the Purkinje fibers carry the impulse at about 4 m/s. That makes the Purkinje network roughly eighty times FASTER than the AV node (4 ÷ 0.05 = 80). The slow AV node is deliberate: that bottleneck is the delay letting the atria finish emptying, and it is what you see as the flat PR segment.' },

    { q: 'In atrial fibrillation, why can no P wave be identified?',
      choices: [
        'Many signals fire chaotically from the atria outside the SA node, so there is no single organised atrial depolarization',
        'The atria have stopped producing any electrical activity',
        'The P wave is hidden inside the T wave',
        'The paper speed is too slow to record it'
      ], answer: 0 },

    { q: 'What makes the QRS wide and bizarre in a premature ventricular contraction?',
      choices: [
        'The beat starts inside the ventricle and bypasses the normal conduction pathway',
        'The beat starts in the SA node but arrives early',
        'The AV node conducts it faster than usual',
        'Two beats overlap on the tracing'
      ], answer: 0,
      why: 'Skipping the fast Purkinje network means the impulse spreads muscle-to-muscle instead, which takes longer and looks wider.' },

    { q: 'Ventricular fibrillation is immediately life threatening because:',
      choices: [
        'The ventricles tremor rather than pump, so there is no cardiac output',
        'The heart rate climbs above 250 BPM',
        'The atria stop contributing to filling',
        'The P waves disappear from the tracing'
      ], answer: 0 }
  ]
},

{
  id: 'ekg-rhythms',
  group: 'EKG',

  added: '2026-07-29',
  course: 'M103 · Medical Procedures',
  title: 'EKG — Artifacts & Arrhythmias',
  source: 'Chapter 45 — lecture notes',
  cards: [
    { term: 'Somatic tremor',     def: 'ARTIFACT from shivering — nervousness, cold, or neurological conditions like Parkinson’s. Fix: place arm electrodes closer to the shoulders' },
    { term: 'Alternating current (AC) interference', def: 'ARTIFACT from electrical activity nearby. Fix: keep power cords away from the patient, move the table away from the wall',
      note: 'Improper grounding of the machine, and a power cord running under the patient’s table, both show up here — NOT as somatic tremor. Somatic tremor comes from the patient moving.' },
    { term: 'Wandering baseline', def: 'ARTIFACT from improperly applied electrodes or improperly cleaned skin. Fix: remove oils, creams and lotions with an alcohol prep pad' },
    { term: 'Interrupted baseline', def: 'ARTIFACT from an electrode separating from the wire, or a broken lead wire. Fix: reattach securely or repair the wire' },
    { trace: 'Normal sinus rhythm', term: 'Normal sinus rhythm', def: 'a heart rate between 60 and 100 BPM' },
    { trace: 'Sinus bradycardia', term: 'Sinus bradycardia',   def: 'a heart rate BELOW 60 BPM' },
    { trace: 'Sinus tachycardia', term: 'Sinus tachycardia',   def: 'a heart rate ABOVE 100 BPM' },
    { term: 'Arrhythmia',          def: 'an irregularity in the heart’s rhythm — not all are dangerous' },
    { trace: 'Premature atrial contraction', term: 'Premature atrial contraction (PAC)', def: 'a cycle that occurs before the next one is due, with a differently shaped P wave. Seen in healthy people who smoke or use stimulants' },
    { trace: 'Paroxysmal atrial tachycardia', term: 'Paroxysmal atrial tachycardia (PAT)', def: 'a brief episode of 160–250 BPM; patients describe it as a "flutter" in the heart' },
    { trace: 'Atrial fibrillation', term: 'Atrial fibrillation (A-fib)', def: 'rapid multiple signals firing from the atria outside the SA node; the P wave cannot be identified, leaving small irregular complexes',
      note: 'The 400–500 BPM figure is the ATRIAL rate, not the pulse rate — the ventricles respond much more slowly.' },
    { fact: true, term: 'A-fib causes',        def: 'myocardial infarction, hypertension, mitral valve disease, heart failure, thyroid disorders, pulmonary emboli, excessive alcohol' },
    { trace: 'Premature ventricular contraction', term: 'Premature ventricular contraction (PVC)', def: 'a beat occurring EARLY in the cycle, followed by a PAUSE before the next cycle' },
    { trace: 'Ventricular tachycardia', term: 'Ventricular tachycardia', def: 'three or more PVCs at 150–250 BPM, with NO P waves and imprecise QRS complexes — life threatening' },
    { trace: 'Ventricular fibrillation', term: 'Ventricular fibrillation (V-fib)', def: 'an erratic, jagged "sawtooth" rhythm; the ventricles tremor and there is NO cardiac output' },
    { trace: 'Pacemaker rhythm', term: 'Pacemaker arrhythmia', def: 'vertical signals (spikes) representing the pacemaker’s electrical activity; more visible in unipolar than bipolar leads' },
    { term: 'Scope of practice', def: 'interpreting ECGs is beyond your scope — but recognizing arrhythmias and alerting the provider is essential' },

    /* --- rate analysis, added from The Circulatory System notes --- */
    { fact: true, term: 'Finding the ventricular rate',
      def: 'measure the R-R intervals — for the ATRIAL rate, measure the P-P intervals instead' },
    { fact: true, term: 'The 1500 method',
      def: 'find an R wave sitting on a heavy line, count the small squares to the next R wave, then divide 1500 by that count. 18 small squares gives about 83 BPM' },
    { fact: true, term: 'Strip lengths on ECG paper',
      def: '15 large squares span 3 seconds and 30 large squares span 6 seconds — count the complexes across a six-second strip and multiply by 10 for the rate' }
  ],
  questions: [
    { q: 'You get a tracing with a wandering baseline. What is the most likely cause?',
      choices: [
        'Improperly applied electrodes or skin that was not properly cleaned',
        'Nearby electrical equipment',
        'A broken lead wire',
        'Patient shivering from cold'
      ], answer: 0,
      why: 'Wandering baseline → prep the skin with an alcohol pad. Interrupted baseline → check the wire. Somatic tremor → the patient is moving. AC interference → something electrical is nearby.' },

    { q: 'The tracing shows a completely flat, interrupted section. First thing to check?',
      choices: [
        'Whether an electrode has separated from its wire or a lead wire is broken',
        'Whether the patient is shivering',
        'Whether the paper speed is set to 50 mm/sec',
        'Whether the patient ate before the test'
      ], answer: 0 },

    { q: 'A patient with Parkinson’s disease produces a tracing full of muscle noise. Which artifact is this, and what helps?',
      choices: [
        'Somatic tremor — move the arm electrodes closer to the shoulders',
        'AC interference — unplug nearby equipment',
        'Wandering baseline — clean the skin',
        'Interrupted baseline — replace the lead wire'
      ], answer: 0 },

    { q: 'Which rhythm has NO identifiable P wave, showing small irregular complexes instead?',
      choices: ['Atrial fibrillation', 'Sinus bradycardia', 'Premature ventricular contraction', 'Normal sinus rhythm'], answer: 0 },

    { q: 'Which of these is a LIFE-THREATENING finding you should alert the provider about immediately?',
      choices: [
        'Ventricular fibrillation — the ventricles tremor and there is no cardiac output',
        'A single premature atrial contraction',
        'Sinus rhythm at 72 BPM',
        'An occasional U wave'
      ], answer: 0 },

    { q: 'A rate of 54 BPM in normal rhythm is called:',
      choices: ['Sinus bradycardia', 'Sinus tachycardia', 'Normal sinus rhythm', 'Atrial fibrillation'], answer: 0,
      why: 'Brady = slow (<60), tachy = fast (>100), normal 60–100.' },

    { q: 'What distinguishes a PVC on the tracing?',
      choices: [
        'A beat occurring early, followed by a pause before the next cycle',
        'A rate of 400–500 BPM',
        'A jagged sawtooth pattern with no output',
        'Vertical spikes before each complex'
      ], answer: 0 },

    { q: 'You notice an obvious arrhythmia on the tracing you just ran. What is the correct action?',
      choices: [
        'Recognize it and alert the provider — interpreting the ECG is outside your scope of practice',
        'Document your interpretation in the chart and file the tracing',
        'Repeat the test until the rhythm looks normal',
        'Tell the patient what rhythm they have before they leave'
      ], answer: 0 }
  ]
},

{
  id: 'ekg-procedure',
  group: 'EKG',

  added: '2026-07-29',
  course: 'M103 · Medical Procedures',
  title: 'EKG — Performing the Procedure',
  source: 'Chapter 45 — lecture notes',
  /* This one is a sequence, not a vocabulary list — a deck with `steps` gets
     the "Put in Order" mode instead of flashcards/matching/recall. Order and
     wording follow the 18-step procedure table in Chapter 45.md. */
  steps: [
    { text: 'Prepare the ECG machine and equipment.',
      detail: 'Plug it in. Make sure no other electrical equipment is plugged in that could cause interference. Check the cable wires and clips, then turn the machine on.' },
    { text: 'Wash hands and assemble the remaining equipment.' },
    { text: 'Introduce yourself, identify the patient, and explain the procedure.',
      detail: '"Today we are going to perform an ECG to see how the electrical activity and rhythm in your heart is working." Then acknowledge their concerns: "Do you have any questions or concerns?"' },
    { text: 'Ask the patient to disrobe from the waist up and remove clothing from the lower legs.',
      detail: 'Provide privacy and show the patient where to put their belongings.' },
    { text: 'Assist the patient onto the table and cover them with a drape sheet.',
      detail: 'Ask them to lie down, pull out the leg rest, and adjust a pillow under their head for comfort.' },
    { text: 'Place the limb electrodes.',
      detail: 'Arms: fleshy outer area of the UPPER arm, connectors pointing DOWN. Legs: fleshy inner area of the lower leg near the calf, connectors pointing UP. This reduces tension on the electrodes. Wipe off lotion, oil or cream with gauze or an alcohol pad first.' },
    { text: 'Connect the lead wires to the limb electrodes.',
      detail: 'Clip each wire tip to the tab on its electrode. The power cord and the patient cable must NOT be allowed to touch.' },
    { text: 'Attach the six chest electrodes, V1 through V6.',
      detail: 'Explain the anatomical positioning as you go. Shave dense chest hair with the patient’s permission. If breast tissue extends over the V3–V5 positions, elevate it using the BACK of the hand.' },
    { text: 'Cover the patient with the drape.',
      detail: 'For minimum exposure and warmth while the ECG is obtained.' },
    { text: 'Enter the patient’s information.',
      detail: 'Follow the manufacturer’s instructions, and check your provider’s preference for what data to enter.' },
    { text: 'Remind the patient not to move, then press the Auto button.',
      detail: 'The machine records and standardizes the tracing automatically.' },
    { text: 'Tear the tracing off the machine.',
      detail: 'Check it over for artifacts now — BEFORE disconnecting the patient — so you can correct interference and rerun without setting them up again.' },
    { text: 'Alert the provider of any complaints or unusual findings, then remove the wires and electrodes.',
      detail: 'Remove the lead wires from the limb electrodes only with provider approval. Clean the sites with an alcohol prep pad if necessary.' },
    { text: 'Assist the patient to a sitting position, then down from the table.',
      detail: 'Help them dress if necessary.' },
    { text: 'Change the table paper and pillow cover, and discard used disposables.' },
    { text: 'Wash hands.' },
    { text: 'Give the tracing to the provider for interpretation.',
      detail: 'Interpreting the ECG yourself is outside your scope of practice.' },
    { text: 'Record the appropriate entry in the patient’s chart.' }
  ],
  questions: [
    { q: 'What is the stated purpose of performing an electrocardiogram?',
      choices: [
        'To obtain a graphic representation of the electrical activity of the patient’s heart',
        'To measure the structure and function of the heart valves',
        'To record the volume of blood the heart pumps per minute',
        'To measure blood pressure inside the chambers of the heart'
      ], answer: 0,
      why: 'Contrast with echocardiography, which assesses STRUCTURE and FUNCTION using sound waves.' },

    { q: 'At what age is a baseline ECG recommended?',
      choices: ['Between 40 and 45', 'Between 18 and 21', 'Between 30 and 35', 'Between 60 and 65'], answer: 0 },

    { q: 'What should you do with the ECG machine before starting your patient schedule each day?',
      choices: [
        'Check it for proper function and any error codes',
        'Replace the electrodes and cables',
        'Run a test tracing on yourself',
        'Nothing — check it only when a problem appears'
      ], answer: 0,
      why: 'Refer to the instruction manual for troubleshooting and service numbers if a code appears.' },

    { q: 'The patient has lotion on their chest and legs. What do you do before applying electrodes?',
      choices: [
        'Wipe the areas with gauze or an alcohol prep pad',
        'Apply the electrodes anyway and press firmly',
        'Use extra electrodes to compensate',
        'Reschedule the appointment'
      ], answer: 0,
      why: 'Oils, creams and lotions are the classic cause of a WANDERING BASELINE artifact.' },

    { q: 'Breast tissue extends over the V3–V5 positions. What is the correct technique?',
      choices: [
        'Elevate the breast using the BACK of the hand and place the electrodes underneath',
        'Place the electrodes on top of the breast tissue',
        'Move V3–V5 higher onto the upper chest',
        'Omit V3–V5 and note it on the tracing'
      ], answer: 0 },

    { q: 'Which of these is NOT on the equipment list for an ECG?',
      choices: [
        'A sphygmomanometer',
        'Pre-gelled disposable electrodes',
        'Alcohol prep pads and gauze squares',
        'A disposable razor'
      ], answer: 0,
      why: 'The list is: electrocardiograph, ECG paper, pre-gelled disposable electrodes, patient cable and lead wires with clips, exam table, pillow, drape or gown, gauze, alcohol pads, chart/EHR, pen, and a disposable razor.' },

    { q: 'When should you look the tracing over for artifacts?',
      choices: [
        'After the ECG is obtained but BEFORE disconnecting the patient',
        'After the patient has been discharged',
        'Only if the provider asks',
        'While the machine is still recording'
      ], answer: 0,
      why: 'If there is interference you have to correct it and run a new tracing — much easier while the patient is still on the table.' },

    { q: 'A patient asks what the ECG is for. What is the best response, per your procedure checklist?',
      choices: [
        '"Today we are going to perform an ECG to see how the electrical activity and rhythm in your heart is working."',
        '"It checks whether you have had a heart attack."',
        '"The provider will explain it after the test."',
        '"It takes a picture of your heart using sound waves."'
      ], answer: 0,
      why: 'Then follow up with "Do you have any questions or concerns?" — the criteria step for acknowledging patient concerns.' },

    { q: 'Why must the power cord and the patient cable never touch?',
      choices: [
        'It causes electrical interference in the tracing',
        'It damages the electrodes',
        'It slows the paper speed',
        'It is a shock hazard to the operator only'
      ], answer: 0 },

    { q: 'A patient has dense chest hair over the V-lead positions. What do you do?',
      choices: [
        'Shave the area with the patient’s permission',
        'Press the electrodes down harder',
        'Move the electrodes to a hairless area',
        'Skip the chest leads and run a 6-lead tracing'
      ], answer: 0 },

    { q: 'Before a stress test, what must the patient be told to avoid, and for how long?',
      choices: [
        'No food, smoking, caffeine or alcohol for three hours or more beforehand',
        'No food for 12 hours; caffeine is fine',
        'Nothing — there is no preparation required',
        'No exercise for 24 hours beforehand'
      ], answer: 0 }
  ]
},

/* ───────────────────────────────  M103 · REVIEW SET  ─────────────────────── */

{
  id: 'ekg-test-review',
  group: 'EKG',
  exam: true,

  added: '2026-08-11',
  course: 'M103 · Medical Procedures',
  title: 'Test Review — Cardiology, EKG & Stress Tests',
  source: 'the in-class test review',
  /* These are the questions the instructor read out from the test, with the
     answers given in class, so the wording is worth keeping close.

     Cards are term-first, because that is the direction this app studies in —
     it shows the description and asks for the name. But the questions asked in
     the negative ("which is NOT true of...") are kept in `questions` in their
     original form as well, since that is how they will appear on the paper. A
     negative answer read off a flashcard teaches the false statement as fact,
     which is exactly how "6 to 7 electrodes" ended up wrong in ekg-basics.
     Ordering and reasoning live in `questions` too: no term/definition shape. */
  cards: [
    { term: 'Electrocardiograph',  def: 'a graphic representation of the heart’s electrical activity' },
    { term: 'Right atrium',        def: 'the chamber deoxygenated blood enters first when it returns to the heart' },
    { term: 'P wave',              def: 'atrial depolarization' },
    { term: 'QRS complex',         def: 'ventricular depolarization' },
    { term: 'T wave',              def: 'ventricular repolarization' },
    { term: 'Electrical discharge', def: 'another term for depolarization' },
    { term: 'SA node',             def: 'the body’s natural pacemaker' },
    { term: 'Cardiac cycle',       def: 'one heartbeat' },
    { term: 'Cardioversion',       def: 'the procedure that turns a cardiac arrhythmia back into a normal sinus rhythm' },
    { term: 'Normal sinus rhythm', def: 'an ECG reading within normal limits' },

    { term: 'Standard limb leads',           def: 'Lead I, Lead II and Lead III — bipolar, and recorded before the augmented ones' },
    { term: 'Unipolar leads',                def: 'what aVR, aVL and aVF are — each reads one electrode against a central reference point',
      note: 'Easy pair to swap. Unipolar is the three augmented leads; bipolar is the standard limb leads I, II and III, which read two electrodes against each other.' },
    { term: 'Precordial leads, chest leads', def: 'V1 through V6' },
    /* "What's V1 - V6? Know each one?" is question 9, and the transcript leaves
       it unanswered. The six placements are worded exactly as in ekg-leads, so
       the two decks cannot drift apart and say different things. */
    { term: 'V1', def: 'FOURTH intercostal space at the RIGHT margin of the sternum' },
    { term: 'V2', def: 'FOURTH intercostal space at the LEFT margin of the sternum' },
    { term: 'V3', def: 'midway between V2 and V4 — placed AFTER V4' },
    { term: 'V4', def: 'FIFTH intercostal space at the junction of the left midclavicular line' },
    { term: 'V5', def: 'horizontal level of V4 at the left ANTERIOR AXILLARY line' },
    { term: 'V6', def: 'horizontal level of V4 at the left MIDAXILLARY line' },
    { term: '10 mm',                         def: 'the height of a proper standardization mark, which confirms the machine is working properly' },
    { term: 'Electrocardiograph paper',      def: 'heat-sensitive — the heated stylus burns the tracing straight into it' },
    { term: 'Electrolyte gel',               def: 'applied under each electrode because skin conducts electricity poorly',
      note: 'The review words this as skin being a “core conductor”. Poor is the fact — gel exists precisely because skin conducts badly — but expect the review’s wording on the paper.' },
    { term: 'Single-channel EKG',            def: 'the machine that records one lead at a time rather than several at once' },

    { term: 'AC interference',     def: 'the artifact produced by electrical current in nearby equipment or wiring' },
    { term: 'Wandering baseline',  def: 'the artifact that poor-quality electrolyte gel produces' },
    { term: 'Interrupted baseline',def: 'what appears on the tracing when the metal tip of a lead wire comes away from its electrode' },

    { term: 'Thallium stress test', def: 'the test requiring an injection of a radioactive substance' },
    { term: 'Femoral artery',       def: 'the vessel a catheter with a deflated balloon is threaded into for a coronary balloon angioplasty' },
    { term: 'Coronary artery bypass', def: 'the surgery that takes a length of vein and grafts it onto the heart’s own vessels to carry blood past a blockage' },
    { term: 'ICD', def: 'the implanted device that senses a dangerous rhythm and sends a small dose of electricity to restore a normal one',
      note: 'Implantable cardioverter-defibrillator — cardioverter, not “cardioversion”.' },

    { term: 'Atrial fibrillation', def: 'the arrhythmia in which the upper chambers contract extremely rapidly and incompletely' },
    { term: 'Ventricular fibrillation', def: 'the immediately life-threatening arrhythmia — the lower chambers only quiver, so there is no cardiac output' },
    { term: 'PVC, premature ventricular contraction', def: 'the commonest disturbance of rhythm arising from the lower chambers — an early beat, ahead of the one due next' },
  ],

  questions: [
    { q: 'Starting at the SA node, what path does the impulse take through the conduction system?',
      choices: [
        'SA node → AV node → bundle of His → bundle branches → Purkinje fibers',
        'SA node → bundle of His → AV node → bundle branches → Purkinje fibers',
        'SA node → Purkinje fibers → AV node → bundle of His → bundle branches',
        'AV node → SA node → bundle of His → bundle branches → Purkinje fibers',
      ], answer: 0,
      why: 'The SA node fires, the AV node holds the impulse for a fraction of a second so the atria can finish emptying, then it runs down the bundle of His, splits into the right and left bundle branches, and spreads through the Purkinje fibers to contract the ventricles.' },

    { q: 'How many leads and how many electrode placements does a standard ECG use?',
      choices: [
        '12 leads from 10 placements',
        '10 leads from 12 placements',
        '12 leads from 12 placements',
        '10 leads from 10 placements',
      ], answer: 0,
      why: 'Ten electrodes — one on each limb and six across the chest — produce twelve different views of the heart’s electrical activity.' },

    { q: 'Why should an ECG be run in a quiet room?',
      choices: [
        'To reduce artifacts',
        'Because the machine picks up sound',
        'To keep the machine from overheating',
        'To speed the recording up',
      ], answer: 0,
      why: 'A calm room keeps the patient still and relaxed. Talking, moving and nervousness all put somatic tremor on the tracing.' },

    { q: 'Why are the limb electrodes placed on the fleshy part of the limb?',
      choices: [
        'To minimize artifacts',
        'Because bone conducts too strongly',
        'To keep the lead wires from tangling',
        'To make the electrodes easier to peel off',
      ], answer: 0,
      why: 'A flat, fleshy area gives the electrode steady contact. Over bone or a thin, bony surface the contact is poor and picks up tremor.' },

    { q: 'Where should the machine’s power cord be positioned, and why?',
      choices: [
        'Pointing away from the patient, to reduce AC interference',
        'Under the patient’s table, to keep it out of the way',
        'Coiled beside the patient, to stop it pulling on the leads',
        'Across the patient’s legs, to keep the wires together',
      ], answer: 0,
      why: 'Current flowing in the cord induces interference in the lead wires. A power cord running under the patient’s table is a classic cause of AC interference, and it counts as an error in technique.' },

    { q: 'Which of these would NOT result in somatic tremor artifact?',
      choices: [
        'Improper grounding of the ECG machine',
        'A patient shivering because the room is cold',
        'A patient who is nervous and tense on the table',
        'A patient with Parkinson’s disease',
      ], answer: 0,
      why: 'Somatic tremor comes from the patient’s own muscles — shivering, nerves, a tremor disorder. Grounding is an electrical fault, so it shows up as AC interference instead.' },

    { q: 'Which of these is NOT true of a multi-channel EKG?',
      choices: [
        'It records one lead at a time',
        'It records several leads at the same time',
        'It shortens the time the patient spends on the table',
        'It produces the full tracing in a single run',
      ], answer: 0,
      why: 'Recording one lead at a time is the single-channel machine. A multi-channel unit takes several leads simultaneously, which is why it is quicker.' },

    { q: 'Which of these is NOT true about Holter monitor electrodes?',
      choices: [
        'Six to seven electrodes are used',
        'They go on the chest and torso rather than the limbs',
        'The skin is cleaned, and may be shaved, before they are applied',
        'They stay in place for the whole recording period',
      ], answer: 0,
      why: 'The review keys the electrode count as the false statement. How many are used depends on how many channels the recorder runs, so no fixed figure is safe — the other three are all true of Holter electrodes.' },

    { q: 'What is an important part of patient education for a Holter monitor?',
      choices: [
        'To document any pain and keep a diary',
        'To remove the electrodes before sleeping',
        'To avoid drinking water while wearing it',
        'To stay in bed for the whole recording',
      ], answer: 0,
      why: 'The recording is only useful if symptoms can be matched against it, so the patient logs activities and any chest pain with the time each one happened.' },

    { q: 'What is true of a treadmill stress test?',
      choices: [
        'It has to be monitored by a doctor',
        'The patient is left alone once walking',
        'It is performed while the patient is sedated',
        'No ECG is recorded during the test itself',
      ], answer: 0,
      why: 'The whole point is to stress the heart until symptoms or ECG changes appear, so the doctor stays present throughout in case an arrhythmia or infarction develops. Some versions word this as “the provider” — same answer.' },

    { q: 'What should you do after running an ECG on a patient?',
      choices: [
        'Assist the patient as needed',
        'Leave immediately to process the tracing',
        'Send the patient to reception still gowned',
        'Leave the electrodes on in case a repeat is needed',
      ], answer: 0,
      why: 'The patient is partly undressed and lying flat. Help them sit up, dress and get down off the table before you go and deal with the tracing.' },
  ],
},

{
  id: 'mt12-guide',
  group: 'Chapter 12',
  exam: true,
  current: true,
  added: '2026-08-12',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 12 — Study Guide',
  source: 'Chapter 12 — instructor study guide (skin)',
  /* The guide is 65 flat "X is Y" statements, so these are near-verbatim, only
     turned around into term/definition. Where the guide gives an "also known
     as" name, it is kept as a comma alternate so Recall accepts either — except
     where that alias would appear in its own definition, in which case the
     alias moves into the definition instead and the term stays single. */
  cards: [
    { term: 'Cicatrix', def: 'a normal scar resulting from the healing of a wound' },
    { term: 'Keloid', def: 'an abnormally raised or thickened scar that expands beyond the boundaries of the original incision' },
    { term: 'Hemangioma',
      also: ['strawberry birthmark'], def: 'also called a strawberry birthmark — a soft, raised, pink or red vascular birthmark' },
    { term: 'Macule', def: 'a discolored flat spot less than 1 cm in diameter' },
    { term: 'Papule', def: 'a small, raised red lesion less than 0.5 cm in diameter that does not contain pus' },
    { term: 'Pustule, pimple', def: 'a small, circumscribed lesion containing pus' },
    { term: 'Wheal, welt', def: 'a small bump that itches' },
    { term: 'Bulla', def: 'a large blister, more than half a centimeter in diameter' },
    { term: 'Comedo', def: 'a noninfected lesion formed by the buildup of sebum and keratin in a hair follicle, often associated with acne vulgaris' },
    { term: 'Exudate', def: 'a fluid, such as pus, that leaks out of an infected wound' },
    { term: 'Contusion', def: 'an injury to the underlying tissues that does not break the skin, marked by discoloration and pain' },
    { term: 'Hematoma', def: 'a swelling of clotted blood trapped in the tissues, usually caused by an injury' },
    { term: 'Ecchymosis, bruise', def: 'a large, irregular area of purplish discoloration caused by bleeding under the skin' },
    { term: 'Purpura', def: 'multiple purple discolorations caused by bleeding underneath the skin' },
    { term: 'Petechiae', def: 'very small, pinpoint hemorrhages less than 2 mm in diameter' },
    { term: 'Erythema', def: 'redness of the skin due to capillary dilation' },
    { term: 'Erythroderma', def: 'abnormal redness of the entire skin surface' },

    { term: 'Basal cell carcinoma', def: 'a malignant tumor arising in the deepest layer of the epidermis' },
    { term: 'Squamous cell carcinoma', def: 'a malignant tumor of the flat, scaly cells of the epithelium' },
    { term: 'Melanoma', def: 'a skin cancer that arises in the pigment-producing cells' },
    { term: 'Dysplastic nevi', def: 'atypical moles that can develop into skin cancer' },
    { term: 'Actinic keratosis', def: 'a precancerous skin growth that occurs on sun-damaged skin' },
    { term: 'Keratosis', def: 'any skin growth, such as a wart or callus, in which there is overgrowth and thickening of the skin' },
    { term: 'Papilloma', def: 'a benign, superficial, wart-like growth on epithelial tissue' },
    { term: 'Lipoma', def: 'a benign fatty tumor under the skin that causes a bump' },
    { term: 'Granuloma', def: 'a small, knot-like swelling of granulation tissue in the epidermis' },

    { term: 'Dermatitis', def: 'inflammation of the skin' },
    { term: 'Eczema', def: 'a form of dermatitis with itching, redness, blistering and oozing' },
    { term: 'Psoriasis', def: 'a common skin disorder marked by flare-ups of red papules covered with silvery scales' },
    { term: 'Rosacea, adult acne', def: 'tiny red pimples and broken blood vessels, usually across the face' },
    { term: 'Urticaria, hives', def: 'itchy wheals caused by an allergic reaction' },
    { term: 'Pruritus, itching', def: 'the symptom that makes a patient scratch, associated with most forms of dermatitis' },
    { term: 'Xeroderma, xerosis', def: 'excessively dry skin' },
    { term: 'Ichthyosis', def: 'a group of hereditary disorders causing widespread dry, thickened, scaly skin',
      note: 'The study guide defines this twice — once as widespread scaling, once as the hereditary disorders behind it. Both descriptions are of the same condition; this card carries both halves.' },
    { term: 'Scleroderma', def: 'an autoimmune disorder causing thickened and hardened connective tissue' },
    { term: 'Systemic lupus erythematosus, SLE', def: 'an autoimmune disorder characterized by a red, scaly rash' },
    { term: 'Vitiligo', def: 'loss of colour in patches, caused by destruction of the melanocytes for unknown reasons' },
    { term: 'Albinism', def: 'a genetic condition characterized by a deficiency or absence of pigment' },
    { term: 'Chloasma, melasma', def: 'a pigmentation disorder characterized by brownish spots on the face' },
    { term: 'Lipedema',
      also: ['painful fat syndrome'], def: 'also called painful fat syndrome — a chronic accumulation of fat and fluid in the tissues under the skin' },

    { term: 'Cellulitis', def: 'an acute, rapidly spreading bacterial infection within the connective tissues' },
    { term: 'Impetigo', def: 'a highly contagious bacterial skin infection characterized by pustules that crust and rupture' },
    { term: 'Necrotizing fasciitis', def: 'the infection popularly called flesh-eating bacteria, which can destroy body tissue and be fatal' },
    { term: 'Furuncle, boil', def: 'a large, tender, swollen area caused by a staphylococcal infection around a hair follicle or sebaceous gland' },
    { term: 'Carbuncle', def: 'a cluster of connected furuncles' },
    { term: 'Folliculitis', def: 'inflammation of the hair follicles' },
    { term: 'Tinea', def: 'a fungal infection that can grow on the skin, hair or nails' },
    { term: 'Scabies', def: 'a skin infection caused by an infestation of itch mites' },
    { term: 'Pediculosis', def: 'an infestation with lice' },
    { term: 'Verrucae, warts', def: 'small, hard skin lesions caused by the human papillomavirus' },
    { term: 'Exanthem', def: 'a widespread rash, usually in children' },

    { term: 'Alopecia', def: 'baldness' },
    { term: 'Hirsutism', def: 'excessive body and facial hair in women, usually in a male pattern' },
    { term: 'Seborrhea', def: 'overactivity of the sebaceous glands resulting in excessive sebum production' },
    { term: 'Hyperhidrosis', def: 'profuse sweating' },

    { term: 'Onychomycosis', def: 'a fungal infection of the nail' },
    { term: 'Onychia, onychitis', def: 'inflammation of the bed of the nail that often results in loss of the nail' },
    { term: 'Paronychia', def: 'an acute or chronic infection of the skin fold around a nail' },
    { term: 'Onychocryptosis', def: 'the medical term for an ingrown toenail' },
    { term: 'Koilonychia',
      also: ['spoon nail'], def: 'also called spoon nail — a malformation in which the nail is concave' },

    { term: 'Debridement', def: 'the removal of dirt, foreign objects, damaged tissue and cellular debris from a wound' },
    { term: 'Rhytidectomy',
      also: ['facelift'], def: 'also called a facelift — the surgical removal of excess skin and fat to eliminate wrinkles' },
    { term: 'Blepharoplasty', def: 'the surgical reduction of the upper and lower eyelids by removing sagging skin' },
    { term: 'Purulent', def: 'producing or containing pus' },
  ],
},

{
  id: 'bio-osmosis',
  exam: true,
  retired: true,
  /* Filed under Chapter 3 rather than standing alone: it is section 3.3 pulled
     out for one test, and once that test is behind us it belongs with the
     chapter it came from rather than holding a shelf of its own. */
  group: 'Chapter 3',
  added: '2026-08-12',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Osmosis — Focused Review',
  source: 'Chapter 3.3 — Movements Into and Out of the Cell',
  /* Osmosis only, pulled out of the Chapter 3 guide because a test on one topic
     is badly served by 83 cards on the whole chapter. Scope is osmosis and what
     bears on it: what moves, what drives it, and what it does to a cell. The
     other passive mechanisms are here as contrast, because "which of these is
     osmosis" is the question a paper actually asks. The active mechanisms are
     deliberately left out — they are in bio-ch3, and they are not osmosis. */
  cards: [
    { term: 'Osmosis', def: 'PASSIVE — water moves through a selectively permeable membrane toward the side holding more solute that cannot cross',
      note: 'The notes put it best: where salt goes, water follows. No ATP — the water is driven by its own molecular motion.' },
    { term: 'Aquaporins', def: 'the protein channels that let water cross the cell membrane',
      note: 'Water has two ways across in osmosis: through these, or by slipping between the phospholipids of the membrane itself.' },
    { term: 'Selectively permeable', def: 'describing a barrier that lets some substances through while blocking others' },
    { term: 'Impermeant solute', def: 'a dissolved particle the membrane will not let through, so water moves instead' },
    { term: 'Osmotic pressure', def: 'the pull a solution exerts on water — the more trapped solute it holds, the stronger the pull, and water always moves toward the stronger side' },
    { term: 'Tonicity', def: 'the power of a solution outside a cell to change the volume of water inside it' },

    { term: 'Isotonic solution', def: 'the SAME solute concentration as the cell — equal salt inside and out, so the cell keeps its shape' },
    { term: 'Hypertonic solution', def: 'a HIGHER solute concentration than body fluids — more salt outside, so water leaves and the cell SHRINKS' },
    { term: 'Hypotonic solution', def: 'a LOWER solute concentration than body fluids — less salt outside, so water enters and the cell SWELLS or bursts' },
    { term: 'Crenation', def: 'the shrivelling of a cell after water has left it' },
    { term: 'Hemolysis', def: 'the bursting of a red blood cell that has taken on too much water' },

    { term: 'Diffusion', def: 'PASSIVE — molecules spread through the bilayer from higher to lower concentration under their own kinetic energy. Example: oxygen and carbon dioxide exchanging in the lungs' },
    { term: 'Facilitated diffusion', def: 'PASSIVE — "helped" movement high to low, but through channels or carrier proteins because the particle cannot cross the bilayer alone. Example: glucose entering a cell' },
    { term: 'Filtration', def: 'PASSIVE — smaller molecules forced through a porous membrane by PRESSURE, from the high side to the low' },
    { term: 'Physiological steady state', def: 'concentrations of diffusing substances are unequal but STABLE — what living organisms reach instead of true equilibrium' },

    /* What changes the RATE. The notes define diffusion as movement driven by
       kinetic energy but never say what follows from that, which is where the
       heat question on the test came from. */
    { term: 'Temperature, heat', def: 'raise this and diffusion and osmosis both run faster, because the particles carry more energy and collide more often',
      note: 'Warmth speeding osmosis up does NOT make it active transport. The energy comes from the particles themselves, not from the cell spending ATP.' },
    { term: 'Concentration gradient', def: 'the difference between the two sides of a membrane — the steeper it is, the faster particles cross' },
    { term: 'Molecular size', def: 'why a small particle crosses a membrane faster than a bulky one, all else being equal' },
    { term: 'Surface area', def: 'the more membrane there is to cross, the more can move at once — the reason alveoli and intestinal villi are so folded' },
  ],

  questions: [
    { q: 'In osmosis, which way does water move?',
      choices: [
        'Toward the side with more solute that cannot cross the membrane',
        'Toward the side with less solute',
        'Toward the side with more water molecules',
        'Equally in both directions until the solute concentrations match',
      ], answer: 0,
      why: 'Water follows the solute it cannot dilute by any other route. Where salt goes, water follows — so the side with the greater osmotic pressure draws water in.' },

    { q: 'What separates osmosis from ordinary diffusion?',
      choices: [
        'Osmosis is specifically water crossing a selectively permeable membrane',
        'Osmosis requires ATP and diffusion does not',
        'Osmosis moves particles from low to high concentration',
        'Osmosis only happens in red blood cells',
      ], answer: 0,
      why: 'Both are passive and both run down a gradient. Osmosis is the special case where the thing moving is water and the membrane blocks the solute.' },

    { q: 'A red blood cell is placed in a hypertonic solution. What happens?',
      choices: [
        'Water leaves the cell and it shrivels — crenation',
        'Water enters the cell and it bursts — hemolysis',
        'Nothing; the cell keeps its shape',
        'Salt is pumped out of the cell to compensate',
      ], answer: 0,
      why: 'Hypertonic means more solute outside than in. Water leaves toward the higher concentration and the cell shrinks. Hyper — the outside is "hyped up" with salt.' },

    { q: 'A red blood cell is placed in a hypotonic solution. What happens?',
      choices: [
        'Water enters the cell and it swells or bursts — hemolysis',
        'Water leaves the cell and it shrivels — crenation',
        'Nothing; the cell keeps its shape',
        'The cell membrane becomes impermeable to water',
      ], answer: 0,
      why: 'Hypotonic means less solute outside than in, so water moves inward toward the saltier inside. Distilled water entering a cell is the textbook example.' },

    { q: 'Does osmosis require the cell to spend ATP?',
      choices: [
        'No — it is passive, driven by molecular motion',
        'Yes — carrier proteins burn ATP to move the water',
        'Only when moving water out of the cell',
        'Only across the membranes of red blood cells',
      ], answer: 0,
      why: 'Osmosis is a passive mechanism. ATP is what separates active transport, endocytosis and exocytosis from the passive group of diffusion, facilitated diffusion, osmosis and filtration.' },

    { q: 'A cell is warmed. What happens to the rate of osmosis?',
      choices: [
        'It speeds up — the molecules carry more kinetic energy',
        'It slows down — heat drives water out of the cell',
        'It stops — the aquaporins close above body temperature',
        'Nothing — osmosis is passive, so temperature cannot affect it',
      ], answer: 0,
      why: 'Diffusion and osmosis are driven by molecular motion, and heat IS molecular motion, so warming speeds them up and cooling slows them down. Watch the last option: passive means the cell spends no ATP, not that nothing can change the rate. The energy comes from the particles, not from the cell.' },

    { q: 'Water crosses into a cell fastest when…',
      choices: [
        'the difference in solute concentration across the membrane is greatest',
        'the concentrations either side are nearly equal',
        'the solute outside can cross the membrane freely',
        'the cell has the most ATP available to spend',
      ], answer: 0,
      why: 'The steeper the gradient, the faster the movement. If the solute can cross freely it evens out by diffusion instead, and there is nothing left to pull water.' },

    { q: 'Why are the alveoli of the lungs and the villi of the small intestine so folded?',
      choices: [
        'Folding multiplies the surface area available for diffusion',
        'Folding shortens the distance blood has to travel',
        'Folding makes the membrane thicker and stronger',
        'Folding lets the tissues use active transport instead',
      ], answer: 0,
      why: 'More membrane means more diffusion happening at once. Surface area, the steepness of the gradient, temperature, and the size of the particle are the four things that set how fast diffusion runs.' },

    { q: 'Why does diffusional equilibrium NOT normally occur in a living organism?',
      choices: [
        'Cells keep consuming and producing substances, so concentrations stay unequal but stable',
        'Cell membranes block diffusion completely',
        'Body temperature is too low for molecules to move',
        'Equilibrium is reached instantly, so it is never observed',
      ], answer: 0,
      why: 'That stable-but-unequal condition is the physiological steady state. A cell that reached true equilibrium with its surroundings would be dead.' },
  ],
}

];
