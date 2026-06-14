// FILE: components/Footer.tsx
// PURPOSE: FOOTER COMPONENT. 페이지 하단 로고, 저작권, 외부 링크를 렌더링합니다.
// FLOW 01: Footer가 렌더링되면 로고, 저작권, 외부 링크를 출력합니다.
// FLOW 02: 로고 클릭 시 현재 경로가 Home이면 맨 위로 스크롤하고, 다른 페이지면 Home으로 이동합니다.



import "../styles/components/Footer.css";

const handleFooterClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault();

  if (window.location.pathname === "/") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    window.location.href = "/";
  }
};

const Footer = () => (
  <footer>
  <div className="footer-container">
    <a href="#main" onClick={handleFooterClick}>
      <img src="/logo/icon.png" className="footer-img"></img> {/*부트스트랩 전역설정 때문에 부드럽게 움직이는거*/}
    </a>
    {/* <img src={icon} className="footer-img"></img> */}
    <p className="footer-text">© 2026 Rookie. All rights reserved.</p>
    <div className="footer-links">
      <a href="https://suum.pro/" target="_blank">숨(Suum) 공식 홈페이지</a>
    </div>
    <div className="footer-links">
      <a href="https://github.com/bhy0426/Rookie" target="_blank">Rookie 깃허브 페이지</a>
    </div>
  </div>
</footer>
);

export default Footer;
