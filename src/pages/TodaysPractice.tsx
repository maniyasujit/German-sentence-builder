import { useMemo, useState } from 'react';
import EmptyState from '../components/EmptyState';
import PracticeExerciseCard from '../components/PracticeExerciseCard';
import type { DailyPracticeSession, PracticeExercise } from '../types';
import { updateDailyPracticeSession, generateDailyPracticeSession } from '../utils/dailyPractice';
import { recordExerciseResult } from '../utils/localStorage';
import {
  addMistake,
  getDueMistakes,
  getTextPracticeSessions,
  getVocabulary,
  getWeakTopics,
  markMistakeReviewed,
} from '../utils/storage';

export default function TodaysPractice() {
  const [session, setSession] = useState<DailyPracticeSession>(() => generateDailyPracticeSession());
  const vocabulary = getVocabulary();
  const dueMistakes = getDueMistakes();
  const latestText = getTextPracticeSessions()[0];
  const weakTopic = getWeakTopics()[0];

  const completed = useMemo(() => new Set(session.completedExerciseIds), [session.completedExerciseIds]);

  function refresh(force = false) {
    setSession(generateDailyPracticeSession(force));
  }

  function handleAnswered(exercise: PracticeExercise, correct: boolean, userAnswer: string) {
    if (completed.has(exercise.id)) return;

    recordExerciseResult(`Today: ${exercise.topic}`, correct);

    if (exercise.type === 'mistake-review' && exercise.id.startsWith('review-')) {
      markMistakeReviewed(exercise.id.replace('review-', ''), correct);
    } else if (!correct) {
      addMistake({
        source: exercise.source === 'daily-practice' ? 'word-order' : exercise.source,
        topic: exercise.topic,
        question: exercise.question,
        userAnswer,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        relatedWordId: exercise.relatedWordId,
        originalSentence: exercise.originalSentence,
        germanWord: exercise.germanWord,
      });
    }

    const next = {
      ...session,
      completedExerciseIds: [...session.completedExerciseIds, exercise.id],
      score: session.score + (correct ? 1 : 0),
    };
    updateDailyPracticeSession(next);
    setSession(next);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-coral">Personal daily set</p>
        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-ink">Today’s Practice</h1>
            <p className="mt-2 max-w-3xl text-stone-600">
              A fresh set based on your due mistakes, saved words, latest pasted text, weak topics, and one writing prompt.
            </p>
          </div>
          <button
            type="button"
            onClick={() => refresh(true)}
            className="min-h-11 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 hover:bg-slatewash"
          >
            Regenerate today
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <Metric label="Ready" value={session.exercises.length.toString()} />
          <Metric label="Completed" value={session.completedExerciseIds.length.toString()} />
          <Metric label="Score" value={session.score.toString()} />
          <Metric label="Weak topic" value={weakTopic?.topic ?? 'none yet'} />
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-3">
        {vocabulary.length < 5 ? (
          <EmptyState
            title="Add your first 5 German words to unlock personal practice."
            description="You can still practise today, but vocabulary questions get much better when you save a small word bank."
          />
        ) : null}
        {dueMistakes.length === 0 ? (
          <EmptyState
            title="Make some practice attempts first. Your mistakes will appear here for review."
            description="Wrong answers from vocabulary, pasted text, sentence builder, word order, and case helper are scheduled automatically."
          />
        ) : null}
        {!latestText ? (
          <EmptyState
            title="Paste a German message or paragraph to create real practice from your own content."
            description="Today’s Practice will pull a few exercises from your latest saved pasted-text session."
          />
        ) : null}
      </div>

      {session.exercises.length === 0 ? (
        <EmptyState
          title="No personal exercises yet"
          description="Add vocabulary or paste a German text to make this page come alive."
        />
      ) : (
        <section className="space-y-4">
          {session.exercises.map((exercise) => (
            <PracticeExerciseCard
              key={exercise.id}
              exercise={exercise}
              disabled={completed.has(exercise.id)}
              onAnswered={(correct, userAnswer) => handleAnswered(exercise, correct, userAnswer)}
            />
          ))}
        </section>
      )}
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slatewash p-3">
      <p className="text-sm text-stone-600">{label}</p>
      <p className="mt-1 break-words text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
