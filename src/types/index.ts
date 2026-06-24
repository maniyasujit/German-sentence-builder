export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type LanguageDirection = 'de-en' | 'en-de';

export type VocabularyArticle = 'der' | 'die' | 'das' | 'plural' | 'none';
export type VocabularyWordType = 'noun' | 'verb' | 'adjective' | 'phrase' | 'other';
export type VocabularyTopic =
  | 'daily-life'
  | 'work'
  | 'doctor'
  | 'apartment'
  | 'shopping'
  | 'travel'
  | 'study'
  | 'custom';

export type MistakeSource =
  | 'sentence-builder'
  | 'vocabulary'
  | 'text-practice'
  | 'word-order'
  | 'case-helper'
  | 'writing-practice';

export type PracticeExerciseType =
  | 'meaning'
  | 'article'
  | 'fill-blank'
  | 'reverse'
  | 'sentence-writing'
  | 'word-order'
  | 'capitalization'
  | 'vocabulary-guess'
  | 'reading-comprehension'
  | 'mistake-review'
  | 'weak-topic'
  | 'writing';

export type ExerciseType =
  | 'Sentence Builder'
  | 'Case Helper'
  | 'Word Order Trainer'
  | 'Vocabulary Practice'
  | 'Writing Practice';

export type ReviewStatus = 'open' | 'reviewed';

export interface SentenceExercise {
  id: string;
  level: Level;
  topic: string;
  promptEnglish: string;
  correctAnswer: string;
  wordBank: string[];
  explanation: string;
  grammarTags: string[];
}

export interface SentencePracticeSentence {
  id: string;
  level: Level;
  topic: string;
  template: string;
  german: string;
  english: string;
}

export interface SentenceDataset {
  metadata: {
    title: string;
    level: Level;
    count: number;
    description?: string;
    schema?: Record<string, string>;
  };
  sentences: SentencePracticeSentence[];
}

export interface CaseExercise {
  id: string;
  level: Level;
  topic: string;
  sentence: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  examples: string[];
}

export interface WordOrderExercise {
  id: string;
  level: Level;
  topic: string;
  instruction: string;
  correctAnswer: string;
  wordBank: string[];
  explanation: string;
  grammarTags: string[];
}

export interface GrammarPart {
  id: string;
  text: string;
  label: string;
  explanation: string;
}

export interface GrammarHighlight {
  id: string;
  sentence: string;
  parts: GrammarPart[];
}

export interface MissionPractice {
  prompt: string;
  modelAnswer: string;
}

export interface Mission {
  id: string;
  title: string;
  level: Level;
  goal: string;
  situation: string;
  vocabulary: Array<{ german: string; english: string }>;
  patterns: string[];
  grammar: string[];
  practice: MissionPractice[];
  finalTask: string;
  highlightId?: string;
}

export interface VocabularyExample {
  sentence: string;
  meaning: string;
}

export interface VocabularyEntry {
  word: string;
  meaning: string;
  patterns: string[];
  examples: VocabularyExample[];
  practice: {
    prompt: string;
    correctAnswer: string;
  };
}

export interface UserVocabularyItem {
  id: string;
  germanWord: string;
  englishMeaning: string;
  article: VocabularyArticle;
  pluralForm: string;
  wordType: VocabularyWordType;
  level: Level;
  topic: VocabularyTopic;
  exampleSentence: string;
  notes: string;
  createdAt: string;
  reviewCount: number;
  lastReviewedAt: string | null;
  mistakeCount: number;
}

export interface PracticeExercise {
  id: string;
  type: PracticeExerciseType;
  source: MistakeSource | 'daily-practice';
  topic: string;
  question: string;
  prompt?: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  originalSentence?: string;
  displaySentence?: string;
  relatedWordId?: string;
  germanWord?: string;
  requiresSentenceCheck?: boolean;
}

export interface TextPracticeSession {
  id: string;
  originalText: string;
  generatedExercises: PracticeExercise[];
  vocabularyCandidates: string[];
  createdAt: string;
}

export interface WritingPrompt {
  id: string;
  level: Level;
  title: string;
  prompt: string;
  checklist: string[];
  modelAnswer: string[];
}

export interface Mistake {
  id: string;
  source: MistakeSource;
  topic: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  relatedWordId?: string;
  germanWord?: string;
  originalSentence?: string;
  createdAt: string;
  nextReviewAt: string;
  reviewStage: number;
  reviewCount: number;
  isResolved: boolean;
  exerciseType?: ExerciseType;
  date?: string;
  status?: ReviewStatus;
  sourceId?: string;
}

export interface ProgressState {
  completedExercises: number;
  correctAnswers: number;
  missionsCompleted: string[];
  topicsPractised: Record<string, number>;
}

export interface DailyPracticeSession {
  date: string;
  exercises: PracticeExercise[];
  completedExerciseIds: string[];
  score: number;
  createdAt: string;
}
