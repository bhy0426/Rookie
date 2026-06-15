import "../../styles/pages/Connect.css";

export default function Connect() {
  return (
    <main className="connectPage">
      <section className="connectHero suum-container">
        <p className="eyebrow">CONNECT</p>
        <h1>숨 프로젝트와 연결하기</h1>
        <p>공식 페이지와 프로젝트 저장소를 통해 숨 언어의 자료를 더 확인할 수 있습니다.</p>
        <div className="connectLinks">
          <a className="suum-button" href="https://suum.pro/" target="_blank" rel="noreferrer">
            공식 홈페이지
          </a>
          <a className="suum-button-outline" href="https://github.com/bhy0426/Rookie" target="_blank" rel="noreferrer">
            깃허브 보기
          </a>
        </div>
        <div className="connectLinks"> 
          <a className="suum-button-outline" href="https://www.youtube.com/@suumlang" target="_blank" rel="noreferrer">
            공식 유튜브
          </a>
          <a className="suum-button-outline" href="https://store.steampowered.com/app/3594080/Suum/" target="_blank" rel="noreferrer">
            스팀 페이지
          </a>
        </div>
      </section>
    </main>
  );
}
