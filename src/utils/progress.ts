import type { Mistake, ProgressState } from '../types';

export function getAccuracy(progress: ProgressState): number {
  if (progress.completedExercises === 0) return 0;
  return Math.round((progress.correctAnswers / progress.completedExercises) * 100);
}

export function getRecommendedTopic(mistakes: Mistake[], progress: ProgressState): string {
  const openMistakeTopics = mistakes
    .filter((mistake) => mistake.status === 'open')
    .reduce<Record<string, number>>((totals, mistake) => {
      totals[mistake.topic] = (totals[mistake.topic] ?? 0) + 1;
      return totals;
    }, {});

  const mistakeTopic = Object.entries(openMistakeTopics).sort((a, b) => b[1] - a[1])[0];
  if (mistakeTopic) return mistakeTopic[0];

  const leastPractisedTopic = Object.entries(progress.topicsPractised).sort((a, b) => a[1] - b[1])[0];
  return leastPractisedTopic?.[0] ?? 'Sentence building basics';
}
