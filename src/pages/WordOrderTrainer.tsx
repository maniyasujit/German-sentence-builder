import { FormEvent, useEffect, useMemo, useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import FeedbackBox from '../components/FeedbackBox';
import WordBank from '../components/WordBank';
import { wordOrderExercises } from '../data/wordOrderExercises';
import { isAnswerCorrect, joinTokens } from '../utils/answerCheck';
import { recordExerciseResult, saveMistake } from '../utils/localStorage';

export default function WordOrderTrainer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const exercise = wordOrderExercises[currentIndex];
  const selectedSentence = useMemo(
    () => joinTokens(selectedIndexes.map((index) => exercise.wordBank[index])),
    [exercise.wordBank, selectedIndexes],
  );

  useEffect(() => {
    setSelectedIndexes([]);
    setAnswer('');
    setResult(null);
  }, [currentIndex]);

  function addWord(index: number) {
    const next = [...selectedIndexes, index];
    setSelectedIndexes(next);
    setAnswer(joinTokens(next.map((wordIndex) => exercise.wordBank[wordIndex])));
  }

  function removeLast() {
    const next = selectedIndexes.slice(0, -1);
    setSelectedIndexes(next);
    setAnswer(joinTokens(next.map((wordIndex) => exercise.wordBank[wordIndex])));
  }

  function clearAnswer() {
    setSelectedIndexes([]);
    setAnswer('');
    setResult(null);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const finalAnswer = answer.trim() || selectedSentence;
    const correct = isAnswerCorrect(finalAnswer, exercise.correctAnswer);
    setResult(correct ? 'correct' : 'incorrect');
    recordExerciseResult(exercise.topic, correct);

    if (!correct) {
      saveMistake({
        exerciseType: 'Word Order Trainer',
        userAnswer: finalAnswer || '(blank)',
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        topic: exercise.topic,
        sourceId: exercise.id,
      });
    }
  }

  function nextExercise() {
    setCurrentIndex((index) => (index + 1) % wordOrderExercises.length);
  }

  return (
    <div className="space-y-6">
      <ExerciseCard
        eyebrow={`${exercise.level} · ${exercise.topic}`}
        title="Word Order Trainer"
        description="Arrange the tiles to practise verb-second order, questions, modal verbs, Perfekt, and subordinate clauses."
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-lg bg-slatewash p-4">
            <p className="text-sm font-semibold text-stone-600">
              Exercise {currentIndex + 1} of {wordOrderExercises.length}
            </p>
            <p className="mt-2 text-xl font-semibold text-ink">{exercise.instruction}</p>
          </div>

          <WordBank
            words={exercise.wordBank}
            selectedIndexes={selectedIndexes}
            onAdd={addWord}
            onRemoveLast={removeLast}
            onClear={clearAnswer}
          />

          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Your sentence order</span>
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              rows={3}
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 text-base text-ink shadow-sm"
              placeholder="Click the tiles or type the sentence..."
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!answer.trim()}
              className="min-h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Check order
            </button>
            <button
              type="button"
              onClick={nextExercise}
              className="min-h-11 rounded-lg border border-stone-300 bg-white px-5 text-sm font-semibold text-stone-700 hover:bg-slatewash"
            >
              Skip
            </button>
          </div>
        </form>
      </ExerciseCard>

      <FeedbackBox
        result={result}
        correctAnswer={exercise.correctAnswer}
        explanation={exercise.explanation}
        onTryAgain={() => setResult(null)}
        onNext={nextExercise}
      />
    </div>
  );
}
