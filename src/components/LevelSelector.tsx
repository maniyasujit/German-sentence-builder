import { ChevronDown } from 'lucide-react';
import type { Level } from '../types';
import { sentencePracticeLevels } from '../utils/sentenceDataLoader';

interface LevelSelectorProps {
  value: Level;
  onChange: (level: Level) => void;
  compact?: boolean;
}

export default function LevelSelector({ value, onChange, compact = false }: LevelSelectorProps) {
  return (
    <label className={compact ? 'block' : 'block'}>
      {compact ? (
        <span className="sr-only">Level</span>
      ) : (
        <span className="mb-2 block text-sm font-semibold text-stone-700">Level</span>
      )}
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as Level)}
          className={[
            'w-full appearance-none rounded-lg border border-stone-300 bg-white font-semibold text-ink transition hover:border-fern hover:bg-slatewash',
            compact ? 'h-10 px-3 pr-9 text-sm' : 'h-[54px] px-4 pr-11 text-base',
          ].join(' ')}
        >
          {sentencePracticeLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className={[
            'pointer-events-none absolute top-1/2 -translate-y-1/2 text-stone-600',
            compact ? 'right-3' : 'right-4',
          ].join(' ')}
          size={compact ? 16 : 18}
        />
      </span>
    </label>
  );
}
