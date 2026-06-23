import type { SentenceExercise } from '../types';

export const sentenceExercises: SentenceExercise[] = [
  {
    id: 'sentence-a1-001',
    level: 'A1',
    topic: 'Dativ with mit',
    promptEnglish: 'I go to the supermarket with my friend.',
    correctAnswer: 'Ich gehe mit meinem Freund in den Supermarkt.',
    wordBank: ['Ich', 'gehe', 'mit', 'meinem', 'Freund', 'in', 'den', 'Supermarkt'],
    explanation:
      "The preposition 'mit' always takes Dativ, so 'mein Freund' becomes 'meinem Freund'. 'in den Supermarkt' uses Akkusativ because there is movement toward a place. In a main clause, the conjugated verb 'gehe' is in position 2.",
    grammarTags: ['verb-second', 'dativ', 'two-way-prepositions', 'akkusativ'],
  },
  {
    id: 'sentence-a1-002',
    level: 'A1',
    topic: 'Introductions',
    promptEnglish: 'I come from India and live in Berlin.',
    correctAnswer: 'Ich komme aus Indien und wohne in Berlin.',
    wordBank: ['Ich', 'komme', 'aus', 'Indien', 'und', 'wohne', 'in', 'Berlin'],
    explanation:
      "'Ich' is the subject, so both verbs are conjugated for ich: 'komme' and 'wohne'. 'aus' tells origin and is followed by the place you come from.",
    grammarTags: ['verb-second', 'introduction', 'prepositions'],
  },
  {
    id: 'sentence-a1-003',
    level: 'A1',
    topic: 'Family and work',
    promptEnglish: 'My sister works today in the hospital.',
    correctAnswer: 'Meine Schwester arbeitet heute im Krankenhaus.',
    wordBank: ['Meine', 'Schwester', 'arbeitet', 'heute', 'im', 'Krankenhaus'],
    explanation:
      "'Meine Schwester' is the subject. The verb 'arbeitet' stays in position 2. 'im Krankenhaus' means 'in dem Krankenhaus' and describes location, so it uses Dativ.",
    grammarTags: ['verb-second', 'dativ', 'location'],
  },
  {
    id: 'sentence-a1-004',
    level: 'A1',
    topic: 'Akkusativ objects',
    promptEnglish: 'I buy an apple and a bottle of water.',
    correctAnswer: 'Ich kaufe einen Apfel und eine Flasche Wasser.',
    wordBank: ['Ich', 'kaufe', 'einen', 'Apfel', 'und', 'eine', 'Flasche', 'Wasser'],
    explanation:
      "'einen Apfel' is masculine Akkusativ because it is the direct object of 'kaufe'. 'eine Flasche' is feminine, and feminine articles look the same in Nominativ and Akkusativ.",
    grammarTags: ['verb-second', 'akkusativ', 'shopping'],
  },
  {
    id: 'sentence-a2-005',
    level: 'A2',
    topic: 'Appointments',
    promptEnglish: 'On Monday I have an appointment at the doctor.',
    correctAnswer: 'Am Montag habe ich einen Termin beim Arzt.',
    wordBank: ['Am', 'Montag', 'habe', 'ich', 'einen', 'Termin', 'beim', 'Arzt'],
    explanation:
      "When a time phrase starts the sentence, the verb still stays in position 2: 'Am Montag habe ich...'. 'einen Termin' is Akkusativ because it is what you have. 'beim Arzt' means 'bei dem Arzt' and uses Dativ.",
    grammarTags: ['verb-second', 'akkusativ', 'dativ', 'appointments'],
  },
  {
    id: 'sentence-a1-006',
    level: 'A1',
    topic: 'Separable verbs',
    promptEnglish: 'I get up every day at seven o’clock.',
    correctAnswer: 'Ich stehe jeden Tag um sieben Uhr auf.',
    wordBank: ['Ich', 'stehe', 'jeden', 'Tag', 'um', 'sieben', 'Uhr', 'auf'],
    explanation:
      "'aufstehen' is separable. The conjugated part 'stehe' goes in position 2, and the prefix 'auf' moves to the end of the main clause.",
    grammarTags: ['verb-second', 'separable-verbs', 'daily-routine'],
  },
  {
    id: 'sentence-a1-007',
    level: 'A1',
    topic: 'Separable verbs',
    promptEnglish: 'I call my mother this evening.',
    correctAnswer: 'Ich rufe meine Mutter heute Abend an.',
    wordBank: ['Ich', 'rufe', 'meine', 'Mutter', 'heute', 'Abend', 'an'],
    explanation:
      "'anrufen' is separable: 'rufe' is in position 2 and 'an' goes to the end. 'meine Mutter' is the direct object, so it is Akkusativ; feminine forms do not change here.",
    grammarTags: ['verb-second', 'separable-verbs', 'akkusativ', 'family'],
  },
  {
    id: 'sentence-a1-008',
    level: 'A1',
    topic: 'Dativ with mit and nach',
    promptEnglish: 'We travel to Hamburg tomorrow by train.',
    correctAnswer: 'Wir fahren morgen mit dem Zug nach Hamburg.',
    wordBank: ['Wir', 'fahren', 'morgen', 'mit', 'dem', 'Zug', 'nach', 'Hamburg'],
    explanation:
      "'mit dem Zug' uses Dativ because 'mit' always takes Dativ. 'nach Hamburg' is used for going to many cities and countries without articles.",
    grammarTags: ['verb-second', 'dativ', 'travel'],
  },
  {
    id: 'sentence-a1-009',
    level: 'A1',
    topic: 'Modal verbs',
    promptEnglish: 'I have to study German today.',
    correctAnswer: 'Ich muss heute Deutsch lernen.',
    wordBank: ['Ich', 'muss', 'heute', 'Deutsch', 'lernen'],
    explanation:
      "With a modal verb, the modal 'muss' is conjugated and stays in position 2. The main verb 'lernen' stays in the infinitive at the end.",
    grammarTags: ['verb-second', 'modal-verbs', 'word-order'],
  },
  {
    id: 'sentence-a1-010',
    level: 'A1',
    topic: 'Dativ pronouns',
    promptEnglish: 'Can you help me please?',
    correctAnswer: 'Kannst du mir bitte helfen?',
    wordBank: ['Kannst', 'du', 'mir', 'bitte', 'helfen'],
    explanation:
      "'helfen' takes Dativ, so 'me' is 'mir'. In yes/no questions, the conjugated verb comes first: 'Kannst du...?'",
    grammarTags: ['questions', 'dativ', 'modal-verbs'],
  },
  {
    id: 'sentence-a2-011',
    level: 'A2',
    topic: 'Perfekt',
    promptEnglish: 'Yesterday I played football in the park.',
    correctAnswer: 'Ich habe gestern im Park Fußball gespielt.',
    wordBank: ['Ich', 'habe', 'gestern', 'im', 'Park', 'Fußball', 'gespielt'],
    explanation:
      "In Perfekt, the helping verb 'habe' is in position 2 and the past participle 'gespielt' goes to the end. 'im Park' is a location and uses Dativ.",
    grammarTags: ['perfekt', 'verb-second', 'dativ', 'past-events'],
  },
  {
    id: 'sentence-a2-012',
    level: 'A2',
    topic: 'Perfekt with direct objects',
    promptEnglish: 'She visited her family on the weekend.',
    correctAnswer: 'Sie hat am Wochenende ihre Familie besucht.',
    wordBank: ['Sie', 'hat', 'am', 'Wochenende', 'ihre', 'Familie', 'besucht'],
    explanation:
      "The helping verb 'hat' is in position 2, and 'besucht' goes to the end. 'ihre Familie' is Akkusativ because it is the person being visited.",
    grammarTags: ['perfekt', 'akkusativ', 'family'],
  },
  {
    id: 'sentence-a2-013',
    level: 'A2',
    topic: 'Dativ receiver and Akkusativ object',
    promptEnglish: 'I give the child a book.',
    correctAnswer: 'Ich gebe dem Kind ein Buch.',
    wordBank: ['Ich', 'gebe', 'dem', 'Kind', 'ein', 'Buch'],
    explanation:
      "'dem Kind' is Dativ because the child receives something. 'ein Buch' is Akkusativ because it is the direct object being given.",
    grammarTags: ['dativ', 'akkusativ', 'verb-second'],
  },
  {
    id: 'sentence-a1-014',
    level: 'A1',
    topic: 'Two-way prepositions: location',
    promptEnglish: 'The coffee is on the table.',
    correctAnswer: 'Der Kaffee steht auf dem Tisch.',
    wordBank: ['Der', 'Kaffee', 'steht', 'auf', 'dem', 'Tisch'],
    explanation:
      "'auf dem Tisch' answers 'where?' and describes location, so the two-way preposition 'auf' uses Dativ.",
    grammarTags: ['two-way-prepositions', 'dativ', 'location'],
  },
  {
    id: 'sentence-a1-015',
    level: 'A1',
    topic: 'Two-way prepositions: movement',
    promptEnglish: 'I put the book on the table.',
    correctAnswer: 'Ich lege das Buch auf den Tisch.',
    wordBank: ['Ich', 'lege', 'das', 'Buch', 'auf', 'den', 'Tisch'],
    explanation:
      "'auf den Tisch' answers 'where to?' because the book moves onto the table. With movement toward a place, a two-way preposition uses Akkusativ.",
    grammarTags: ['two-way-prepositions', 'akkusativ', 'movement'],
  },
  {
    id: 'sentence-a1-016',
    level: 'A1',
    topic: 'Going places',
    promptEnglish: 'We are going to the cinema this evening.',
    correctAnswer: 'Wir gehen heute Abend ins Kino.',
    wordBank: ['Wir', 'gehen', 'heute', 'Abend', 'ins', 'Kino'],
    explanation:
      "'ins Kino' means 'in das Kino'. It uses Akkusativ because you are moving toward the cinema.",
    grammarTags: ['verb-second', 'two-way-prepositions', 'akkusativ'],
  },
  {
    id: 'sentence-a1-017',
    level: 'A1',
    topic: 'Shopping',
    promptEnglish: 'I need a new coat.',
    correctAnswer: 'Ich brauche einen neuen Mantel.',
    wordBank: ['Ich', 'brauche', 'einen', 'neuen', 'Mantel'],
    explanation:
      "'einen neuen Mantel' is masculine Akkusativ because it is the direct object of 'brauche'. The adjective also shows Akkusativ masculine: 'neuen'.",
    grammarTags: ['akkusativ', 'adjective-endings', 'shopping'],
  },
  {
    id: 'sentence-a2-018',
    level: 'A2',
    topic: 'Dativ with mit',
    promptEnglish: 'He speaks with his teacher about the exam.',
    correctAnswer: 'Er spricht mit seiner Lehrerin über die Prüfung.',
    wordBank: ['Er', 'spricht', 'mit', 'seiner', 'Lehrerin', 'über', 'die', 'Prüfung'],
    explanation:
      "'mit seiner Lehrerin' uses Dativ because 'mit' always takes Dativ. 'über die Prüfung' is Akkusativ here because it means 'about the exam'.",
    grammarTags: ['dativ', 'akkusativ', 'prepositions'],
  },
  {
    id: 'sentence-a1-019',
    level: 'A1',
    topic: 'Daily routine',
    promptEnglish: 'After work I go home.',
    correctAnswer: 'Nach der Arbeit gehe ich nach Hause.',
    wordBank: ['Nach', 'der', 'Arbeit', 'gehe', 'ich', 'nach', 'Hause'],
    explanation:
      "'nach der Arbeit' uses Dativ because 'nach' is a Dativ preposition. Because the time phrase comes first, the verb 'gehe' is still in position 2.",
    grammarTags: ['verb-second', 'dativ', 'daily-routine'],
  },
  {
    id: 'sentence-a2-020',
    level: 'A2',
    topic: 'Preposition plus object',
    promptEnglish: 'I have been waiting for the bus for one hour.',
    correctAnswer: 'Ich warte seit einer Stunde auf den Bus.',
    wordBank: ['Ich', 'warte', 'seit', 'einer', 'Stunde', 'auf', 'den', 'Bus'],
    explanation:
      "'seit einer Stunde' uses Dativ because 'seit' is a Dativ preposition. 'auf den Bus' is Akkusativ with the fixed phrase 'auf etwas warten'.",
    grammarTags: ['dativ', 'akkusativ', 'prepositions'],
  },
];
