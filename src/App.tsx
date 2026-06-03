import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Main from './pages/Main';
import About from './pages/About';
import Use from './pages/Use';
import Connection from './pages/Connection';

const App: React.FC = () => {
  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/use" element={<Use />}></Route>
        <Route path="/connection" element={<Connection />}></Route>
      </Routes>
    </>
  )
};

export default App;
