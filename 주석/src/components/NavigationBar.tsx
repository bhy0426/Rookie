// FILE: components/NavigationBar.tsx
// PURPOSE: NAVIGATION COMPONENT. 현재 경로, 호버 메뉴, 스크롤 방향에 따라 네비게이션 상태를 관리합니다.
// FLOW 01: 현재 pathname을 읽고 네비게이션 표시/활성 링크 기준으로 사용합니다.
// FLOW 02: hover가 발생하면 hoveredGroup과 previewImageIndex를 갱신하고 확장 패널을 엽니다.
// FLOW 03: preview effect가 hoveredGroup 기준으로 이미지를 2초마다 넘깁니다.
// FLOW 04: wheel/scroll effect가 사용자의 스크롤 방향에 따라 nav hidden 상태를 바꿉니다.
// FLOW 05: 라우트가 바뀌면 열린 패널과 숨김 상태를 초기화합니다.



import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/NavigationBar.css";
import navGroups from "../data/NavigationData";

// PROPS: 이 컴포넌트가 부모에게 받는 값과 콜백의 타입을 정의합니다.
type NavigationBarProps = {
  forceHidden?: boolean;
};

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
const NavigationBar: React.FC<NavigationBarProps> = ({ forceHidden = false }) => {
// ROUTER HOOK: 현재 pathname을 읽어 라우트 변경에 반응합니다.
// FLOW STEP 01: 현재 경로를 읽어 active link와 route-change 초기화에 사용합니다.
  const { pathname } = useLocation();

// HOOK STATE: 네비게이션 확장 패널이 열려 있는지 저장합니다.
// FLOW STEP 02: hover panel이 열렸는지 상태로 저장합니다.
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
// HOOK STATE: 스크롤 방향에 따라 네비게이션 바를 숨길지 저장합니다.
// FLOW STEP 03: wheel/scroll 결과로 nav를 숨길지 상태로 저장합니다.
  const [isHidden, setIsHidden] = useState<boolean>(false);
// HOOK STATE: 현재 마우스를 올린 네비게이션 그룹과 미리보기 내용을 저장합니다.
// FLOW STEP 04: 사용자가 hover한 메뉴 그룹을 저장해 preview 내용을 바꿉니다.
  const [hoveredGroup, setHoveredGroup] = useState(navGroups[0]);
// HOOK STATE: 네비게이션 미리보기 캐러셀에서 보여줄 이미지 순서를 저장합니다.
// FLOW STEP 05: preview carousel에서 몇 번째 이미지를 보여줄지 저장합니다.
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

// HOOK REF: 네비게이션 영역 DOM을 기억해 마우스가 메뉴 안에 있는지 판단합니다.
  const navRef = useRef<HTMLElement | null>(null);
// HOOK REF: 확장 패널 DOM을 기억해 hover 이동 중 닫힘을 방지합니다.
  const panelRef = useRef<HTMLDivElement | null>(null);
// HOOK REF: 네비게이션 패널 닫힘 지연 타이머 id를 저장합니다.
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

// HOOK EFFECT: hover 중인 메뉴 그룹의 preview 이미지를 2초마다 다음 이미지로 넘깁니다.
// FLOW STEP 06: hoveredGroup이 바뀔 때마다 2초 interval로 preview 이미지를 순환합니다.
  useEffect(() => {
    const timer = window.setInterval(() => {
      setPreviewImageIndex((currentIndex) =>
        (currentIndex + 1) % hoveredGroup.image.length
      );
    }, 2000);

    return () => window.clearInterval(timer);
  }, [hoveredGroup]);

// HOOK EFFECT: 라우트가 바뀌면 열린 네비게이션 패널과 숨김 상태를 초기화합니다.
// FLOW STEP 07: pathname이 바뀌면 패널을 닫고 hidden 상태를 초기화합니다.
  useEffect(() => {
    setIsExpanded(false);
    setIsHidden(false);
  }, [pathname]);

// HOOK EFFECT: wheel/scroll 이벤트로 네비게이션 숨김 상태를 갱신하고 cleanup에서 이벤트를 해제합니다.
// FLOW STEP 08: wheel/scroll listener를 등록해 nav 숨김 상태를 실시간으로 갱신합니다.
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
            <p className="eyebrow">미리보기</p>
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