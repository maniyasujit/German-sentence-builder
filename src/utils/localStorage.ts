import type { Mistake, ProgressState, ReviewStatus } from '../types';

const MISTAKES_KEY = 'gsb-mistakes';
const PROGRESS_KEY = 'gsb-progress';

const defaultProgress: ProgressState = {
  completedExercises: 0,
  correctAnswers: 0,
  missionsCompleted: [],
  topicsPractised: {},
};

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function createId(): string {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getMistakes(): Mistake[] {
  return readJson<Mistake[]>(MISTAKES_KEY, []);
}

export function saveMistake(mistake: Omit<Mistake, 'id' | 'date' | 'status'>): Mistake {
  const next: Mistake = {
    ...mistake,
    id: createId(),
    date: new Date().toISOString(),
    status: 'open',
  };

  writeJson(MISTAKES_KEY, [next, ...getMistakes()]);
  return next;
}

export function setMistakeStatus(id: string, status: ReviewStatus): Mistake[] {
  const next = getMistakes().map((mistake) =>
    mistake.id === id ? { ...mistake, status } : mistake,
  );
  writeJson(MISTAKES_KEY, next);
  return next;
}

export function clearMistakes(): void {
  writeJson(MISTAKES_KEY, []);
}

export function getProgress(): ProgressState {
  return readJson<ProgressState>(PROGRESS_KEY, defaultProgress);
}

export function saveProgress(progress: ProgressState): void {
  writeJson(PROGRESS_KEY, progress);
}

export function recordExerciseResult(topic: string, correct: boolean): ProgressState {
  const current = getProgress();
  const next: ProgressState = {
    ...current,
    completedExercises: current.completedExercises + 1,
    correctAnswers: current.correctAnswers + (correct ? 1 : 0),
    topicsPractised: {
      ...current.topicsPractised,
      [topic]: (current.topicsPractised[topic] ?? 0) + 1,
    },
  };

  saveProgress(next);
  return next;
}

export function markMissionCompleted(missionId: string): ProgressState {
  const current = getProgress();
  if (current.missionsCompleted.includes(missionId)) return current;

  const next: ProgressState = {
    ...current,
    missionsCompleted: [...current.missionsCompleted, missionId],
  };
  saveProgress(next);
  return next;
}

export function resetProgress(): ProgressState {
  saveProgress(defaultProgress);
  return defaultProgress;
}
