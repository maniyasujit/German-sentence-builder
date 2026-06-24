import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import CaseHelper from './pages/CaseHelper';
import Home from './pages/Home';
import MistakeNotebook from './pages/MistakeNotebook';
import Missions from './pages/Missions';
import MyVocabulary from './pages/MyVocabulary';
import PracticeFromText from './pages/PracticeFromText';
import Progress from './pages/Progress';
import SentencePracticePage from './pages/SentencePracticePage';
import SentenceBuilder from './pages/SentenceBuilder';
import TodaysPractice from './pages/TodaysPractice';
import VocabularyContext from './pages/VocabularyContext';
import WordOrderTrainer from './pages/WordOrderTrainer';
import WritingPractice from './pages/WritingPractice';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/sentence-builder" element={<SentenceBuilder />} />
        <Route path="/today" element={<TodaysPractice />} />
        <Route path="/my-vocabulary" element={<MyVocabulary />} />
        <Route path="/practice-from-text" element={<PracticeFromText />} />
        <Route path="/sentence-practice" element={<SentencePracticePage />} />
        <Route path="/case-helper" element={<CaseHelper />} />
        <Route path="/word-order" element={<WordOrderTrainer />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/mistakes" element={<MistakeNotebook />} />
        <Route path="/vocabulary" element={<VocabularyContext />} />
        <Route path="/writing" element={<WritingPractice />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
