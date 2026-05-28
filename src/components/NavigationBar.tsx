// 1단계: 도구 가져오기 (import)
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import myPicture from '../pic/icon.png';
import '../App.css'

// 2단계: 부품 틀 만들기 (const)
const NavigationBar: React.FC = () => {

  // 3단계: 화면 그리기 (return)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <Navbar className="bg-body-tertiary" bg="dark" variant="dark" expand="lg" fixed="top">
    //   <Container>
    //     <Navbar.Brand href="#intro">숨(Sum)</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     <Navbar.Collapse id="basic-navbar-nav">
    //       <Nav className="me-auto">
    //         <Nav.Link href="#about">
    //         <img id="icon" src={myPicture} alt="숨에 관하여"></img>
    //         </Nav.Link>
    //         <Nav.Link href="#syntax">숨 소개</Nav.Link>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
  );
};

// 4단계: 밖으로 내보내기 (export)
export default NavigationBar;