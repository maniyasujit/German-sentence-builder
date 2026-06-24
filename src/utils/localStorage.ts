import type { ExerciseType, Mistake, ProgressState, ReviewStatus } from '../types';
import {
  addMistake,
  getMistakes as getStoredMistakes,
  getProgress as getStoredProgress,
  saveMistakes,
  saveProgress as saveStoredProgress,
  updateMistake,
} from './storage';

function exerciseTypeToSource(exerciseType: ExerciseType): Mistake['source'] {
  if (exerciseType === 'Sentence Builder') return 'sentence-builder';
  if (exerciseType === 'Word Order Trainer') return 'word-order';
  if (exerciseType === 'Case Helper') return 'case-helper';
  if (exerciseType === 'Vocabulary Practice') return 'vocabulary';
  return 'writing-practice';
}

export function getMistakes(): Mistake[] {
  return getStoredMistakes();
}

export function saveMistake(mistake: {
  exerciseType: ExerciseType;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  topic: string;
  sourceId?: string;
}): Mistake {
  return addMistake({
    source: exerciseTypeToSource(mistake.exerciseType),
    exerciseType: mistake.exerciseType,
    topic: mistake.topic,
    question: `Try again: ${mistake.topic}`,
    userAnswer: mistake.userAnswer,
    correctAnswer: mistake.correctAnswer,
    explanation: mistake.explanation,
    sourceId: mistake.sourceId,
  });
}

export function setMistakeStatus(id: string, status: ReviewStatus): Mistake[] {
  return updateMistake(id, {
    status,
    isResolved: status === 'reviewed',
    reviewStage: status === 'reviewed' ? 4 : 1,
  });
}

export function clearMistakes(): void {
  saveMistakes([]);
}

export function getProgress(): ProgressState {
  return getStoredProgress();
}

export function saveProgress(progress: ProgressState): void {
  saveStoredProgress(progress);
}

export function recordExerciseResult(topic: string, correct: boolean): ProgressState {
  const current = getStoredProgress();
  const next: ProgressState = {
    ...current,
    completedExercises: current.completedExercises + 1,
    correctAnswers: current.correctAnswers + (correct ? 1 : 0),
    topicsPractised: {
      ...current.topicsPractised,
      [topic]: (current.topicsPractised[topic] ?? 0) + 1,
    },
  };

  saveStoredProgress(next);
  return next;
}

export function markMissionCompleted(missionId: string): ProgressState {
  const current = getStoredProgress();
  if (current.missionsCompleted.includes(missionId)) return current;

  const next: ProgressState = {
    ...current,
    missionsCompleted: [...current.missionsCompleted, missionId],
  };
  saveStoredProgress(next);
  return next;
}

export function resetProgress(): ProgressState {
  const next: ProgressState = {
    completedExercises: 0,
    correctAnswers: 0,
    missionsCompleted: [],
    topicsPractised: {},
  };
  saveStoredProgress(next);
  return next;
}
