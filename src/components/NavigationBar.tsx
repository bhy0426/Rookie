import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/NavigationBar.css";
import navGroups from "../data/NavigationData";

type NavigationBarProps = {
  forceHidden?: boolean;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ forceHidden = false }) => {
  const { pathname } = useLocation();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [hoveredGroup, setHoveredGroup] = useState(navGroups[0]);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  const navRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const openNavbar = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setIsHidden(false);
    setIsExpanded(true);
  };

  const closeNavbar = (event: React.MouseEvent<HTMLElement | HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;

    const isMovingToNavbar = nextTarget !== null && navRef.current?.contains(nextTarget);
    const isMovingToPanel = nextTarget !== null && panelRef.current?.contains(nextTarget);

    if (isMovingToNavbar || isMovingToPanel) {
      return;
    }

    closeTimerRef.current = window.setTimeout(() => {
      setIsExpanded(false);
    }, 180);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPreviewImageIndex((currentIndex) =>
        (currentIndex + 1) % hoveredGroup.image.length
      );
    }, 2000);

    return () => window.clearInterval(timer);
  }, [hoveredGroup]);

  useEffect(() => {
    setIsExpanded(false);
    setIsHidden(false);
  }, [pathname]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (isExpanded) {
        setIsHidden(false);
        return;
      }

      if (event.deltaY > 0) {
        setIsHidden(true);
        return;
      }

      if (event.deltaY < 0) {
        setIsHidden(false);
      }
    };

    const handleScroll = () => {
      if (pathname !== "/" && window.scrollY <= 0) {
        setIsHidden(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [isExpanded, pathname]);

  return (
    <nav
      className={`navbar ${isExpanded ? "expanded" : ""} ${isHidden || forceHidden ? "hidden" : ""}`}
      onMouseLeave={closeNavbar}
    >
      <div className="nav-main suum-container">
        <Link to="/" className="nav-brand" aria-label="숨 홈으로 이동">
          <span className="nav-brand-mark">숨</span>
          <span>
            <strong>ㅅ ㅜ ㅁ</strong>
            <small>  S U U M</small>
          </span>
        </Link>
        <div>
          <div className="nav-links" aria-label="주요 메뉴">
            {navGroups.map((group) => (
              <div>
                <Link
                  key={group.path}
                  to={group.path}
                  className={pathname === group.path ? "active" : ""}
                  onMouseEnter={() => {
                    setHoveredGroup(group);
                    setPreviewImageIndex(0);
                    openNavbar();
                  }}
                >
                  {group.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={panelRef}
        className="nav-panel"
        onMouseEnter={openNavbar}
        onMouseLeave={closeNavbar}
      >
        <div className="suum-container nav-panel-inner">
          <div className="nav-preview">
            <p className="eyebrow">MENU</p>
            <div className="nav-preview-carousel">
              <div
                className="nav-preview-track"
                style={{ transform: `translateX(-${previewImageIndex * 600}px)` }}
              >
                {hoveredGroup.image.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={hoveredGroup.label}
                    className="nav-preview-image"
                  />
                ))}
              </div>
            </div>
            <h2>{hoveredGroup.label}</h2>
            <p>{hoveredGroup.description}</p>
          </div>
          
          {/* 이하수정중 */} 
          <div className="nav-menu-list">
            {navGroups.map((group) => (
              <div
                key={group.path}
                className="nav-menu-group"
              >
                <div className="nav-menu-sub-list">
                  {group.links.map((link) =>
                    'external' in link && link.external ? (
                      <a
                        key={link.label}
                        href={link.path}
                        target="_blank"
                        rel="noreferrer"
                        className="nav-sub-link"
                        onMouseEnter={() => {
                          setHoveredGroup(group);
                          setPreviewImageIndex(0);
                        }}
                        onClick={closeNavbar}
                      >
                        {link.label}
                      </a>
                      
                    ) : (
                      <Link
                        key={link.label}
                        to={link.path}
                        className="nav-sub-link"
                        onMouseEnter={() => {
                          setHoveredGroup(group);
                          setPreviewImageIndex(0);
                        }}
                        onClick={closeNavbar}
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;