export default function AboutPage() {
  // AboutPage는 /about 주소에서 보여줄 페이지 컴포넌트입니다.
  // App.tsx의 <Route path="/about" element={<AboutPage />} />와 연결됩니다.
  // export default는 이 파일의 대표 컴포넌트로 AboutPage를 내보낸다는 뜻입니다.

  return <h1>About Page</h1>;
  // return 뒤의 JSX가 실제 화면에 보입니다.
  // 현재는 간단히 제목만 보여주는 상태입니다.
}
