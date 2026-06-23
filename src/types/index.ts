export type Level = 'A1' | 'A2' | 'B1';

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
  date: string;
  exerciseType: ExerciseType;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  topic: string;
  status: ReviewStatus;
  sourceId?: string;
}

export interface ProgressState {
  completedExercises: number;
  correctAnswers: number;
  missionsCompleted: string[];
  topicsPractised: Record<string, number>;
}
