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
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Word Roots',
  source: 'Notes/TERM 1/M159 - Medical Terminology 1 (CANVAS)/Chapter 1.md',
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
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Suffixes',
  source: 'Notes/TERM 1/M159 - Medical Terminology 1 (CANVAS)/Chapter 1.md',
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
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Prefixes',
  source: 'Notes/TERM 1/M159 - Medical Terminology 1 (CANVAS)/Chapter 1.md',
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
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 1 — Medical Terms',
  source: 'Notes/TERM 1/M159 - Medical Terminology 1 (CANVAS)/Chapter 1.md',
  cards: [
    { term: 'abdominocentesis', def: 'surgical puncture of the abdominal cavity to remove fluid' },
    { term: 'acute',            def: 'a condition with rapid onset, severe course and relatively short duration' },
    { term: 'angiography',      def: 'x-ray study of the blood vessels after injection of a contrast medium',
      note: 'Spelled "aniography" in your notes — the correct spelling is angiography (angi/o = vessel).' },
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
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 2 — Word Parts (Body Structure)',
  source: 'Notes/TERM 1/M159 - Medical Terminology 1 (CANVAS)/Chapter 2.md',
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
      note: 'This row was left blank in your Chapter 2 notes — filled in here. It is the root behind aplasia, hyperplasia, dysplasia.' },
    { term: 'poster/o',    def: 'behind, toward the back' },
    { term: '-cyte',       def: 'cell (suffix form)' },
    { term: '-ologist',    def: 'specialist' },
    { term: '-ology',      def: 'the science or study of' },
    { term: '-pathy',      def: 'disease, suffering, feeling, emotion' },
    { term: '-plasia',     def: 'development, growth, formation' },
    { term: '-stasis, -static', def: 'control, maintenance of a constant level' }
  ]
},

