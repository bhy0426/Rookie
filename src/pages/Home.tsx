import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Home.css";

let hasHomeIntroPlayed = false;

const homeSections = [
  {
    title: "숨",
    description:
      "한글 비주얼 프로그래밍 언어",
    variant: "main",
  },
  {
    eyebrow: "숨 이란?",
    title: "한글로 생각하고, 흐름으로 프로그래밍하다.",
    description:
      "숨은 순서도 기반 구조와 한글 표현을 결합해 프로그램의 흐름을 직관적으로 이해하도록 만든 비주얼 프로그래밍 언어입니다.",
      image: "/홈-숨언어간단소개이미지.png",
    variant: "explain",
  },
  {
    eyebrow: "흐름 보기",
    title: "입력, 판단, 실행을 한눈에 따라갑니다.",
    description:
      "텍스트만 나열하는 방식이 아니라 프로그램의 구조를 구역과 흐름으로 보여주어 처음 배우는 사람도 실행 순서를 놓치지 않게 합니다.",
    points: ["순서도 중심의 구조", "키보드 기반 입력", "오류를 줄이는 작성 방식"],
    variant: "search",
  },
  {
    eyebrow: "설명과 이해",
    title: "문법을 찾고, 예시를 보고, 바로 이해합니다.",
    description:
      "사용 페이지에서는 숨의 문법을 검색하고 상세 예시를 확인할 수 있습니다. 각 문법은 실제 화면 자료와 함께 정리됩니다.",
    primaryLabel: "문법 보러가기",
    primaryPath: "/usage",
    secondaryLabel: "연결 페이지",
    secondaryPath: "/connect",
    variant: "usage",
  },
  {
    eyebrow: "외부 연결 페이지",
    title: "숨과 관련된 다양한 페이지로 이동합니다.",
    description:
      "스팀, 유튜브, 공식 홈페이지와 깃허브로 이동하여 \n숨에 관한 다양한 정보를 수집해보세요.",
      image: "/유튜브,공식홈페이지,깃허브.png",
    variant: "connect",
    cards: [
      {
        title: "스팀 페이지",
        image: "/images/Steam.png",
        description:
          "숨의 스팀 판매 홈페이지로 이동합니다.\n숨의 구매 및 업데이트 소식을\n확인할 수 있습니다.",
        path: "https://store.steampowered.com/app/3594080/Suum/",
        bgColor: "#4e8edb",
      },
      {
        title: "숨 유튜브 채널",
        image: "/images/youtube.png",
        description:
          "숨의 공식 유튜브 채널로 이동합니다.\n숨의 강의 영상을 시청 할 수 있습니다.",
        path: "https://www.youtube.com/@suumlang",
        bgColor: "#ec5a5f",
        // bgColor: "linear-gradient(180deg, #f3afaf, #f12930)"
      },
      {
        title: "공식 홈페이지",
        image: "/images/Suumpage.png",
        description:
          "숨의 공식 홈페이지로 이동합니다. 자세한 정보 및 업데이트 소식을\n확인 할 수 있습니다.",
        path: "https://suum.pro/",
        bgColor: "#797979",
      },
    ],
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
          className={`home-section home-section-${section.variant} ${currentSection === sectionIndex ? "active" : ""}`}
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
              {section.cards ? (
                <div className="home-card-grid">
                  {section.cards.map((card) => (
                    <Link 
                      key={card.title} 
                      to={card.path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="home-link-card"
                      style={{ "--card-bg": card.bgColor } as React.CSSProperties}>
                      <img src={card.image} alt={card.title} />
                      <div className="home-link-card-body">
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : section.image ? (
                <div className="home-image-card">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="home-main-image"
                  />
                </div>
              ) : section.variant === "usage" ? (
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
              ) : section.variant === "main" ? (
                <div />
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
