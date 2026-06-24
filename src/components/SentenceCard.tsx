import type { LanguageDirection, SentencePracticeSentence } from '../types';
import NextSentenceButton from './NextSentenceButton';
import TranslationButton from './TranslationButton';

interface SentenceCardProps {
  sentence: SentencePracticeSentence;
  direction: LanguageDirection;
  showTranslation: boolean;
  onToggleTranslation: () => void;
  onNext: () => void;
  sentenceCount: number;
}

export default function SentenceCard({
  sentence,
  direction,
  showTranslation,
  onToggleTranslation,
  onNext,
  sentenceCount,
}: SentenceCardProps) {
  const prompt = direction === 'de-en' ? sentence.german : sentence.english;
  const translation = direction === 'de-en' ? sentence.english : sentence.german;
  const promptLabel = direction === 'de-en' ? 'German' : 'English';
  const translationLabel = direction === 'de-en' ? 'English translation' : 'German translation';

  return (
    <section className="mx-auto w-full max-w-4xl rounded-lg border border-stone-200 bg-white p-5 shadow-soft sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-600">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg bg-slatewash px-3 py-1 font-semibold text-ink">{sentence.level}</span>
          <span className="rounded-lg bg-stone-100 px-3 py-1">{sentence.topic}</span>
          <span className="rounded-lg bg-stone-100 px-3 py-1">{sentence.template}</span>
        </div>
        <span>{sentenceCount} sentences available</span>
      </div>

      <div className="flex min-h-[14rem] flex-col items-center justify-center rounded-lg bg-slatewash p-5 text-center sm:min-h-[18rem] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-normal text-coral">{promptLabel}</p>
        <p className="mt-4 max-w-3xl text-2xl font-semibold leading-relaxed text-ink sm:text-4xl">{prompt}</p>

        {showTranslation ? (
          <div className="mt-6 w-full max-w-3xl rounded-lg border border-stone-200 bg-white p-4">
            <p className="text-sm font-semibold uppercase tracking-normal text-fern">{translationLabel}</p>
            <p className="mt-2 text-lg leading-8 text-stone-800 sm:text-2xl">{translation}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <TranslationButton visible={showTranslation} onClick={onToggleTranslation} />
        <NextSentenceButton onClick={onNext} />
      </div>
    </section>
  );
}
