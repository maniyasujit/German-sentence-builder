import { ArrowLeftRight } from 'lucide-react';
import type { LanguageDirection } from '../types';

interface LanguageDirectionToggleProps {
  value: LanguageDirection;
  onChange: (direction: LanguageDirection) => void;
}

export default function LanguageDirectionToggle({ value, onChange }: LanguageDirectionToggleProps) {
  const nextDirection: LanguageDirection = value === 'de-en' ? 'en-de' : 'de-en';
  const currentLabel = value === 'de-en' ? 'German → English' : 'English → German';

  return (
    <div>
      <span className="mb-2 block text-sm font-semibold text-stone-700">Direction</span>
      <button
        type="button"
        onClick={() => onChange(nextDirection)}
        className="group flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border border-stone-300 bg-white p-2 text-left transition hover:border-fern hover:bg-slatewash"
        aria-label={`Switch language direction. Current direction is ${currentLabel}.`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink text-white">
            <ArrowLeftRight aria-hidden="true" size={17} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink">{currentLabel}</span>
          </span>
        </span>
        <span className="shrink-0 rounded-md bg-slatewash px-3 py-1 text-xs font-semibold text-stone-700 transition group-hover:bg-white">
          Switch
        </span>
      </button>
    </div>
  );
}
