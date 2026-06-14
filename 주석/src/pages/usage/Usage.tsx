// FILE: pages/usage/Usage.tsx
// PURPOSE: USAGE PAGE. 사용 방법 소개와 문법 브라우저 컴포넌트를 배치합니다.
// FLOW 01: Usage 페이지는 소개 문구를 렌더링합니다.
// FLOW 02: UsageGrammarBrowser를 렌더링해 검색/필터/미리보기 기능을 위임합니다.



import UsageGrammarBrowser from "./UsageGrammarBrowser";
import "../../styles/pages/Usage.css";

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
function Usage() {
  return (
    <main className="usagePage">
      <section className="usageIntro">
        <div className="usageIntroCopy">
          <h1>
            숨은 <span>어떻게</span> 사용하나요?
          </h1>
          <p>숨의 문법을 검색부터 미리보기, 예시 코드, 상세 학습까지 한 눈에 확인해보세요 (～￣▽￣)～</p>
        </div>
      </section>

      <UsageGrammarBrowser />
    </main>
  );
}

export default Usage;
