import { FormEvent, useMemo, useState } from 'react';
import { CheckCircle2, Filter, RefreshCcw, Trash2 } from 'lucide-react';
import FeedbackBox from '../components/FeedbackBox';
import { clearMistakes, getMistakes, setMistakeStatus } from '../utils/localStorage';
import { isAnswerCorrect } from '../utils/answerCheck';
import type { Mistake } from '../types';

export default function MistakeNotebook() {
  const [mistakes, setMistakes] = useState<Mistake[]>(getMistakes());
  const [topicFilter, setTopicFilter] = useState('All topics');
  const [retryId, setRetryId] = useState<string | null>(null);
  const [retryAnswer, setRetryAnswer] = useState('');
  const [retryResult, setRetryResult] = useState<'correct' | 'incorrect' | null>(null);

  const topics = useMemo(
    () => ['All topics', ...Array.from(new Set(mistakes.map((mistake) => mistake.topic))).sort()],
    [mistakes],
  );

  const filteredMistakes = topicFilter === 'All topics'
    ? mistakes
    : mistakes.filter((mistake) => mistake.topic === topicFilter);

  function markReviewed(id: string) {
    setMistakes(setMistakeStatus(id, 'reviewed'));
  }

  function clearAll() {
    clearMistakes();
    setMistakes([]);
    setRetryId(null);
  }

  function startRetry(mistake: Mistake) {
    setRetryId(mistake.id);
    setRetryAnswer('');
    setRetryResult(null);
  }

  function handleRetry(event: FormEvent, mistake: Mistake) {
    event.preventDefault();
    const correct = isAnswerCorrect(retryAnswer, mistake.correctAnswer);
    setRetryResult(correct ? 'correct' : 'incorrect');
    if (correct) {
      setMistakes(setMistakeStatus(mistake.id, 'reviewed'));
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-coral">Local review</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">Mistake Notebook</h1>
            <p className="mt-2 max-w-2xl text-stone-600">
              Wrong answers from Sentence Builder, Case Helper, and Word Order Trainer are saved here with the grammar reason.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700">
              <Filter aria-hidden="true" size={16} />
              <select
                value={topicFilter}
                onChange={(event) => setTopicFilter(event.target.value)}
                className="bg-transparent"
                aria-label="Filter mistakes by topic"
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={clearAll}
              disabled={mistakes.length === 0}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50 disabled:cursor-not-allowed disabled:text-stone-400"
            >
              <Trash2 aria-hidden="true" size={16} />
              Clear all
            </button>
          </div>
        </div>
      </section>

      {filteredMistakes.length === 0 ? (
        <section className="rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center">
          <h2 className="text-xl font-semibold text-ink">No mistakes here yet</h2>
          <p className="mt-2 text-stone-600">Practise a few exercises. Any wrong answers will appear here for review.</p>
        </section>
      ) : (
        <div className="grid gap-4">
          {filteredMistakes.map((mistake) => {
            const retrying = retryId === mistake.id;
            return (
              <article key={mistake.id} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">
                        {mistake.exerciseType}
                      </span>
                      <span className="rounded-lg bg-stone-100 px-3 py-1 text-sm text-stone-700">{mistake.topic}</span>
                      <span
                        className={[
                          'rounded-lg px-3 py-1 text-sm font-semibold',
                          mistake.status === 'reviewed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700',
                        ].join(' ')}
                      >
                        {mistake.status}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500">{new Date(mistake.date).toLocaleString()}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-lg bg-rose-50 p-3">
                        <p className="text-sm font-semibold text-rose-800">Your answer</p>
                        <p className="mt-1 text-stone-800">{mistake.userAnswer}</p>
                      </div>
                      <div className="rounded-lg bg-emerald-50 p-3">
                        <p className="text-sm font-semibold text-emerald-800">Correct answer</p>
                        <p className="mt-1 text-stone-800">{mistake.correctAnswer}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-stone-700">{mistake.explanation}</p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => markReviewed(mistake.id)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700 hover:bg-slatewash"
                    >
                      <CheckCircle2 aria-hidden="true" size={16} />
                      Mark reviewed
                    </button>
                    <button
                      type="button"
                      onClick={() => startRetry(mistake)}
                      className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-3 text-sm font-semibold text-white hover:bg-fern"
                    >
                      <RefreshCcw aria-hidden="true" size={16} />
                      Retry
                    </button>
                  </div>
                </div>

                {retrying ? (
                  <form onSubmit={(event) => handleRetry(event, mistake)} className="mt-5 space-y-3 border-t border-stone-200 pt-4">
                    <label className="block">
                      <span className="text-sm font-semibold text-stone-700">Try the correct answer again</span>
                      <textarea
                        value={retryAnswer}
                        onChange={(event) => setRetryAnswer(event.target.value)}
                        rows={2}
                        className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 text-base"
                      />
                    </label>
                    <button
                      type="submit"
                      className="min-h-10 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern"
                    >
                      Check retry
                    </button>
                    <FeedbackBox
                      result={retryResult}
                      correctAnswer={mistake.correctAnswer}
                      explanation={
                        retryResult === 'correct'
                          ? 'Nice recovery. This mistake has been marked as reviewed.'
                          : mistake.explanation
                      }
                    />
                  </form>
                ) : null}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
