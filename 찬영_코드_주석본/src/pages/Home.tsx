const Home: React.FC = () => {
  // Home은 / 주소에서 보여줄 첫 화면 컴포넌트입니다.
  // React.FC는 React 함수형 컴포넌트라는 TypeScript 타입 표시입니다.
  // App.tsx의 <Route path="/" element={<Home />} />와 연결됩니다.

  return (
    <div style={{ flex: 1, padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
      {/* style={{ ... }}는 JSX에서 직접 CSS를 넣는 방식입니다. */}
      {/* 바깥 중괄호는 JSX에서 JavaScript 값을 넣는 표시이고, 안쪽 중괄호는 CSS 객체입니다. */}
      {/* flex: 1은 남는 공간을 채우는 설정, padding은 안쪽 여백, textAlign은 글자 정렬입니다. */}

      <h2 style={{ marginBottom: '20px' }}>스크롤 이동 테스트 페이지</h2>
      {/* h2는 제목입니다. marginBottom은 아래 여백입니다. */}

      <p style={{ color: '#666' }}>마우스를 아래로 스크롤해서 푸터의 이미지를 클릭해 보세요.</p>
      {/* p는 문단입니다. color는 글자 색입니다. */}

      <div style={{
        height: '2000px',
        margin: '50px 0',
        background: 'linear-gradient(to bottom, #e9ecef, #dee2e6)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* 이 div는 페이지가 길게 스크롤되는지 확인하기 위한 큰 박스입니다. */}
        {/* display: 'flex'는 안쪽 요소를 배치하기 쉽게 만드는 CSS입니다. */}
        {/* alignItems와 justifyContent는 안쪽 글자를 세로/가로 가운데로 보냅니다. */}

        <span style={{ color: '#6c757d', fontSize: '1.5rem', fontWeight: 'bold' }}>
          여기는 스크롤 확인용 빈 공간입니다.
        </span>
        {/* span은 짧은 글자 조각을 넣을 때 사용합니다. */}
      </div>

      <p style={{ marginTop: '20px', fontWeight: 'bold' }}>
        푸터 이미지를 누르면 NavigationBar.tsx의 id="main" 위치로 이동합니다.
      </p>
      {/* 이 문장은 Footer.tsx의 href="#main" 동작을 확인하기 위한 안내입니다. */}
    </div>
  )
};

export default Home;
// App.tsx에서 import Home from './pages/Home'으로 가져가서 사용합니다.
