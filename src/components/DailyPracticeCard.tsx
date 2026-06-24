import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import type { DailyPracticeSession } from '../types';

interface DailyPracticeCardProps {
  session: DailyPracticeSession;
  dueReviews: number;
  savedWords: number;
  weakTopic: string;
}

export default function DailyPracticeCard({ session, dueReviews, savedWords, weakTopic }: DailyPracticeCardProps) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <CalendarCheck aria-hidden="true" className="mt-1 shrink-0 text-fern" size={28} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-coral">Today’s Practice</p>
            <h2 className="mt-1 text-2xl font-semibold text-ink">You have {session.exercises.length} exercises ready.</h2>
            <p className="mt-1 text-stone-600">Due reviews: {dueReviews} · Saved words: {savedWords} · Weak topic: {weakTopic}</p>
          </div>
        </div>
        <Link
          to="/today"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-fern"
        >
          Start Today’s Practice
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}
