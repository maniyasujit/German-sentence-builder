import { FormEvent, useEffect, useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { writingPrompts } from '../data/writingPrompts';
import { recordExerciseResult } from '../utils/localStorage';

export default function WritingPractice() {
  const [selectedPromptId, setSelectedPromptId] = useState(writingPrompts[0].id);
  const [draft, setDraft] = useState('');
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const prompt = writingPrompts.find((item) => item.id === selectedPromptId) ?? writingPrompts[0];

  useEffect(() => {
    setDraft('');
    setCheckedItems([]);
    setSubmitted(false);
  }, [selectedPromptId]);

  function toggleChecklist(item: string) {
    setCheckedItems((current) =>
      current.includes(item) ? current.filter((value) => value !== item) : [...current, item],
    );
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitted(true);
    recordExerciseResult(`Writing: ${prompt.title}`, draft.trim().length > 0);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr]">
      <aside className="rounded-lg border border-stone-200 bg-white p-3 shadow-soft lg:sticky lg:top-32 lg:self-start">
        <h1 className="px-2 py-2 text-xl font-semibold text-ink">Writing Practice</h1>
        <div className="mt-2 grid gap-2">
          {writingPrompts.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedPromptId(item.id)}
              className={[
                'rounded-lg px-3 py-3 text-left transition',
                item.id === prompt.id ? 'bg-ink text-white' : 'hover:bg-slatewash',
              ].join(' ')}
            >
              <span className="block text-xs font-semibold uppercase tracking-normal opacity-80">{item.level}</span>
              <span className="mt-1 block font-semibold">{item.title}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-coral">{prompt.level} self-check writing</p>
        <h2 className="mt-2 text-3xl font-semibold text-ink">{prompt.title}</h2>
        <p className="mt-3 rounded-lg bg-slatewash p-4 text-lg font-semibold text-ink">{prompt.prompt}</p>

        <form onSubmit={submit} className="mt-5 space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Your German answer</span>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={8}
              className="mt-2 w-full rounded-lg border border-stone-300 p-3"
              placeholder="Write a few simple sentences. The checklist below helps you review your own grammar."
            />
          </label>

          <section className="rounded-lg border border-stone-200 p-4">
            <h3 className="font-semibold text-ink">Self-check checklist</h3>
            <div className="mt-3 grid gap-2">
              {prompt.checklist.map((item) => {
                const checked = checkedItems.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleChecklist(item)}
                    className="flex min-h-11 items-center gap-3 rounded-lg bg-stone-50 px-3 text-left text-sm text-stone-800 hover:bg-slatewash"
                  >
                    {checked ? (
                      <CheckSquare aria-hidden="true" size={18} className="shrink-0 text-fern" />
                    ) : (
                      <Square aria-hidden="true" size={18} className="shrink-0 text-stone-500" />
                    )}
                    {item}
                  </button>
                );
              })}
            </div>
          </section>

          <button
            type="submit"
            disabled={!draft.trim()}
            className="min-h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            Show model answer
          </button>
        </form>

        {submitted ? (
          <section className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="text-lg font-semibold text-ink">Model answer</h3>
            <div className="mt-3 space-y-2">
              {prompt.modelAnswer.map((line) => (
                <p key={line} className="rounded-lg bg-white p-3 font-semibold text-ink">
                  {line}
                </p>
              ))}
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              Compare structure first: verb position, noun capitalization, articles, and whether any Dativ or Akkusativ rule applies.
            </p>
          </section>
        ) : null}
      </section>
    </div>
  );
}
