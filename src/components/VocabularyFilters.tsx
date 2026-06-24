import type { VocabularyArticle, VocabularyTopic, VocabularyWordType } from '../types';

export interface VocabularyFilterState {
  search: string;
  topic: string;
  level: string;
  wordType: string;
  article: string;
  mistakeCount: string;
}

interface VocabularyFiltersProps {
  filters: VocabularyFilterState;
  onChange: (filters: VocabularyFilterState) => void;
}

const topics: Array<VocabularyTopic | 'all'> = ['all', 'daily-life', 'work', 'doctor', 'apartment', 'shopping', 'travel', 'study', 'custom'];
const wordTypes: Array<VocabularyWordType | 'all'> = ['all', 'noun', 'verb', 'adjective', 'phrase', 'other'];
const articles: Array<VocabularyArticle | 'all'> = ['all', 'der', 'die', 'das', 'plural', 'none'];

export default function VocabularyFilters({ filters, onChange }: VocabularyFiltersProps) {
  function update(key: keyof VocabularyFilterState, value: string) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-6">
        <label className="md:col-span-3 lg:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-stone-700">Search</span>
          <input
            value={filters.search}
            onChange={(event) => update('search', event.target.value)}
            className="w-full rounded-lg border border-stone-300 p-3"
            placeholder="German or English..."
          />
        </label>
        <Select label="Topic" value={filters.topic} options={topics} onChange={(value) => update('topic', value)} />
        <Select label="Level" value={filters.level} options={['all', 'A1', 'A2', 'B1']} onChange={(value) => update('level', value)} />
        <Select label="Type" value={filters.wordType} options={wordTypes} onChange={(value) => update('wordType', value)} />
        <Select label="Article" value={filters.article} options={articles} onChange={(value) => update('article', value)} />
        <Select
          label="Mistakes"
          value={filters.mistakeCount}
          options={['all', 'with mistakes', 'no mistakes']}
          onChange={(value) => update('mistakeCount', value)}
        />
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-2 block text-sm font-semibold text-stone-700">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-stone-300 p-3"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
