import { writingPrompts } from '../data/writingPrompts';
import type { DailyPracticeSession, PracticeExercise } from '../types';
import { createVocabularyExercises } from './vocabularyGenerator';
import {
  createId,
  getDailyPracticeSession,
  getDueMistakes,
  getTextPracticeSessions,
  getVocabulary,
  getWeakTopics,
  saveDailyPracticeSession,
  todayString,
} from './storage';
import { createReviewExerciseFromMistake } from './mistakeReview';

function weakTopicExercises(): PracticeExercise[] {
  const weakTopics = getWeakTopics().slice(0, 2);
  return weakTopics.map((weakTopic) => ({
    id: `weak-${weakTopic.topic}-${createId('daily')}`,
    type: 'weak-topic',
    source: 'daily-practice',
    topic: weakTopic.topic,
    question: `Review ${weakTopic.topic}: write the correct form or rule you remember.`,
    correctAnswer: weakTopic.topic,
    explanation: `This topic has ${weakTopic.count} unresolved mistake${weakTopic.count === 1 ? '' : 's'}. Check your notebook after answering.`,
  }));
}

function writingPromptExercise(): PracticeExercise {
  const weakTopic = getWeakTopics()[0]?.topic ?? 'word order';
  const savedWords = getVocabulary().slice(0, 3).map((word) => word.germanWord);
  const prompt =
    weakTopic === 'articles'
      ? 'Write 3 German sentences using 3 nouns from your vocabulary. Check the article for each noun.'
      : weakTopic.toLocaleLowerCase('de-DE').includes('dativ')
        ? 'Write 3 German sentences using mit, zu, or bei.'
        : weakTopic.toLocaleLowerCase('de-DE').includes('word')
          ? 'Write 3 German sentences starting with a time word like heute, morgen, or am Abend.'
          : `Write 3 German sentences using your saved words: ${savedWords.join(', ') || 'one useful word from today'}.`;

  return {
    id: `daily-writing-${todayString()}`,
    type: 'writing',
    source: 'daily-practice',
    topic: weakTopic,
    question: prompt,
    correctAnswer: writingPrompts[0].modelAnswer.join(' '),
    explanation:
      'Self-check: verb in position 2, nouns capitalized, articles checked, Akkusativ or Dativ checked, and saved vocabulary used.',
    requiresSentenceCheck: true,
  };
}

export function generateDailyPracticeSession(forceNew = false): DailyPracticeSession {
  const today = todayString();
  const existing = getDailyPracticeSession();
  if (!forceNew && existing?.date === today) return existing;

  const dueMistakes = getDueMistakes().slice(0, 3).map(createReviewExerciseFromMistake);
  const vocabulary = createVocabularyExercises(getVocabulary(), 5);
  const latestText = getTextPracticeSessions()[0]?.generatedExercises.slice(0, 3) ?? [];
  const exercises = [
    ...dueMistakes,
    ...vocabulary,
    ...latestText,
    ...weakTopicExercises(),
    writingPromptExercise(),
  ];

  const session: DailyPracticeSession = {
    date: today,
    exercises,
    completedExerciseIds: [],
    score: 0,
    createdAt: new Date().toISOString(),
  };

  saveDailyPracticeSession(session);
  return session;
}

export function updateDailyPracticeSession(session: DailyPracticeSession): void {
  saveDailyPracticeSession(session);
}
