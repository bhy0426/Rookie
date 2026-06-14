// FILE: pages/home/Home.tsx
// PURPOSE: HOME PAGE. 풀페이지 섹션 스크롤, 첫 진입 애니메이션, 배경 이벤트를 훅으로 제어합니다.
// FLOW 01: Home이 렌더링되면 현재 섹션 상태와 스크롤 제어용 ref들을 준비합니다.
// FLOW 02: 첫 방문 effect가 인트로 표시 타이머를 시작합니다.
// FLOW 03: currentSection 변경 effect가 해당 section DOM으로 이동합니다.
// FLOW 04: wheel effect가 휠 방향을 읽고 currentSection과 nav 숨김 상태를 바꿉니다.
// FLOW 05: 마지막 섹션 이후 free scroll로 풀렸다가 상단 복귀 시 locked 모드로 돌아옵니다.
// FLOW 06: 첫 섹션 진입 시 mainSectionEvent를 발생시켜 HangulBackground 애니메이션을 유도합니다.



import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import HomeSearchDemo from "./HomeSearchDemo";
import homeSections from "../../data/HomeData";
import "../../styles/pages/Home.css";

let hasHomeIntroPlayed = false;

// PROPS: 이 컴포넌트가 부모에게 받는 값과 콜백의 타입을 정의합니다.
type HomeProps = {
  setHomeNavHidden: (hidden: boolean) => void;
};

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
function Home({ setHomeNavHidden }: HomeProps) {
// HOOK STATE: Home에서 현재 화면에 맞춰진 섹션 인덱스를 저장합니다.
// FLOW STEP 01: 현재 보여줄 Home 섹션 번호를 상태로 저장합니다.
  const [currentSection, setCurrentSection] = useState(0);
// HOOK STATE: Home 첫 진입 인트로 애니메이션이 끝났는지 저장합니다.
// FLOW STEP 02: 첫 방문 인트로가 완료됐는지 저장해 className에 반영합니다.
  const [introComplete, setIntroComplete] = useState(hasHomeIntroPlayed);
// HOOK STATE: Home 첫 진입 인트로 요소를 화면에 보이게 할지 저장합니다.
  const [introVisible, setIntroVisible] = useState(hasHomeIntroPlayed);
// HOOK REF: Home의 각 section DOM을 배열로 저장해 scrollIntoView 대상에 사용합니다.
// FLOW STEP 03: 각 section DOM을 배열로 모아 currentSection 이동 대상에 사용합니다.
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
// HOOK REF: 휠 한 번에 섹션이 여러 번 넘어가지 않도록 잠금 상태를 저장합니다.
  const wheelLockRef = useRef(false);
// HOOK REF: wheel/scroll 이벤트 콜백에서 최신 섹션 인덱스를 읽기 위해 저장합니다.
  const currentSectionRef = useRef(0);
  const totalSections = homeSections.length;
// HOOK REF: 배경 파티클 이벤트가 너무 자주 발생하지 않도록 마지막 시간을 저장합니다.
  const lastMainEventTimeRef = useRef(-Infinity);
// HOOK REF: Home 스크롤 모드를 locked/free/relockPending으로 저장합니다.
// FLOW STEP 04: 섹션 고정 스크롤과 일반 스크롤 모드를 ref로 관리합니다.
  const scrollModeRef = useRef<"locked" | "free" | "relockPending">("locked");
// HOOK REF: free 스크롤에서 다시 섹션 잠금으로 돌아가는 타이머 id를 저장합니다.
  const relockTimerRef = useRef<number | null>(null);
// HOOK REF: Home main DOM의 위치를 읽어 free 스크롤 복귀 시점을 판단합니다.
  const homeRef = useRef<HTMLElement | null>(null);

// HOOK EFFECT: Home 첫 방문 인트로 표시/완료 타이머를 실행하고 cleanup에서 타이머를 정리합니다.
// FLOW STEP 05: 첫 방문이면 intro visible/complete 타이머를 시작합니다.
  useEffect(() => {
    if (hasHomeIntroPlayed) {
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

// HOOK EFFECT: currentSection이 바뀌면 해당 section DOM으로 부드럽게 스크롤합니다.
// FLOW STEP 06: currentSection이 바뀌면 해당 section으로 scrollIntoView 합니다.
  useEffect(() => {
    currentSectionRef.current = currentSection;

    if (scrollModeRef.current === "free") return;

    const targetSection = sectionRefs.current[currentSection];

    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentSection]);

// HOOK EFFECT: wheel 이벤트로 섹션 단위 이동과 네비게이션 숨김 상태를 제어합니다.
// FLOW STEP 07: wheel 이벤트로 다음/이전 섹션을 계산하고 currentSection을 갱신합니다.
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

// HOOK EFFECT: free 스크롤에서 페이지 상단으로 돌아오면 섹션 잠금 모드로 복귀시킵니다.
// FLOW STEP 08: free scroll 상태에서 다시 상단에 도착하면 locked 모드로 복귀합니다.
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

// HOOK EFFECT: 첫 섹션에 진입하면 배경 파티클 컴포넌트가 받을 mainSectionEvent를 발생시킵니다.
// FLOW STEP 09: 첫 섹션에 들어올 때 배경 컴포넌트가 받을 mainSectionEvent를 보냅니다.
  useEffect(() => {
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

  return (
    <main
      ref={homeRef}
      className={`home-scroll ${introVisible ? "intro-visible" : ""} ${
        introComplete ? "intro-complete" : "intro-sequence"
      }`}
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

        return (
          <section
            key={section.title}
            ref={(element) => {
              sectionRefs.current[sectionIndex] = element;
            }}
            className={`home-section home-section-${section.variant} ${isActive ? "active" : ""}`}
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
                        style={{ "--card-bg": card.bgColor } as CSSProperties}
                      >
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
                    <img src={section.image} alt={section.title} className="home-main-image" />
                  </div>
                ) : section.variant === "usage" ? (
                  <HomeSearchDemo />
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
        );
      })}
    </main>
  );
}

export default Home;
