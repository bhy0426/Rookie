import React from 'react';
import { useState } from "react";
//import { Navbar, Nav, Container } from 'react-bootstrap';
import '../App.css';


const NavigationBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false); //useState를 사용해서 네비게이션 바의 확장 여부를 관리

  return (
    <nav
      className={`navbar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}  //마우스가 네비게이션 바에 들어오면 확장 true
      onMouseLeave={() => setIsExpanded(false)} //마우스가 네비게이션 바에서 나가면 확장 false
    >
      <div className="nav-main">  
        <a href="/">숨</a>
        <a href="/about">숨에 관하여</a>
        <a href="/usage">사용</a>
        <a href="/connect">연결</a>
      </div>

      <div className={`nav-panel ${isExpanded ? "expanded" : ""}`}>
        <a href="/about">다른거임 ㅇㅇ</a>
        <a href="/usage">사ㅁㄴㅇㄹ</a>
        <a href="/connect">연ㅁㄴㅇㄹ</a>
      </div>
    </nav>
  );

  // return (
  //   <Navbar className="customNav" id="main">
  //     <Container className="d-flex justify-content-center">
  //       <Navbar.Brand href="/">숨</Navbar.Brand>
  //       <Nav>
  //         <Nav.Link href="/about">숨에 관하여</Nav.Link>
  //         <Nav.Link href="/usage">사용</Nav.Link>
  //         <Nav.Link href="/connect">연결</Nav.Link>
  //       </Nav>
  //     </Container>
  //   </Navbar>
  // );
};

export default NavigationBar;
