// 1단계: 도구 가져오기 (import)
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../App.css'
import About from './About';
import { Route, Routes } from 'react-router-dom';

// 2단계: 부품 틀 만들기 (const)
const NavigationBar: React.FC = () => {

  // 3단계: 화면 그리기 (return)
  return (
    <>
      <Navbar className="customNav">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand href="/">숨</Navbar.Brand>
          <Nav>
            <Nav.Link href="/about">숨에 관하여</Nav.Link>
            <Nav.Link href="/use">사용</Nav.Link>
            <Nav.Link href="/connect">연결</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  )
}; 

// 4단계: 밖으로 내보내기 (export)
export default NavigationBar;