import type {
  DailyPracticeSession,
  Mistake,
  ProgressState,
  TextPracticeSession,
  UserVocabularyItem,
} from '../types';

export const STORAGE_KEYS = {
  vocabulary: 'germanApp:vocabulary',
  mistakes: 'germanApp:mistakes',
  textPracticeSessions: 'germanApp:textPracticeSessions',
  dailyPractice: 'germanApp:dailyPractice',
  progress: 'gsb-progress',
};

const legacyMistakeKey = 'gsb-mistakes';

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

export function createId(prefix = 'item'): string {
  const random = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}_${random}`;
}

export function todayString(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return todayString(next);
}

export function readStorage<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function normalizeForDuplicate(value: string): string {
  return value.trim().toLocaleLowerCase('de-DE');
}

export function getVocabulary(): UserVocabularyItem[] {
  return readStorage<UserVocabularyItem[]>(STORAGE_KEYS.vocabulary, []);
}

export function saveVocabulary(items: UserVocabularyItem[]): void {
  writeStorage(STORAGE_KEYS.vocabulary, items);
}

export function addVocabularyItem(
  item: Omit<
    UserVocabularyItem,
    'id' | 'createdAt' | 'reviewCount' | 'lastReviewedAt' | 'mistakeCount'
  >,
): UserVocabularyItem {
  const current = getVocabulary();
  const germanWord = item.germanWord.trim();
  const englishMeaning = item.englishMeaning.trim();

  const duplicate = current.some(
    (existing) =>
      normalizeForDuplicate(existing.germanWord) === normalizeForDuplicate(germanWord) &&
      normalizeForDuplicate(existing.englishMeaning) === normalizeForDuplicate(englishMeaning),
  );

  if (duplicate) {
    throw new Error('This word with the same meaning is already in your vocabulary.');
  }

  const next: UserVocabularyItem = {
    ...item,
    germanWord,
    englishMeaning,
    pluralForm: item.pluralForm.trim(),
    exampleSentence: item.exampleSentence.trim(),
    notes: item.notes.trim(),
    id: createId('vocab'),
    createdAt: new Date().toISOString(),
    reviewCount: 0,
    lastReviewedAt: null,
    mistakeCount: 0,
  };

  saveVocabulary([next, ...current]);
  return next;
}

export function updateVocabularyItem(id: string, updates: Partial<UserVocabularyItem>): UserVocabularyItem[] {
  const next = getVocabulary().map((item) => (item.id === id ? { ...item, ...updates } : item));
  saveVocabulary(next);
  return next;
}

export function deleteVocabularyItem(id: string): UserVocabularyItem[] {
  const next = getVocabulary().filter((item) => item.id !== id);
  saveVocabulary(next);
  return next;
}

export function clearVocabulary(): void {
  saveVocabulary([]);
}

function legacySourceToNew(exerciseType?: string): Mistake['source'] {
  if (exerciseType === 'Sentence Builder') return 'sentence-builder';
  if (exerciseType === 'Word Order Trainer') return 'word-order';
  if (exerciseType === 'Case Helper') return 'case-helper';
  if (exerciseType === 'Vocabulary Practice') return 'vocabulary';
  return 'writing-practice';
}

function migrateLegacyMistakes(): Mistake[] {
  const existing = readStorage<Mistake[]>(STORAGE_KEYS.mistakes, []);
  if (existing.length > 0 || !canUseStorage()) return existing;

  const legacy = readStorage<Array<Record<string, unknown>>>(legacyMistakeKey, []);
  if (legacy.length === 0) return existing;

  const migrated = legacy.map((item) => {
    const createdAt = String(item.date ?? new Date().toISOString());
    const topic = String(item.topic ?? 'practice');
    return {
      id: String(item.id ?? createId('mistake')),
      source: legacySourceToNew(String(item.exerciseType ?? '')),
      topic,
      question: `Try again: ${topic}`,
      userAnswer: String(item.userAnswer ?? ''),
      correctAnswer: String(item.correctAnswer ?? ''),
      explanation: String(item.explanation ?? 'Review this answer again.'),
      createdAt,
      nextReviewAt: todayString(),
      reviewStage: item.status === 'reviewed' ? 4 : 1,
      reviewCount: item.status === 'reviewed' ? 1 : 0,
      isResolved: item.status === 'reviewed',
      exerciseType: item.exerciseType as Mistake['exerciseType'],
      date: createdAt,
      status: item.status as Mistake['status'],
      sourceId: String(item.sourceId ?? ''),
    } satisfies Mistake;
  });

  writeStorage(STORAGE_KEYS.mistakes, migrated);
  return migrated;
}

export function getMistakes(): Mistake[] {
  return migrateLegacyMistakes();
}

export function saveMistakes(mistakes: Mistake[]): void {
  writeStorage(STORAGE_KEYS.mistakes, mistakes);
}

export function addMistake(
  mistake: Omit<Mistake, 'id' | 'createdAt' | 'nextReviewAt' | 'reviewStage' | 'reviewCount' | 'isResolved'> &
    Partial<Pick<Mistake, 'createdAt' | 'nextReviewAt' | 'reviewStage' | 'reviewCount' | 'isResolved'>>,
): Mistake {
  const createdAt = mistake.createdAt ?? new Date().toISOString();
  const reviewStage = mistake.reviewStage ?? 1;
  const next: Mistake = {
    ...mistake,
    id: createId('mistake'),
    createdAt,
    date: createdAt,
    nextReviewAt: mistake.nextReviewAt ?? addDays(new Date(), 1),
    reviewStage,
    reviewCount: mistake.reviewCount ?? 0,
    isResolved: mistake.isResolved ?? false,
    status: mistake.isResolved ? 'reviewed' : 'open',
  };

  saveMistakes([next, ...getMistakes()]);
  return next;
}

export function updateMistake(id: string, updates: Partial<Mistake>): Mistake[] {
  const next = getMistakes().map((mistake) => (mistake.id === id ? { ...mistake, ...updates } : mistake));
  saveMistakes(next);
  return next;
}

export function getDueMistakes(today = new Date()): Mistake[] {
  const date = todayString(today);
  return getMistakes().filter((mistake) => !mistake.isResolved && mistake.nextReviewAt <= date);
}

export function markMistakeReviewed(id: string, wasCorrect: boolean): Mistake[] {
  const now = new Date();
  const next = getMistakes().map((mistake) => {
    if (mistake.id !== id) return mistake;

    if (!wasCorrect) {
      return {
        ...mistake,
        reviewStage: 1,
        reviewCount: mistake.reviewCount + 1,
        nextReviewAt: addDays(now, 1),
        isResolved: false,
        status: 'open' as const,
      };
    }

    const nextStage = mistake.reviewStage + 1;
    const isResolved = nextStage > 3;
    const days = nextStage === 2 ? 3 : 7;
    return {
      ...mistake,
      reviewStage: nextStage,
      reviewCount: mistake.reviewCount + 1,
      nextReviewAt: isResolved ? todayString(now) : addDays(now, days),
      isResolved,
      status: isResolved ? ('reviewed' as const) : ('open' as const),
    };
  });

  saveMistakes(next);
  return next;
}

export function getWeakTopics(): Array<{ topic: string; count: number }> {
  const totals = getMistakes()
    .filter((mistake) => !mistake.isResolved)
    .reduce<Record<string, number>>((acc, mistake) => {
      acc[mistake.topic] = (acc[mistake.topic] ?? 0) + 1;
      return acc;
    }, {});

  return Object.entries(totals)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);
}

export function getTextPracticeSessions(): TextPracticeSession[] {
  return readStorage<TextPracticeSession[]>(STORAGE_KEYS.textPracticeSessions, []);
}

export function saveTextPracticeSessions(sessions: TextPracticeSession[]): void {
  writeStorage(STORAGE_KEYS.textPracticeSessions, sessions);
}

export function addTextPracticeSession(session: Omit<TextPracticeSession, 'id' | 'createdAt'>): TextPracticeSession {
  const next: TextPracticeSession = {
    ...session,
    id: createId('text'),
    createdAt: new Date().toISOString(),
  };
  saveTextPracticeSessions([next, ...getTextPracticeSessions()]);
  return next;
}

export function getDailyPracticeSession(): DailyPracticeSession | null {
  return readStorage<DailyPracticeSession | null>(STORAGE_KEYS.dailyPractice, null);
}

export function saveDailyPracticeSession(session: DailyPracticeSession): void {
  writeStorage(STORAGE_KEYS.dailyPractice, session);
}

export function getProgress(): ProgressState {
  return readStorage<ProgressState>(STORAGE_KEYS.progress, {
    completedExercises: 0,
    correctAnswers: 0,
    missionsCompleted: [],
    topicsPractised: {},
  });
}

export function saveProgress(progress: ProgressState): void {
  writeStorage(STORAGE_KEYS.progress, progress);
}

export function exportLocalData(): string {
  return JSON.stringify(
    {
      vocabulary: getVocabulary(),
      mistakes: getMistakes(),
      textPracticeSessions: getTextPracticeSessions(),
      dailyPractice: getDailyPracticeSession(),
      progress: getProgress(),
      exportedAt: new Date().toISOString(),
    },
    null,
    2,
  );
}

export function importLocalData(json: string): void {
  const parsed = JSON.parse(json) as Partial<{
    vocabulary: UserVocabularyItem[];
    mistakes: Mistake[];
    textPracticeSessions: TextPracticeSession[];
    dailyPractice: DailyPracticeSession;
    progress: ProgressState;
  }>;

  if (parsed.vocabulary) saveVocabulary(parsed.vocabulary);
  if (parsed.mistakes) saveMistakes(parsed.mistakes);
  if (parsed.textPracticeSessions) saveTextPracticeSessions(parsed.textPracticeSessions);
  if (parsed.dailyPractice) saveDailyPracticeSession(parsed.dailyPractice);
  if (parsed.progress) saveProgress(parsed.progress);
}

export function clearAllLocalData(): void {
  if (!canUseStorage()) return;
  Object.values(STORAGE_KEYS).forEach((key) => window.localStorage.removeItem(key));
  window.localStorage.removeItem(legacyMistakeKey);
}
