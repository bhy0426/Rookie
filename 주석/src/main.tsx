// FILE: main.tsx
// PURPOSE: REACT ENTRY POINT. React 앱을 root DOM에 연결하고 BrowserRouter로 라우팅을 감쌉니다.
// FLOW 01: index.html의 #root DOM을 찾습니다.
// FLOW 02: createRoot로 React 렌더링 루트를 만듭니다.
// FLOW 03: StrictMode와 BrowserRouter로 App 전체를 감싼 뒤 화면에 출력합니다.



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.tsx'

// REACT ROOT: React 컴포넌트 트리를 index.html의 root DOM에 마운트합니다.
// FLOW STEP 01: 여기서 React 앱이 실제 DOM에 처음 연결됩니다.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)