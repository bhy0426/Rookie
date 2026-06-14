// FILE: pages/about/AboutPage.tsx
// PURPOSE: ABOUT PAGE. 스크롤 위치에 따라 제목/화살표/본문 표시 상태를 바꿉니다.
// FLOW 01: About 페이지가 렌더링되면 화살표/본문/전환/제목 인덱스 상태를 준비합니다.
// FLOW 02: mount effect가 초기 전환 애니메이션과 화살표 표시 타이머를 시작합니다.
// FLOW 03: scroll 이벤트가 window.scrollY를 기준으로 titleIndex와 transition 상태를 바꿉니다.
// FLOW 04: 일정 스크롤 위치를 넘으면 본문 영역을 visible 상태로 바꿉니다.
// FLOW 05: cleanup에서 scroll 이벤트 리스너를 제거합니다.



import "../../styles/pages/AboutPage.css";
import { useState, useEffect } from "react";

// aboutHero h1 JSX 배열
// DATA: hook이 아니라 렌더링에 참조되는 정적 데이터입니다.
const titles = [
    <>영어가 너무 어려워.. <span>한글</span>로 된 언어는 없을까?</>,
    <>코드를 <span>그림</span>으로 표현할 수는 없을까?</>,
    <><span>숨</span>은 이렇게 탄생했습니다.</>,
  ];

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
const AboutPage: React.FC = () => {
// HOOK STATE: About 페이지에서 아래 화살표를 보여줄지 저장합니다.
// FLOW STEP 01: 첫 진입 후 아래 화살표를 보여줄지 저장합니다.
  const [isVisibleArrow, setIsVisibleArrow] = useState<Boolean>(false);
// HOOK STATE: About 페이지 본문 섹션을 보여줄지 저장합니다.
// FLOW STEP 02: 스크롤 후 본문 콘텐츠를 보여줄지 저장합니다.
  const [isVisibleContent, setIsVisibleContent] = useState<Boolean>(false);

  // 휠 잠금 여부
// HOOK STATE: About 히어로 제목 전환 애니메이션 상태를 저장합니다.
// FLOW STEP 03: 제목 전환 애니메이션 class를 바꿀지 저장합니다.
  const [isTransition, setIsTransition] = useState<Boolean>(false);

  // aboutHero h1 인덱스
// HOOK STATE: About 히어로에서 현재 보여줄 제목 배열 인덱스를 저장합니다.
// FLOW STEP 04: 현재 스크롤 위치에 맞는 hero 제목 인덱스를 저장합니다.
  const [titleIndex, setTitleIndex] = useState(0);
  
  // 컴포넌트를 처음 불러올 때
// HOOK EFFECT: 스크롤 위치에 따라 히어로 제목, 전환 상태, 본문/화살표 노출 상태를 갱신합니다.
// FLOW STEP 05: mount 시 scroll listener와 초기 animation timer를 등록합니다.
  useEffect(() => {
    
    // 스크롤 시 호출되는 onScroll 함수
// FLOW STEP 06: scrollY 구간에 따라 titleIndex, transition, content visibility를 갱신합니다.
    const onScroll = () => {

      if(window.scrollY < 600)
      {
        setTitleIndex(0);
        setIsTransition(false);
      }
      else if(window.scrollY < 650)
      {
        setIsTransition(true);
      }
      else if(window.scrollY < 1800)
      {
        setTitleIndex(1);
        setIsTransition(false);
      }
      else if(window.scrollY < 1850)
      {
        setIsTransition(true);
      }
      else if(window.scrollY < 3000)
      {
        setTitleIndex(2);
        setIsTransition(false);
        setIsVisibleContent(true);
      }
    };

    // 시작 애니메이션
    setIsTransition(true);

    setTimeout(() => {
      setIsTransition(false);
    }, 250);


    setTimeout(() => {
      setIsVisibleArrow(true);
    }, 250);

    // scroll 이벤트가 발생하면 onScroll 함수 호출
    window.addEventListener("scroll", onScroll);

    // 컴포넌트가 내려가면
    return () => {
      // scroll 이벤트에 등록된 onScroll 함수 제거
      window.removeEventListener("scroll", onScroll);
    };
    
  }, []);

  return (
      <main className="aboutPage">
      <section className="aboutHeroStickyArea">
        <section className={`${!isTransition ? "aboutHero" : "aboutHero-upper"} suum-container`}>
          <div>
            <h1>{titles[titleIndex]}</h1>
          </div>
        </section>
        <section className={`${isVisibleArrow ? "about-arrow-visible" : "about-arrow-hidden"} d-flex justify-content-center align-items-center pt-5 pb-5`}>
          <img src="/about/about_down_arrow.png" />
        </section>
      </section>

      <section className={`${isVisibleContent ? "about-content-visible" : "about-content-hidden"}`}>
        <section className="aboutContent suum-container">
          <div className="aboutTextBox">
            <h2>숨, 무슨 <span>뜻</span>인가요?</h2>
            <p>
              ‘숨’이라는 이름에는 숨 쉬듯 쉬운 프로그래밍 언어라는 의미가 담겨 있습니다.<br/>
              또한 순서도의 모양에서 영감을 받은 이름으로, 언어의 직관적인 사용성을 상징합니다.
            </p>
          </div>
          <div className="m-auto">
            <img src="/logo/icon.png"  className="aboutImg"/>
          </div>
        </section>

        <section className="aboutContent suum-container">
          <div className="aboutTextBox">
            <h2>숨, <span>왜</span> 써야하나요?</h2>
            <p>
              기존 비주얼 프로그래밍 언어는 많은 마우스 조작으로 인해 비효율적이었습니다.<br/>
              숨은 이러한 단점을 보완하기 위해 키보드 중심의 비주얼 프로그래밍을 지향합니다.
            </p>
          </div>
          <div className="m-auto bg-dark">
            <img src="/about/about_img1.png"  className="aboutImg"/>
          </div>
        </section>

        <section className="aboutContent suum-container">
          <div className="aboutTextBox">
            <h2>숨, <span>어떻게</span> 만들게 되었나요?</h2>
            <p>
              순서도로 직관적으로 프로그램을 만들 수 있으면서도,<br/>
              키보드 중심 입력과 안전한 구조를 통해 입문자뿐 아니라<br/>
              전문 개발자도 효율적으로 사용할 수 있도록 설계되었습니다.
            </p>
          </div>
          <div className="m-auto bg-dark">
            <img src="/about/about_img2.png"  className="aboutImg"/>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutPage;
