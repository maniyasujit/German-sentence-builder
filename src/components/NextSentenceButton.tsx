import { Shuffle } from 'lucide-react';

interface NextSentenceButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function NextSentenceButton({ onClick, disabled }: NextSentenceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern disabled:cursor-not-allowed disabled:bg-stone-300"
    >
      <Shuffle aria-hidden="true" size={16} />
      Next Sentence
    </button>
  );
}
