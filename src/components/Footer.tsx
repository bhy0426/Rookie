import icon from "../pic/icon.png";

const Footer = () => (
  <footer>
  <div className="footer-container">
    <img src={icon} className="footer-img"></img>
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
