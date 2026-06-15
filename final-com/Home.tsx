import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import HomeSearchDemo from "./HomeSearchDemo";
import homeSections from "../../data/HomeData";
import "../../styles/pages/Home.css";

let hasHomeIntroPlayed = false;

type HomeProps = {
  setHomeNavHidden: (hidden: boolean) => void;
};

function Home({ setHomeNavHidden }: HomeProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [introComplete, setIntroComplete] = useState(hasHomeIntroPlayed);
  const [introVisible, setIntroVisible] = useState(hasHomeIntroPlayed);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const wheelLockRef = useRef(false);
  const currentSectionRef = useRef(0);
  const totalSections = homeSections.length;
  const lastMainEventTimeRef = useRef(-Infinity);
  const scrollModeRef = useRef<"locked" | "free" | "relockPending">("locked");
  const relockTimerRef = useRef<number | null>(null);
  const homeRef = useRef<HTMLElement | null>(null);

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

  // 마우스 휠 입력을 감지해서 홈 화면을 "섹션 단위 스크롤"로 제어하는 훅입니다.
  // 컴포넌트가 마운트되면 window에 wheel 이벤트를 등록하고,
  // 컴포넌트가 언마운트되면 등록했던 이벤트를 제거합니다.
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      // currentSection state를 직접 읽지 않고 ref를 읽습니다.
      // window 이벤트 리스너는 React 렌더링 흐름 바깥에서 실행되므로,
      // ref를 사용하면 항상 최신 섹션 번호를 안정적으로 참조할 수 있습니다.
      const current = currentSectionRef.current;

      // deltaY가 양수면 아래 방향, 음수면 위 방향 휠 입력입니다.
      // 아주 작은 움직임은 터치패드 흔들림처럼 의도하지 않은 입력일 수 있어 무시합니다.
      const isScrollDown = event.deltaY > 6;
      const isScrollUp = event.deltaY < -6;

      // 위/아래 어느 쪽으로도 충분히 움직이지 않았다면 아무 처리도 하지 않습니다.
      if (!isScrollDown && !isScrollUp) return;

      // 현재 섹션이 첫 번째인지, 마지막인지 미리 계산합니다.
      // 첫 번째 섹션에서 위로 이동하거나 마지막 섹션에서 아래로 이동할 때
      // 별도 예외 처리를 하기 위해 필요합니다.
      const isLastSection = current === totalSections - 1;
      const isFirstSection = current === 0;

      // free 모드는 홈 내부의 섹션 잠금을 푼 상태입니다.
      // 이때는 브라우저의 기본 스크롤을 그대로 허용합니다.
      if (scrollModeRef.current === "free") {
        return;
      }

      // relockPending은 free 모드에서 다시 locked 모드로 돌아가기 직전의 대기 상태입니다.
      // 이 짧은 구간에서는 스크롤이 튀지 않도록 기본 스크롤만 막고 종료합니다.
      if (scrollModeRef.current === "relockPending") {
        event.preventDefault();
        return;
      }

      // 마지막 섹션에서 아래로 더 스크롤하면 홈 섹션 제어를 해제합니다.
      // 이후부터는 페이지의 일반 스크롤 흐름으로 넘어가며, 홈 네비게이션도 숨깁니다.
      if (isScrollDown && isLastSection) {
        scrollModeRef.current = "free";
        setHomeNavHidden(true);
        return;
      }

      // 여기부터는 홈 내부 섹션 이동을 직접 처리해야 하므로
      // 브라우저의 기본 휠 스크롤을 막습니다.
      event.preventDefault(); // 스크롤 잠금

      // 위로 이동할 때는 홈 네비게이션을 다시 보여주고,
      // 아래로 이동할 때는 홈 네비게이션을 숨깁니다.
      if (isScrollUp) {
        setHomeNavHidden(false);
      }

      if (isScrollDown) {
        setHomeNavHidden(true);
      }

      // 휠 이벤트는 한 번의 조작에도 여러 번 발생할 수 있습니다.
      // 이미 섹션 이동 중이면 추가 입력을 무시해 여러 섹션이 한꺼번에 넘어가는 것을 막습니다.
      if (wheelLockRef.current) return;

      // 첫 번째 섹션에서 위로 스크롤할 경우 이동할 이전 섹션이 없으므로 종료합니다.
      if (isScrollUp && isFirstSection) return;

      // 지금부터 약 1초 동안 추가 섹션 이동을 막습니다.
      wheelLockRef.current = true;

      // 휠 방향에 따라 다음 섹션 번호를 계산합니다.
      // 아래로 스크롤하면 다음 섹션, 위로 스크롤하면 이전 섹션입니다.
      const nextSection = isScrollDown ? current + 1 : current - 1;

      // ref는 즉시 갱신해서 다음 wheel 이벤트가 최신 값을 보게 하고,
      // state는 React에 알려 화면 렌더링과 다른 useEffect가 이어서 동작하게 합니다.
      currentSectionRef.current = nextSection;
      setCurrentSection(nextSection);

      // 980ms 뒤 휠 잠금을 해제합니다.
      // 이 시간 동안 currentSection 변경에 반응하는 다른 useEffect가
      // scrollIntoView로 해당 섹션까지 부드럽게 이동합니다.
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 980);
    };

    // passive: false 옵션을 줘야 handleWheel 안에서 event.preventDefault()가 동작합니다.
    window.addEventListener("wheel", handleWheel, { passive: false });

    // cleanup 함수입니다.
    // Home 컴포넌트가 사라질 때 전역 wheel 이벤트를 제거해 중복 등록과 메모리 누수를 막습니다.
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [totalSections, setHomeNavHidden]);

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
