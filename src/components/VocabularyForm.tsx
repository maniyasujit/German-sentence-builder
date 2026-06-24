import { FormEvent, useEffect, useState } from 'react';
import type {
  Level,
  UserVocabularyItem,
  VocabularyArticle,
  VocabularyTopic,
  VocabularyWordType,
} from '../types';

type VocabularyFormValue = Omit<
  UserVocabularyItem,
  'id' | 'createdAt' | 'reviewCount' | 'lastReviewedAt' | 'mistakeCount'
>;

const articles: VocabularyArticle[] = ['none', 'der', 'die', 'das', 'plural'];
const wordTypes: VocabularyWordType[] = ['noun', 'verb', 'adjective', 'phrase', 'other'];
const levels: Level[] = ['A1', 'A2', 'B1'];
const topics: VocabularyTopic[] = ['daily-life', 'work', 'doctor', 'apartment', 'shopping', 'travel', 'study', 'custom'];

const emptyValue: VocabularyFormValue = {
  germanWord: '',
  englishMeaning: '',
  article: 'none',
  pluralForm: '',
  wordType: 'noun',
  level: 'A1',
  topic: 'custom',
  exampleSentence: '',
  notes: '',
};

interface VocabularyFormProps {
  initialItem?: UserVocabularyItem | null;
  defaultGermanWord?: string;
  onSave: (value: VocabularyFormValue) => void;
  onCancel?: () => void;
}

export default function VocabularyForm({ initialItem, defaultGermanWord, onSave, onCancel }: VocabularyFormProps) {
  const [value, setValue] = useState<VocabularyFormValue>(emptyValue);
  const [error, setError] = useState('');

  useEffect(() => {
    setValue(
      initialItem
        ? {
            germanWord: initialItem.germanWord,
            englishMeaning: initialItem.englishMeaning,
            article: initialItem.article,
            pluralForm: initialItem.pluralForm,
            wordType: initialItem.wordType,
            level: initialItem.level,
            topic: initialItem.topic,
            exampleSentence: initialItem.exampleSentence,
            notes: initialItem.notes,
          }
        : { ...emptyValue, germanWord: defaultGermanWord ?? '' },
    );
    setError('');
  }, [defaultGermanWord, initialItem]);

  function update<K extends keyof VocabularyFormValue>(key: K, nextValue: VocabularyFormValue[K]) {
    setValue((current) => ({ ...current, [key]: nextValue }));
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!value.germanWord.trim()) {
      setError('Please add a German word first.');
      return;
    }
    if (!value.englishMeaning.trim()) {
      setError('Please add the English meaning first.');
      return;
    }

    try {
      onSave(value);
      if (!initialItem) setValue(emptyValue);
      setError('');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Could not save this word yet.');
    }
  }

  return (
    <form onSubmit={submit} className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-normal text-coral">
          {initialItem ? 'Edit word' : 'Add a word'}
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-ink">My Vocabulary</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="German word" required>
          <input
            value={value.germanWord}
            onChange={(event) => update('germanWord', event.target.value)}
            className="w-full rounded-lg border border-stone-300 p-3"
            placeholder="Termin"
          />
        </Field>
        <Field label="English meaning" required>
          <input
            value={value.englishMeaning}
            onChange={(event) => update('englishMeaning', event.target.value)}
            className="w-full rounded-lg border border-stone-300 p-3"
            placeholder="appointment"
          />
        </Field>
        <Field label="Article">
          <select
            value={value.article}
            onChange={(event) => update('article', event.target.value as VocabularyArticle)}
            className="w-full rounded-lg border border-stone-300 p-3"
          >
            {articles.map((article) => (
              <option key={article} value={article}>
                {article}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Plural form">
          <input
            value={value.pluralForm}
            onChange={(event) => update('pluralForm', event.target.value)}
            className="w-full rounded-lg border border-stone-300 p-3"
            placeholder="Termine"
          />
        </Field>
        <Field label="Word type">
          <select
            value={value.wordType}
            onChange={(event) => update('wordType', event.target.value as VocabularyWordType)}
            className="w-full rounded-lg border border-stone-300 p-3"
          >
            {wordTypes.map((wordType) => (
              <option key={wordType} value={wordType}>
                {wordType}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Level">
          <select
            value={value.level}
            onChange={(event) => update('level', event.target.value as Level)}
            className="w-full rounded-lg border border-stone-300 p-3"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Topic">
          <select
            value={value.topic}
            onChange={(event) => update('topic', event.target.value as VocabularyTopic)}
            className="w-full rounded-lg border border-stone-300 p-3"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Example sentence">
          <input
            value={value.exampleSentence}
            onChange={(event) => update('exampleSentence', event.target.value)}
            className="w-full rounded-lg border border-stone-300 p-3"
            placeholder="Ich habe morgen einen Termin."
          />
        </Field>
      </div>

      <Field label="Notes">
        <textarea
          value={value.notes}
          onChange={(event) => update('notes', event.target.value)}
          rows={3}
          className="w-full rounded-lg border border-stone-300 p-3"
          placeholder="Masculine noun. Often used with haben."
        />
      </Field>

      {error ? <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p> : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <button type="submit" className="min-h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-fern">
          {initialItem ? 'Save changes' : 'Add word'}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-lg border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-700 hover:bg-slatewash"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="mt-4 block">
      <span className="mb-2 block text-sm font-semibold text-stone-700">
        {label}
        {required ? <span className="text-coral"> *</span> : null}
      </span>
      {children}
    </label>
  );
}
