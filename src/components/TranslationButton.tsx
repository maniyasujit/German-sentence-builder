import { Eye, EyeOff } from 'lucide-react';

interface TranslationButtonProps {
  visible: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function TranslationButton({ visible, onClick, disabled }: TranslationButtonProps) {
  const Icon = visible ? EyeOff : Eye;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 hover:bg-slatewash disabled:cursor-not-allowed disabled:text-stone-400"
    >
      <Icon aria-hidden="true" size={16} />
      {visible ? 'Hide Translation' : 'Show Translation'}
    </button>
  );
}
