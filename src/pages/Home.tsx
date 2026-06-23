import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  Layers,
  NotebookTabs,
  PenLine,
  Route,
  Sparkles,
} from 'lucide-react';
import ProgressCard from '../components/ProgressCard';

const tools = [
  {
    title: 'Sentence Builder',
    description: 'Build real German sentences from English prompts and learn why each case, article, and verb position works.',
    to: '/sentence-builder',
    icon: Layers,
  },
  {
    title: 'Case Helper',
    description: 'Decide between Nominativ, Akkusativ, and Dativ with examples, prepositions, and fast feedback.',
    to: '/case-helper',
    icon: ClipboardList,
  },
  {
    title: 'Word Order Trainer',
    description: 'Practise verb-second, questions, modal verbs, Perfekt, and subordinate clauses with clickable tiles.',
    to: '/word-order',
    icon: Route,
  },
  {
    title: 'Real-Life Missions',
    description: 'Use German in practical situations like introductions, shopping, doctor visits, housing, and interviews.',
    to: '/missions',
    icon: Sparkles,
  },
  {
    title: 'Mistake Notebook',
    description: 'Wrong answers are saved locally with grammar notes so you can review the exact patterns that need work.',
    to: '/mistakes',
    icon: NotebookTabs,
  },
  {
    title: 'Vocabulary in Context',
    description: 'See common words in five useful situations instead of memorizing isolated translations.',
    to: '/vocabulary',
    icon: BookOpen,
  },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-white px-3 text-sm font-semibold text-fern shadow-sm">
            <PenLine aria-hidden="true" size={16} />
            Learn by building, checking, and reviewing
          </div>
          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              German Sentence Builder
            </h1>
            <p className="max-w-3xl text-xl leading-8 text-stone-700">
              Know German words but don’t know how to use them? Practise building real German sentences step by step.
            </p>
            <p className="max-w-2xl text-base leading-7 text-stone-600">
              Learn German by building real sentences, not by memorizing grammar tables.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/sentence-builder"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-ink px-5 text-base font-semibold text-white hover:bg-fern"
            >
              Start learning
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link
              to="/case-helper"
              className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-stone-300 bg-white px-5 text-base font-semibold text-stone-800 hover:bg-slatewash"
            >
              Try case helper
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
          <div className="rounded-lg bg-slatewash p-4">
            <p className="text-sm font-semibold text-coral">Sentence map</p>
            <div className="mt-4 space-y-3">
              {[
                ['Ich', 'subject', 'Nominativ'],
                ['gehe', 'verb', 'position 2'],
                ['mit meinem Freund', 'phrase', 'Dativ after mit'],
                ['in den Supermarkt', 'place', 'Akkusativ movement'],
              ].map(([text, label, detail]) => (
                <div key={text} className="grid grid-cols-[1fr_auto] gap-3 rounded-lg bg-white p-3">
                  <div>
                    <p className="font-semibold text-ink">{text}</p>
                    <p className="text-sm text-stone-600">{label}</p>
                  </div>
                  <span className="self-center rounded-lg bg-fern px-3 py-1 text-sm font-semibold text-white">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProgressCard />

      <section>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-ink">Learning tools</h2>
          <p className="mt-1 text-stone-600">Every tool teaches grammar inside usable sentences.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map(({ title, description, to, icon: Icon }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-lg border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
            >
              <Icon aria-hidden="true" className="text-fern" size={26} />
              <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-coral">
                Open tool
                <ArrowRight aria-hidden="true" size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
