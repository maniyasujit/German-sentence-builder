import type { VocabularyEntry } from '../types';

export const vocabularyContext: VocabularyEntry[] = [
  {
    word: 'gehen',
    meaning: 'to go; to work; to be possible',
    patterns: ['nach Hause gehen', 'einkaufen gehen', 'es geht + adjective', 'Worum geht es?'],
    examples: [
      { sentence: 'Ich gehe nach Hause.', meaning: 'I am going home.' },
      { sentence: 'Mir geht es gut.', meaning: 'I am doing well.' },
      { sentence: 'Das geht nicht.', meaning: 'That is not possible.' },
      { sentence: 'Worum geht es?', meaning: 'What is it about?' },
      { sentence: 'Ich gehe einkaufen.', meaning: 'I am going shopping.' },
    ],
    practice: {
      prompt: 'Write: I am going home.',
      correctAnswer: 'Ich gehe nach Hause.',
    },
  },
  {
    word: 'machen',
    meaning: 'to do; to make',
    patterns: ['Hausaufgaben machen', 'einen Termin machen', 'Sport machen', 'das macht Spaß'],
    examples: [
      { sentence: 'Ich mache meine Hausaufgaben.', meaning: 'I am doing my homework.' },
      { sentence: 'Wir machen einen Termin.', meaning: 'We make an appointment.' },
      { sentence: 'Sie macht gern Sport.', meaning: 'She likes doing sports.' },
      { sentence: 'Das macht Spaß.', meaning: 'That is fun.' },
      { sentence: 'Was machst du heute?', meaning: 'What are you doing today?' },
    ],
    practice: {
      prompt: 'Write: We make an appointment.',
      correctAnswer: 'Wir machen einen Termin.',
    },
  },
  {
    word: 'nehmen',
    meaning: 'to take',
    patterns: ['den Bus nehmen', 'ein Taxi nehmen', 'Medizin nehmen', 'ich nehme + Akkusativ'],
    examples: [
      { sentence: 'Ich nehme den Bus.', meaning: 'I take the bus.' },
      { sentence: 'Nimmst du ein Taxi?', meaning: 'Are you taking a taxi?' },
      { sentence: 'Sie nimmt die Tablette morgens.', meaning: 'She takes the tablet in the morning.' },
      { sentence: 'Wir nehmen zwei Kaffee.', meaning: 'We will take two coffees.' },
      { sentence: 'Nehmen Sie Platz.', meaning: 'Please take a seat.' },
    ],
    practice: {
      prompt: 'Write: I take the bus.',
      correctAnswer: 'Ich nehme den Bus.',
    },
  },
  {
    word: 'bekommen',
    meaning: 'to get; to receive',
    patterns: ['eine E-Mail bekommen', 'Hilfe bekommen', 'einen Termin bekommen', 'Geld bekommen'],
    examples: [
      { sentence: 'Ich bekomme morgen eine E-Mail.', meaning: 'I will get an email tomorrow.' },
      { sentence: 'Bekommen wir einen Termin?', meaning: 'Can we get an appointment?' },
      { sentence: 'Sie bekommt Hilfe von ihrer Freundin.', meaning: 'She gets help from her friend.' },
      { sentence: 'Ich habe eine Antwort bekommen.', meaning: 'I got an answer.' },
      { sentence: 'Er bekommt jeden Monat Geld.', meaning: 'He receives money every month.' },
    ],
    practice: {
      prompt: 'Write: I got an answer.',
      correctAnswer: 'Ich habe eine Antwort bekommen.',
    },
  },
  {
    word: 'geben',
    meaning: 'to give; there is/are',
    patterns: ['jemandem etwas geben', 'es gibt + Akkusativ', 'eine Antwort geben', 'Trinkgeld geben'],
    examples: [
      { sentence: 'Ich gebe dem Kind ein Buch.', meaning: 'I give the child a book.' },
      { sentence: 'Es gibt heute Suppe.', meaning: 'There is soup today.' },
      { sentence: 'Kannst du mir deine Nummer geben?', meaning: 'Can you give me your number?' },
      { sentence: 'Sie gibt dem Kellner Trinkgeld.', meaning: 'She gives the waiter a tip.' },
      { sentence: 'Wir geben morgen eine Antwort.', meaning: 'We will give an answer tomorrow.' },
    ],
    practice: {
      prompt: 'Write: Can you give me your number?',
      correctAnswer: 'Kannst du mir deine Nummer geben?',
    },
  },
  {
    word: 'kommen',
    meaning: 'to come',
    patterns: ['aus + place kommen', 'zu spät kommen', 'nach Hause kommen', 'mitkommen'],
    examples: [
      { sentence: 'Ich komme aus Spanien.', meaning: 'I come from Spain.' },
      { sentence: 'Der Bus kommt um acht Uhr.', meaning: 'The bus comes at eight.' },
      { sentence: 'Kommst du mit?', meaning: 'Are you coming along?' },
      { sentence: 'Sie kommt heute spät nach Hause.', meaning: 'She comes home late today.' },
      { sentence: 'Entschuldigung, ich komme zu spät.', meaning: 'Sorry, I am late.' },
    ],
    practice: {
      prompt: 'Write: I come from Spain.',
      correctAnswer: 'Ich komme aus Spanien.',
    },
  },
  {
    word: 'fahren',
    meaning: 'to drive; to travel by vehicle',
    patterns: ['mit dem Zug fahren', 'nach Berlin fahren', 'Auto fahren', 'zur Arbeit fahren'],
    examples: [
      { sentence: 'Ich fahre mit dem Zug.', meaning: 'I travel by train.' },
      { sentence: 'Wir fahren morgen nach Berlin.', meaning: 'We are going to Berlin tomorrow.' },
      { sentence: 'Kannst du Auto fahren?', meaning: 'Can you drive?' },
      { sentence: 'Sie fährt jeden Tag zur Arbeit.', meaning: 'She drives to work every day.' },
      { sentence: 'Er ist nach Hamburg gefahren.', meaning: 'He went to Hamburg.' },
    ],
    practice: {
      prompt: 'Write: I travel by train.',
      correctAnswer: 'Ich fahre mit dem Zug.',
    },
  },
  {
    word: 'brauchen',
    meaning: 'to need',
    patterns: ['ich brauche + Akkusativ', 'Hilfe brauchen', 'einen Termin brauchen', 'Zeit brauchen'],
    examples: [
      { sentence: 'Ich brauche einen Termin.', meaning: 'I need an appointment.' },
      { sentence: 'Brauchst du Hilfe?', meaning: 'Do you need help?' },
      { sentence: 'Wir brauchen mehr Zeit.', meaning: 'We need more time.' },
      { sentence: 'Sie braucht ihren Pass.', meaning: 'She needs her passport.' },
      { sentence: 'Ich brauche keine Tasche.', meaning: 'I do not need a bag.' },
    ],
    practice: {
      prompt: 'Write: I need an appointment.',
      correctAnswer: 'Ich brauche einen Termin.',
    },
  },
  {
    word: 'sollen',
    meaning: 'should; be supposed to',
    patterns: ['ich soll + infinitive', 'du sollst + infinitive', 'Was soll ich machen?', 'Soll ich...?'],
    examples: [
      { sentence: 'Ich soll morgen anrufen.', meaning: 'I am supposed to call tomorrow.' },
      { sentence: 'Du sollst mehr Wasser trinken.', meaning: 'You should drink more water.' },
      { sentence: 'Was soll ich machen?', meaning: 'What should I do?' },
      { sentence: 'Soll ich das Formular mitbringen?', meaning: 'Should I bring the form?' },
      { sentence: 'Wir sollen pünktlich sein.', meaning: 'We should be on time.' },
    ],
    practice: {
      prompt: 'Write: What should I do?',
      correctAnswer: 'Was soll ich machen?',
    },
  },
  {
    word: 'müssen',
    meaning: 'must; have to',
    patterns: ['ich muss + infinitive', 'wir müssen + infinitive', 'nicht müssen', 'morgen müssen'],
    examples: [
      { sentence: 'Ich muss heute lernen.', meaning: 'I have to study today.' },
      { sentence: 'Wir müssen zum Arzt gehen.', meaning: 'We have to go to the doctor.' },
      { sentence: 'Musst du arbeiten?', meaning: 'Do you have to work?' },
      { sentence: 'Sie muss den Bus nehmen.', meaning: 'She has to take the bus.' },
      { sentence: 'Du musst das nicht machen.', meaning: 'You do not have to do that.' },
    ],
    practice: {
      prompt: 'Write: I have to study today.',
      correctAnswer: 'Ich muss heute lernen.',
    },
  },
  {
    word: 'können',
    meaning: 'can; to be able to',
    patterns: ['ich kann + infinitive', 'kannst du...?', 'gut können', 'nicht können'],
    examples: [
      { sentence: 'Ich kann Deutsch sprechen.', meaning: 'I can speak German.' },
      { sentence: 'Kannst du mir helfen?', meaning: 'Can you help me?' },
      { sentence: 'Wir können am Freitag kommen.', meaning: 'We can come on Friday.' },
      { sentence: 'Sie kann gut kochen.', meaning: 'She can cook well.' },
      { sentence: 'Das kann ich nicht machen.', meaning: 'I cannot do that.' },
    ],
    practice: {
      prompt: 'Write: Can you help me?',
      correctAnswer: 'Kannst du mir helfen?',
    },
  },
  {
    word: 'lassen',
    meaning: 'to leave; to let; to have something done',
    patterns: ['etwas hier lassen', 'jemanden etwas machen lassen', 'reparieren lassen', 'Lass uns...'],
    examples: [
      { sentence: 'Ich lasse den Schlüssel zu Hause.', meaning: 'I leave the key at home.' },
      { sentence: 'Lass uns Kaffee trinken.', meaning: 'Let’s drink coffee.' },
      { sentence: 'Wir lassen das Auto reparieren.', meaning: 'We are having the car repaired.' },
      { sentence: 'Sie lässt ihr Handy im Büro.', meaning: 'She leaves her phone in the office.' },
      { sentence: 'Kannst du mich schlafen lassen?', meaning: 'Can you let me sleep?' },
    ],
    practice: {
      prompt: 'Write: Let’s drink coffee.',
      correctAnswer: 'Lass uns Kaffee trinken.',
    },
  },
];
