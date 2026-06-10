import "../styles/pages/AboutPage.css";
import { useState, useEffect } from "react";
import about_down_arrow from "../pic/down-arrow.png"

const featureItems = [
  {
    title: "순서도 기반 구조",
    description: "프로그램의 실행 흐름을 시각적으로 따라갈 수 있어 입문자가 구조를 이해하기 쉽습니다.",
  },
  {
    title: "키보드 중심 입력",
    description: "마우스 조작을 줄이고 단축키로 구문을 구성해 빠른 작성 경험을 제공합니다.",
  },
  {
    title: "안전한 수정 흐름",
    description: "이름 변경, 자료형 관리, 오류 확인을 작성 과정 안에서 자연스럽게 처리하도록 돕습니다.",
  },
];

const flowItems = ["입력", "구조화", "검사", "실행"];

const AboutPage: React.FC = () => {
  const [isEnter, setIsEnter] = useState<Boolean>(false);
  const [isVisibleArrow, setIsVisibleArrow] = useState<Boolean>(false);
  const [isVisibleContent, setIsVisibleContent] = useState<Boolean>(false);

  useEffect(() => {
    setIsEnter(true);

    setTimeout(() => {
      setIsVisibleArrow(true);
    }, 2000);

    setTimeout(() => {
      setIsVisibleContent(true);
    }, 3000);
  }, [])

  useEffect(() => {
    // console.log(`isEnter : ${isEnter}`);
    console.log(`isVisibleArrow : ${isVisibleArrow}`);
  }, [isVisibleArrow])

  return (
    // <main className="aboutPage">
      <main className="aboutPage">
      <section className={`${isEnter ? "aboutHero" : "aboutHero-upper"} suum-container`}>
        <div>
          {/* <p className="eyebrow"></p> */}
          {/* <h1>숨은<br/><span>순서도</span>로 프로그램을 구성하는<br/>비주얼 프로그래밍 언어입니다.</h1> */}
          <h1>영어 너무 어려워.. <span>한글</span>로 된 언어는 없을까?</h1>
          <h1>코드를 <span>그림</span>으로 표현할 수는 없을까?</h1>
          <h1><span>숨</span>은 이렇게 탄생했습니다.</h1>
          {/* <p>
            숨이라는 이름에는 숨 쉬듯 자연스럽고 쉬운 프로그래밍 언어라는 의미가 담겨 있습니다.
            한글 표현과 시각적 흐름을 함께 사용해 처음 배우는 사람도 프로그램의 구조를 이해할 수 있도록 설계되었습니다.
          </p> */}
        </div>
        {/* <div className="aboutHeroCard" aria-hidden="true">
          <span>숨</span>
          <strong>SUUM</strong>
          <small>flow based language</small>
        </div> */}

      </section>
      <section className={`${isVisibleArrow ? "about-arrow-visible" : "about-arrow-hidden"} d-flex justify-content-center align-items-center pt-5 pb-5`}>
        <img className="w-40" src={about_down_arrow} />
      </section>
      {/* <section className="suum-container">
        <div className="sectionHeader">
          <p className="eyebrow"></p>
          <h2>숨이 프로그램을 구성하는 방식</h2>
        </div>
        <div className="flowGrid">
          {flowItems.map((item, index) => (
            <div className="aboutFlow flowItem" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </section> */}

      <section className={`${isVisibleContent ? "about-content-visible" : "about-content-hidden"}`}>
        <section className="aboutContent suum-container">
          <div className="aboutTextBox">
            {/* <p className="eyebrow">WHY</p> */}
            <h2>숨, 무슨 <span>뜻</span>인가요?</h2>
            <p>
              ‘숨’이라는 이름에는 숨 쉬듯 자연스럽고 쉬운 프로그래밍 언어라는 의미가 담겨 있습니다.<br/>
              또한 순서도의 형태에서 영감을 받은 이름으로, 언어의 직관적인 사용성을 상징합니다.
            </p>
          </div>
        </section>

        <section className="aboutContent suum-container">
          <div className="aboutTextBox">
            {/* <p className="eyebrow">WHY</p> */}
            <h2>숨, <span>왜</span> 써야하나요?</h2>
            <p>
              기존 비주얼 프로그래밍 언어는 직관적이지만 마우스 조작이 많아 실제 개발 흐름에서는 비효율적일 수 있습니다.<br/>
              숨은 이 한계를 줄이기 위해 키보드 중심의 비주얼 프로그래밍을 지향합니다.
            </p>
          </div>

          {/* <div className="featureGrid">
            {featureItems.map((item) => (
              <article className="featureCard" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div> */}
        </section>

        <section className="aboutPhilosophy suum-container">
          {/* <p className="eyebrow">PHILOSOPHY</p> */}
          <h2>숨, <span>어떻게</span> 만들게 되었나요?</h2>
          <p>
            예약어 대신 단축키로 구문을 만들 수 있어 언어 입력 방식에 얽매이지 않고 여러 언어 환경에서 자연스럽게 프로그래밍할 수 있습니다.<br/>
            숨은 실수를 줄이고, 복잡한 프로그램도 안정적으로 작성할 수 있는 학습형 개발 경험을 목표로 합니다.
          </p>
        </section>
      </section>
      
    </main>
  );
};

export default AboutPage;
