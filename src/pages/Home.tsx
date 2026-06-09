// const Home: React.FC = () => {
//     return(
//         <main style={{ flex: 1, padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
//         <h2 style={{ marginBottom: '20px' }}>⚓ 앵커 이동 테스트 페이지</h2>
//         <p style={{ color: '#666' }}>마우스를 아래로 쭉~ 스크롤해서 푸터의 이미지를 클릭해 보세요.</p>
        
//         {/* 테스트용 2000px 높이 박스 */}
//         <div style={{ 
//           height: '2000px', 
//           margin: '50px 0', 
//           background: 'linear-gradient(to bottom, #e9ecef, #dee2e6)', 
//           borderRadius: '8px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center'
//         }}>
//           <span style={{ color: '#6c757d', fontSize: '1.5rem', fontWeight: 'bold' }}>
//             (여기는 스크롤 확인용 빈 공간입니다)
//           </span>
//         </div>
        
//         <p style={{ marginTop: '20px', fontWeight: 'bold' }}>정신없이 내려오느라 고생하셨습니다! 아래 푸터가 있습니다. 👇</p>
//       </main>
//     )
// };

// export default Home;

import { useEffect, useRef, useState } from "react";
import "../App.css";

function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const targetSection = sectionRefs.current[currentSection];

    if (!targetSection) return;

    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [currentSection]);

  useEffect(() => {
  const handleWheel = (event: WheelEvent) => {
    const isScrollDown = event.deltaY > 0;
    const isScrollUp = event.deltaY < 0;

    const isLastSection = currentSection === 2;
    const isFirstSection = currentSection === 0;

    if (isLastSection && isScrollDown) {
      return;
    }

    event.preventDefault();

    if (isScrolling) return;

    setIsScrolling(true);

    if (isScrollDown && !isLastSection) {
      setCurrentSection((prev) => prev + 1);
    }

    if (isScrollUp && !isFirstSection) {
      setCurrentSection((prev) => prev - 1);
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 900);
  };

  window.addEventListener("wheel", handleWheel, { passive: false });

  return () => {
    window.removeEventListener("wheel", handleWheel);
  };
}, [currentSection, isScrolling]);

  return (
    <main className="home-scroll">
      {[0, 1, 2].map((sectionIndex) => (
        <section
          key={sectionIndex}
          ref={(element) => {
            sectionRefs.current[sectionIndex] = element;
          }}
          className={`home-section ${
            currentSection === sectionIndex ? "active" : ""
          }`}
        >
          <img
            src={`/images/home-section-${sectionIndex + 1}.png`}
            alt={`홈 섹션 ${sectionIndex + 1}`}
            className="home-section-img"
          />

          <h2>{sectionIndex + 1}구역</h2>
        </section>
      ))}
    </main>
  );
}

export default Home;