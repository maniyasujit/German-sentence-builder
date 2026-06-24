import { useMemo, useState } from 'react';
import { BookPlus, Play } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import PracticeExerciseCard from '../components/PracticeExerciseCard';
import VocabularyCard from '../components/VocabularyCard';
import VocabularyFilters, { type VocabularyFilterState } from '../components/VocabularyFilters';
import VocabularyForm from '../components/VocabularyForm';
import type { PracticeExercise, UserVocabularyItem } from '../types';
import { recordExerciseResult } from '../utils/localStorage';
import {
  addMistake,
  addVocabularyItem,
  deleteVocabularyItem,
  getVocabulary,
  updateVocabularyItem,
} from '../utils/storage';
import { createVocabularyExercises } from '../utils/vocabularyGenerator';

const initialFilters: VocabularyFilterState = {
  search: '',
  topic: 'all',
  level: 'all',
  wordType: 'all',
  article: 'all',
  mistakeCount: 'all',
};

export default function MyVocabulary() {
  const [items, setItems] = useState<UserVocabularyItem[]>(getVocabulary());
  const [editingItem, setEditingItem] = useState<UserVocabularyItem | null>(null);
  const [filters, setFilters] = useState<VocabularyFilterState>(initialFilters);
  const [practiceExercises, setPracticeExercises] = useState<PracticeExercise[]>([]);

  const filteredItems = useMemo(() => {
    const search = filters.search.trim().toLocaleLowerCase('de-DE');
    return items.filter((item) => {
      const matchesSearch =
        !search ||
        item.germanWord.toLocaleLowerCase('de-DE').includes(search) ||
        item.englishMeaning.toLocaleLowerCase('de-DE').includes(search);
      const matchesTopic = filters.topic === 'all' || item.topic === filters.topic;
      const matchesLevel = filters.level === 'all' || item.level === filters.level;
      const matchesType = filters.wordType === 'all' || item.wordType === filters.wordType;
      const matchesArticle = filters.article === 'all' || item.article === filters.article;
      const matchesMistakes =
        filters.mistakeCount === 'all' ||
        (filters.mistakeCount === 'with mistakes' ? item.mistakeCount > 0 : item.mistakeCount === 0);

      return matchesSearch && matchesTopic && matchesLevel && matchesType && matchesArticle && matchesMistakes;
    });
  }, [filters, items]);

  function saveWord(value: Parameters<typeof addVocabularyItem>[0]) {
    if (editingItem) {
      setItems(updateVocabularyItem(editingItem.id, value));
      setEditingItem(null);
      return;
    }

    addVocabularyItem(value);
    setItems(getVocabulary());
  }

  function deleteWord(id: string) {
    setItems(deleteVocabularyItem(id));
    setPracticeExercises([]);
  }

  function practiceItem(item: UserVocabularyItem) {
    setPracticeExercises(createVocabularyExercises([item], 5));
  }

  function practiceAll() {
    setPracticeExercises(createVocabularyExercises(items, 12));
  }

  function handleAnswered(exercise: PracticeExercise, correct: boolean, userAnswer: string) {
    recordExerciseResult(`Vocabulary: ${exercise.topic}`, correct);

    if (exercise.relatedWordId) {
      const related = items.find((item) => item.id === exercise.relatedWordId);
      if (related) {
        const next = updateVocabularyItem(related.id, {
          reviewCount: related.reviewCount + 1,
          lastReviewedAt: new Date().toISOString(),
          mistakeCount: related.mistakeCount + (correct ? 0 : 1),
        });
        setItems(next);
      }
    }

    if (!correct) {
      addMistake({
        source: 'vocabulary',
        topic: exercise.topic,
        question: exercise.question,
        userAnswer,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        relatedWordId: exercise.relatedWordId,
        germanWord: exercise.germanWord,
      });
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <p className="text-sm font-semibold uppercase tracking-normal text-coral">Personal practice</p>
        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-ink">My Vocabulary</h1>
            <p className="mt-2 max-w-3xl text-stone-600">
              Add your own German words, keep examples with them, then turn them into personal practice.
            </p>
          </div>
          <button
            type="button"
            onClick={practiceAll}
            disabled={items.length === 0}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
          >
            <Play aria-hidden="true" size={16} />
            Practice My Words
          </button>
        </div>
      </section>

      <VocabularyForm initialItem={editingItem} onSave={saveWord} onCancel={editingItem ? () => setEditingItem(null) : undefined} />

      <VocabularyFilters filters={filters} onChange={setFilters} />

      {items.length === 0 ? (
        <EmptyState
          title="Add your first 5 German words to unlock personal practice."
          description="Start with useful words from your life: Termin, Wohnung, einkaufen, arbeiten, helfen."
          action={
            <span className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-slatewash px-4 text-sm font-semibold text-ink">
              <BookPlus aria-hidden="true" size={16} />
              Use the form above
            </span>
          }
        />
      ) : (
        <section className="grid gap-4 lg:grid-cols-2">
          {filteredItems.map((item) => (
            <VocabularyCard key={item.id} item={item} onEdit={setEditingItem} onDelete={deleteWord} onPractice={practiceItem} />
          ))}
        </section>
      )}

      {practiceExercises.length ? (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Practice</h2>
            <p className="mt-1 text-stone-600">Wrong answers are saved to the Mistake Notebook with review dates.</p>
          </div>
          {practiceExercises.map((exercise) => (
            <PracticeExerciseCard
              key={exercise.id}
              exercise={exercise}
              onAnswered={(correct, userAnswer) => handleAnswered(exercise, correct, userAnswer)}
            />
          ))}
        </section>
      ) : null}
    </div>
  );
}
