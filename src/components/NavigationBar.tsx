import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/NavigationBar.css";

const navGroups = [
  {
    label: "숨에 관하여",
    path: "/about",
    description: "숨의 목적, 특징, 개발 철학을 소개합니다.",
    links: [
      { label: "프로젝트 소개", path: "/about" },
      { label: "언어 특징", path: "/about" },
    ],
  },
  {
    label: "사용하기",
    path: "/usage",
    description: "문법 검색, 예시 화면, 상세 설명을 확인합니다.",
    links: [
      { label: "사용 메인", path: "/usage" },
      { label: "문법 목록", path: "/usage" },
    ],
  },
  {
    label: "연결",
    path: "/connect",
    description: "공식 페이지와 프로젝트 저장소로 이동합니다.",
    links: [
      { label: "연결 메인", path: "/connect" },
      { label: "공식 홈페이지", path: "https://suum.pro/", external: true },
    ],
  },
];

type NavigationBarProps = {
  forceHidden?: boolean;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ forceHidden = false }) => {
  const { pathname } = useLocation();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [hoveredGroup, setHoveredGroup] = useState(navGroups[0]);

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
            <strong>ㅅㅜㅁ</strong>
            <small>  S U U M</small>
          </span>
        </Link>

        <div className="nav-links" aria-label="주요 메뉴">
          {navGroups.map((group) => (
            <Link
              key={group.path}
              to={group.path}
              className={pathname === group.path ? "active" : ""}
              onMouseEnter={() => {
                setHoveredGroup(group);
                openNavbar();
              }}
            >
              {group.label}
            </Link>
          ))}
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
            <h2>{hoveredGroup.label}</h2>
            <p>{hoveredGroup.description}</p>
          </div>

          <div className="nav-menu-list">
            {hoveredGroup.links.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.path}
                  target="_blank"
                  rel="noreferrer"
                  className="nav-sub-link"
                >
                  {link.label}
                </a>
              ) : (
                <Link key={link.label} to={link.path} className="nav-sub-link">
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;