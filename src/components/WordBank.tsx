import { RotateCcw, Undo2, X } from 'lucide-react';

interface WordBankProps {
  words: string[];
  selectedIndexes: number[];
  onAdd: (index: number) => void;
  onRemoveLast: () => void;
  onClear: () => void;
}

export default function WordBank({ words, selectedIndexes, onAdd, onRemoveLast, onClear }: WordBankProps) {
  const used = new Set(selectedIndexes);

  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-2 text-sm font-semibold text-stone-700">Word bank</h2>
        <div className="grid tile-grid gap-2">
          {words.map((word, index) => (
            <button
              key={`${word}-${index}`}
              type="button"
              disabled={used.has(index)}
              onClick={() => onAdd(index)}
              className="min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-left text-sm font-semibold text-ink transition hover:border-fern hover:bg-slatewash disabled:cursor-not-allowed disabled:border-stone-200 disabled:bg-stone-100 disabled:text-stone-400"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onRemoveLast}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700 hover:bg-slatewash"
        >
          <Undo2 aria-hidden="true" size={16} />
          Undo
        </button>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700 hover:bg-slatewash"
        >
          <RotateCcw aria-hidden="true" size={16} />
          Reset
        </button>
        <span className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slatewash px-3 text-sm text-stone-600">
          <X aria-hidden="true" size={15} />
          Click words in order
        </span>
      </div>
    </div>
  );
}
