import { useMemo, useState } from 'react';
import type { GrammarHighlight } from '../types';

interface GrammarHighlighterProps {
  highlight: GrammarHighlight;
}

export default function GrammarHighlighter({ highlight }: GrammarHighlighterProps) {
  const [activeId, setActiveId] = useState(highlight.parts[0]?.id);
  const activePart = useMemo(
    () => highlight.parts.find((part) => part.id === activeId) ?? highlight.parts[0],
    [activeId, highlight.parts],
  );

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4">
      <h2 className="text-lg font-semibold text-ink">Clickable grammar highlighter</h2>
      <p className="mt-1 text-sm text-stone-600">Click a sentence part to see what it is doing.</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg bg-slatewash p-3 text-lg">
        {highlight.parts.map((part) => (
          <button
            type="button"
            key={part.id}
            onClick={() => setActiveId(part.id)}
            className={[
              'rounded-lg px-2 py-1 text-left font-semibold transition',
              part.id === activePart.id ? 'bg-fern text-white' : 'bg-white text-ink hover:bg-stone-100',
            ].join(' ')}
          >
            {part.text}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-stone-200 bg-stone-50 p-4">
        <p className="text-sm font-semibold text-coral">{activePart.label}</p>
        <p className="mt-1 text-sm leading-6 text-stone-700">{activePart.explanation}</p>
      </div>
    </section>
  );
}
