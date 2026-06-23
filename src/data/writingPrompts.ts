import type { WritingPrompt } from '../types';

export const writingPrompts: WritingPrompt[] = [
  {
    id: 'writing-day',
    level: 'A1',
    title: 'My Day',
    prompt: 'Write 3 sentences about your day.',
    checklist: [
      'Is the conjugated verb in position 2?',
      'Did you capitalize German nouns?',
      'Did you check the article gender?',
      'If using Perfekt, is the past participle at the end?',
    ],
    modelAnswer: [
      'Heute bin ich früh aufgestanden.',
      'Danach habe ich Kaffee getrunken.',
      'Am Abend lerne ich Deutsch.',
    ],
  },
  {
    id: 'writing-supermarket',
    level: 'A1',
    title: 'Shopping List',
    prompt: 'Write 4 sentences about what you need from the supermarket.',
    checklist: [
      'Did you use Akkusativ after brauchen or kaufen?',
      'Did masculine articles change to einen?',
      'Did you capitalize food nouns?',
      'Are your verbs in position 2?',
    ],
    modelAnswer: [
      'Ich brauche einen Apfel.',
      'Ich kaufe eine Flasche Wasser.',
      'Wir brauchen Brot und Milch.',
      'Danach gehe ich nach Hause.',
    ],
  },
  {
    id: 'writing-appointment',
    level: 'A2',
    title: 'Appointment Message',
    prompt: 'Write a short message asking for an appointment.',
    checklist: [
      'Did you use einen Termin for Akkusativ?',
      'Did you choose a polite question form?',
      'Did you put the verb in position 2?',
      'Did you capitalize Termin, Montag, and Arzt?',
    ],
    modelAnswer: [
      'Guten Tag, ich brauche einen Termin beim Arzt.',
      'Haben Sie am Montag einen Termin frei?',
      'Vielen Dank und freundliche Grüße.',
    ],
  },
  {
    id: 'writing-because',
    level: 'A2',
    title: 'Reasons With Weil',
    prompt: 'Write 3 sentences using weil.',
    checklist: [
      'Does the main clause have verb-second order?',
      'Did you put a comma before weil?',
      'Is the conjugated verb at the end of the weil clause?',
      'Did you check articles and cases?',
    ],
    modelAnswer: [
      'Ich lerne Deutsch, weil ich in Berlin wohne.',
      'Ich nehme den Bus, weil es regnet.',
      'Ich koche heute, weil ich Hunger habe.',
    ],
  },
  {
    id: 'writing-work',
    level: 'B1',
    title: 'Simple Job Interview',
    prompt: 'Write 4 sentences about your experience and motivation.',
    checklist: [
      'Did you use mit + Dativ after Erfahrung mit?',
      'If you used können or möchten, is the infinitive at the end?',
      'Did you use clear short sentences?',
      'Did you capitalize nouns like Erfahrung, Team, Stelle?',
    ],
    modelAnswer: [
      'Ich habe Erfahrung mit Kunden.',
      'Ich kann gut organisieren.',
      'Ich möchte in Ihrem Team arbeiten.',
      'Ich bin zuverlässig und motiviert.',
    ],
  },
];
