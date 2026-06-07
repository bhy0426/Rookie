import React from 'react';
import { useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../App.css';
//import nav_panel_img from "../pic/Rectangle 3.svg";

const navItems = [
  {
    label: "숨에 관하여",
    path: "/about",
    image: "/images/about-preview.png",
    description: "숨 프로젝트의 목적과 방향을 소개합니다.",
  },
  {
    label: "사용",
    path: "/usage",
    image: "/images/usage-preview.png",
    description: "프로그램 사용법과 구성 방법을 확인할 수 있습니다.",
  },
  {
    label: "연결",
    path: "/connect",
    image: "/images/connect-preview.png",
    description: "커뮤니티와 외부 채널로 연결됩니다.",
  },
];

const NavigationBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false); //useState를 사용해서 네비게이션 바의 확장 여부를 관리
  const [hoveredItem, setHoveredItem] = useState(navItems[0]); //useState를 사용해서 텍스트 위에 마우스 여부를 관리

  return (
    <nav
      className={`navbar ${isExpanded ? "expanded" : ""}`}
      onMouseEnter={() => setIsExpanded(true)}  //마우스가 네비게이션 바에 들어오면 확장 true
      onMouseLeave={() => setIsExpanded(false)} //마우스가 네비게이션 바에서 나가면 확장 false
    >
      {/*<div className="nav-main">  
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
  );*/}
    <Container fluid className="nav-main">
        <Nav>
          <Nav.Link as={Link} to="/">
            숨
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            숨에 관하여
          </Nav.Link>
          <Nav.Link as={Link} to="/usage">
            사용
          </Nav.Link>
          <Nav.Link as={Link} to="/connect">
            연결
          </Nav.Link>
        </Nav>
      </Container>

      <div className="nav-panel">
        <div className="nav-preview">
    <img
      src={hoveredItem.image}
      alt={hoveredItem.label}
      className="nav-preview-img"
    />
    <p>{hoveredItem.description}</p>
  </div>

  <div className="nav-menu-list">
    {
      navItems.map((item) => (
      <Link
        key={item.path}
        to={item.path}
        className="nav-menu-link"
        onMouseEnter={() => setHoveredItem(item)}
      >
        {item.label}
      </Link>
    ))}
  </div>
        {/* <Container fluid>
          <Row>
            <Col>
              <img src={nav_panel_img} className="nav-panel-img"></img>
            </Col>
              <Col>
                <Row>
                  <Col className="nav-panel-col">
                <Nav>
                  <Nav.Link as={Link} to="/usage">
                    사ㅁㄴㅇㄹ
                  </Nav.Link>
                </Nav>
              </Col>

              <Col className="nav-panel-col">
                <Nav>
                  <Nav.Link as={Link} to="/connect">
                    연ㅁㄴㅇㄹ
                  </Nav.Link>
                </Nav>
              </Col>

              <Col className="nav-panel-col">
                <Nav>
                  <Nav.Link as={Link} to="/connect">
                    연ㅁㄴㅇㄹ
                  </Nav.Link>
                </Nav>
              </Col>
              </Row>
              <Row>
                <Col className="nav-panel-col">
                <Nav>
                  <Nav.Link as={Link} to="/usage">
                    사ㅁㄴㅇㄹ
                  </Nav.Link>
                </Nav>
              </Col>

              <Col className="nav-panel-col">
                <Nav>
                  <Nav.Link as={Link} to="/connect">
                    연ㅁㄴㅇㄹ
                  </Nav.Link>
                </Nav>
              </Col>

              <Col className="nav-panel-col">
                <Nav>
                  <Nav.Link as={Link} to="/connect">
                    연ㅁㄴㅇㄹ
                  </Nav.Link>
                </Nav>
              </Col>
              </Row>
            </Col>
          </Row>
        </Container> */}
      </div>
    </nav>
  );

};

export default NavigationBar;
