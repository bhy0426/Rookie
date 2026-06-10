import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/components/Sitemap.css';

const FooterSitemap: React.FC = () => {
  return (
    <div className="bg-light py-5 border-top">
      <Container>
        <Row>
          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">About</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About SOOM</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">Usage</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/usage">사용 페이지 메인</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">Grammar</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/grammar/1">문법 1: 기본 자료형</Link></li>
              <li><Link to="/grammar/2">문법 2: 선택 화면</Link></li>
              <li><Link to="/grammar/3">문법 3: 그림 화면</Link></li>
              <li><Link to="/usage">모든 문법 보기</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">Connect</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/connect">커뮤니티 메인</Link></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
              <li><a href="https://store.steampowered.com" target="_blank" rel="noreferrer">Steam</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterSitemap;
