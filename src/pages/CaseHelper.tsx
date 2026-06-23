import { useState } from 'react';
import ExerciseCard from '../components/ExerciseCard';
import FeedbackBox from '../components/FeedbackBox';
import GrammarHighlighter from '../components/GrammarHighlighter';
import { caseExercises } from '../data/caseExercises';
import { findGrammarHighlight } from '../data/grammarHighlights';
import { recordExerciseResult, saveMistake } from '../utils/localStorage';

const dativePrepositions = ['mit', 'nach', 'bei', 'seit', 'von', 'zu', 'aus'];
const accusativePrepositions = ['durch', 'für', 'gegen', 'ohne', 'um'];
const twoWayPrepositions = ['in', 'an', 'auf', 'über', 'unter', 'vor', 'hinter', 'neben', 'zwischen'];

export default function CaseHelper() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const exercise = caseExercises[currentIndex];
  const highlight = findGrammarHighlight('perfekt-letter');

  function answer(option: string) {
    if (result) return;

    const correct = option === exercise.correctAnswer;
    setSelectedAnswer(option);
    setResult(correct ? 'correct' : 'incorrect');
    recordExerciseResult(exercise.topic, correct);

    if (!correct) {
      saveMistake({
        exerciseType: 'Case Helper',
        userAnswer: option,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        topic: exercise.topic,
        sourceId: exercise.id,
      });
    }
  }

  function nextExercise() {
    setCurrentIndex((index) => (index + 1) % caseExercises.length);
    setSelectedAnswer('');
    setResult(null);
  }

  function tryAgain() {
    setSelectedAnswer('');
    setResult(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-6">
        <ExerciseCard
          eyebrow={`${exercise.level} · ${exercise.topic}`}
          title="Case Helper"
          description="Use quick decision questions to choose Nominativ, Akkusativ, or Dativ."
        >
          <div className="space-y-5">
            <div className="rounded-lg bg-slatewash p-4">
              <p className="text-sm font-semibold text-stone-600">
                Question {currentIndex + 1} of {caseExercises.length}
              </p>
              <p className="mt-2 text-xl font-semibold text-ink">{exercise.sentence}</p>
              <p className="mt-3 text-base text-stone-700">{exercise.question}</p>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              {exercise.options.map((option) => {
                const isSelected = selectedAnswer === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => answer(option)}
                    className={[
                      'min-h-12 rounded-lg border px-4 text-left text-sm font-semibold transition',
                      isSelected
                        ? 'border-fern bg-fern text-white'
                        : 'border-stone-300 bg-white text-ink hover:bg-slatewash',
                    ].join(' ')}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </ExerciseCard>

        <FeedbackBox
          result={result}
          correctAnswer={exercise.correctAnswer}
          explanation={exercise.explanation}
          onTryAgain={tryAgain}
          onNext={nextExercise}
        />

        {highlight ? <GrammarHighlighter highlight={highlight} /> : null}
      </div>

      <aside className="space-y-5">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
          <h2 className="text-xl font-semibold text-ink">Case decision guide</h2>
          <div className="mt-4 space-y-4 text-sm leading-6 text-stone-700">
            <div>
              <h3 className="font-semibold text-ink">1. What role does the noun have?</h3>
              <p>Subject uses Nominativ. Direct object uses Akkusativ. Receiver or indirect object usually uses Dativ.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink">2. Is there a fixed preposition?</h3>
              <p>Some prepositions always force a case, even when the sentence role feels different.</p>
            </div>
            <div>
              <h3 className="font-semibold text-ink">3. Is it a two-way preposition?</h3>
              <p>Location answers “where?” and uses Dativ. Movement answers “where to?” and uses Akkusativ.</p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-ink">Mini summary table</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 text-stone-600">
                  <th className="py-2 pr-3 font-semibold">Case</th>
                  <th className="py-2 pr-3 font-semibold">Main use</th>
                  <th className="py-2 pr-3 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-3 pr-3 font-semibold">Nominativ</td>
                  <td className="py-3 pr-3">Subject</td>
                  <td className="py-3 pr-3">Der Hund schläft.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 font-semibold">Akkusativ</td>
                  <td className="py-3 pr-3">Direct object or movement</td>
                  <td className="py-3 pr-3">Ich sehe den Hund.</td>
                </tr>
                <tr>
                  <td className="py-3 pr-3 font-semibold">Dativ</td>
                  <td className="py-3 pr-3">Receiver, location, Dativ prepositions</td>
                  <td className="py-3 pr-3">Ich helfe dem Mann.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-ink">Preposition rules</h2>
          <div className="mt-4 space-y-4">
            <RuleGroup title="Dativ" words={dativePrepositions} />
            <RuleGroup title="Akkusativ" words={accusativePrepositions} />
            <RuleGroup title="Two-way" words={twoWayPrepositions} />
          </div>
          <div className="mt-4 rounded-lg bg-slatewash p-4 text-sm leading-6 text-stone-700">
            <p>
              Location: <span className="font-semibold">Ich bin im Supermarkt.</span> Dativ because it answers “where?”
            </p>
            <p className="mt-2">
              Movement: <span className="font-semibold">Ich gehe in den Supermarkt.</span> Akkusativ because it answers
              “where to?”
            </p>
          </div>
        </section>
      </aside>
    </div>
  );
}

function RuleGroup({ title, words }: { title: string; words: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-stone-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {words.map((word) => (
          <span key={word} className="rounded-lg bg-slatewash px-3 py-1 text-sm font-semibold text-ink">
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
