// 1단계: 도구 가져오기 (import)
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../App.css'

// 2단계: 부품 틀 만들기 (const)
const NavigationBar: React.FC = () => {

  // 3단계: 화면 그리기 (return)
  return (
      <Navbar className="customNav">
        <Container>
          <Navbar.Brand href="#home">숨</Navbar.Brand>
          <Nav className="justify-content-md-center">
            <Nav.Link href="#home">숨에 관하여</Nav.Link>
            <Nav.Link href="#features">사용</Nav.Link>
            <Nav.Link href="#pricing">연결</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}; 

// 4단계: 밖으로 내보내기 (export)
export default NavigationBar;