{
  id: 'mt2-terms',
  course: 'M159 · Medical Terminology 1',
  title: 'Ch. 2 — Body Structure & Disease',
  source: 'Notes/TERM 1/M159 - Medical Terminology 1 (CANVAS)/Chapter 2.md',
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
    { term: 'umbilicus',        def: 'the belly button / navel — marks where the umbilical cord attached before birth' }
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

/* ─────────────────────────  BIO101 · ANATOMY & PHYSIOLOGY 1  ─────────────── */

{
  id: 'bio-cell',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 3 — The Composite Cell & Organelles',
  source: 'Notes/TERM 1/BIO101 LEC - Anatomy & Physiology 1 Lec (CANVAS)/Chapter 3.md',
  cards: [
    { term: 'Nucleus',        def: 'the innermost control center, enclosed by a double-layered nuclear envelope' },
    { term: 'Nuclear envelope', def: 'the thin double membrane (inner + outer lipid bilayer) enclosing the nucleus' },
    { term: 'Nucleolus',      def: 'small dense body of RNA and protein with NO membrane — the site of ribosome production' },
    { term: 'Chromatin',      def: 'extremely long DNA molecules complexed with proteins, wound like thread around spools' },
    { term: 'Cytoplasm',      def: 'the cell contents holding the organelles, suspended in a liquid called cytosol' },
    { term: 'Cytosol',        def: 'the liquid in which the cytoplasmic organelles are suspended' },
    { term: 'Cell membrane',  def: 'the thin, flexible, elastic outermost limit of the cell separating the two major fluid compartments' },
    { term: 'Phospholipid bilayer', def: 'the double layer of phospholipid molecules forming the basic framework of the cell membrane' },
    { term: 'Ribosomes',      def: 'tiny spherical structures of protein and RNA that SYNTHESIZE proteins' },
    { term: 'Rough ER',       def: 'endoplasmic reticulum studded with ribosomes — makes PROTEINS' },
    { term: 'Smooth ER',      def: 'endoplasmic reticulum with no ribosomes — makes FATS (lipids)' },
    { term: 'Vesicles',       def: 'membranous sacs that store or transport substances within a cell or between cells' },
    { term: 'Golgi apparatus',def: 'a stack of 5–8 flattened sacs (cisternae) that refines, packages and transports proteins' },
    { term: 'Mitochondria',   def: 'the "powerhouse" — produces ATP by cellular respiration' },
    { term: 'ATP',            def: 'adenosine triphosphate — the cell’s energy currency, supplied by mitochondria' },
    { term: 'Lysosomes',      def: 'the "garbage disposals" — enzymes inside dismantle cellular debris' },
    { term: 'Autophagy',      def: 'literally "eating self" — the process by which lysosomes break down the cell’s own debris' },
    { term: 'Cilia & flagella', def: 'motile extensions of the cell membrane; both are built from nine groups of three microtubules' },
    { term: 'Cilia (what they do)', def: 'beat in a coordinated wave to drive mucus along the respiratory tract and move an egg toward the uterus' },
    { term: 'Flagellum (what it does)', def: 'whips to move the WHOLE cell; the sperm tail is the only one in the human body, and a cell has just one' },
    { term: 'Cytoskeleton', def: 'the internal scaffolding of protein rods and tubules that supports the cell' },
    { term: 'Microfilaments, microtubules & intermediate filaments', def: 'the thread-like structures that together build the cytoskeleton' },
    { term: 'Centrioles', def: 'build the spindle fibres during cell division, which drag the chromosomes into the daughter cells' },
    { term: 'Selectively permeable', def: 'the membrane property that lets the cell choose what gets in and out' },
    { term: 'What the bilayer admits', def: 'lipid-soluble substances cross freely; water-soluble ones cannot and need a channel or carrier' },
    { term: 'Cell size', def: 'measured in micrometers' },
    { term: 'Faulty ion channels', def: 'channel mutations can disturb heart rhythm, impair hearing, or cause cystic fibrosis',
      note: 'The lecture slide names the specific ions in an image that did not extract as text — worth checking your slides for which channel goes with which condition.' },
    { term: 'Cystic fibrosis', def: 'caused by abnormal chloride channels — thick mucus, breathing difficulty, a clogged pancreas and salty sweat' },
    { term: 'Differentiated', def: 'the term for cells that have taken on specialized characteristics' },
    { term: 'Receptors (membrane protein)', def: 'respond to extracellular signals' },
    { term: 'Pores, channels & carriers',   def: 'transport small molecules and ions; transduce signals' },
    { term: 'Enzymes (membrane protein)',   def: 'catalyze chemical reactions' },
    { term: 'Cell surface proteins',        def: 'establish "self" — cellular identity' },
    { term: 'Cellular adhesion molecules',  def: 'enable cells to stick to each other' }
  ],
  questions: [
    { q: 'Which organelle has NO surrounding membrane?',
      choices: ['The nucleolus', 'The Golgi apparatus', 'A lysosome', 'A mitochondrion'], answer: 0,
      why: 'The nucleolus is formed in specialized regions of certain chromosomes and is the site of ribosome production.' },

    { q: 'Rough ER is to ___ as smooth ER is to ___.',
      choices: ['proteins … fats', 'fats … proteins', 'ATP … proteins', 'fats … ATP'], answer: 0 },

    { q: 'Which sequence correctly describes protein handling in the cell?',
      choices: [
        'Ribosomes on rough ER synthesize it → Golgi refines and packages it → vesicles transport it',
        'Golgi synthesizes it → ribosomes package it → lysosomes transport it',
        'Smooth ER synthesizes it → mitochondria package it → vesicles transport it',
        'Lysosomes synthesize it → rough ER packages it → Golgi transports it'
      ], answer: 0 },

    { q: 'Roughly how much ATP does one glucose molecule yield with oxygen, and what are the byproducts?',
      choices: [
        '36–38 ATP, with CO₂ and H₂O as byproducts',
        '2 ATP, with lactic acid as the byproduct',
        '100 ATP, with O₂ as the byproduct',
        '12 ATP, with glucose as the byproduct'
      ], answer: 0 },

    { q: 'Skeletal muscle cells contain many thousands of mitochondria, while a typical cell has about 1,700. Why?',
      choices: [
        'Because they have very high energy requirements',
        'Because they need extra storage for fats',
        'Because they lack a nucleus',
        'Because they divide more often than other cells'
      ], answer: 0 }
  ]
},

{
  id: 'bio-transport',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 3 — Membrane Transport',
  source: 'Notes/TERM 1/BIO101 LEC - Anatomy & Physiology 1 Lec (CANVAS)/Chapter 3.md',
  cards: [
    { term: 'Diffusion', def: 'PASSIVE — molecules move through the bilayer from higher to lower concentration. Energy: molecular motion. Example: O₂/CO₂ exchange in the lungs' },
    { term: 'Facilitated diffusion', def: 'PASSIVE — "helped diffusion"; ions use channels or carrier proteins to move high → low. Example: glucose entering a cell' },
    { term: 'Osmosis', def: 'PASSIVE — water moves through aquaporins/the bilayer toward the solution with more impermeant solute. Example: distilled water entering a cell' },
    { term: 'Filtration', def: 'PASSIVE — smaller molecules forced through porous membranes from high to low PRESSURE. Energy: hydrostatic pressure. Example: molecules leaving blood capillaries' },
    { term: 'Active transport', def: 'ACTIVE (ATP) — carrier molecules move substances from LOWER to HIGHER concentration, against the gradient' },
    { term: 'Endocytosis', def: 'ACTIVE (ATP) — particles too large to diffuse are brought in by a vesicle that forms from the cell membrane' },
    { term: 'Pinocytosis', def: 'ACTIVE (ATP) — "cell drinking"; the membrane engulfs droplets of liquid with dissolved solutes' },
    { term: 'Phagocytosis', def: 'ACTIVE (ATP) — "cell eating"; the membrane engulfs SOLID particles. Example: a white blood cell engulfing bacteria' },
    { term: 'Receptor-mediated endocytosis', def: 'ACTIVE (ATP) — the membrane engulfs selected molecules bound to receptor proteins. Example: removing LDL cholesterol particles' },
    { term: 'Exocytosis', def: 'ACTIVE (ATP) — the opposite of endocytosis; vesicles fuse with the membrane and release contents outside. Example: neurotransmitter release' },
    { term: 'Transcytosis', def: 'ACTIVE (ATP) — endocytosis in, through the cytoplasm, then exocytosis out the other side. Example: HIV crossing a cell layer' },
    { term: 'Isotonic solution',  def: 'the SAME solute concentration as the cell — equal salt inside and out, so the cell keeps its shape' },
    { term: 'Hypertonic solution',def: 'a HIGHER solute concentration than body fluids — more salt outside, so water leaves and the cell SHRINKS (crenation)' },
    { term: 'Hypotonic solution', def: 'a LOWER solute concentration than body fluids — less salt outside, so water enters and the cell SWELLS or bursts' },
    { term: 'Crenation',          def: 'the shrivelling of a cell after water leaves it in a hypertonic solution' },
    { term: 'Hemolysis',          def: 'the bursting of a red blood cell that has taken on too much water in a hypotonic solution' },
    { term: 'Physiological steady state', def: 'concentrations of diffusing substances are unequal but STABLE — what organisms reach instead of true equilibrium' }
  ],
  questions: [
    { q: 'What is the single biggest difference between active transport and facilitated diffusion?',
      choices: [
        'Active transport moves particles from LOW to HIGH concentration and costs ATP',
        'Active transport uses no carrier proteins',
        'Facilitated diffusion only moves water',
        'Facilitated diffusion requires ATP; active transport does not'
      ], answer: 0,
      why: 'Both use carriers in the membrane. Only active transport pushes against the gradient, which is why it needs energy.' },

    { q: 'A red blood cell is placed in a hypertonic solution. What happens?',
      choices: [
        'Water leaves the cell and it shrinks — crenation',
        'Water enters the cell and it swells or bursts',
        'Nothing — the cell stays the same size',
        'The cell actively pumps solute inward'
      ], answer: 0,
      why: 'Remember the rule from your notes: "where salt goes, water follows." Hypertonic = more salt outside → water follows it out → crenation.' },

    { q: 'A cell is placed in a hypotonic solution. What happens?',
      choices: [
        'Water enters the cell and it swells, possibly bursting',
        'Water leaves the cell and it shrivels',
        'Nothing — the concentrations are already equal',
        'The cell membrane becomes impermeable to water'
      ], answer: 0,
      why: 'Hypo = less solute outside than in the cell, so water moves inward. This is the opposite of crenation.' },

    { q: 'Which process is driven by hydrostatic pressure rather than molecular motion?',
      choices: ['Filtration', 'Osmosis', 'Diffusion', 'Facilitated diffusion'], answer: 0,
      why: 'Filtration forces smaller molecules through a porous membrane from high pressure to low — the way fluid leaves a blood capillary.' },

    { q: 'A white blood cell engulfing a bacterium is an example of:',
      choices: ['Phagocytosis', 'Pinocytosis', 'Exocytosis', 'Filtration'], answer: 0,
      why: 'Phago = eating (solids). Pino = drinking (liquid droplets).' },

    { q: 'Why does diffusional equilibrium NOT normally occur in living organisms?',
      choices: [
        'Organisms maintain a physiological steady state — concentrations stay unequal but stable',
        'Molecules stop moving inside the body',
        'Cell membranes block all diffusion',
        'Body temperature is too high for diffusion'
      ], answer: 0 },

    { q: 'Delivering antibodies from a mother’s milk into the blood of a nursing infant is an example of:',
      choices: ['Transcytosis', 'Filtration', 'Osmosis', 'Active transport'], answer: 0,
      why: 'Transcytosis moves material into, through, and out of a cell — bridging two different environments.' }
  ]
},

{
  id: 'bio-cellcycle',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 3 — Cell Cycle, Stem Cells & Cell Death',
  source: 'Notes/TERM 1/BIO101 LEC - Anatomy & Physiology 1 Lec (CANVAS)/Chapter 3.md',
  cards: [
    { term: 'Interphase', def: 'the cell grows and its genetic material replicates (before mitosis begins)' },
    { term: 'Prophase',   def: 'chromatin condenses into visible chromosomes; the nuclear envelope and nucleolus disperse; the spindle apparatus forms' },
    { term: 'Metaphase',  def: 'chromosomes align along the MIDLINE of the cell' },
    { term: 'Anaphase',   def: 'centromeres separate and sister chromatids are pulled apart — each is now an individual chromosome' },
    { term: 'Telophase',  def: 'nuclear envelopes reassemble, chromosomes decondense, the spindle disappears' },
    { term: 'Cytokinesis',def: 'division of the cytoplasm into two separate cells' },
    { term: 'Stem cells', def: 'cells that keep dividing repeatedly WITHOUT specializing, allowing continual growth and renewal' },
    { term: 'Stem cell division', def: 'a stem cell divides mitotically to yield two daughter cells identical to itself, which go on dividing' },
    { term: 'Self-renewal', def: 'a stem cell dividing to make two new stem cells, keeping the supply topped up' },
    { term: 'Progenitor cell', def: 'a partly specialized daughter of a stem cell, able to become only a RESTRICTED set of cell types' },
    { term: 'Differentiation', def: 'the process guiding cell specialization, by activating and suppressing the functions of many genes' },
    { term: 'Cytokinesis vs mitosis', def: 'mitosis divides the NUCLEUS; cytokinesis divides the CYTOPLASM into two cells' },
    { term: 'Apoptosis',  def: 'PROGRAMMED cell death — the planned option for a cell that does not divide or differentiate' },
    { term: 'Necrosis',   def: 'cell death resulting from DAMAGE (unplanned)' }
  ],
  questions: [
    { q: 'Put the four phases of mitosis in order.',
      choices: [
        'Prophase → Metaphase → Anaphase → Telophase',
        'Metaphase → Prophase → Telophase → Anaphase',
        'Anaphase → Prophase → Metaphase → Telophase',
        'Telophase → Anaphase → Metaphase → Prophase'
      ], answer: 0,
      why: 'PMAT. Interphase (growth + DNA replication) comes before all four.' },

    { q: 'During which phase do chromosomes line up along the midline of the cell?',
      choices: ['Metaphase', 'Prophase', 'Anaphase', 'Telophase'], answer: 0,
      why: 'Metaphase = Middle.' },

    { q: 'What is the key difference between apoptosis and necrosis?',
      choices: [
        'Apoptosis is programmed cell death; necrosis results from damage',
        'Apoptosis results from damage; necrosis is programmed',
        'Both are programmed; only the speed differs',
        'Apoptosis only occurs in stem cells'
      ], answer: 0,
      why: 'This distinction shows up again in cardiology — myocardial infarction kills tissue by necrosis.' }
  ]
},

{
  id: 'bio-division-control',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 3 — Cell Division Control & Cancer',
  source: 'Assets/Chap 3 Study Guide Powerpoint.pptx (lecture outline)',
  cards: [
    { term: 'Control of cell division', def: 'how often a cell divides is tightly regulated, and the rate differs from one cell type to the next' },
    { term: 'Cells that divide continually', def: 'skin, the intestinal lining, and the blood-forming cells of the marrow' },
    { term: 'Neurons', def: 'divide a set number of times and then stop for good' },
    { term: 'Tumor', def: 'a mass produced when cell division escapes its normal controls' },
    { term: 'Benign tumor', def: 'stays put in one local area' },
    { term: 'Malignant tumor', def: 'invasive and cancerous — able to spread beyond its original site' },
    { term: 'Metastasize', def: 'to spread from the original site to somewhere else in the body' },
    { term: 'Oncogene', def: 'a faulty version of a gene that drives the cell cycle, stuck switched ON far too strongly' },
    { term: 'Tumor suppressor gene', def: 'normally puts the BRAKES on mitosis; lose it or switch it off and division runs unchecked' },
    { term: 'The two gene types behind cancer', def: 'oncogenes, which are overactive, and tumor suppressor genes, which are disabled' }
  ],
  questions: [
    { q: 'What is the difference between a benign and a malignant tumor?',
      choices: [
        'A benign tumor stays local; a malignant one is invasive and can metastasize',
        'A malignant tumor stays local; a benign one spreads',
        'Benign tumors are made of oncogenes; malignant ones are not',
        'There is no structural difference, only size'
      ], answer: 0 },

    { q: 'An oncogene and a tumor suppressor gene fail in opposite ways. Which describes it?',
      choices: [
        'An oncogene is overactive; a tumor suppressor gene is inactivated',
        'An oncogene is inactivated; a tumor suppressor gene is overactive',
        'Both are overactive',
        'Both are inactivated'
      ], answer: 0,
      why: 'Think accelerator versus brakes: cancer can come from flooring the accelerator OR from cutting the brake line.' },

    { q: 'Which cells keep dividing throughout life?',
      choices: [
        'Skin, intestinal lining, and blood-forming cells',
        'Neurons and cardiac muscle cells',
        'Only stem cells in the marrow',
        'None — all division stops after development'
      ], answer: 0,
      why: 'Neurons are the contrast: they divide a set number of times, then stop permanently.' },

    { q: 'How does a progenitor cell differ from a stem cell?',
      choices: [
        'A progenitor cell is partly specialized and can become only a restricted set of cell types',
        'A progenitor cell can become any cell type; a stem cell cannot',
        'A progenitor cell cannot divide at all',
        'They are two names for the same thing'
      ], answer: 0,
      why: 'A stem cell self-renews and keeps every option open; a progenitor has already narrowed its choices.' }
  ]
},

{
  id: 'bio-metabolism',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 4 — Cellular Metabolism & Energy',
  source: 'Notes/TERM 1/BIO101 LEC - Anatomy & Physiology 1 Lec (CANVAS)/Chapter 4.md',
  cards: [
    { term: 'Metabolism',  def: 'the collection of ALL the chemical reactions that occur in the body' },
    { term: 'Anabolism',   def: 'building small molecules UP into larger ones — REQUIRES energy' },
    { term: 'Catabolism',  def: 'breaking larger molecules DOWN into smaller ones — RELEASES energy as heat' },
    { term: '-ase',        def: 'the word ending that tells you a molecule is an enzyme' },
    { term: 'Enzyme',      def: 'speeds up a chemical reaction' },
    { term: 'Energy',      def: 'the capacity to change something — the ability to do work' },
    { term: 'ATP',         def: 'adenosine triphosphate — the primary energy-carrying molecule in a cell' },
    { term: 'Parts of ATP',def: 'an adenine, a ribose, and THREE phosphates' },
    { term: 'ADP',         def: 'adenosine diphosphate — what ATP becomes after losing its terminal phosphate, leaving TWO' },
    { term: 'Cellular respiration', def: 'glycolysis, then the citric acid cycle, then the electron transport chain' },
    { term: 'Anaerobic',   def: 'does NOT require oxygen' },
    { term: 'Aerobic',     def: 'DOES require oxygen — most of the ATP produced comes from these reactions' },
    { term: 'Glycolysis',  def: '"the breaking of glucose" — ten enzyme-catalysed reactions splitting one 6-carbon glucose into two 3-carbon pyruvic acid molecules' },
    { term: 'Where glycolysis happens', def: 'in the CYTOPLASM; the product then moves into the mitochondrion' },
    { term: 'Pyruvic acid',def: 'the intermediate product of carbohydrate oxidation' },
    { term: 'Citric acid cycle', def: 'the 3-carbon pyruvic acids generated by glycolysis enter the mitochondria separately' },
    { term: 'Electron transport chain', def: 'where MOST of the ATP is produced — 28 ATP, out of 32 total across all the processes',
      note: 'Your Chapter 3 notes say one glucose yields 36–38 ATP, while Chapter 4 says 32 total. Both figures are in circulation: older textbooks quote 36–38, newer ones ~30–32 once the cost of shuttling NADH into the mitochondrion is counted. Go with whichever your instructor uses — but know they refer to the same process.' },
    { term: 'Carbohydrate storage', def: 'hydrolysis breaks dietary carbohydrates into monosaccharides, which are then burned for energy or stored as glycogen or triglycerides' }
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

    { q: 'Where does glycolysis take place?',
      choices: [
        'In the cytoplasm, with the product then entering the mitochondrion',
        'Inside the mitochondrion from start to finish',
        'In the nucleus',
        'On the rough endoplasmic reticulum'
      ], answer: 0,
      why: 'This trips people up — only the later stages happen inside the mitochondrion.' },

    { q: 'Glycolysis splits one glucose molecule into:',
      choices: [
        'Two 3-carbon pyruvic acid molecules',
        'Three 2-carbon acetyl molecules',
        'One 6-carbon pyruvic acid molecule',
        'Six 1-carbon carbon dioxide molecules'
      ], answer: 0,
      why: 'Glucose has 6 carbons, so it splits evenly into two 3-carbon pieces.' },

    { q: 'What is the difference between ATP and ADP?',
      choices: [
        'ATP has three phosphates; ADP has two, having lost the terminal one',
        'ADP has three phosphates; ATP has two',
        'ATP contains ribose; ADP contains deoxyribose',
        'They are two names for the same molecule'
      ], answer: 0 },

    { q: 'Which stage of cellular respiration produces the most ATP?',
      choices: [
        'The electron transport chain',
        'Glycolysis',
        'The citric acid cycle',
        'Hydrolysis'
      ], answer: 0,
      why: 'Glycolysis and the citric acid cycle mostly hand off high-energy electrons; the transport chain is where those are cashed in.' },

    { q: 'A molecule whose name ends in "-ase" is:',
      choices: ['An enzyme', 'A sugar', 'A phosphate', 'A nucleotide'], answer: 0 }
  ]
},

{
  id: 'bio-dna',
  course: 'BIO101 · Anatomy & Physiology 1 Lecture',
  title: 'Ch. 4 — DNA & Protein Synthesis',
  source: 'Notes/TERM 1/BIO101 LEC - Anatomy & Physiology 1 Lec (CANVAS)/Chapter 4.md',
  cards: [
    { term: 'DNA',   def: 'deoxyribonucleic acid — its nucleotide sequence holds the instructions for building a particular protein' },
    { term: 'Structure of DNA', def: 'double-stranded: two polynucleotide chains twisted into a double helix' },
    { term: 'Gene',  def: 'a sequence of nucleotide bases along ONE DNA strand carrying the information for one protein’s amino acid sequence' },
    { term: 'Gene length', def: 'may be thousands or even millions of bases long' },
    { term: 'Genetic information', def: 'passed from parents to offspring as DNA molecules; mitosis passes it on to new cells' },
    { term: 'DNA replication', def: 'making an exact copy of a DNA molecule, so each new cell gets the whole genome — happens during INTERPHASE' },
    { term: 'Transcription', def: 'copying the DNA information into messenger RNA — happens in the NUCLEUS' },
    { term: 'RNA',   def: 'ribonucleic acid — carries the information from the nucleus to the ribosome' },
    { term: 'Translation', def: 'converting the mRNA message from nucleic acid into amino acids — happens in the CYTOPLASM' },
    { term: 'Mutation', def: 'a change produced when DNA replication results in an error' }
  ],
  questions: [
    { q: 'Transcription and translation happen where, respectively?',
      choices: [
        'Transcription in the nucleus, translation in the cytoplasm',
        'Transcription in the cytoplasm, translation in the nucleus',
        'Both in the nucleus',
        'Both in the cytoplasm'
      ], answer: 0,
      why: 'The mRNA is written in the nucleus, then carries the message out to a ribosome, where it is read into amino acids.' },

    { q: 'During which part of the cell cycle does DNA replication occur?',
      choices: ['Interphase', 'Prophase', 'Metaphase', 'Telophase'], answer: 0,
      why: 'Interphase is the growth phase where genetic material replicates — before mitosis begins.' },

    { q: 'What exactly is a gene?',
      choices: [
        'A sequence of nucleotide bases along one DNA strand coding for one protein’s amino acid sequence',
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

    { q: 'A mutation is:',
      choices: [
        'A change caused by an error during DNA replication',
        'The normal copying of DNA before cell division',
        'The movement of mRNA out of the nucleus',
        'A type of enzyme that cuts DNA'
      ], answer: 0 }
  ]
},

/* ─────────────────────────  M103 · MEDICAL PROCEDURES  ──────────────────── */

{
  id: 'ekg-basics',
  course: 'M103 · Medical Procedures',
  title: 'EKG — Waves, Intervals & Paper',
  source: 'Notes/TERM 1/M103 LEC .../Chapter 45.md  +  M103 LAB .../EKG.md',
  cards: [
    { term: 'Electrocardiogram (ECG/EKG)', def: 'a recording of the electrical impulses of the heart muscle; noninvasive, painless and safe' },
    { term: 'P wave',       def: 'ATRIAL DEPOLARIZATION (contraction) — the first impulse recorded, begun by the SA node' },
    { term: 'QRS complex',  def: 'VENTRICULAR DEPOLARIZATION (contraction); atrial relaxation also happens here' },
    { term: 'Q wave',       def: 'a NEGATIVE deflection wave' },
    { term: 'R wave',       def: 'a POSITIVE deflection wave' },
    { term: 'S wave',       def: 'a NEGATIVE deflection wave (after R)' },
    { term: 'T wave',       def: 'VENTRICULAR REPOLARIZATION (relaxation) — recovery time before the next contraction' },
    { term: 'U wave',       def: 'a positive deflection associated with repolarization, only occasionally seen in some patients' },
    { term: 'Systole',      def: 'contraction' },
    { term: 'Diastole',     def: 'relaxation' },
    { term: 'Isoelectric line', def: 'the flat baseline separating the waves — periods with no current; precedes the P wave and follows the T wave' },
    { term: 'Interval',     def: 'the time between events — a period that includes one segment AND one or more waves' },
    { term: 'Segment',      def: 'the portion of the ECG BETWEEN two waves' },
    { term: 'PR interval',  def: 'beginning of the P wave to the beginning of the QRS — normal 0.12–0.20 seconds' },
    { term: 'QT interval',  def: 'beginning of the QRS to the end of the T wave — normal 0.36–0.44 seconds' },
    { term: 'ST segment',   def: 'end of the QRS to the beginning of the T wave; should sit on the baseline' },
    { term: 'ST elevation / depression', def: 'ST segment above or below baseline — indicative of ischemia, a lack of blood flow to the heart' },
    { term: 'Sinoatrial (SA) node', def: 'in the upper right atrium — the "pacemaker of the heart"; where the impulse originates and what makes the atria contract' },
    { term: 'Conduction pathway',   def: 'SA node → AV node → Bundle of His → Purkinje fibers' },
    { term: 'Purkinje fibers',      def: 'cause the ventricles to contract and produce the QRS complex' },
    { term: 'Paper speed',          def: '25 mm/sec is standard; the horizontal axis measures TIME' },
    { term: 'Vertical axis',        def: 'records voltage (gain / amplitude)' },
    { term: 'Small square',         def: '1 mm × 1 mm = 0.04 seconds' },
    { term: 'Large square',         def: '5 mm × 5 mm = 0.2 seconds — five large squares = 1.0 second' },
    { term: 'Standardization mark', def: '2 mm wide × 10 mm high at sensitivity 1; should appear in front of each lead' },
    { term: 'Sensitivity ½',        def: 'used when the tracing is too LARGE — produces a mark 2 mm wide × 5 mm high' },
    { term: 'Sensitivity 2',        def: 'used when the tracing is too SMALL — produces a mark 2 mm wide × 20 mm high' },
    { term: 'Galvanometer',         def: 'transforms the electrical current into mechanical motion inside the machine' },
    { term: 'Stylus',               def: 'the heated pen-like instrument on non-digital machines that prints the tracing' },
    { term: 'Holter monitor',       def: 'a portable "ambulatory / walking ECG" recording the heart for 24+ hours; patient keeps a diary and presses an event button for symptoms' },
    { term: 'Event monitor',        def: 'a version the patient activates only when symptoms occur; can be worn for several days' },
    { term: 'Stress test',          def: 'exercise ECG for patients at high risk of heart disease; no food, smoking, caffeine or alcohol for 3+ hours before' },
    { term: 'Echocardiography',     def: 'a noninvasive diagnostic tool that tests the STRUCTURE and FUNCTION of the heart using sound waves' },
    { term: 'Defibrillator',        def: 'delivers a countershock to convert cardiac arrhythmias back into a regular sinus rhythm' }
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
  course: 'M103 · Medical Procedures',
  title: 'EKG — The 12 Leads & Electrode Placement',
  source: 'Notes/TERM 1/M103 LEC .../Chapter 45.md',
  chest: true,          /* unlocks the Place the Leads mode */
  cards: [
    { term: '12-lead ECG',  def: '12 recordings of the heart’s electrical activity from different angles, using 10 electrodes — 4 limb, 6 chest' },
    { term: 'Lead I',       def: 'BIPOLAR — voltage difference between the LEFT ARM and the RIGHT ARM' },
    { term: 'Lead II',      def: 'BIPOLAR — voltage difference between the RIGHT ARM and the LEFT LEG',
      note: 'The right leg is the GROUND electrode and is never part of any lead — a fast way to sanity-check any lead question.' },
    { term: 'Lead III',     def: 'BIPOLAR — voltage difference between the LEFT ARM and the LEFT LEG' },
    { term: 'aVR',          def: 'augmented Voltage Right arm — RA vs. a central point between LA and LL' },
    { term: 'aVL',          def: 'augmented Voltage Left arm — LA vs. a central point between RA and LL' },
    { term: 'aVF',          def: 'augmented Voltage left leg / Foot — LL vs. a central point between RA and LA' },
    { term: 'Why "augmented"?', def: 'these three leads produce small impulses that must be amplified (augmented) by the machine to be recorded' },
    { term: 'Bipolar vs. unipolar', def: 'BIPOLAR (I, II, III) — both poles are real electrodes on the patient. UNIPOLAR (aVR, aVL, aVF, V1–V6) — one real "exploring" electrode measured against a CALCULATED central reference point',
      note: 'All voltage is a difference between two points, so "measures a difference" cannot be what separates them — what separates them is whether the negative pole is a physical electrode or a computed average. By that convention the augmented leads are unipolar, which is how lines 44–46 of your Chapter 45 notes describe them ("a central point between..."). But the heading on that page groups them as bipolar — go with your instructor and textbook on the exam.' },
    { term: 'Lead II strip', def: 'the main lead read for heart rate and rhythm; providers often request an extra two-foot rhythm strip of Lead II alone' },
    { term: 'V1', def: 'FOURTH intercostal space at the RIGHT margin of the sternum' },
    { term: 'V2', def: 'FOURTH intercostal space at the LEFT margin of the sternum' },
    { term: 'V3', def: 'midway between V2 and V4 — placed AFTER V4' },
    { term: 'V4', def: 'FIFTH intercostal space at the junction of the left midclavicular line' },
    { term: 'V5', def: 'horizontal level of V4 at the left ANTERIOR AXILLARY line' },
    { term: 'V6', def: 'horizontal level of V4 at the left MIDAXILLARY line' },
    { term: 'Order of chest placement', def: 'V1 → V2 → V4 → V3 → V5 → V6 (V4 goes on before V3, because V3 is defined by where V4 lands)' },
    { term: 'RA electrode color', def: 'WHITE' },
    { term: 'LA electrode color', def: 'BLACK' },
    { term: 'LL electrode color', def: 'RED' },
    { term: 'RL electrode color', def: 'GREEN (the ground)' },
    { term: 'Arm electrode position', def: 'fleshy outer area of the UPPER arm with the connectors pointing DOWN' },
    { term: 'Leg electrode position', def: 'fleshy inner area of the LOWER leg near the calf with the connectors pointing UP' }
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
  id: 'ekg-rhythms',
  course: 'M103 · Medical Procedures',
  title: 'EKG — Artifacts & Arrhythmias',
  source: 'Notes/TERM 1/M103 LEC .../Chapter 45.md',
  cards: [
    { term: 'Somatic tremor',     def: 'ARTIFACT from shivering — nervousness, cold, or neurological conditions like Parkinson’s. Fix: place arm electrodes closer to the shoulders' },
    { term: 'Alternating current (AC) interference', def: 'ARTIFACT from electrical activity nearby. Fix: keep power cords away from the patient, move the table away from the wall' },
    { term: 'Wandering baseline', def: 'ARTIFACT from improperly applied electrodes or improperly cleaned skin. Fix: remove oils, creams and lotions with an alcohol prep pad' },
    { term: 'Interrupted baseline', def: 'ARTIFACT from an electrode separating from the wire, or a broken lead wire. Fix: reattach securely or repair the wire' },
    { term: 'Normal sinus rhythm', def: 'a heart rate between 60 and 100 BPM' },
    { term: 'Sinus bradycardia',   def: 'a heart rate BELOW 60 BPM' },
    { term: 'Sinus tachycardia',   def: 'a heart rate ABOVE 100 BPM' },
    { term: 'Arrhythmia',          def: 'an irregularity in the heart’s rhythm — not all are dangerous' },
    { term: 'Premature atrial contraction (PAC)', def: 'a cycle that occurs before the next one is due, with a differently shaped P wave. Seen in healthy people who smoke or use stimulants' },
    { term: 'Paroxysmal atrial tachycardia (PAT)', def: 'a brief episode of 160–250 BPM; patients describe it as a "flutter" in the heart' },
    { term: 'Atrial fibrillation (A-fib)', def: 'rapid multiple signals firing from the atria outside the SA node; the P wave cannot be identified, leaving small irregular complexes',
      note: 'The 400–500 BPM figure in your notes is the ATRIAL rate, not the pulse rate — the ventricles respond much more slowly.' },
    { term: 'A-fib causes',        def: 'myocardial infarction, hypertension, mitral valve disease, heart failure, thyroid disorders, pulmonary emboli, excessive alcohol' },
    { term: 'Premature ventricular contraction (PVC)', def: 'a beat occurring EARLY in the cycle, followed by a PAUSE before the next cycle' },
    { term: 'Ventricular tachycardia', def: 'three or more PVCs at 150–250 BPM, with NO P waves and imprecise QRS complexes — life threatening' },
    { term: 'Ventricular fibrillation (V-fib)', def: 'an erratic, jagged "sawtooth" rhythm; the ventricles tremor and there is NO cardiac output' },
    { term: 'Pacemaker arrhythmia', def: 'vertical signals (spikes) representing the pacemaker’s electrical activity; more visible in unipolar than bipolar leads' },
    { term: 'Scope of practice', def: 'interpreting ECGs is beyond your scope — but recognizing arrhythmias and alerting the provider is essential' }
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
  course: 'M103 · Medical Procedures',
  title: 'EKG — Performing the Procedure',
  source: 'Notes/TERM 1/M103 LEC .../Chapter 45.md',
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
}

];
