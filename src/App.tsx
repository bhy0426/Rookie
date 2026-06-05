import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Sitemap from './components/Sitemap';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Usage from './pages/Usage';
import Connect from './pages/Connect';

import GrammarDetail from './subpages/grammar/GrammarDetail';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/usage" element={<Usage />} />
        <Route path="/grammar/:id" element={<GrammarDetail />} />
        <Route path="/connect" element={<Connect />} />
      </Routes>
      <Sitemap />
      <Footer />
    </>
  );
}

export default App;
