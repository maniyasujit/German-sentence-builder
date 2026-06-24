import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LanguageDirectionToggle from '../components/LanguageDirectionToggle';
import LevelSelector from '../components/LevelSelector';
import SentenceCard from '../components/SentenceCard';
import type { LanguageDirection, Level, SentencePracticeSentence } from '../types';
import {
  getStoredLanguageDirection,
  getStoredSentenceLevel,
  loadSentenceData,
  pickNextSentence,
  saveLanguageDirection,
  saveSentenceLevel,
} from '../utils/sentenceDataLoader';

export default function SentencePracticePage() {
  const [selectedLevel, setSelectedLevel] = useState<Level>(() => getStoredSentenceLevel());
  const [direction, setDirection] = useState<LanguageDirection>(() => getStoredLanguageDirection());
  const [sentences, setSentences] = useState<SentencePracticeSentence[]>([]);
  const [currentSentence, setCurrentSentence] = useState<SentencePracticeSentence | null>(null);
  const [showTranslation, setShowTranslation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLevel() {
      setLoading(true);
      setError(null);
      setShowTranslation(false);

      try {
        const dataset = await loadSentenceData(selectedLevel);
        if (cancelled) return;

        setSentences(dataset.sentences);
        setCurrentSentence(pickNextSentence(dataset.sentences));
        if (dataset.sentences.length === 0) {
          setError(`No ${selectedLevel} sentences are available yet.`);
        }
      } catch (loadError) {
        if (cancelled) return;
        setSentences([]);
        setCurrentSentence(null);
        setError(loadError instanceof Error ? loadError.message : `Could not load ${selectedLevel} sentences.`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    saveSentenceLevel(selectedLevel);
    loadLevel();

    return () => {
      cancelled = true;
    };
  }, [selectedLevel]);

  function changeDirection(nextDirection: LanguageDirection) {
    setDirection(nextDirection);
    saveLanguageDirection(nextDirection);
  }

  function nextSentence() {
    setCurrentSentence((current) => pickNextSentence(sentences, current?.id));
    setShowTranslation(false);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link
              to="/"
              className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 text-sm font-semibold text-stone-700 hover:bg-slatewash"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              Back to main page
            </Link>
            <p className="mt-5 text-sm font-semibold uppercase tracking-normal text-coral">Sentence practice</p>
            <h1 className="mt-2 text-3xl font-semibold text-ink">Practice Sentences</h1>
            <p className="mt-2 max-w-3xl text-stone-600">
              Practise one sentence at a time by level. Reveal the translation when you are ready and switch direction any time.
            </p>
          </div>

          <div className="grid w-full grid-cols-[7rem_minmax(0,1fr)] gap-2 lg:w-[24rem]">
            <LevelSelector compact value={selectedLevel} onChange={setSelectedLevel} />
            <LanguageDirectionToggle compact value={direction} onChange={changeDirection} />
          </div>
        </div>
      </section>

      {loading ? (
        <section className="mx-auto max-w-4xl rounded-lg border border-stone-200 bg-white p-8 text-center shadow-soft">
          <p className="text-lg font-semibold text-ink">Loading {selectedLevel} sentences...</p>
        </section>
      ) : error || !currentSentence ? (
        <EmptyState
          title="No sentences available"
          description={error ?? 'This level does not have sentence data yet. Try another level.'}
          action={
            <button
              type="button"
              onClick={() => setSelectedLevel('A1')}
              className="min-h-10 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern"
            >
              Load A1 sentences
            </button>
          }
        />
      ) : (
        <SentenceCard
          sentence={currentSentence}
          direction={direction}
          showTranslation={showTranslation}
          onToggleTranslation={() => setShowTranslation((visible) => !visible)}
          onNext={nextSentence}
          sentenceCount={sentences.length}
        />
      )}
    </div>
  );
}
