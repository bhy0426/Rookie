import icon from "../pic/icon.png";
// footer에 보여줄 이미지 파일을 가져옵니다.
// import로 이미지를 가져오면 아래 img 태그의 src에 넣어서 화면에 표시할 수 있습니다.

const Footer = () => (
  // Footer는 화면 아래쪽에 반복해서 보이는 하단 영역 컴포넌트입니다.
  // 화살표 함수에서 중괄호 없이 괄호만 쓰면, 괄호 안 JSX가 바로 return 됩니다.
  // App.tsx에서 <Footer />로 사용됩니다.

  <footer>
    {/* footer 태그는 웹페이지 하단 영역이라는 의미를 가진 HTML 태그입니다. */}

    <div className="footer-container">
      {/* footer-container 클래스는 App.css에서 하단 영역의 배치와 색을 꾸밉니다. */}

      <a href="#main">
        {/* a 태그는 링크입니다. href="#main"은 같은 페이지 안에서 id="main"인 위치로 이동합니다. */}
        {/* NavigationBar.tsx의 <Navbar id="main">과 연결되어 있어서, 아이콘을 누르면 페이지 위쪽으로 올라갑니다. */}
        {/* 여기서는 다른 페이지로 새로 이동하는 목적이 아니라 현재 페이지의 위쪽 위치로 이동하는 목적입니다. */}

        <img src={icon} className="footer-img"></img>
        {/* img는 이미지를 보여주는 태그입니다. src에 위에서 import한 icon을 넣었습니다. */}
        {/* className="footer-img"는 App.css의 이미지 크기 스타일과 연결됩니다. */}
      </a>

      {/* <img src={icon} className="footer-img"></img> */}
      {/* 이 줄은 주석 처리된 예전 코드입니다. 화면에는 나오지 않습니다. */}

      <p className="footer-text">짤 2026 Rookie. All rights reserved.</p>
      {/* p는 문단입니다. footer-text 클래스는 App.css의 글자 스타일과 연결됩니다. */}

      <div className="footer-links">
        {/* footer-links는 링크 줄의 스타일을 잡는 영역입니다. */}
        <a href="https://suum.pro/" target="_blank">Suum 공식 웹페이지</a>
        {/* 외부 사이트로 이동하는 링크입니다. target="_blank"는 새 탭으로 열겠다는 뜻입니다. */}
      </div>

      <div className="footer-links">
        <a href="https://github.com/bhy0426/Rookie" target="_blank">Rookie 깃허브 페이지</a>
        {/* 프로젝트 GitHub로 이동하는 외부 링크입니다. */}
      </div>
    </div>
  </footer>
);

export default Footer;
// App.tsx에서 import Footer from './components/Footer'로 가져와 모든 페이지 아래쪽에 배치합니다.
