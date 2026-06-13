const navGroups = [
  {
    label: "숨에 관하여",
    path: "/about",
    image: "/images/about-preview.png",
    description: "숨의 목적, 특징, 개발 철학을 소개합니다.",
    links: [
      { label: "프로젝트 소개", path: "/about" },
      { label: "언어 특징", path: "/about" },
    ],
  },
  {
    label: "사용하기",
    path: "/usage",
    image: "/images/usage-preview.png",
    description: "문법 검색, 예시 화면, 상세 설명을 확인합니다.",
    links: [
      { label: "사용 메인", path: "/usage" },
      { label: "문법 검색", path: "/usage#search" },
      { label: "문법 목록", path: "/usage#grammar" },
    ],
  },
  {
    label: "외부 연결",
    path: "/connect",
    image: "/images/connect-preview.png",
    description: "공식 페이지와 프로젝트 저장소로 이동합니다.",
    links: [
      { label: "통합 페이지", path: "/connect" },
      { label: "스팀 페이지", path: "https://store.steampowered.com/app/3594080/Suum/", external: true },
      { label: "유튜브 페이지", path: "https://www.youtube.com/@suumlang", external: true },
      { label: "공식 홈페이지", path: "https://suum.pro/", external: true },
    ],
  },
];

export default navGroups;