const Home: React.FC = () => {
    return(
        <main style={{ flex: 1, padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
        <h2 style={{ marginBottom: '20px' }}>⚓ 앵커 이동 테스트 페이지</h2>
        <p style={{ color: '#666' }}>마우스를 아래로 쭉~ 스크롤해서 푸터의 이미지를 클릭해 보세요.</p>
        
        {/* 테스트용 2000px 높이 박스 */}
        <div style={{ 
          height: '2000px', 
          margin: '50px 0', 
          background: 'linear-gradient(to bottom, #e9ecef, #dee2e6)', 
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{ color: '#6c757d', fontSize: '1.5rem', fontWeight: 'bold' }}>
            (여기는 스크롤 확인용 빈 공간입니다)
          </span>
        </div>
        
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>정신없이 내려오느라 고생하셨습니다! 아래 푸터가 있습니다. 👇</p>
      </main>
    )
};

export default Home;