import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../App.css';

const NavigationBar: React.FC = () => {
  return (
    <Navbar className="customNav" id="main">
      <Container className="d-flex justify-content-center">
        <Navbar.Brand href="/">숨</Navbar.Brand>
        <Nav>
          <Nav.Link href="/about">숨에 관하여</Nav.Link>
          <Nav.Link href="/usage">사용</Nav.Link>
          <Nav.Link href="/connect">연결</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
