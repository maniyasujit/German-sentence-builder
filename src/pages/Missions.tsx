import { useMemo, useState } from 'react';
import { CheckCircle2, ClipboardCheck } from 'lucide-react';
import GrammarHighlighter from '../components/GrammarHighlighter';
import { findGrammarHighlight } from '../data/grammarHighlights';
import { missions } from '../data/missions';
import { getProgress, markMissionCompleted } from '../utils/localStorage';

export default function Missions() {
  const [selectedId, setSelectedId] = useState(missions[0].id);
  const [completed, setCompleted] = useState<string[]>(getProgress().missionsCompleted);
  const [showModels, setShowModels] = useState<Record<string, boolean>>({});
  const [draft, setDraft] = useState('');
  const mission = missions.find((item) => item.id === selectedId) ?? missions[0];
  const highlight = mission.highlightId ? findGrammarHighlight(mission.highlightId) : undefined;
  const isComplete = completed.includes(mission.id);

  const missionNav = useMemo(
    () =>
      missions.map((item, index) => ({
        ...item,
        label: `Mission ${index + 1}`,
      })),
    [],
  );

  function completeMission() {
    const progress = markMissionCompleted(mission.id);
    setCompleted(progress.missionsCompleted);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <aside className="rounded-lg border border-stone-200 bg-white p-3 shadow-soft lg:sticky lg:top-32 lg:self-start">
        <h1 className="px-2 py-2 text-xl font-semibold text-ink">Real-Life Missions</h1>
        <div className="mt-2 grid gap-2">
          {missionNav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setDraft('');
              }}
              className={[
                'rounded-lg px-3 py-3 text-left transition',
                item.id === mission.id ? 'bg-ink text-white' : 'hover:bg-slatewash',
              ].join(' ')}
            >
              <span className="block text-xs font-semibold uppercase tracking-normal opacity-80">{item.label}</span>
              <span className="mt-1 block font-semibold">{item.title}</span>
              <span className="mt-1 block text-sm opacity-80">{item.level}</span>
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-6">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-coral">{mission.level} mission</p>
              <h2 className="mt-2 text-3xl font-semibold text-ink">{mission.title}</h2>
              <p className="mt-2 max-w-3xl text-lg text-stone-700">{mission.goal}</p>
            </div>
            {isComplete ? (
              <span className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-emerald-50 px-3 text-sm font-semibold text-emerald-700">
                <CheckCircle2 aria-hidden="true" size={16} />
                Completed
              </span>
            ) : null}
          </div>
          <p className="mt-5 rounded-lg bg-slatewash p-4 leading-7 text-stone-700">{mission.situation}</p>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-stone-200 bg-white p-5">
            <h3 className="text-xl font-semibold text-ink">Useful vocabulary</h3>
            <div className="mt-4 grid gap-2">
              {mission.vocabulary.map((item) => (
                <div key={item.german} className="grid gap-2 rounded-lg bg-slatewash p-3 sm:grid-cols-[1fr_1fr]">
                  <p className="font-semibold text-ink">{item.german}</p>
                  <p className="text-stone-700">{item.english}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-5">
            <h3 className="text-xl font-semibold text-ink">Sentence patterns</h3>
            <ul className="mt-4 space-y-2">
              {mission.patterns.map((pattern) => (
                <li key={pattern} className="rounded-lg bg-stone-50 p-3 font-semibold text-stone-800">
                  {pattern}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-xl font-semibold text-ink">Grammar needed here</h3>
          <ul className="mt-4 grid gap-3 md:grid-cols-2">
            {mission.grammar.map((rule) => (
              <li key={rule} className="rounded-lg border border-stone-200 p-3 text-sm leading-6 text-stone-700">
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {highlight ? <GrammarHighlighter highlight={highlight} /> : null}

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-xl font-semibold text-ink">Practice exercises</h3>
          <div className="mt-4 grid gap-3">
            {mission.practice.map((practice, index) => {
              const key = `${mission.id}-${index}`;
              return (
                <article key={practice.prompt} className="rounded-lg bg-slatewash p-4">
                  <p className="font-semibold text-ink">{practice.prompt}</p>
                  <button
                    type="button"
                    onClick={() => setShowModels((current) => ({ ...current, [key]: !current[key] }))}
                    className="mt-3 min-h-10 rounded-lg bg-white px-3 text-sm font-semibold text-stone-700 hover:bg-stone-100"
                  >
                    {showModels[key] ? 'Hide model' : 'Show model'}
                  </button>
                  {showModels[key] ? (
                    <p className="mt-3 rounded-lg bg-white p-3 font-semibold text-ink">{practice.modelAnswer}</p>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-xl font-semibold text-ink">Final writing task</h3>
          <p className="mt-2 text-stone-700">{mission.finalTask}</p>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={6}
            className="mt-4 w-full rounded-lg border border-stone-300 p-3"
            placeholder="Write your German answer here..."
          />
          <button
            type="button"
            onClick={completeMission}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern"
          >
            <ClipboardCheck aria-hidden="true" size={16} />
            Mark mission complete
          </button>
        </section>
      </div>
    </div>
  );
}
