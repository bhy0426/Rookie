import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Sitemap from './components/Sitemap';
import HangulBackground from './components/HangulBackground';
import HangulBackground from './components/HangulBackground';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Usage from './pages/Usage';
import Connect from './pages/Connect';

import GrammarDetail from './subpages/grammar/GrammarDetail';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");

      window.setTimeout(() => {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 0);

      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  const { pathname } = useLocation();
  const [homeNavHidden, setHomeNavHidden] = useState(false);

  useEffect(() => {
    setHomeNavHidden(false);
  }, [pathname]);

  const { pathname } = useLocation();
  const [homeNavHidden, setHomeNavHidden] = useState(false);

  useEffect(() => {
    setHomeNavHidden(false);
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <HangulBackground />
      <NavigationBar forceHidden={homeNavHidden} />
      <ScrollToTop />
      <HangulBackground />
      <NavigationBar forceHidden={homeNavHidden} />
      <Routes>
        <Route path="/" element={<Home setHomeNavHidden={setHomeNavHidden} />} />
        <Route path="/" element={<Home setHomeNavHidden={setHomeNavHidden} />} />
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
