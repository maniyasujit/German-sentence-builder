import { useMemo, useState } from 'react';
import ProgressCard from '../components/ProgressCard';
import ProgressSummary from '../components/ProgressSummary';
import {
  getDueMistakes,
  getMistakes,
  getProgress,
  getTextPracticeSessions,
  getVocabulary,
  getWeakTopics,
} from '../utils/storage';
import { getAccuracy } from '../utils/progress';

export default function Progress() {
  const [refreshKey, setRefreshKey] = useState(0);
  const progress = getProgress();
  const mistakes = getMistakes();
  const vocabulary = getVocabulary();
  const dueReviews = getDueMistakes();
  const textSessions = getTextPracticeSessions();
  const weakTopic = getWeakTopics()[0]?.topic ?? 'none yet';
  const accuracy = getAccuracy(progress);

  const practisedTopics = useMemo(
    () => Object.entries(progress.topicsPractised).sort((a, b) => b[1] - a[1]),
    // refreshKey is intentionally included because progress is loaded from localStorage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [progress.topicsPractised, refreshKey],
  );

  function refresh() {
    setRefreshKey((key) => key + 1);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-coral">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Progress</h1>
        <p className="mt-2 max-w-2xl text-stone-600">
          Your vocabulary, mistakes, pasted text sessions, and daily practice stay in this browser.
        </p>
      </section>

      <ProgressSummary
        completed={progress.completedExercises}
        accuracy={accuracy}
        mistakes={mistakes.length}
        vocabulary={vocabulary.length}
        dueReviews={dueReviews.length}
        weakTopic={weakTopic}
        onDataChanged={refresh}
      />

      <ProgressCard />

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
                    <div className="h-full rounded-full bg-fern" style={{ width: `${Math.min(100, count * 12)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-ink">Personal content</h2>
          <div className="mt-4 grid gap-3">
            <Metric label="Vocabulary words" value={vocabulary.length.toString()} />
            <Metric label="Text sessions" value={textSessions.length.toString()} />
            <Metric label="Due reviews" value={dueReviews.length.toString()} />
            <Metric label="Unresolved mistakes" value={mistakes.filter((mistake) => !mistake.isResolved).length.toString()} />
          </div>
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slatewash p-3">
      <p className="text-sm text-stone-600">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
