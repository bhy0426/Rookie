// main.tsx는 React 프로젝트가 처음 시작되는 입구 파일입니다.
// 브라우저가 index.html을 읽은 다음, 여기서 React 화면을 실제로 붙입니다.

import { StrictMode } from 'react'
// StrictMode(검사 모드)는 개발 중에 React 코드가 안전하게 작성되었는지 한 번 더 확인해 주는 도구입니다.
// 화면에 직접 보이는 기능은 아니고, 개발할 때 문제를 빨리 찾기 위해 감싸 둡니다.

import { createRoot } from 'react-dom/client'
// createRoot(React 화면 시작 함수)는 HTML 안의 특정 위치에 React 컴포넌트를 연결합니다.
// 아래에서 document.getElementById('root')로 찾은 자리에 App.tsx가 들어갑니다.

import { BrowserRouter } from 'react-router-dom';
// BrowserRouter(주소 관리 컴포넌트)는 /usage, /grammar/1 같은 주소 이동을 React 안에서 처리하게 해 줍니다.
// 이 컴포넌트가 있어야 App.tsx 안의 Routes, Route, Link, useLocation, useParams가 정상 동작합니다.

import './index.css'
// index.css는 프로젝트 전체에 기본으로 적용되는 CSS 파일입니다.

import App from './App.tsx'
// App.tsx는 전체 화면 구조를 가지고 있는 가장 큰 컴포넌트입니다.
// 이 파일에서 불러온 App이 실제 웹사이트의 시작 화면이 됩니다.

createRoot(document.getElementById('root')!).render(
  // document.getElementById('root')는 index.html에 있는 id="root" 영역을 찾습니다.
  // !(느낌표)는 TypeScript에게 "이 값은 반드시 존재한다고 보고 진행해도 된다"라고 알려주는 표시입니다.
  // render(화면 출력 함수)는 React 컴포넌트를 브라우저 화면에 그립니다.
  <StrictMode>
    {/* StrictMode 안에 들어간 컴포넌트들은 개발 중 React 검사를 받습니다. */}
    <BrowserRouter>
      {/* BrowserRouter 안에 App을 넣었기 때문에 App.tsx 안에서 페이지 주소 이동 기능을 사용할 수 있습니다. */}
      <App />
      {/* <App />은 App.tsx에서 export default로 내보낸 App 컴포넌트를 실행해서 화면에 보여주는 코드입니다. */}
    </BrowserRouter>
  </StrictMode>
)
