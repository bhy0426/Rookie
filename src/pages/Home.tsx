import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Home.css";

let hasHomeIntroPlayed = false;

const homeSections = [
  {
    eyebrow: "SUUM LANGUAGE",
    title: "한글로 생각하고, 흐름으로 프로그래밍하다.",
    description:
      "숨은 순서도 기반 구조와 한글 표현을 결합해 프로그램의 흐름을 직관적으로 이해하도록 만든 비주얼 프로그래밍 언어입니다.",
    code: ["시작:", "  변수 이름을 \"숨\"이라고 정하기", "  출력하기(\"안녕하세요, \" + 이름)", "끝!"],
    primaryLabel: "사용해보기",
    primaryPath: "/usage",
    secondaryLabel: "숨에 관하여",
    secondaryPath: "/about",
  },
  {
    eyebrow: "VISUAL FLOW",
    title: "입력, 판단, 실행을 한눈에 따라갑니다.",
    description:
      "텍스트만 나열하는 방식이 아니라 프로그램의 구조를 구역과 흐름으로 보여주어 처음 배우는 사람도 실행 순서를 놓치지 않게 합니다.",
    points: ["순서도 중심의 구조", "키보드 기반 입력", "오류를 줄이는 작성 방식"],
  },
  {
    eyebrow: "GUIDE PAGE",
    title: "문법을 찾고, 예시를 보고, 바로 이해합니다.",
    description:
      "사용 페이지에서는 숨의 문법을 검색하고 상세 예시를 확인할 수 있습니다. 각 문법은 실제 화면 자료와 함께 정리됩니다.",
    primaryLabel: "문법 보러가기",
    primaryPath: "/usage",
    secondaryLabel: "연결 페이지",
    secondaryPath: "/connect",
  },
];

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

type HomeProps = {
  setHomeNavHidden: (hidden: boolean) => void;
};

function Home({ setHomeNavHidden }: HomeProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [demoIndex, setDemoIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [introComplete, setIntroComplete] = useState(hasHomeIntroPlayed);
  const [introVisible, setIntroVisible] = useState(hasHomeIntroPlayed);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const wheelLockRef = useRef(false);
  const currentSectionRef = useRef(0);
  const totalSections = homeSections.length;

  useEffect(() => {
    if (hasHomeIntroPlayed) {
      setIntroVisible(true);
      setIntroComplete(true);
      return;
    }

    const showTimer = window.setTimeout(() => {
      setIntroVisible(true);
    }, 120);

    const completeTimer = window.setTimeout(() => {
      hasHomeIntroPlayed = true;
      setIntroComplete(true);
    }, 1900);

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(completeTimer);
    };
  }, []);

  useEffect(() => {
    currentSectionRef.current = currentSection;

    const targetSection = sectionRefs.current[currentSection];

    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentSection]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const current = currentSectionRef.current;
      const isScrollDown = event.deltaY > 6;
      const isScrollUp = event.deltaY < -6;

      if (!isScrollDown && !isScrollUp) return;

      const isLastSection = current === totalSections - 1;
      const isFirstSection = current === 0;

      event.preventDefault();

      if (isScrollUp) {
        setHomeNavHidden(false);
      }

      if (isScrollDown) {
        setHomeNavHidden(true);
      }

      if (wheelLockRef.current) return;

      if ((isScrollDown && isLastSection) || (isScrollUp && isFirstSection)) return;

      wheelLockRef.current = true;

      const nextSection = isScrollDown ? current + 1 : current - 1;
      currentSectionRef.current = nextSection;
      setCurrentSection(nextSection);

      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 980);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [totalSections, setHomeNavHidden]);


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
    <main
      className={`home-scroll ${introVisible ? "intro-visible" : ""} ${introComplete ? "intro-complete" : "intro-sequence"}`}
    >
      <div className="home-progress" aria-label="홈 섹션 이동">
        {homeSections.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            className={currentSection === dotIndex ? "active" : ""}
            onClick={() => setCurrentSection(dotIndex)}
            aria-label={`${dotIndex + 1}번째 구역으로 이동`}
          />
        ))}
      </div>

      {homeSections.map((section, sectionIndex) => (
        <section
          key={section.title}
          ref={(element) => {
            sectionRefs.current[sectionIndex] = element;
          }}
          className={`home-section ${currentSection === sectionIndex ? "active" : ""}`}
        >
          <div className="home-section-inner">
            <div className="home-copy">
              <p className="eyebrow home-intro-item">{section.eyebrow}</p>
              <h1 className="home-intro-item">{section.title}</h1>
              <p className="home-description home-intro-item">{section.description}</p>

              {(section.primaryPath || section.secondaryPath) && (
                <div className="home-actions home-intro-item">
                  {section.primaryPath && (
                    <Link className="suum-button" to={section.primaryPath}>
                      {section.primaryLabel}
                    </Link>
                  )}
                  {section.secondaryPath && (
                    <Link className="suum-button-outline" to={section.secondaryPath}>
                      {section.secondaryLabel}
                    </Link>
                  )}
                </div>
              )}
            </div>

            <div className="home-visual" aria-hidden="true">
              {section.code ? (
                <div className="home-code-card">
                  <div className="home-code-header">
                    <span>예시 코드</span>
                    <span>suum</span>
                  </div>
                  <pre>{section.code.join("\n")}</pre>
                </div>
              ) : sectionIndex === 2 ? (
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
              ) : (
                <div className="home-flow-card">
                  {(section.points ?? []).map((point, pointIndex) => (
                    <div className="home-flow-row" key={point}>
                      <span>{String(pointIndex + 1).padStart(2, "0")}</span>
                      <strong>{point}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

export default Home;
