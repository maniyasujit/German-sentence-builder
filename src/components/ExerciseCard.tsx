import type { ReactNode } from 'react';

interface ExerciseCardProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ExerciseCard({ eyebrow, title, description, children }: ExerciseCardProps) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-normal text-coral">{eyebrow}</p>
      ) : null}
      <div className="mb-5">
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
        {description ? <p className="mt-2 max-w-3xl text-base text-stone-600">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
