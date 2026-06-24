import type { LanguageDirection, Level, SentenceDataset, SentencePracticeSentence } from '../types';

export const sentencePracticeStorageKeys = {
  level: 'germanApp:sentencePracticeLevel',
  direction: 'germanApp:sentencePracticeDirection',
};

export const sentencePracticeLevels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function isSentencePracticeLevel(value: string | null): value is Level {
  return sentencePracticeLevels.includes(value as Level);
}

export function getStoredSentenceLevel(): Level {
  if (typeof window === 'undefined') return 'A1';
  const stored = window.localStorage.getItem(sentencePracticeStorageKeys.level);
  return isSentencePracticeLevel(stored) ? stored : 'A1';
}

export function getStoredLanguageDirection(): LanguageDirection {
  if (typeof window === 'undefined') return 'de-en';
  const stored = window.localStorage.getItem(sentencePracticeStorageKeys.direction);
  return stored === 'de-en' || stored === 'en-de' ? stored : 'de-en';
}

export function saveSentenceLevel(level: Level): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(sentencePracticeStorageKeys.level, level);
}

export function saveLanguageDirection(direction: LanguageDirection): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(sentencePracticeStorageKeys.direction, direction);
}

export async function loadSentenceData(level: Level): Promise<SentenceDataset> {
  const module =
    level === 'A1'
      ? await import('../data/german_a1_sentences.json')
      : level === 'A2'
        ? await import('../data/german_a2_sentences.json')
        : level === 'B1'
          ? await import('../data/german_b1_sentences.json')
          : level === 'B2'
            ? await import('../data/german_b2_sentences.json')
            : level === 'C1'
              ? await import('../data/german_c1_sentences.json')
              : await import('../data/german_c2_sentences.json');
  const dataset = module.default as SentenceDataset;

  if (!dataset || !Array.isArray(dataset.sentences)) {
    throw new Error(`Sentence data for ${level} is missing or invalid.`);
  }

  return {
    ...dataset,
    sentences: dataset.sentences.filter((sentence) => sentence.level === level),
  };
}

export function pickNextSentence(
  sentences: SentencePracticeSentence[],
  currentSentenceId?: string,
): SentencePracticeSentence | null {
  if (sentences.length === 0) return null;
  if (sentences.length === 1) return sentences[0];

  let next = sentences[Math.floor(Math.random() * sentences.length)];
  while (next.id === currentSentenceId) {
    next = sentences[Math.floor(Math.random() * sentences.length)];
  }
  return next;
}
