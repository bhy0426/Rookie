import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages/Home.css";

let hasHomeIntroPlayed = false;

const homeSections = [
  {
    title: "숨",
    description:
      "<span class='highlight'>한글</span> 비주얼 <span class='highlight'>프로그래밍</span> 언어",
    variant: "main",
  },
  {
    eyebrow: "숨 이란?",
    title: "한글로 코딩하며, 비주얼로 코딩하다.",
    description:
      "숨은 순서도 기반 구조와 한글 표현을 결합해 프로그램의 흐름을 직관적으로 이해하도록 만든 비주얼 프로그래밍 언어입니다. ( •̀ ω •́ )✧",
      image: "/home/explain.png",
    variant: "explain",
  },
  {
    eyebrow: "숨에 관하여",
    title: "숨은 무엇이고, 어떻게 만들어졌을까?",
    description:
      "숨이 무슨 뜻이고, 왜 써야하며, 어떻게 만들었는지 궁금하지 않나요? (p≧w≦q)",
    primaryLabel: "숨이 무엇일까",
    primaryPath: "/about",
    points: ["숨은 무슨 뜻일까", "숨 이거 왜 써야하지?", "어쩌다 만들게 되었나"],
    variant: "search",
  },
  {
    eyebrow: "사용 방법",
    title: "숨은 어떻게 사용해야 할까?",
    description:
      "숨에도 문법과 코드가 있답니다. 숨의 문법을 검색부터 미리보기, 예시 코드, 상세 학습까지 한 눈에 확인해보세요. (～￣▽￣)～",
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
      "스팀, 유튜브, 공식 홈페이지와 깃허브로 이동하여 \n숨에 관한 다양한 정보를 수집해보세요.\no((>ω< ))o",
    variant: "connect",
    cards: [
      {
        title: "스팀 페이지",
        image: "/logo/SteamLogo.png",
        description:
          "숨의 스팀 판매 홈페이지로 이동합니다.\n숨의 구매 및 업데이트 소식을\n확인할 수 있습니다.",
        path: "https://store.steampowered.com/app/3594080/Suum/",
        bgColor: "#4e8edb",
      },
      {
        title: "숨 유튜브 채널",
        image: "/logo/YoutubeLogo.png",
        description:
          "숨의 공식 유튜브 채널로 이동합니다.\n숨의 강의 영상을 시청 할 수 있습니다.",
        path: "https://www.youtube.com/@suumlang",
        bgColor: "#ec5a5f",
      },
      {
        title: "공식 홈페이지",
        image: "/logo/SuumLogo.png",
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
  const lastMainEventTimeRef = useRef(-Infinity);
  
  // 수정
  const scrollModeRef = useRef<"locked" | "free" | "relockPending">("locked");
  const relockTimerRef = useRef<number | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);

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

    // 수정
    if (scrollModeRef.current === "free") return;
    
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

      if (scrollModeRef.current === "free") {
        return;
      }

      if (scrollModeRef.current === "relockPending") {
        event.preventDefault();
        return;
      }

      if (isScrollDown && isLastSection) {
        scrollModeRef.current = "free";
        setHomeNavHidden(true);
        return;
      }

      event.preventDefault();

      if (isScrollUp) {
        setHomeNavHidden(false);
      }

      if (isScrollDown) {
        setHomeNavHidden(true);
      }

      if (wheelLockRef.current) return;

      if (isScrollUp && isFirstSection) return;


      // event.preventDefault();

      // if (isScrollUp) {
      //   setHomeNavHidden(false);
      // }

      // if (isScrollDown) {
      //   setHomeNavHidden(true);
      // }

      // if (wheelLockRef.current) return;

      // if ((isScrollDown && isLastSection) || (isScrollUp && isFirstSection)) return;

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

  //   useEffect(() => {
  //   const handleWheel = (event: WheelEvent) => {
  //     // 기존 wheel 코드
  //   };

  //   window.addEventListener("wheel", handleWheel, { passive: false });

  //   return () => {
  //     window.removeEventListener("wheel", handleWheel);
  //   };
  // }, [totalSections, setHomeNavHidden]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollModeRef.current !== "free") return;

      const homeTop = homeRef.current?.getBoundingClientRect().top ?? 0;

      if (homeTop >= -4 && window.scrollY <= 4) {
        scrollModeRef.current = "relockPending";

        currentSectionRef.current = totalSections - 1;
        setCurrentSection(totalSections - 1);

        if (relockTimerRef.current) {
          window.clearTimeout(relockTimerRef.current);
        }

        relockTimerRef.current = window.setTimeout(() => {
          scrollModeRef.current = "locked";
          relockTimerRef.current = null;
        }, 700);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (relockTimerRef.current) {
        window.clearTimeout(relockTimerRef.current);
      }
    };
  }, [totalSections]);

  useEffect(() => { // 섹션 진입 시 커스텀 이벤트 발생
    if (currentSection !== 0) return;

    const now = performance.now();

    if (now - lastMainEventTimeRef.current < 1200) {
      return;
    }

    lastMainEventTimeRef.current = now;

    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("mainSectionEvent"));
    }, 100);
  }, [currentSection]); 


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
      ref={homeRef}
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
      {homeSections.map((section, sectionIndex) => {
        const isActive = currentSection === sectionIndex;
        if (section.variant === "main") {
          return (
            <section
              key={section.title}
              ref={(element) => {
                sectionRefs.current[sectionIndex] = element;
              }}
              className={`home-section home-section-main ${isActive ? "active" : ""}`}
            >
              <div className="home-main-content">
                <h1 className="home-main-title">{section.title}</h1>
                <p
                  className="home-main-description"
                  dangerouslySetInnerHTML={{ __html: section.description }}
                />
              </div>
            </section>
          );
        }

        return(
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
      )})}
    </main>
  );
}

export default Home;