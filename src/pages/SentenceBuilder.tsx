import { FormEvent, useEffect, useMemo, useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import FeedbackBox from '../components/FeedbackBox';
import WordBank from '../components/WordBank';
import { sentenceExercises } from '../data/sentenceExercises';
import { isAnswerCorrect, joinTokens } from '../utils/answerCheck';
import { recordExerciseResult, saveMistake } from '../utils/localStorage';
import { shuffleItems } from '../utils/shuffle';

export default function SentenceBuilder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const exercise = sentenceExercises[currentIndex];
  const shuffledWordBank = useMemo(() => shuffleItems(exercise.wordBank), [exercise.id, exercise.wordBank]);
  const selectedSentence = useMemo(
    () => joinTokens(selectedIndexes.map((index) => shuffledWordBank[index])),
    [selectedIndexes, shuffledWordBank],
  );

  useEffect(() => {
    setSelectedIndexes([]);
    setAnswer('');
    setResult(null);
  }, [currentIndex]);

  function addWord(index: number) {
    const next = [...selectedIndexes, index];
    setSelectedIndexes(next);
    setAnswer(joinTokens(next.map((wordIndex) => shuffledWordBank[wordIndex])));
  }

  function removeLast() {
    const next = selectedIndexes.slice(0, -1);
    setSelectedIndexes(next);
    setAnswer(joinTokens(next.map((wordIndex) => shuffledWordBank[wordIndex])));
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
        exerciseType: 'Sentence Builder',
        userAnswer: finalAnswer || '(blank)',
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        topic: exercise.topic,
        sourceId: exercise.id,
      });
    }
  }

  function nextExercise() {
    setCurrentIndex((index) => (index + 1) % sentenceExercises.length);
  }

  const progress = Math.round(((currentIndex + 1) / sentenceExercises.length) * 100);

  return (
    <div className="space-y-6">
      <ExerciseCard
        eyebrow={`${exercise.level} · ${exercise.topic}`}
        title="Sentence Builder"
        description="Build the German sentence, check it, then read the grammar explanation in context."
      >
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between gap-3 text-sm text-stone-600">
            <span>
              Exercise {currentIndex + 1} of {sentenceExercises.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-200">
            <div className="h-full rounded-full bg-fern transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="rounded-lg bg-slatewash p-4">
            <p className="text-sm font-semibold text-stone-600">English prompt</p>
            <p className="mt-2 text-xl font-semibold text-ink">{exercise.promptEnglish}</p>
          </div>

          <WordBank
            words={shuffledWordBank}
            selectedIndexes={selectedIndexes}
            onAdd={addWord}
            onRemoveLast={removeLast}
            onClear={clearAnswer}
          />

          <label className="block">
            <span className="text-sm font-semibold text-stone-700">Your German sentence</span>
            <textarea
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              rows={3}
              className="mt-2 w-full rounded-lg border border-stone-300 bg-white p-3 text-base text-ink shadow-sm"
              placeholder="Click the words or type your answer here..."
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={!answer.trim()}
              className="min-h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Check answer
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
        onTryAgain={clearAnswer}
        onNext={nextExercise}
      />
    </div>
  );
}
