import { ArrowLeftRight } from 'lucide-react';
import type { LanguageDirection } from '../types';

interface LanguageDirectionToggleProps {
  value: LanguageDirection;
  onChange: (direction: LanguageDirection) => void;
  compact?: boolean;
}

export default function LanguageDirectionToggle({ value, onChange, compact = false }: LanguageDirectionToggleProps) {
  const nextDirection: LanguageDirection = value === 'de-en' ? 'en-de' : 'de-en';
  const currentLabel = value === 'de-en' ? 'German → English' : 'English → German';

  return (
    <div>
      {compact ? (
        <span className="sr-only">Direction</span>
      ) : (
        <span className="mb-2 block text-sm font-semibold text-stone-700">Direction</span>
      )}
      <button
        type="button"
        onClick={() => onChange(nextDirection)}
        className={[
          'group flex w-full items-center justify-between rounded-lg border border-stone-300 bg-white text-left transition hover:border-fern hover:bg-slatewash',
          compact ? 'min-h-10 gap-2 px-3 py-1.5' : 'min-h-11 gap-3 p-2',
        ].join(' ')}
        aria-label={`Switch language direction. Current direction is ${currentLabel}.`}
      >
        <span className={['flex min-w-0 items-center', compact ? 'gap-2' : 'gap-3'].join(' ')}>
          <span
            className={[
              'flex shrink-0 items-center justify-center rounded-md bg-ink text-white',
              compact ? 'h-7 w-7' : 'h-9 w-9',
            ].join(' ')}
          >
            <ArrowLeftRight aria-hidden="true" size={compact ? 15 : 17} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-ink">{currentLabel}</span>
          </span>
        </span>
        <span
          className={[
            'shrink-0 rounded-md bg-slatewash text-xs font-semibold text-stone-700 transition group-hover:bg-white',
            compact ? 'px-2 py-1' : 'px-3 py-1',
          ].join(' ')}
        >
          Switch
        </span>
      </button>
    </div>
  );
}
