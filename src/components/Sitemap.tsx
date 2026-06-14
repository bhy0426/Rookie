import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/components/Sitemap.css';

const FooterSitemap: React.FC = () => {
  return (
    <div className="bg-light py-5 border-top">
      <Container className='bg-yellow'>
        <Row>
          <Col>
            <h6 className="sitemap-title">숨</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/">섹션1</Link></li>
              <li><Link to="/">섹션2</Link></li>
              <li><Link to="/">섹션3</Link></li>
              <li><Link to="/">섹션4</Link></li>
            </ul>
          </Col>

          <Col>
            <h6 className="sitemap-title">숨이란?</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/">의미</Link></li>
              <li><Link to="/about">왜</Link></li>
              <li><Link to="/about">개발 철학</Link></li>
            </ul>
          </Col>

          <Col>
            <h6 className="sitemap-title">사용</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/usage">문법 검색</Link></li>
              <li><Link to="/usage">문법 목록</Link></li>
            </ul>
          </Col>

          {/* <Col xs={6} md={3} className="mb-4"> */}
          <Col>
            <h6 className="sitemap-title">연결</h6>
            <ul className="list-unstyled sitemap-list">
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer">홈페이지 링크</a></li>
              <li><a href="https://store.steampowered.com" target="_blank" rel="noreferrer">유튜브</a></li>
              <li><a href="https://store.steampowered.com" target="_blank" rel="noreferrer">스팀</a></li>
              <li><a href="https://store.steampowered.com" target="_blank" rel="noreferrer">깃허브</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterSitemap;
