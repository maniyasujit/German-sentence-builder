import type { PracticeExercise } from '../types';

const timeWords = ['heute', 'morgen', 'gestern', 'nächste Woche', 'am Montag', 'am Dienstag', 'am Morgen', 'am Abend'];
const commonVerbs = [
  'bin',
  'bist',
  'ist',
  'sind',
  'seid',
  'habe',
  'hast',
  'hat',
  'haben',
  'muss',
  'musst',
  'müssen',
  'kann',
  'kannst',
  'können',
  'gehe',
  'gehst',
  'geht',
  'gehen',
  'komme',
  'kommt',
  'kommen',
  'brauche',
  'braucht',
  'lernen',
  'mitbringen',
];

const nounStopWords = new Set(['Ich', 'Du', 'Er', 'Sie', 'Es', 'Wir', 'Ihr', 'Heute', 'Morgen', 'Gestern']);

export function removePunctuation(word: string): string {
  return word.replace(/[^\p{L}äöüÄÖÜß-]/gu, '');
}

export function splitIntoSentences(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(/\s+/).length >= 4);
}

export function tokenizeSentence(sentence: string): string[] {
  return sentence.split(/\s+/).filter(Boolean);
}

export function detectCapitalizedNouns(sentence: string): string[] {
  return tokenizeSentence(sentence)
    .map(removePunctuation)
    .filter((word, index) => word.length > 2 && /^[A-ZÄÖÜ]/.test(word) && (index > 0 || !nounStopWords.has(word)))
    .filter((word, index, words) => words.indexOf(word) === index);
}

function chooseImportantWord(sentence: string): string {
  const tokens = tokenizeSentence(sentence).map(removePunctuation).filter(Boolean);
  const noun = detectCapitalizedNouns(sentence)[0];
  if (noun) return noun;

  const verb = tokens.find((token) => commonVerbs.includes(token.toLocaleLowerCase('de-DE')));
  if (verb) return verb;

  return tokens.find((token) => token.length > 4) ?? tokens[Math.min(1, tokens.length - 1)] ?? '';
}

function lowerCaseSentence(sentence: string): string {
  return sentence
    .split(/\s+/)
    .map((word) => word.toLocaleLowerCase('de-DE'))
    .join(' ');
}

function shuffleWords(words: string[]): string[] {
  return [...words].sort((a, b) => a.localeCompare(b)).reverse();
}

export function createFillBlankExercises(sentences: string[]): PracticeExercise[] {
  return sentences.map((sentence, index) => {
    const answer = chooseImportantWord(sentence);
    return {
      id: `text-fill-${index}`,
      type: 'fill-blank',
      source: 'text-practice',
      topic: 'pasted-text',
      question: sentence.replace(new RegExp(`\\b${answer}\\b`), '______'),
      correctAnswer: answer,
      originalSentence: sentence,
      explanation: `The correct word is '${answer}'. Notice that German nouns are capitalized when the missing word is a noun.`,
    };
  });
}

export function createWordOrderExercises(sentences: string[]): PracticeExercise[] {
  return sentences.map((sentence, index) => {
    const tokens = tokenizeSentence(sentence);
    return {
      id: `text-order-${index}`,
      type: 'word-order',
      source: 'text-practice',
      topic: 'word-order',
      question: `Arrange the words: ${shuffleWords(tokens).join(' / ')}`,
      correctAnswer: sentence,
      originalSentence: sentence,
      explanation: 'In German main clauses, the conjugated verb usually stays in position 2.',
      requiresSentenceCheck: true,
    };
  });
}

export function createCapitalizationExercises(sentences: string[]): PracticeExercise[] {
  return sentences.map((sentence, index) => {
    const nouns = detectCapitalizedNouns(sentence);
    return {
      id: `text-caps-${index}`,
      type: 'capitalization',
      source: 'text-practice',
      topic: 'capitalization',
      question: `Which words should be capitalized? ${lowerCaseSentence(sentence)}`,
      correctAnswer: sentence,
      originalSentence: sentence,
      explanation: `German nouns are capitalized. Here, likely nouns are: ${nouns.join(', ') || 'the capitalized words from the original sentence'}.`,
      requiresSentenceCheck: true,
    };
  });
}

export function createVocabularyGuessExercises(sentences: string[]): PracticeExercise[] {
  return sentences.flatMap((sentence, sentenceIndex) =>
    detectCapitalizedNouns(sentence).slice(0, 2).map((word, wordIndex) => ({
      id: `text-vocab-${sentenceIndex}-${wordIndex}`,
      type: 'vocabulary-guess' as const,
      source: 'text-practice' as const,
      topic: 'pasted-text',
      germanWord: word,
      question: `Guess the meaning of "${word}" from the sentence.`,
      correctAnswer: word,
      originalSentence: sentence,
      explanation:
        'This is a vocabulary noticing exercise. Add the word to My Vocabulary with your own meaning after you check it.',
    })),
  );
}

function createReadingComprehensionExercises(sentences: string[]): PracticeExercise[] {
  return sentences.flatMap((sentence, index) => {
    const lower = sentence.toLocaleLowerCase('de-DE');
    const found = timeWords.find((word) => lower.includes(word.toLocaleLowerCase('de-DE')));
    if (!found) return [];

    return [
      {
        id: `text-reading-${index}`,
        type: 'reading-comprehension' as const,
        source: 'text-practice' as const,
        topic: 'reading',
        question: 'When does this happen?',
        options: [found, 'gestern', 'nächste Woche', 'heute'].filter(
          (option, optionIndex, options) => options.indexOf(option) === optionIndex,
        ),
        correctAnswer: found,
        originalSentence: sentence,
        explanation: `The sentence contains the time expression '${found}'.`,
      },
    ];
  });
}

export function extractVocabularyCandidates(sentences: string[]): string[] {
  const candidates = sentences.flatMap((sentence) => {
    const nouns = detectCapitalizedNouns(sentence);
    const longWords = tokenizeSentence(sentence)
      .map(removePunctuation)
      .filter((word) => word.length > 7);
    return [...nouns, ...longWords];
  });

  return candidates.filter((word, index, words) => word && words.indexOf(word) === index).slice(0, 30);
}

export function generateTextPractice(text: string): {
  sentences: string[];
  exercises: PracticeExercise[];
  vocabularyCandidates: string[];
} {
  const sentences = splitIntoSentences(text);
  const exercises = [
    ...createFillBlankExercises(sentences),
    ...createWordOrderExercises(sentences),
    ...createCapitalizationExercises(sentences),
    ...createVocabularyGuessExercises(sentences),
    ...createReadingComprehensionExercises(sentences),
  ];

  return {
    sentences,
    exercises,
    vocabularyCandidates: extractVocabularyCandidates(sentences),
  };
}
