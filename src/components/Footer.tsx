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
      <img src="logo/icon.png" className="footer-img"></img> {/*부트스트랩 전역설정 때문에 부드럽게 움직이는거*/}
    </a>
    {/* <img src={icon} className="footer-img"></img> */}
    <p className="footer-text">© 2026 Rookie. All rights reserved.</p>
    <div className="footer-links">
      <a href="https://suum.pro/" target="_blank" className="text-decoration-none">숨(Suum) 공식 홈페이지</a>
    </div>
    <div className="footer-links">
      <a href="https://github.com/bhy0426/Rookie" target="_blank" className="text-decoration-none">Rookie 깃허브 페이지</a>
    </div>
  </div>
</footer>
);

export default Footer;
