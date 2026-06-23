import type { GrammarHighlight } from '../types';

export const grammarHighlights: GrammarHighlight[] = [
  {
    id: 'perfekt-letter',
    sentence: 'Ich habe gestern meiner Mutter einen Brief geschrieben.',
    parts: [
      {
        id: 'ich',
        text: 'Ich',
        label: 'Nominativ subject',
        explanation: "'Ich' is the subject, the person doing the writing.",
      },
      {
        id: 'habe',
        text: 'habe',
        label: 'Helping verb in position 2',
        explanation: "In Perfekt, the helping verb is conjugated and stays in position 2.",
      },
      {
        id: 'gestern',
        text: 'gestern',
        label: 'Time expression',
        explanation: "Time words often come near the beginning, but they do not change the case.",
      },
      {
        id: 'mutter',
        text: 'meiner Mutter',
        label: 'Dativ receiver',
        explanation: "The mother receives the letter, so this phrase is Dativ.",
      },
      {
        id: 'brief',
        text: 'einen Brief',
        label: 'Akkusativ direct object',
        explanation: "The letter is the thing being written, so it uses Akkusativ.",
      },
      {
        id: 'geschrieben',
        text: 'geschrieben',
        label: 'Past participle at the end',
        explanation: "In Perfekt, the past participle usually closes the sentence.",
      },
    ],
  },
  {
    id: 'supermarket',
    sentence: 'Ich gehe mit meinem Freund in den Supermarkt.',
    parts: [
      {
        id: 'subject',
        text: 'Ich',
        label: 'Nominativ subject',
        explanation: 'The subject is the person doing the action.',
      },
      {
        id: 'verb',
        text: 'gehe',
        label: 'Verb-second',
        explanation: "In a normal main clause, the conjugated verb 'gehe' is in position 2.",
      },
      {
        id: 'friend',
        text: 'mit meinem Freund',
        label: 'Dativ after mit',
        explanation: "'mit' always takes Dativ, so masculine 'mein Freund' becomes 'meinem Freund'.",
      },
      {
        id: 'place',
        text: 'in den Supermarkt',
        label: 'Akkusativ movement',
        explanation: "'in den Supermarkt' answers 'where to?', so the two-way preposition uses Akkusativ.",
      },
    ],
  },
  {
    id: 'weil-work',
    sentence: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte.',
    parts: [
      {
        id: 'main',
        text: 'Ich lerne Deutsch',
        label: 'Main clause',
        explanation: "The main clause has normal verb-second order: 'lerne' is in position 2.",
      },
      {
        id: 'weil',
        text: 'weil',
        label: 'Subordinating conjunction',
        explanation: "'weil' introduces a reason and changes the word order in the clause after it.",
      },
      {
        id: 'sub',
        text: 'ich in Deutschland arbeiten möchte',
        label: 'Verb at the end',
        explanation: "In the 'weil' clause, the conjugated verb 'möchte' goes to the end.",
      },
    ],
  },
];

export function findGrammarHighlight(id: string) {
  return grammarHighlights.find((highlight) => highlight.id === id);
}
