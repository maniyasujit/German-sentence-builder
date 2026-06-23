import { FormEvent, useEffect, useState } from 'react';
import FeedbackBox from '../components/FeedbackBox';
import { vocabularyContext } from '../data/vocabularyContext';
import { isAnswerCorrect } from '../utils/answerCheck';
import { recordExerciseResult } from '../utils/localStorage';

export default function VocabularyContext() {
  const [selectedWord, setSelectedWord] = useState(vocabularyContext[0].word);
  const [practiceAnswer, setPracticeAnswer] = useState('');
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);
  const entry = vocabularyContext.find((item) => item.word === selectedWord) ?? vocabularyContext[0];

  useEffect(() => {
    setPracticeAnswer('');
    setResult(null);
  }, [selectedWord]);

  function submitPractice(event: FormEvent) {
    event.preventDefault();
    const correct = isAnswerCorrect(practiceAnswer, entry.practice.correctAnswer);
    setResult(correct ? 'correct' : 'incorrect');
    recordExerciseResult(`Vocabulary: ${entry.word}`, correct);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <aside className="rounded-lg border border-stone-200 bg-white p-3 shadow-soft lg:sticky lg:top-32 lg:self-start">
        <h1 className="px-2 py-2 text-xl font-semibold text-ink">Vocabulary in Context</h1>
        <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-1">
          {vocabularyContext.map((item) => (
            <button
              key={item.word}
              type="button"
              onClick={() => setSelectedWord(item.word)}
              className={[
                'min-h-11 rounded-lg px-3 text-left text-sm font-semibold transition',
                item.word === entry.word ? 'bg-ink text-white' : 'hover:bg-slatewash',
              ].join(' ')}
            >
              {item.word}
            </button>
          ))}
        </div>
      </aside>

      <div className="space-y-6">
        <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
          <p className="text-sm font-semibold uppercase tracking-normal text-coral">Use this word in 5 situations</p>
          <h2 className="mt-2 text-4xl font-semibold text-ink">{entry.word}</h2>
          <p className="mt-2 text-lg text-stone-700">{entry.meaning}</p>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-xl font-semibold text-ink">Common sentence patterns</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.patterns.map((pattern) => (
              <span key={pattern} className="rounded-lg bg-slatewash px-3 py-2 text-sm font-semibold text-ink">
                {pattern}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-xl font-semibold text-ink">Real-life examples</h3>
          <div className="mt-4 grid gap-3">
            {entry.examples.map((example, index) => (
              <article key={example.sentence} className="rounded-lg bg-stone-50 p-4">
                <p className="text-sm font-semibold text-coral">Situation {index + 1}</p>
                <p className="mt-1 text-lg font-semibold text-ink">{example.sentence}</p>
                <p className="mt-1 text-stone-600">{example.meaning}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-5">
          <h3 className="text-xl font-semibold text-ink">Mini practice</h3>
          <form onSubmit={submitPractice} className="mt-4 space-y-3">
            <label className="block">
              <span className="text-sm font-semibold text-stone-700">{entry.practice.prompt}</span>
              <input
                value={practiceAnswer}
                onChange={(event) => setPracticeAnswer(event.target.value)}
                className="mt-2 w-full rounded-lg border border-stone-300 p-3"
                placeholder="Type the German sentence..."
              />
            </label>
            <button
              type="submit"
              disabled={!practiceAnswer.trim()}
              className="min-h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
            >
              Check sentence
            </button>
          </form>
          <div className="mt-4">
            <FeedbackBox
              result={result}
              correctAnswer={entry.practice.correctAnswer}
              explanation={`This example uses '${entry.word}' in a practical sentence pattern: ${entry.patterns[0]}.`}
              onTryAgain={() => setResult(null)}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
