// FILE: components/Sitemap.tsx
// PURPOSE: SITEMAP COMPONENT. 하단 사이트맵 링크를 렌더링하는 정적 컴포넌트입니다.
// FLOW 01: 별도 hook 없이 고정된 사이트맵 링크 JSX를 바로 렌더링합니다.



import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/components/Sitemap.css';

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
const FooterSitemap: React.FC = () => {
  return (
    <div className="bg-light py-5 border-top">
      <Container className='bg-yellow'>
        <Row>
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
