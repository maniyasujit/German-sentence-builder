import type { Mistake, PracticeExercise } from '../types';
import { getDueMistakes, getWeakTopics, markMistakeReviewed } from './storage';

export { getDueMistakes, getWeakTopics, markMistakeReviewed };

export function createReviewExerciseFromMistake(mistake: Mistake): PracticeExercise {
  return {
    id: `review-${mistake.id}`,
    type: 'mistake-review',
    source: mistake.source,
    topic: mistake.topic,
    question: `Try again: ${mistake.question}`,
    correctAnswer: mistake.correctAnswer,
    explanation: mistake.explanation,
    originalSentence: mistake.originalSentence,
    relatedWordId: mistake.relatedWordId,
    germanWord: mistake.germanWord,
    requiresSentenceCheck: Boolean(mistake.originalSentence),
  };
}

export function getWeakTopicRecommendation(): string {
  const [weakTopic] = getWeakTopics();
  if (!weakTopic) return 'No weak topic yet. Make a few practice attempts to get a useful recommendation.';
  return `You should review ${weakTopic.topic} today because you made ${weakTopic.count} unresolved mistake${
    weakTopic.count === 1 ? '' : 's'
  } there.`;
}
