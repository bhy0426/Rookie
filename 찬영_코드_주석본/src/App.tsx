// App.tsx
// 이 파일은 전체 React 앱의 "공통 틀"과 "주소별 페이지 연결"을 담당합니다.
// 각 페이지마다 네비게이션과 푸터를 따로 넣지 않고 App에서 한 번만 넣은 이유:
// 모든 페이지에서 공통으로 보여야 하는 요소를 한 곳에서 관리하면 중복이 줄고 수정이 쉬워집니다.

import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap CSS를 App에서 한 번만 import한 이유:
// Bootstrap 스타일은 프로젝트 전체에서 공통으로 쓰입니다.
// 각 컴포넌트마다 반복해서 import하지 않고, 최상위 App에서 불러오면 전체에 적용됩니다.

import { useEffect } from 'react';
// useEffect가 필요한 이유:
// 페이지 이동 후 스크롤을 맨 위로 올리는 작업은 화면 렌더링이 끝난 다음 실행되어야 합니다.
// 그래서 일반 함수 호출이 아니라 useEffect 안에서 처리합니다.

import { Routes, Route, useLocation } from 'react-router-dom';
// Routes와 Route를 쓰는 이유:
// 주소에 따라 다른 컴포넌트를 보여줘야 하기 때문입니다.
// 예를 들어 /usage는 Usage, /grammar/3은 GrammarDetail을 보여줍니다.
// useLocation은 현재 주소가 바뀌었는지 감지하기 위해 사용합니다.

import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import Sitemap from './components/Sitemap';
// NavigationBar, Sitemap, Footer를 App에서 import한 이유:
// 이 세 가지는 특정 페이지만의 기능이 아니라 사이트 전체 공통 영역입니다.
// App에 배치하면 모든 Route 페이지에서 반복해서 보입니다.

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import Usage from './pages/Usage';
import Connect from './pages/Connect';
import GrammarDetail from './subpages/grammar/GrammarDetail';
// 각 페이지 컴포넌트를 따로 import한 이유:
// Route에서 "이 주소에는 이 컴포넌트를 보여준다"라고 연결해야 하기 때문입니다.

function ScrollToTop() {
  // ScrollToTop 컴포넌트를 따로 만든 이유:
  // React Router로 페이지를 이동하면 브라우저가 완전히 새로고침되지 않기 때문에,
  // 이전 페이지에서 내려간 스크롤 위치가 그대로 남을 수 있습니다.
  // 사용자가 상세 보기를 눌렀을 때 상세 페이지 중간부터 보이는 문제를 막으려고 이 컴포넌트를 만들었습니다.

  const { pathname } = useLocation();
  // pathname만 꺼낸 이유:
  // 스크롤을 올려야 하는 기준은 "주소 경로가 바뀌었는가"입니다.
  // /usage에서 /grammar/1로 이동하면 pathname이 바뀌고, 그때 effect가 다시 실행됩니다.

  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo(0, 0)을 useEffect 안에 둔 이유:
    // 새 페이지 컴포넌트가 렌더링된 뒤 화면 위치를 맨 위로 이동시키기 위해서입니다.
  }, [pathname]);
  // [pathname]을 의존성 배열에 넣은 이유:
  // 검색어 입력이나 탭 클릭처럼 주소가 바뀌지 않는 렌더링에서는 스크롤을 올릴 필요가 없습니다.
  // 주소가 바뀔 때만 실행되게 하기 위해 pathname만 넣었습니다.

  return null;
  // 이 컴포넌트는 화면에 보여줄 UI가 목적이 아닙니다.
  // 스크롤 이동이라는 동작만 수행하므로 null을 반환합니다.
}

function App() {
  // App은 프로젝트 전체를 감싸는 최상위 컴포넌트입니다.
  // main.tsx에서 이 App을 브라우저 root에 렌더링합니다.

  return (
    <>
      {/* Fragment를 쓴 이유:
          NavigationBar, Routes, Sitemap, Footer를 나란히 반환해야 하지만
          불필요한 div를 하나 더 만들고 싶지는 않기 때문입니다. */}

      <ScrollToTop />
      {/* Routes 위에 둔 이유:
          어떤 페이지로 이동하든 주소 변경을 감지해야 하기 때문입니다. */}

      <NavigationBar />
      {/* Route 밖에 둔 이유:
          네비게이션은 특정 페이지 내용이 아니라 모든 페이지 공통 영역이기 때문입니다. */}

      <Routes>
        <Route path="/" element={<Home />} />
        {/* / 주소일 때 Home을 보여줍니다. */}

        <Route path="/about" element={<AboutPage />} />
        {/* /about 주소일 때 AboutPage를 보여줍니다. */}

        <Route path="/usage" element={<Usage />} />
        {/* /usage 주소일 때 내가 맡은 Usage 페이지를 보여줍니다. */}

        <Route path="/grammar/:id" element={<GrammarDetail />} />
        {/* :id를 쓴 이유:
            문법 상세 페이지를 28개 파일로 만들지 않고,
            /grammar/1, /grammar/2처럼 번호만 바뀌는 하나의 상세 컴포넌트로 처리하기 위해서입니다.
            GrammarDetail.tsx에서 useParams로 이 id를 읽습니다. */}

        <Route path="/connect" element={<Connect />} />
      </Routes>

      <Sitemap />
      <Footer />
      {/* Sitemap과 Footer도 Route 밖에 둔 이유:
          페이지가 바뀌어도 항상 같은 위치에 보여야 하는 공통 하단 영역이기 때문입니다. */}
    </>
  );
}

export default App;
// default export를 쓴 이유:
// main.tsx에서 이 파일의 대표 컴포넌트 하나만 가져오면 되기 때문입니다.
