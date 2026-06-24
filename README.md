# German Sentence Builder

German Sentence Builder is a free React/Vite MVP for learners who know German vocabulary but need help using it in correct sentences. It teaches grammar in context and now creates personal practice from the learner’s own words, pasted German text, and previous mistakes.

## Features

- Sentence Builder with 20 A1/A2 starter exercises
- My Vocabulary page for adding, editing, deleting, filtering, and practising user-saved words
- Practice From Text page that creates local exercises from pasted German text
- Today’s Practice page generated from due mistakes, saved vocabulary, pasted text sessions, weak topics, and a writing prompt
- Spaced review mistake model with next-review dates and weak-topic detection
- Case Helper for Nominativ, Akkusativ, and Dativ decisions
- Word Order Trainer with 20 exercises for main clauses, questions, modal verbs, Perfekt, and subordinate clauses
- Real-Life Missions for introductions, supermarket, doctor appointment, apartment issues, job interviews, and Ausländerbehörde appointment language
- Mistake Notebook saved in `localStorage`
- Vocabulary in Context for 12 common German words
- Writing Practice with self-check checklists and model answers
- Local progress dashboard
- Export, import, and clear local learner data
- No backend, no login, no paid APIs

## Setup

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
```

The production files are generated in `dist/`.

## Deployment

The app uses `HashRouter`, so it can deploy cleanly to Vercel, Netlify, or GitHub Pages without custom rewrite rules.

### Vercel

1. Import the repository.
2. Use `npm run build` as the build command.
3. Use `dist` as the output directory.

### Netlify

1. Connect the repository.
2. Use `npm run build` as the build command.
3. Use `dist` as the publish directory.

### GitHub Pages

1. Run `npm run build`.
2. Publish the `dist/` directory with your preferred GitHub Pages workflow.

## Folder Structure

```text
src/
  components/
    Layout.tsx
    Navbar.tsx
    ProgressCard.tsx
    ExerciseCard.tsx
    WordBank.tsx
    GrammarHighlighter.tsx
    FeedbackBox.tsx
    VocabularyForm.tsx
    VocabularyCard.tsx
    VocabularyFilters.tsx
    PracticeExerciseCard.tsx
    TextPracticeGenerator.tsx
    MistakeReviewCard.tsx
    DailyPracticeCard.tsx
    EmptyState.tsx
    ProgressSummary.tsx
  pages/
    Home.tsx
    MyVocabulary.tsx
    PracticeFromText.tsx
    TodaysPractice.tsx
    SentenceBuilder.tsx
    CaseHelper.tsx
    WordOrderTrainer.tsx
    Missions.tsx
    MistakeNotebook.tsx
    VocabularyContext.tsx
    WritingPractice.tsx
    Progress.tsx
  data/
    sentenceExercises.ts
    caseExercises.ts
    wordOrderExercises.ts
    missions.ts
    vocabularyContext.ts
    writingPrompts.ts
    grammarHighlights.ts
  utils/
    storage.ts
    vocabularyGenerator.ts
    textExerciseGenerator.ts
    mistakeReview.ts
    dailyPractice.ts
    localStorage.ts
    answerCheck.ts
    progress.ts
  types/
    index.ts
```

## Adding Content

### Add sentence-builder exercises

Edit `src/data/sentenceExercises.ts` and add an object with:

- `id`
- `level`
- `topic`
- `promptEnglish`
- `correctAnswer`
- `wordBank`
- `explanation`
- `grammarTags`

Keep explanations practical and contextual. Explain the case, article, preposition, or word-order reason behind the answer.

### Add case-helper exercises

Edit `src/data/caseExercises.ts`. Add a sentence, a question, answer options, the correct answer, and a short explanation.

### Add word-order exercises

Edit `src/data/wordOrderExercises.ts`. Add the target answer, tile bank, and a grammar explanation.

### Add missions

Edit `src/data/missions.ts`. Each mission includes:

- situation
- useful vocabulary
- sentence patterns
- grammar needed
- practice exercises
- final writing task

### Add static vocabulary examples

Edit `src/data/vocabularyContext.ts`. Each word should include a meaning, common patterns, five examples, and one mini-practice answer.

### Add user vocabulary fields

The personal vocabulary model lives in `src/types/index.ts` as `UserVocabularyItem`. User-saved words are stored in `localStorage` under `germanApp:vocabulary`.

Each item includes:

- German word and English meaning
- article, plural form, word type, level, and topic
- example sentence and notes
- review count, last reviewed date, and mistake count

### Add writing prompts

Edit `src/data/writingPrompts.ts`. Include the learner prompt, checklist items, and model answer lines.

### Add grammar highlighter examples

Edit `src/data/grammarHighlights.ts`. Each highlight uses sentence parts with labels and explanations. Use the `GrammarHighlighter` component wherever a lesson or mission needs clickable grammar.

## Dynamic Practice Notes

### My Vocabulary

`src/pages/MyVocabulary.tsx` uses `src/utils/vocabularyGenerator.ts` to create:

- meaning quizzes
- article quizzes
- fill-in-the-blank prompts
- reverse translation
- sentence-writing self-checks

Wrong answers are saved as scheduled mistakes.

### Practice From Text

`src/utils/textExerciseGenerator.ts` processes pasted German text locally. It can split text into sentences, tokenize sentences, detect likely capitalized nouns, create fill blanks, create word-order exercises, create capitalization exercises, extract vocabulary candidates, and create simple reading questions when time words are present.

### Today’s Practice

`src/utils/dailyPractice.ts` keeps one generated session per day in `localStorage`. Refreshing on the same day keeps the same session. A new day generates a new session.

## LocalStorage Notes

The app stores learner data in the browser:

- `germanApp:vocabulary`
- `germanApp:mistakes`
- `germanApp:textPracticeSessions`
- `germanApp:dailyPractice`
- `gsb-progress`

The Progress page includes controls to export data as JSON, import it later, or clear all local data.

## Known MVP Limitations

- No account system or cloud sync
- No backend
- No AI writing correction
- No pronunciation scoring
- No textbook or copyrighted content
