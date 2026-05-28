import React from 'react';
import NavigationBar from './components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      {/*<section id="intro" style={sectionStyle}>*/}
        
        <h1>메인 페이지</h1>
        <p>한글 기반 프로그래밍 언어 "숨"을 소개합니다!</p> 
      {/*</section>*/}
    </div>
  );
};

export default App;
