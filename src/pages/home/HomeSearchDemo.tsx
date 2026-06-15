import { useEffect, useState } from "react";

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

export default function HomeSearchDemo() {
  const [demoIndex, setDemoIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
