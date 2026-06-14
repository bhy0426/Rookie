// FILE: pages/home/HomeSearchDemo.tsx
// PURPOSE: HOME SEARCH DEMO. 타이핑 애니메이션 상태와 타이머 effect를 독립적으로 관리합니다.
// FLOW 01: 검색 데모가 렌더링되면 현재 키워드 인덱스, 타이핑 텍스트, 삭제 여부를 상태로 준비합니다.
// FLOW 02: effect가 현재 키워드와 typingText를 비교해 입력/대기/삭제 중 다음 동작을 결정합니다.
// FLOW 03: setTimeout이 한 글자씩 상태를 바꾸고, 상태 변경으로 컴포넌트가 다시 렌더링됩니다.
// FLOW 04: 한 키워드를 모두 지우면 demoIndex를 다음 예시로 넘깁니다.



import { useEffect, useState } from "react";

// DATA: hook이 아니라 렌더링에 참조되는 정적 데이터입니다.
const searchDemos = [
  {
    keyword: "반복문",
    results: ["반복하기", "조건 반복", "횟수 반복"],
  },
  {
    keyword: "조건문",
    results: ["만약", "아니라면", "비교하기"],
  },
  {
    keyword: "출력",
    results: ["출력하기", "문장 보여주기", "값 확인하기"],
  },
  {
    keyword: "변수",
    results: ["변수 만들기", "값 저장하기", "이름 정하기"],
  },
];

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
export default function HomeSearchDemo() {
// HOOK STATE: Home 검색 데모에서 현재 타이핑 중인 예시 단어의 인덱스를 저장합니다.
// FLOW STEP 01: 현재 사용할 검색 예시 데이터의 인덱스를 저장합니다.
  const [demoIndex, setDemoIndex] = useState(0);
// HOOK STATE: Home 검색 데모 input에 한 글자씩 표시되는 텍스트를 저장합니다.
// FLOW STEP 02: input에 표시되는 글자를 한 글자 단위로 저장합니다.
  const [typingText, setTypingText] = useState("");
// HOOK STATE: Home 검색 데모가 입력 중인지 지우는 중인지 저장합니다.
// FLOW STEP 03: 타이핑 중인지 삭제 중인지 분기하기 위한 상태입니다.
  const [isDeleting, setIsDeleting] = useState(false);

// HOOK EFFECT: 현재 키워드를 한 글자씩 입력/삭제하는 타이핑 애니메이션 타이머를 관리합니다.
// FLOW STEP 04: 상태를 읽어 다음 타이머에서 입력/삭제/다음 키워드 이동 중 하나를 실행합니다.
  useEffect(() => {
    const currentKeyword = searchDemos[demoIndex].keyword;
    const isComplete = typingText === currentKeyword && !isDeleting;
    const isEmpty = typingText.length === 0 && isDeleting;

    const timer = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty) {
        setIsDeleting(false);
        setDemoIndex((prev) => (prev + 1) % searchDemos.length);
        return;
      }

      if (isDeleting) {
        setTypingText(currentKeyword.slice(0, typingText.length - 1));
        return;
      }

      setTypingText(currentKeyword.slice(0, typingText.length + 1));
    }, isComplete ? 1050 : isEmpty ? 320 : isDeleting ? 70 : 115);

    return () => {
      window.clearTimeout(timer);
    };
  }, [demoIndex, typingText, isDeleting]);

  return (
    <div className="home-search-demo">
      <div className="home-search-top">
        <span>문법 검색</span>
        <em>usage</em>
      </div>

      <div className="home-search-input">
        <span>{typingText}</span>
        <i />
      </div>

      <div className="home-search-results">
        {searchDemos[demoIndex].results.map((result, resultIndex) => (
          <div
            className={typingText.length > 1 ? "home-search-result show" : "home-search-result"}
            key={result}
            style={{ transitionDelay: `${resultIndex * 80}ms` }}
          >
            <span>{String(resultIndex + 1).padStart(2, "0")}</span>
            <strong>{result}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
