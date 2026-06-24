import { ChevronDown } from 'lucide-react';
import type { Level } from '../types';
import { sentencePracticeLevels } from '../utils/sentenceDataLoader';

interface LevelSelectorProps {
  value: Level;
  onChange: (level: Level) => void;
}

export default function LevelSelector({ value, onChange }: LevelSelectorProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-stone-700">Level</span>
      <span className="relative block">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value as Level)}
          className="h-[54px] w-full appearance-none rounded-lg border border-stone-300 bg-white px-4 pr-11 text-base font-semibold text-ink transition hover:border-fern hover:bg-slatewash"
        >
          {sentencePracticeLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-stone-600"
          size={18}
        />
      </span>
    </label>
  );
}
