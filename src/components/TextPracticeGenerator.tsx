import { useState } from 'react';
import { Eraser, Save, Wand2 } from 'lucide-react';
import type { TextPracticeSession } from '../types';
import { addTextPracticeSession } from '../utils/storage';
import { generateTextPractice } from '../utils/textExerciseGenerator';

interface TextPracticeGeneratorProps {
  onSessionCreated: (session: TextPracticeSession) => void;
}

export default function TextPracticeGenerator({ onSessionCreated }: TextPracticeGeneratorProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  function generate(save: boolean) {
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Paste a short German text first.');
      return;
    }

    const generated = generateTextPractice(trimmed);
    if (generated.sentences.length === 0) {
      setError('Try a slightly longer text with at least one sentence of four words.');
      return;
    }

    const session = addTextPracticeSession({
      originalText: trimmed,
      generatedExercises: generated.exercises,
      vocabularyCandidates: generated.vocabularyCandidates,
    });

    if (!save) {
      setText('');
    }

    setError('');
    onSessionCreated(session);
  }

  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
      <p className="text-sm font-semibold uppercase tracking-normal text-coral">Practice From Text</p>
      <h1 className="mt-2 text-3xl font-semibold text-ink">Paste German text</h1>
      <p className="mt-2 max-w-3xl text-stone-600">
        Create exercises from a message, email, letter, short article, or paragraph.
      </p>

      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        rows={8}
        className="mt-5 w-full rounded-lg border border-stone-300 p-3"
        placeholder="Paste a German email, message, letter, short article, or paragraph here..."
      />

      {error ? <p className="mt-3 rounded-lg bg-rose-50 p-3 text-sm font-semibold text-rose-700">{error}</p> : null}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => generate(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern"
        >
          <Wand2 aria-hidden="true" size={16} />
          Generate Exercises
        </button>
        <button
          type="button"
          onClick={() => setText('')}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 hover:bg-slatewash"
        >
          <Eraser aria-hidden="true" size={16} />
          Clear Text
        </button>
        <button
          type="button"
          onClick={() => generate(true)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 hover:bg-slatewash"
        >
          <Save aria-hidden="true" size={16} />
          Save Text
        </button>
      </div>
    </section>
  );
}
