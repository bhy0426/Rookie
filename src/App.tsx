import React from 'react';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
  const sectionStyle = {
    minHeight: '100vh',
    padding: '80px 20px',
    borderbuttom: '1px solid #ccc',

  };
  
  return (
    <div>
      <NavigationBar />
      <section id = "home" style = {sectionStyle}>
       <h1>메인 페이지</h1>
       <p>한글 기반 프로그래밍 언어 "숨"을 소개합니다!</p> 
      </section>
    </div>
  );
};

export default App;