import React from 'react';
// React를 불러옵니다.
// 이 파일은 React.FC라는 타입을 사용하므로 React import가 필요합니다.

import { Navbar, Nav, Container } from 'react-bootstrap';
// react-bootstrap에서 Navbar(상단 메뉴), Nav(메뉴 묶음), Container(가운데 정렬 박스)를 가져옵니다.
// Bootstrap은 교수님이 허용한 기본적인 UI 도구라서 직접 CSS를 많이 쓰지 않아도 메뉴 모양을 만들 수 있습니다.

import '../App.css';
// App.css에 있는 customNav 같은 CSS 클래스를 사용하기 위해 불러옵니다.

const NavigationBar: React.FC = () => {
  // const NavigationBar는 NavigationBar라는 이름의 컴포넌트(화면 조각)를 변수에 저장한다는 뜻입니다.
  // React.FC는 "이 변수는 React 함수형 컴포넌트입니다"라는 TypeScript 타입 표시입니다.
  // = () => { }는 화살표 함수입니다. function NavigationBar() { }와 비슷하게 함수를 만드는 문법입니다.
  // 이 컴포넌트는 App.tsx에서 <NavigationBar /> 형태로 사용됩니다.

  return (
    // return 안의 JSX(HTML처럼 생긴 React 문법)가 실제 화면에 표시됩니다.
    <Navbar className="customNav" id="main">
      {/* Navbar는 Bootstrap의 상단 네비게이션 컴포넌트입니다. */}
      {/* className은 React에서 HTML class를 적는 방식입니다. customNav 스타일은 App.css에 있습니다. */}
      {/* id="main"은 Footer.tsx에서 <a href="#main">으로 페이지 위쪽으로 이동할 때 기준점이 됩니다. */}

      <Container className="d-flex justify-content-center">
        {/* Container는 내용을 가운데로 잡아주는 Bootstrap 컴포넌트입니다. */}
        {/* d-flex, justify-content-center는 Bootstrap 클래스이며, 안쪽 요소들을 가로 배치하고 가운데 정렬합니다. */}

        <Navbar.Brand href="/">숨</Navbar.Brand>
        {/* Navbar.Brand는 사이트 이름처럼 보이는 부분입니다. */}
        {/* href="/"는 클릭하면 메인 주소로 이동한다는 뜻입니다. */}
        {/* 발표할 때: 이 부분은 사이트의 대표 이름을 보여주고 홈으로 돌아가는 역할입니다. */}

        <Nav>
          {/* Nav는 여러 메뉴 링크를 묶는 영역입니다. */}

          <Nav.Link href="/about">숨에 관하여</Nav.Link>
          {/* /about 주소로 이동하는 메뉴입니다. App.tsx의 <Route path="/about" ...>와 연결됩니다. */}

          <Nav.Link href="/usage">사용</Nav.Link>
          {/* /usage 주소로 이동하는 메뉴입니다. 내가 맡은 사용 가이드 페이지와 연결됩니다. */}

          <Nav.Link href="/connect">연결</Nav.Link>
          {/* /connect 주소로 이동하는 메뉴입니다. App.tsx의 Connect 페이지와 연결됩니다. */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
// export default는 이 파일의 대표 결과물을 밖으로 내보내는 코드입니다.
// App.tsx에서 import NavigationBar from './components/NavigationBar'로 가져가서 사용합니다.
