import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { PracticeExercise } from '../types';
import { isSentenceAnswerCorrect, isSimpleAnswerCorrect } from '../utils/answerCheck';

interface PracticeExerciseCardProps {
  exercise: PracticeExercise;
  onAnswered?: (correct: boolean, userAnswer: string) => void;
  disabled?: boolean;
}

const writingChecklist = [
  'Did you capitalize the noun?',
  'Did you use the correct article?',
  'Did you use correct verb position?',
  'Did you check Akkusativ or Dativ?',
];

export default function PracticeExerciseCard({ exercise, onAnswered, disabled }: PracticeExerciseCardProps) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setAnswer('');
    setSubmitted(false);
    setIsCorrect(null);
  }, [exercise.id]);

  function checkAnswer(nextAnswer: string) {
    if (exercise.type === 'sentence-writing' || exercise.type === 'writing' || exercise.type === 'vocabulary-guess') {
      return nextAnswer.trim().length > 0;
    }

    if (exercise.requiresSentenceCheck || exercise.type === 'word-order' || exercise.type === 'capitalization') {
      return isSentenceAnswerCorrect(nextAnswer, exercise.correctAnswer);
    }

    return isSimpleAnswerCorrect(nextAnswer, exercise.correctAnswer);
  }

  function submit(event?: FormEvent) {
    event?.preventDefault();
    if (!answer.trim() || submitted || disabled) return;

    const correct = checkAnswer(answer);
    setSubmitted(true);
    setIsCorrect(correct);
    onAnswered?.(correct, answer);
  }

  const isWriting = exercise.type === 'sentence-writing' || exercise.type === 'writing' || exercise.type === 'vocabulary-guess';

  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">{exercise.type}</span>
        <span className="rounded-lg bg-stone-100 px-3 py-1 text-sm text-stone-700">{exercise.topic}</span>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-ink">{exercise.question}</h3>
      {exercise.originalSentence ? <p className="mt-2 text-sm text-stone-600">Source: {exercise.originalSentence}</p> : null}

      {exercise.options?.length ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {exercise.options.map((option) => (
            <button
              key={option}
              type="button"
              disabled={submitted || disabled}
              onClick={() => {
                setAnswer(option);
                const correct = checkAnswer(option);
                setSubmitted(true);
                setIsCorrect(correct);
                onAnswered?.(correct, option);
              }}
              className={[
                'min-h-11 rounded-lg border px-4 text-left text-sm font-semibold transition',
                submitted && option === exercise.correctAnswer
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : 'border-stone-300 bg-white text-ink hover:bg-slatewash disabled:cursor-not-allowed',
              ].join(' ')}
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <form onSubmit={submit} className="mt-4 space-y-3">
          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            rows={isWriting ? 4 : 2}
            disabled={submitted || disabled}
            className="w-full rounded-lg border border-stone-300 p-3 disabled:bg-stone-50"
            placeholder={isWriting ? 'Write your sentence here...' : 'Type your answer...'}
          />
          <button
            type="submit"
            disabled={!answer.trim() || submitted || disabled}
            className="min-h-10 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Check answer
          </button>
        </form>
      )}

      {submitted ? (
        <section
          className={[
            'mt-4 rounded-lg border p-4',
            isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50',
          ].join(' ')}
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <CheckCircle2 aria-hidden="true" className="mt-1 shrink-0 text-emerald-700" />
            ) : (
              <XCircle aria-hidden="true" className="mt-1 shrink-0 text-rose-700" />
            )}
            <div>
              <h4 className="font-semibold text-ink">{isCorrect ? 'Good.' : 'Review this one.'}</h4>
              {isWriting ? (
                <div className="mt-2 space-y-2 text-sm text-stone-700">
                  <p>Your sentence: {answer}</p>
                  <p>Saved example or model: {exercise.correctAnswer}</p>
                  <ul className="grid gap-1">
                    {writingChecklist.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-1 text-sm text-stone-700">
                  Correct answer: <span className="font-semibold text-ink">{exercise.correctAnswer}</span>
                </p>
              )}
              <p className="mt-2 text-sm leading-6 text-stone-700">{exercise.explanation}</p>
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
