// FILE: pages/connect/Connect.tsx
// PURPOSE: CONNECT PAGE. 외부 연결 카드 목록을 정적으로 렌더링합니다.
// FLOW 01: 연결 페이지는 외부 링크 카드 데이터를 JSX로 렌더링합니다.
// FLOW 02: 각 카드를 클릭하면 Steam, YouTube, 공식 사이트 같은 외부 주소로 이동합니다.



import "../../styles/pages/Connect.css";

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
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
          <a className="suum-button" href="https://store.steampowered.com/app/3594080/Suum/" target="_blank" rel="noreferrer">
            스팀 페이지
          </a>
        </div>
      </section>
    </main>
  );
}
