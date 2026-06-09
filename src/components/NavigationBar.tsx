import React from 'react';
import { useState } from "react";
import { Container, /*Row, Col,*/ Nav } from "react-bootstrap";
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
      <Container fluid className="nav-main"> {/* navbar 메인부분, 없애면 사라지고 디자인 넣을 예정(수정예정) */}
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
          {/* 이하 시험중 */}
        <div className="nav-menu-list">
          <div className="nav-menu-group">
            <Link
              to="/about"
              className="nav-menu-title"
              onMouseEnter={() => setHoveredItem(navItems[0])}
            >
              숨에 관하여
            </Link>

            <Link to="/about" className="nav-sub-link">
              프로젝트 소개
            </Link>
            <Link to="/about/history" className="nav-sub-link">
              제작 배경
            </Link>
          </div>

          <div className="nav-menu-group">
            <Link
              to="/usage"
              className="nav-menu-title"
              onMouseEnter={() => setHoveredItem(navItems[1])} //마우스가 사용 텍스트에 들어오면 hoveredItem을 navItems[1]로 설정, 이거로 다른거도 수정 가능
            >
              사용
            </Link>

            <Link to="/usage" className="nav-sub-link">
              사용 메인
            </Link>
            <Link to="/usage/structure-1" className="nav-sub-link">
              프로그램 구성 1
            </Link>
            <Link to="/usage/structure-2" className="nav-sub-link">
              프로그램 구성 2
            </Link>
            <Link to="/usage/structure-3" className="nav-sub-link">
              프로그램 구성 3
            </Link>
          </div>

          <div className="nav-menu-group">
            <Link
              to="/connect"
              className="nav-menu-title"
              onMouseEnter={() => setHoveredItem(navItems[2])}
            >
              연결
            </Link>

            <Link to="/connect" className="nav-sub-link">
              커뮤니티
            </Link>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="nav-sub-link"
            >
              YouTube
            </a>
          </div>
        </div>

        {/* <Container fluid> //이거 쓸건지 안쓸건진 모르겠는데 암튼 남겨둠
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
