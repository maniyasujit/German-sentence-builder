import { useState } from 'react';
import EmptyState from '../components/EmptyState';
import PracticeExerciseCard from '../components/PracticeExerciseCard';
import TextPracticeGenerator from '../components/TextPracticeGenerator';
import VocabularyForm from '../components/VocabularyForm';
import type { PracticeExercise, TextPracticeSession } from '../types';
import { recordExerciseResult } from '../utils/localStorage';
import {
  addMistake,
  addVocabularyItem,
  getTextPracticeSessions,
  getVocabulary,
} from '../utils/storage';

export default function PracticeFromText() {
  const [sessions, setSessions] = useState<TextPracticeSession[]>(getTextPracticeSessions());
  const [activeSession, setActiveSession] = useState<TextPracticeSession | null>(sessions[0] ?? null);
  const [candidateWord, setCandidateWord] = useState<string | null>(null);
  const [savedCandidateMessage, setSavedCandidateMessage] = useState('');

  function refreshSessions(session?: TextPracticeSession) {
    const next = getTextPracticeSessions();
    setSessions(next);
    setActiveSession(session ?? next[0] ?? null);
  }

  function saveCandidate(value: Parameters<typeof addVocabularyItem>[0]) {
    addVocabularyItem(value);
    setSavedCandidateMessage(`${value.germanWord} was added to My Vocabulary.`);
    setCandidateWord(null);
  }

  function handleAnswered(exercise: PracticeExercise, correct: boolean, userAnswer: string) {
    recordExerciseResult(`Text: ${exercise.topic}`, correct);
    if (!correct) {
      addMistake({
        source: 'text-practice',
        topic: exercise.topic,
        question: exercise.question,
        userAnswer,
        correctAnswer: exercise.correctAnswer,
        explanation: exercise.explanation,
        originalSentence: exercise.originalSentence,
        germanWord: exercise.germanWord,
      });
    }
  }

  return (
    <div className="space-y-6">
      <TextPracticeGenerator
        onSessionCreated={(session) => {
          refreshSessions(session);
          setSavedCandidateMessage('');
        }}
      />

      {sessions.length ? (
        <section className="rounded-lg border border-stone-200 bg-white p-4">
          <h2 className="text-xl font-semibold text-ink">Previous text sessions</h2>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {sessions.map((session) => (
              <button
                key={session.id}
                type="button"
                onClick={() => setActiveSession(session)}
                className={[
                  'min-h-10 shrink-0 rounded-lg px-3 text-sm font-semibold',
                  activeSession?.id === session.id ? 'bg-ink text-white' : 'bg-slatewash text-ink hover:bg-stone-100',
                ].join(' ')}
              >
                {new Date(session.createdAt).toLocaleString()}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {!activeSession ? (
        <EmptyState
          title="Paste a German message or paragraph to create real practice from your own content."
          description="The generator works locally. It creates fill blanks, word order, capitalization, vocabulary noticing, and simple reading questions."
        />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <section className="space-y-4">
            <div className="rounded-lg border border-stone-200 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-normal text-coral">Generated exercises</p>
              <h2 className="mt-1 text-2xl font-semibold text-ink">{activeSession.generatedExercises.length} exercises</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{activeSession.originalText}</p>
            </div>
            {activeSession.generatedExercises.map((exercise) => (
              <PracticeExerciseCard
                key={exercise.id}
                exercise={exercise}
                onAnswered={(correct, userAnswer) => handleAnswered(exercise, correct, userAnswer)}
              />
            ))}
          </section>

          <aside className="space-y-4">
            <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
              <h2 className="text-xl font-semibold text-ink">Vocabulary candidates</h2>
              <p className="mt-1 text-sm text-stone-600">Add useful extracted words to your personal vocabulary bank.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {activeSession.vocabularyCandidates.map((word) => {
                  const alreadySaved = getVocabulary().some(
                    (item) => item.germanWord.toLocaleLowerCase('de-DE') === word.toLocaleLowerCase('de-DE'),
                  );
                  return (
                    <button
                      key={word}
                      type="button"
                      disabled={alreadySaved}
                      onClick={() => setCandidateWord(word)}
                      className="rounded-lg bg-slatewash px-3 py-2 text-sm font-semibold text-ink hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-400"
                    >
                      {alreadySaved ? `${word} saved` : `Add ${word}`}
                    </button>
                  );
                })}
              </div>
              {savedCandidateMessage ? <p className="mt-3 text-sm font-semibold text-fern">{savedCandidateMessage}</p> : null}
            </section>
          </aside>
        </div>
      )}

      {candidateWord ? (
        <div className="fixed inset-0 z-30 flex items-start justify-center overflow-y-auto bg-ink/40 p-4">
          <div className="w-full max-w-3xl">
            <VocabularyForm
              initialItem={null}
              defaultGermanWord={candidateWord}
              onSave={(value) =>
                saveCandidate({
                  ...value,
                  germanWord: candidateWord,
                  englishMeaning: value.englishMeaning,
                })
              }
              onCancel={() => setCandidateWord(null)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
