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
