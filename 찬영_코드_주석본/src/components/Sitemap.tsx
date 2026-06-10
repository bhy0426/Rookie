import React from 'react';
// React.FC 타입을 쓰기 위해 React를 불러옵니다.

import { Container, Row, Col } from 'react-bootstrap';
// Container(전체 폭 정리), Row(가로 줄), Col(칸)을 Bootstrap에서 가져옵니다.
// 사이트맵을 여러 칸으로 나누기 위해 사용합니다.

import { Link } from 'react-router-dom';
// Link는 React Router에서 제공하는 내부 이동 링크입니다.
// a 태그와 다르게 React 화면 안에서 페이지를 바꾸기 때문에 SPA(새로고침 없이 이동하는 방식)에 적합합니다.

import '../App.css';
// sitemap-title, sitemap-list 같은 CSS 클래스를 사용하기 위해 App.css를 불러옵니다.

const FooterSitemap: React.FC = () => {
  // FooterSitemap은 하단에 페이지 목록을 보여주는 컴포넌트입니다.
  // App.tsx에서 <Sitemap /> 이름으로 가져와 Footer 위에 배치합니다.

  return (
    <div className="bg-light py-5 border-top">
      {/* bg-light, py-5, border-top은 Bootstrap 클래스입니다. */}
      {/* 밝은 배경, 위아래 여백, 위쪽 선을 적용합니다. */}

      <Container>
        {/* Container는 사이트맵 내용의 최대 폭을 잡고 가운데 정렬합니다. */}

        <Row>
          {/* Row는 Bootstrap 격자에서 한 줄을 의미합니다. */}

          <Col xs={6} md={3} className="mb-4">
            {/* Col은 한 칸입니다. xs={6}은 작은 화면에서 절반 너비, md={3}은 중간 이상 화면에서 4분의 1 너비입니다. */}
            <h6 className="sitemap-title">About</h6>
            <ul className="list-unstyled sitemap-list">
              {/* ul은 목록, li는 목록 한 줄입니다. list-unstyled는 Bootstrap의 기본 점 표시 제거 클래스입니다. */}
              <li><Link to="/">Home</Link></li>
              {/* Link의 to="/"는 App.tsx의 홈 Route와 연결됩니다. */}
              <li><Link to="/about">About SOOM</Link></li>
              {/* /about 주소로 이동합니다. */}
            </ul>
          </Col>

          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">Usage</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/usage">사용 페이지 메인</Link></li>
              {/* 내가 맡은 사용 가이드 페이지로 이동합니다. */}
            </ul>
          </Col>

          <Col xs={6} md={3} className="mb-4">
            <h6 className="sitemap-title">Grammar</h6>
            <ul className="list-unstyled sitemap-list">
              <li><Link to="/grammar/1">문법 1: 기본 자료형</Link></li>
              {/* /grammar/1은 GrammarDetail.tsx에서 useParams로 id 값을 받아 상세 내용을 보여줍니다. */}
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
              {/* 외부 사이트는 React Router의 Link가 아니라 a 태그를 사용합니다. */}
              {/* rel="noreferrer"는 새 탭으로 열 때 이전 페이지 정보를 넘기지 않게 하는 보안용 속성입니다. */}
              <li><a href="https://store.steampowered.com" target="_blank" rel="noreferrer">Steam</a></li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FooterSitemap;
// App.tsx에서 import Sitemap from './components/Sitemap'으로 가져와 사용합니다.
