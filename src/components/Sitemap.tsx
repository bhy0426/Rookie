import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../App.css'; // 글자색과 모양을 꾸미기 위해 꼭 연결해 주세요.

const FooterSitemap: React.FC = () => {
  return (
    // bg-light는 부트스트랩의 아주 옅은 회색 배경입니다.
    <div className="bg-light py-5 border-top">
      <Container>
        <Row>
          {/* 1번째 칸: 소개 (About) */}
          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">About</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/">Home (메인 홈)</Link></li>
              <li><Link to="/about">About SOOM (숨에 관하여)</Link></li>
            </ul>
          </Col>

          {/* 2번째 칸: 사용 (Usage) */}
          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">Usage</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/usage">대시보드 메인</Link></li>
              <li><Link to="/usage/structure-1">프로그램 구성 1</Link></li>
              <li><Link to="/usage/structure-2">프로그램 구성 2</Link></li>
              <li><Link to="/usage/structure-3">프로그램 구성 3</Link></li>
            </ul>
          </Col>

          {/* 3번째 칸: 문법 (Grammar) */}
          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">Grammar</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/grammar/1">문법 1: 시작하기</Link></li>
              <li><Link to="/grammar/2">문법 2: 기본 규칙</Link></li>
              <li><Link to="/grammar/3">문법 3: 변수</Link></li>
              {/* 25개를 다 적으면 너무 길어지니 전체 보기로 묶어줍니다 */}
              <li><Link to="/grammar/1">모든 문법 보기 (1~25)</Link></li> 
            </ul>
          </Col>

          {/* 4번째 칸: 연결 (Connect) */}
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