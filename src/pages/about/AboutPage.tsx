import "../../styles/pages/AboutPage.css";
import { useState, useEffect } from "react";

// about_hero h1 JSX 배열
const titles = [
    <>영어가 너무 어려워.. <span>한글</span>로 된 언어는 없을까?</>,
    <>코드를 <span>그림</span>으로 표현할 수는 없을까?</>,
    <><span>숨</span>은 이렇게 탄생했습니다.</>,
  ];

const AboutPage: React.FC = () => {
  // about_arrow 표시 여부
  const [isVisibleArrow, setIsVisibleArrow] = useState<boolean>(false);

  // about_content 표시 여부
  const [isVisibleContent, setIsVisibleContent] = useState<boolean>(false);

  // 투명 클래스 전환 여부
  const [isclear, setIsClear] = useState<boolean>(false);

  // aboutHero h1 인덱스
  const [titleIndex, setTitleIndex] = useState<number>(0);
  
  // 시작 애니메이션, 컴포넌트가 처음 마운트 될 때
  useEffect(() => {
    
    // 투명 화면으로 초기화
    setIsClear(true);

    // 0.25초 뒤에 투명 화면에서 첫 번째 h1으로 전환
    setTimeout(() => {
      setIsClear(false);
    }, 250);

    // 0.25초 뒤에 화살표 페이드 인
    setTimeout(() => {
      setIsVisibleArrow(true);
    }, 250);
  }, []);

  // about_hero h1 스크롤 전환 애니메이션 , 컴포넌트가 처음 마운트 될 때
  useEffect(() => {
    // 스크롤 시 호출되는 onScroll 함수
    const onScroll = () => {

      if(window.scrollY < 600)
      {
        setTitleIndex(0);
        setIsClear(false);
      }
      else if(window.scrollY < 650)
      {
        setIsClear(true);
      }
      else if(window.scrollY < 1800)
      {
        setTitleIndex(1);
        setIsClear(false);
      }
      else if(window.scrollY < 1850)
      {
        setIsClear(true);
      }
      else if(window.scrollY < 3000)
      {
        setTitleIndex(2);
        setIsClear(false);
        setIsVisibleContent(true);
      }
    };
    // scroll 이벤트가 발생하면 onScroll 함수 호출
    window.addEventListener("scroll", onScroll);
    // 컴포넌트가 내려가면
    return () => {
      // scroll 이벤트에 등록된 onScroll 함수 제거
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
      <main className="about_page">
      <section className="about_hero_sticky_area">
        <section className={`${isclear ? "about_hero_upper" : "about_hero"} suum-container`}>
          <div>
            <h1>{titles[titleIndex]}</h1>
          </div>
        </section>
        <section className={`${isVisibleArrow ? "about_arrow_visible" : "about_arrow_hidden"} d-flex justify-content-center align-items-center pt-5 pb-5`}>
          <img src="about/about_img0.png" />
        </section>
      </section>

      <section className={`${isVisibleContent ? "about_content_visible" : "about_content_hidden"}`}>
        <section id="mean" className="about_content suum-container">
          <div className="about_text_box">
            <h2>숨, 무슨 <span>뜻</span>인가요?</h2>
            <p>
              ‘숨’이라는 이름에는 숨 쉬듯 쉬운 프로그래밍 언어라는 의미가 담겨 있습니다.<br/>
              또한 순서도의 모양에서 영감을 받은 이름으로, 언어의 직관적인 사용성을 상징합니다.
            </p>
          </div>
          <div className="mx-auto">
            <img src="logo/icon.png" className="about_img"/>
          </div>
        </section>

        <section id="feature" className="about_content suum-container">
          <div className="about_text_box">
            <h2>숨, <span>왜</span> 써야하나요?</h2>
            <p>
              기존 비주얼 프로그래밍 언어는 많은 마우스 조작으로 인해 비효율적이었습니다.<br/>
              숨은 이러한 단점을 보완하기 위해 키보드 중심의 비주얼 프로그래밍을 지향합니다.
            </p>
          </div>
          <div className="mx-auto bg-dark">
            <img src="about/about_img1.png" className="about_img"/>
          </div>
        </section>

        <section id="philosophy" className="about_content suum-container">
          <div className="about_text_box">
            <h2>숨, <span>어떻게</span> 만들게 되었나요?</h2>
            <p>
              순서도로 직관적으로 프로그램을 만들 수 있으면서도,<br/>
              키보드 중심 입력과 안전한 구조를 통해 입문자뿐 아니라<br/>
              전문 개발자도 효율적으로 사용할 수 있도록 설계되었습니다.
            </p>
          </div>
          <div className="mx-auto bg-dark">
            <img src="about/about_img2.png"  className="about_img"/>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutPage;
