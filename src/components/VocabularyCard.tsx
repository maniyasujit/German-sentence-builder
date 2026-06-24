import { Pencil, Play, Trash2 } from 'lucide-react';
import type { UserVocabularyItem } from '../types';
import { formatWordWithArticle } from '../utils/vocabularyGenerator';

interface VocabularyCardProps {
  item: UserVocabularyItem;
  onEdit: (item: UserVocabularyItem) => void;
  onDelete: (id: string) => void;
  onPractice: (item: UserVocabularyItem) => void;
}

export default function VocabularyCard({ item, onEdit, onDelete, onPractice }: VocabularyCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-ink">{formatWordWithArticle(item)}</h3>
          <p className="mt-1 text-lg text-stone-700">{item.englishMeaning}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onPractice(item)}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-3 text-sm font-semibold text-white hover:bg-fern"
          >
            <Play aria-hidden="true" size={16} />
            Practice
          </button>
          <button
            type="button"
            onClick={() => onEdit(item)}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700 hover:bg-slatewash"
          >
            <Pencil aria-hidden="true" size={16} />
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-rose-200 bg-white px-3 text-sm font-semibold text-rose-700 hover:bg-rose-50"
          >
            <Trash2 aria-hidden="true" size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">{item.wordType}</span>
        <span className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">{item.topic}</span>
        <span className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">{item.level}</span>
        {item.mistakeCount > 0 ? (
          <span className="rounded-lg bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            {item.mistakeCount} mistake{item.mistakeCount === 1 ? '' : 's'}
          </span>
        ) : null}
      </div>

      {item.exampleSentence ? (
        <p className="mt-4 rounded-lg bg-stone-50 p-3 text-sm leading-6 text-stone-700">
          <span className="font-semibold text-ink">Example:</span> {item.exampleSentence}
        </p>
      ) : null}
      {item.notes ? <p className="mt-3 text-sm leading-6 text-stone-600">{item.notes}</p> : null}
    </article>
  );
}
