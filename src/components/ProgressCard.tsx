import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarCheck, NotebookTabs, Target, Trophy } from 'lucide-react';
import { getMistakes, getProgress } from '../utils/localStorage';
import { getAccuracy, getRecommendedTopic } from '../utils/progress';
import { getDueMistakes, getVocabulary } from '../utils/storage';
import type { Mistake, ProgressState } from '../types';

export default function ProgressCard() {
  const [progress, setProgress] = useState<ProgressState>(getProgress());
  const [mistakes, setMistakes] = useState<Mistake[]>(getMistakes());

  useEffect(() => {
    const refresh = () => {
      setProgress(getProgress());
      setMistakes(getMistakes());
    };

    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  const accuracy = getAccuracy(progress);
  const topic = getRecommendedTopic(mistakes, progress);
  const dueReviews = getDueMistakes().length;
  const vocabularyCount = getVocabulary().length;

  return (
    <aside className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-coral">Your progress</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">{progress.completedExercises} exercises completed</h2>
        </div>
        <Trophy aria-hidden="true" className="text-saffron" size={32} />
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg bg-slatewash p-3">
          <p className="text-sm text-stone-600">Accuracy</p>
          <p className="mt-1 text-2xl font-semibold">{accuracy}%</p>
        </div>
        <div className="rounded-lg bg-slatewash p-3">
          <p className="text-sm text-stone-600">Due reviews</p>
          <p className="mt-1 text-2xl font-semibold">{dueReviews}</p>
        </div>
        <div className="rounded-lg bg-slatewash p-3">
          <p className="text-sm text-stone-600">Saved words</p>
          <p className="mt-1 text-2xl font-semibold">{vocabularyCount}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-lg border border-stone-200 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Target aria-hidden="true" className="mt-1 shrink-0 text-fern" size={20} />
          <div>
            <p className="text-sm font-semibold">Recommended review</p>
            <p className="text-sm text-stone-600">{topic}</p>
          </div>
        </div>
        <Link
          to="/today"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern"
        >
          <CalendarCheck aria-hidden="true" size={16} />
          Start practice
        </Link>
        <Link
          to="/mistakes"
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 hover:bg-slatewash"
        >
          <NotebookTabs aria-hidden="true" size={16} />
          Notebook
        </Link>
      </div>
    </aside>
  );
}
