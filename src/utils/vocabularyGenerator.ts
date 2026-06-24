import type { PracticeExercise, UserVocabularyItem } from '../types';

const fallbackMeanings = ['appointment', 'apartment', 'train station', 'supermarket', 'work', 'doctor'];
const fallbackArticles = ['der', 'die', 'das', 'plural', 'none'];

function uniqueOptions(options: string[], correct: string, size = 4): string[] {
  const clean = [correct, ...options]
    .map((option) => option.trim())
    .filter(Boolean)
    .filter((option, index, array) => array.findIndex((item) => item.toLowerCase() === option.toLowerCase()) === index);

  return clean.slice(0, size).sort(() => Math.random() - 0.5);
}

function blankWord(sentence: string, word: string): string {
  if (!sentence) return `______: ${word}`;
  return sentence.replace(new RegExp(`\\b${word}\\b`, 'i'), '______');
}

export function formatWordWithArticle(item: UserVocabularyItem): string {
  if (item.article === 'none') return item.germanWord;
  if (item.article === 'plural') return `die ${item.pluralForm || item.germanWord}`;
  return `${item.article} ${item.germanWord}`;
}

export function getVocabularyMistakeExplanation(item: UserVocabularyItem, type: PracticeExercise['type']): string {
  if (type === 'article') {
    return `${item.germanWord} uses the article '${item.article}'. In your own examples, check whether the article changes in Akkusativ or Dativ.`;
  }

  if (type === 'fill-blank') {
    return `The missing word is '${item.germanWord}'. Notice its spelling and capitalization in the saved example sentence.`;
  }

  return `${formatWordWithArticle(item)} means '${item.englishMeaning}'. Add a short example sentence to make this word easier to remember.`;
}

function sortForPractice(items: UserVocabularyItem[]): UserVocabularyItem[] {
  return [...items].sort((a, b) => {
    if (b.mistakeCount !== a.mistakeCount) return b.mistakeCount - a.mistakeCount;
    if (!a.lastReviewedAt && b.lastReviewedAt) return -1;
    if (a.lastReviewedAt && !b.lastReviewedAt) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function createVocabularyExercises(items: UserVocabularyItem[], limit = 8): PracticeExercise[] {
  const sorted = sortForPractice(items);
  const meaningDistractors = [...items.map((item) => item.englishMeaning), ...fallbackMeanings];

  return sorted.flatMap((item, index): PracticeExercise[] => {
    const exercises: PracticeExercise[] = [
      {
        id: `vocab-meaning-${item.id}`,
        type: 'meaning',
        source: 'vocabulary',
        topic: item.topic,
        relatedWordId: item.id,
        germanWord: item.germanWord,
        question: `What does "${item.germanWord}" mean?`,
        options: uniqueOptions(
          meaningDistractors.filter((meaning) => meaning !== item.englishMeaning),
          item.englishMeaning,
        ),
        correctAnswer: item.englishMeaning,
        explanation: getVocabularyMistakeExplanation(item, 'meaning'),
      },
      {
        id: `vocab-reverse-${item.id}`,
        type: 'reverse',
        source: 'vocabulary',
        topic: item.topic,
        relatedWordId: item.id,
        germanWord: item.germanWord,
        question: `Translate: ${item.englishMeaning}`,
        correctAnswer: item.germanWord,
        explanation: getVocabularyMistakeExplanation(item, 'reverse'),
      },
    ];

    if (item.wordType === 'noun') {
      exercises.push({
        id: `vocab-article-${item.id}`,
        type: 'article',
        source: 'vocabulary',
        topic: 'articles',
        relatedWordId: item.id,
        germanWord: item.germanWord,
        question: `Choose the correct article: ___ ${item.germanWord}`,
        options: uniqueOptions(fallbackArticles.filter((article) => article !== item.article), item.article),
        correctAnswer: item.article,
        explanation: getVocabularyMistakeExplanation(item, 'article'),
      });
    }

    if (item.exampleSentence) {
      exercises.push({
        id: `vocab-fill-${item.id}`,
        type: 'fill-blank',
        source: 'vocabulary',
        topic: item.topic,
        relatedWordId: item.id,
        germanWord: item.germanWord,
        question: blankWord(item.exampleSentence, item.germanWord),
        originalSentence: item.exampleSentence,
        correctAnswer: item.germanWord,
        explanation: getVocabularyMistakeExplanation(item, 'fill-blank'),
      });
    }

    exercises.push({
      id: `vocab-writing-${item.id}`,
      type: 'sentence-writing',
      source: 'vocabulary',
      topic: item.topic,
      relatedWordId: item.id,
      germanWord: item.germanWord,
      question: `Write one German sentence using "${item.germanWord}".`,
      correctAnswer: item.exampleSentence || formatWordWithArticle(item),
      explanation:
        'For sentence writing, compare your sentence with the saved example. Check noun capitalization, article, verb position, and Akkusativ or Dativ.',
      requiresSentenceCheck: true,
    });

    const offset = index % Math.max(1, exercises.length);
    return [...exercises.slice(offset), ...exercises.slice(0, offset)].slice(0, 2);
  }).slice(0, limit);
}
