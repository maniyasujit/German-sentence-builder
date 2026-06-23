# German Sentence Builder

German Sentence Builder is a free React/Vite MVP for learners who know German vocabulary but need help using it in correct sentences. It teaches grammar in context through sentence building, case decisions, word order practice, real-life missions, vocabulary examples, writing self-checks, and a local mistake notebook.

## Features

- Sentence Builder with 20 A1/A2 starter exercises
- Case Helper for Nominativ, Akkusativ, and Dativ decisions
- Word Order Trainer with 20 exercises for main clauses, questions, modal verbs, Perfekt, and subordinate clauses
- Real-Life Missions for introductions, supermarket, doctor appointment, apartment issues, job interviews, and Ausländerbehörde appointment language
- Mistake Notebook saved in `localStorage`
- Vocabulary in Context for 12 common German words
- Writing Practice with self-check checklists and model answers
- Local progress dashboard
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
  pages/
    Home.tsx
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

### Add vocabulary words

Edit `src/data/vocabularyContext.ts`. Each word should include a meaning, common patterns, five examples, and one mini-practice answer.

### Add writing prompts

Edit `src/data/writingPrompts.ts`. Include the learner prompt, checklist items, and model answer lines.

### Add grammar highlighter examples

Edit `src/data/grammarHighlights.ts`. Each highlight uses sentence parts with labels and explanations. Use the `GrammarHighlighter` component wherever a lesson or mission needs clickable grammar.

## LocalStorage Notes

The app stores mistakes and progress in the browser:

- `gsb-mistakes`
- `gsb-progress`

Clearing browser storage will reset the learner’s saved data.

## Known MVP Limitations

- No account system or cloud sync
- No backend
- No AI writing correction
- No pronunciation scoring
- No textbook or copyrighted content
