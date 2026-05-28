<<<<<<< HEAD
import './App.css'

function App() {
  return (
    <>
      <h1>저희는 숨을 쉬면서 살아갑니다</h1>
    </>
  )
}

export default App
=======
import React from 'react';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
  const sectionStyle: React.CSSProperties = {
    minHeight: '100vh',
    padding: '100px 20px',
    borderBottom: '1px solid #ccc',

  };
  
  return (
    <div>
      <NavigationBar />
      {/* id를 네비게이션 링크와 일치시킴 */}
      <section id="intro" style={sectionStyle}>
        <h1>메인 페이지</h1>
        <p>한글 기반 프로그래밍 언어 "숨"을 소개합니다!</p> 
      </section>

      <section id="about" style={sectionStyle}>
        <h1>숨이란?</h1>
      </section>

      <section id="syntax" style={sectionStyle}>
        <h1>문법 소개</h1>
      </section>
    </div>
  );
};

export default App;
>>>>>>> CLim020924
