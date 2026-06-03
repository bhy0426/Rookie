import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Sitemap from './components/Sitemap';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Usage from './pages/Usage';
import Connect from './pages/Connect';

import ProgramStructure1 from './subpages/usage/ProgramStructure1';
import ProgramStructure2 from './subpages/usage/ProgramStructure2';
import ProgramStructure3 from './subpages/usage/ProgramStructure3';
import GrammarDetail from './subpages/grammar/GrammarDetail';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/usage/1" element={<ProgramStructure1 />} />
        <Route path="/usage/2" element={<ProgramStructure2 />} />
        <Route path="/usage/3" element={<ProgramStructure3 />} />
        <Route path="/grammar/:id" element={<GrammarDetail />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
      <Sitemap />
      <Footer />
    </>
  );
}

export default App;
