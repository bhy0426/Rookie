import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/components/Sitemap.css';

const FooterSitemap: React.FC = () => {
  return (
    <div className="sitemap_container">
      <Container>
        <Row>
          <Col>
            <h6 className="sitemap-title">숨이란?</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/about#mean">의미</Link></li>
              <li><Link to="/about#feature">왜</Link></li>
              <li><Link to="/about#philosophy">개발 철학</Link></li>
            </ul>
          </Col>

          <Col>
            <h6 className="sitemap-title">사용</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/usage#search">문법 검색</Link></li>
              <li><Link to="/usage#description">문법 설명</Link></li>
            </ul>
          </Col>

          {/* <Col xs={6} md={3} className="mb-4"> */}
          <Col>
            <h6 className="sitemap-title">연결</h6>
            <ul className="list-unstyled sitemap-list">
              <li><a href="https://store.steampowered.com/app/3594080/Suum/" target="_blank" rel="noreferrer">스팀 페이지</a></li>
              <li><a href="https://www.youtube.com/@suumlang" target="_blank" rel="noreferrer">유튜브 페이지</a></li>
              <li><a href="https://suum.pro/" target="_blank" rel="noreferrer">공식 홈페이지</a></li>
              <li><a href="https://github.com/bhy0426/Rookie" target="_blank" rel="noreferrer">깃허브 페이지</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterSitemap;
