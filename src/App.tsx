import React from 'react';
import NavigationBar from './components/NavigationBar';

const App: React.FC = () => {
  const sectionStyle: React.CSSProperties = {
    minHeight: '100vh',
    padding: '100px 20px',
    borderBottom: '1px solid #ccc',

  };
  
  return (
    <>
    <ul className="nav">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#">Active</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" aria-disabled="true">Disabled</a>
      </li>
    </ul>
      <h1>저희는 숨을 쉬면서 살아갑니다</h1>
    </>
  )
}

export default App;
