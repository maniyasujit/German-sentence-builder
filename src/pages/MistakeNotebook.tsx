import { useMemo, useState } from 'react';
import { Filter, Trash2 } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import MistakeReviewCard from '../components/MistakeReviewCard';
import type { Mistake } from '../types';
import { getMistakes, markMistakeReviewed, saveMistakes } from '../utils/storage';

export default function MistakeNotebook() {
  const [mistakes, setMistakes] = useState<Mistake[]>(getMistakes());
  const [topicFilter, setTopicFilter] = useState('All topics');
  const [statusFilter, setStatusFilter] = useState('all');

  const topics = useMemo(
    () => ['All topics', ...Array.from(new Set(mistakes.map((mistake) => mistake.topic))).sort()],
    [mistakes],
  );

  const filteredMistakes = mistakes.filter((mistake) => {
    const topicMatches = topicFilter === 'All topics' || mistake.topic === topicFilter;
    const statusMatches =
      statusFilter === 'all' ||
      (statusFilter === 'due' && !mistake.isResolved && mistake.nextReviewAt <= new Date().toISOString().slice(0, 10)) ||
      (statusFilter === 'open' && !mistake.isResolved) ||
      (statusFilter === 'resolved' && mistake.isResolved);

    return topicMatches && statusMatches;
  });

  function refresh(next?: Mistake[]) {
    setMistakes(next ?? getMistakes());
  }

  function clearAll() {
    saveMistakes([]);
    refresh([]);
  }

  function handleReviewed(id: string, wasCorrect: boolean) {
    refresh(markMistakeReviewed(id, wasCorrect));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-coral">Spaced review</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">Mistake Notebook</h1>
            <p className="mt-2 max-w-2xl text-stone-600">
              Mistakes from vocabulary, pasted text, sentence builder, word order, and case helper are scheduled for review.
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
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="min-h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700"
              aria-label="Filter mistakes by status"
            >
              <option value="all">all</option>
              <option value="due">due today</option>
              <option value="open">open</option>
              <option value="resolved">resolved</option>
            </select>
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
        <EmptyState
          title="No mistakes match this view"
          description="Make a few practice attempts first. Wrong answers will appear here with review stages and next review dates."
        />
      ) : (
        <div className="grid gap-4">
          {filteredMistakes.map((mistake) => (
            <article key={mistake.id} className="space-y-4">
              <section className="rounded-lg border border-stone-200 bg-white p-5">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">{mistake.source}</span>
                  <span className="rounded-lg bg-stone-100 px-3 py-1 text-sm text-stone-700">{mistake.topic}</span>
                  <span
                    className={[
                      'rounded-lg px-3 py-1 text-sm font-semibold',
                      mistake.isResolved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700',
                    ].join(' ')}
                  >
                    {mistake.isResolved ? 'resolved' : `next review ${mistake.nextReviewAt}`}
                  </span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-ink">{mistake.question}</h2>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg bg-rose-50 p-3">
                    <p className="text-sm font-semibold text-rose-800">Old wrong answer</p>
                    <p className="mt-1 text-stone-800">{mistake.userAnswer}</p>
                  </div>
                  <div className="rounded-lg bg-emerald-50 p-3">
                    <p className="text-sm font-semibold text-emerald-800">Correct answer</p>
                    <p className="mt-1 text-stone-800">{mistake.correctAnswer}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-6 text-stone-700">{mistake.explanation}</p>
              </section>
              {!mistake.isResolved ? <MistakeReviewCard mistake={mistake} onReviewed={handleReviewed} /> : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
