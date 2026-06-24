import { ChangeEvent, useRef, useState } from 'react';
import { Download, Trash2, Upload } from 'lucide-react';
import { clearAllLocalData, exportLocalData, importLocalData } from '../utils/storage';

interface ProgressSummaryProps {
  completed: number;
  accuracy: number;
  mistakes: number;
  vocabulary: number;
  dueReviews: number;
  weakTopic: string;
  onDataChanged: () => void;
}

export default function ProgressSummary({
  completed,
  accuracy,
  mistakes,
  vocabulary,
  dueReviews,
  weakTopic,
  onDataChanged,
}: ProgressSummaryProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [exportText, setExportText] = useState('');
  const [message, setMessage] = useState('');

  function exportData() {
    setExportText(exportLocalData());
    setMessage('Your JSON export is ready below.');
  }

  function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importLocalData(String(reader.result ?? ''));
        setMessage('Data imported. Refreshing the dashboard view.');
        onDataChanged();
      } catch {
        setMessage('That file was not valid German Sentence Builder JSON.');
      }
    };
    reader.readAsText(file);
  }

  function clearData() {
    clearAllLocalData();
    setExportText('');
    setMessage('Local data cleared from this browser.');
    onDataChanged();
  }

  return (
    <section className="space-y-5 rounded-lg border border-stone-200 bg-white p-5 shadow-soft">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <Metric label="Completed" value={completed.toString()} />
        <Metric label="Accuracy" value={`${accuracy}%`} />
        <Metric label="Mistakes" value={mistakes.toString()} />
        <Metric label="Saved words" value={vocabulary.toString()} />
        <Metric label="Due reviews" value={dueReviews.toString()} />
        <Metric label="Weak topic" value={weakTopic} />
      </div>

      <div className="rounded-lg bg-slatewash p-4">
        <p className="text-sm font-semibold text-ink">Privacy controls</p>
        <p className="mt-1 text-sm text-stone-600">
          Your data stays in this browser. Export it as JSON, import it later, or clear it completely.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportData}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-ink px-4 text-sm font-semibold text-white hover:bg-fern"
          >
            <Download aria-hidden="true" size={16} />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 hover:bg-stone-50"
          >
            <Upload aria-hidden="true" size={16} />
            Import JSON
          </button>
          <button
            type="button"
            onClick={clearData}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 text-sm font-semibold text-rose-700 hover:bg-rose-50"
          >
            <Trash2 aria-hidden="true" size={16} />
            Clear all local data
          </button>
          <input ref={inputRef} type="file" accept="application/json,.json" onChange={importData} className="hidden" />
        </div>
        {message ? <p className="mt-3 text-sm font-semibold text-stone-700">{message}</p> : null}
        {exportText ? (
          <textarea
            readOnly
            value={exportText}
            rows={8}
            className="mt-3 w-full rounded-lg border border-stone-300 bg-white p-3 text-xs"
            aria-label="Exported local data JSON"
          />
        ) : null}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slatewash p-3">
      <p className="text-sm text-stone-600">{label}</p>
      <p className="mt-1 break-words text-2xl font-semibold text-ink">{value}</p>
    </div>
  );
}
