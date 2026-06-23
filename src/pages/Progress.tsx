import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import ProgressCard from '../components/ProgressCard';
import { getMistakes, getProgress, resetProgress } from '../utils/localStorage';
import { getAccuracy, getRecommendedTopic } from '../utils/progress';

export default function Progress() {
  const [progress, setProgress] = useState(getProgress());
  const mistakes = getMistakes();
  const accuracy = getAccuracy(progress);
  const recommendedTopic = getRecommendedTopic(mistakes, progress);
  const practisedTopics = useMemo(
    () => Object.entries(progress.topicsPractised).sort((a, b) => b[1] - a[1]),
    [progress.topicsPractised],
  );

  function reset() {
    setProgress(resetProgress());
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-coral">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Progress</h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Your progress is stored locally in this browser. It stays private and does not require an account.
        </p>
      </section>

      <ProgressCard />

      <section className="grid gap-4 md:grid-cols-4">
        <Metric label="Completed exercises" value={progress.completedExercises.toString()} />
        <Metric label="Correct answers" value={progress.correctAnswers.toString()} />
        <Metric label="Accuracy" value={`${accuracy}%`} />
        <Metric label="Mistakes saved" value={mistakes.length.toString()} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-ink">Topics practised</h2>
          {practisedTopics.length === 0 ? (
            <p className="mt-3 text-stone-600">Complete an exercise to see practised topics here.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {practisedTopics.map(([topic, count]) => (
                <div key={topic} className="rounded-lg bg-slatewash p-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-ink">{topic}</p>
                    <p className="text-sm text-stone-600">{count}x</p>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-fern"
                      style={{ width: `${Math.min(100, count * 12)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-ink">Recent mistakes</h2>
          {mistakes.length === 0 ? (
            <p className="mt-3 text-stone-600">No mistakes saved yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {mistakes.slice(0, 5).map((mistake) => (
                <article key={mistake.id} className="rounded-lg bg-stone-50 p-3">
                  <p className="text-sm font-semibold text-coral">{mistake.topic}</p>
                  <p className="mt-1 text-sm text-stone-700">{mistake.correctAnswer}</p>
                </article>
              ))}
            </div>
          )}

          <div className="mt-5 rounded-lg bg-slatewash p-4">
            <p className="text-sm font-semibold text-stone-700">Recommended topic to review</p>
            <p className="mt-1 text-lg font-semibold text-ink">{recommendedTopic}</p>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={reset}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 hover:bg-slatewash"
      >
        <RotateCcw aria-hidden="true" size={16} />
        Reset progress counters
      </button>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-stone-600">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
    </div>
  );
}
