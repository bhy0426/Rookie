// 1단계: 도구 가져오기 (import)
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

// 2단계: 부품 틀 만들기 (const)
const NavigationBar: React.FC = () => {

  // 3단계: 화면 그리기 (return)
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#intro">숨(Sum)</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#about">숨이란?</Nav.Link>
            <Nav.Link href="#syntax">문법 소개</Nav.Link>
            <Nav.Link href="#compare">기존 언어와 비교</Nav.Link>
            <Nav.Link href="#analysis">장단점</Nav.Link>
            <Nav.Link href="#future">미래 가능성</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// 4단계: 밖으로 내보내기 (export)
export default NavigationBar;