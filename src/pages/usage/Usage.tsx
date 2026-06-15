import UsageGrammarBrowser from "./UsageGrammarBrowser";
import "../../styles/pages/Usage.css";

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
