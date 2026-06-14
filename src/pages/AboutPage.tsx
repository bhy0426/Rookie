import "../styles/pages/AboutPage.css";
import { useState, useEffect, useRef } from "react";

// aboutHero h1 JSX 배열
const titles = [
    <>영어가 너무 어려워.. <span>한글</span>로 된 언어는 없을까?</>,
    <>코드를 <span>그림</span>으로 표현할 수는 없을까?</>,
    <><span>숨</span>은 이렇게 탄생했습니다.</>,
  ];

const AboutPage: React.FC = () => {
  const [isVisibleArrow, setIsVisibleArrow] = useState<Boolean>(false);
  const [isVisibleContent, setIsVisibleContent] = useState<Boolean>(false);

  // 스크롤 위치
  const scrollY = useRef(false);

  // 휠 잠금 여부
  const [isTransition, setIsTransition] = useState<Boolean>(false);

  // aboutHero h1 인덱스
  const [titleIndex, setTitleIndex] = useState(0);
  
  // 컴포넌트를 처음 불러올 때
  useEffect(() => {
    
    // 시작 애니메이션
    setIsTransition(true);

    setTimeout(() => {
      setIsTransition(false);
    }, 250);


    setTimeout(() => {
      setIsVisibleArrow(true);
    }, 250);

    // ---------------------------------

    // 스크롤 시 호출되는 onScroll 함수
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

      console.log("window.scrollY : " + window.scrollY);
    };

    // wheel(마우스 휠) 이벤트가 발생하면 onScroll 함수 호출
    // { passive: false } : 이벤트 안에서 event.preventDefault()를 쓸 수 있게 하겠다
    window.addEventListener("scroll", onScroll);

    // 컴포넌트가 내려가면
    return () => {
      // scroll 이벤트에 등록된 onScroll 함수 제거
      window.removeEventListener("scroll", onScroll);
    };
    
  }, []);

  // titleIndex값이 변경될 때
  useEffect(() => {
    console.log("titleIndex : " + titleIndex);
  }, [titleIndex]);
  

  return (
      <main className="aboutPage">
      {/* <section className={`${isVisibleContent ? "aboutHero-lower" : "aboutHero-upper"} aboutHeroStickyArea aboutHero suum-container`}> */}
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
      {/* <section className="about-content-visible"> */}
        <section className="aboutContent suum-container">
          <div className="aboutTextBox">
            {/* <p className="eyebrow">WHY</p> */}
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
            {/* <p className="eyebrow">WHY</p> */}
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
          {/* <p className="eyebrow">PHILOSOPHY</p> */}
          <div className="aboutTextBox">
            <h2>숨, <span>어떻게</span> 만들게 되었나요?</h2>
            <p>
              {/* 예약어 대신 단축키로 구문을 만들 수 있어 언어 입력 방식에 얽매이지 않고 여러 언어 환경에서 자연스럽게 프로그래밍할 수 있습니다.<br/>
              숨은 실수를 줄이고, 복잡한 프로그램도 안정적으로 작성할 수 있는 학습형 개발 경험을 목표로 합니다. */}
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
