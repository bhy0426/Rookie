// FILE: App.tsx
// PURPOSE: APP ROUTER AND LAYOUT. 전역 배경/네비게이션/푸터와 페이지 라우트를 관리합니다.
// FLOW 01: App이 렌더링되면 전역 배경, 네비게이션, 라우트 영역, 하단 영역을 배치합니다.
// FLOW 02: ScrollToTop은 URL 변화(pathname/hash)를 감지해 페이지 위치를 조정합니다.
// FLOW 03: Home에서 전달받은 setHomeNavHidden 콜백으로 NavigationBar 숨김 상태를 제어합니다.
// FLOW 04: Routes는 현재 URL에 맞는 페이지 컴포넌트를 선택해 렌더링합니다.



import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Sitemap from './components/Sitemap';
import HangulBackground from './components/HangulBackground';

import Home from './pages/home/Home';
import AboutPage from './pages/about/AboutPage';
import Usage from './pages/usage/Usage';
import Connect from './pages/connect/Connect';

import GrammarDetail from './pages/grammar/GrammarDetail';

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
function ScrollToTop() {
// ROUTER HOOK: pathname과 hash를 읽어 페이지 이동/앵커 이동을 감지합니다.
// FLOW STEP 01: URL의 pathname/hash를 읽어 스크롤 위치 보정 기준으로 삼습니다.
  const { pathname, hash } = useLocation();

// HOOK EFFECT: pathname/hash 변경 후 페이지 맨 위 또는 해시 대상 위치로 스크롤합니다.
// FLOW STEP 02: pathname/hash가 바뀐 직후 스크롤 위치를 top 또는 hash 대상 element로 이동합니다.
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

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
function App() {
// ROUTER HOOK: 현재 pathname을 읽어 라우트 변경에 반응합니다.
const { pathname } = useLocation();
// HOOK STATE: HOME 페이지의 스크롤 흐름에서 전역 네비게이션을 숨길지 저장합니다.
// FLOW STEP 03: Home 페이지가 네비게이션을 숨기라고 요청했는지 저장합니다.
  const [homeNavHidden, setHomeNavHidden] = useState(false);

// HOOK EFFECT: 라우트가 바뀌면 Home에서 숨긴 네비게이션 상태를 다시 보이도록 초기화합니다.
// FLOW STEP 04: 라우트가 바뀌면 homeNavHidden을 false로 되돌려 nav를 다시 보이게 합니다.
  useEffect(() => {
    setHomeNavHidden(false);
  }, [pathname]);

  return (
    <>
      <ScrollToTop />
      <HangulBackground />
      <NavigationBar forceHidden={homeNavHidden} />
// FLOW STEP 05: 현재 URL과 일치하는 Route의 page component만 렌더링합니다.
      <Routes>
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
