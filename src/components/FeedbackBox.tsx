import { CheckCircle2, RefreshCcw, XCircle } from 'lucide-react';

interface FeedbackBoxProps {
  result: 'correct' | 'incorrect' | null;
  correctAnswer: string;
  explanation: string;
  onTryAgain?: () => void;
  onNext?: () => void;
}

export default function FeedbackBox({ result, correctAnswer, explanation, onTryAgain, onNext }: FeedbackBoxProps) {
  if (!result) return null;

  const isCorrect = result === 'correct';

  return (
    <section
      className={[
        'rounded-lg border p-4',
        isCorrect ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50',
      ].join(' ')}
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        {isCorrect ? (
          <CheckCircle2 className="mt-1 shrink-0 text-emerald-700" aria-hidden="true" />
        ) : (
          <XCircle className="mt-1 shrink-0 text-rose-700" aria-hidden="true" />
        )}
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{isCorrect ? 'Correct' : 'Good attempt. Here is the fix.'}</h2>
            <p className="mt-1 text-sm text-stone-700">
              Correct sentence: <span className="font-semibold text-ink">{correctAnswer}</span>
            </p>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-stone-700">{explanation}</p>
          <div className="flex flex-wrap gap-2">
            {onTryAgain ? (
              <button
                type="button"
                onClick={onTryAgain}
                className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700 hover:bg-slatewash"
              >
                <RefreshCcw aria-hidden="true" size={16} />
                Try again
              </button>
            ) : null}
            {onNext ? (
              <button
                type="button"
                onClick={onNext}
                className="min-h-10 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern"
              >
                Next exercise
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
