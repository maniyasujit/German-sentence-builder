import { FormEvent, useState } from 'react';
import type { Mistake } from '../types';
import { isSentenceAnswerCorrect, isSimpleAnswerCorrect } from '../utils/answerCheck';

interface MistakeReviewCardProps {
  mistake: Mistake;
  onReviewed: (id: string, wasCorrect: boolean) => void;
}

export default function MistakeReviewCard({ mistake, onReviewed }: MistakeReviewCardProps) {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

  function submit(event: FormEvent) {
    event.preventDefault();
    const correct = mistake.originalSentence
      ? isSentenceAnswerCorrect(answer, mistake.correctAnswer)
      : isSimpleAnswerCorrect(answer, mistake.correctAnswer);
    setResult(correct ? 'correct' : 'incorrect');
    onReviewed(mistake.id, correct);
  }

  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">{mistake.source}</span>
        <span className="rounded-lg bg-stone-100 px-3 py-1 text-sm text-stone-700">{mistake.topic}</span>
        <span className="rounded-lg bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
          Stage {mistake.reviewStage}
        </span>
      </div>

      <h3 className="mt-4 text-xl font-semibold text-ink">{mistake.question}</h3>
      {mistake.originalSentence ? <p className="mt-2 text-sm text-stone-600">{mistake.originalSentence}</p> : null}

      <form onSubmit={submit} className="mt-4 space-y-3">
        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          rows={2}
          className="w-full rounded-lg border border-stone-300 p-3"
          placeholder="Try the answer again..."
        />
        <button
          type="submit"
          disabled={!answer.trim()}
          className="min-h-10 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
        >
          Review answer
        </button>
      </form>

      {result ? (
        <div
          className={[
            'mt-4 rounded-lg border p-4 text-sm leading-6',
            result === 'correct' ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50',
          ].join(' ')}
        >
          {result === 'correct'
            ? 'Good. You remembered it.'
            : `Review again tomorrow. Correct answer: ${mistake.correctAnswer}.`}
          <p className="mt-2 text-stone-700">{mistake.explanation}</p>
        </div>
      ) : null}
    </article>
  );
}
