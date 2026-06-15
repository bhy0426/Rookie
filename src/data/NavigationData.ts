const navGroups = [
  {
    label: "숨이란?",
    path: "/about",
    image: [
              "/nav/about/about1.png",
              "/nav/about/about2.png",
              "/nav/about/about3.png",
            ],
    description: "숨의 의미, 특징, 개발 철학을 소개합니다.",
    links: [
      { label: "의미", path: "/about#mean" },
      { label: "특징", path: "/about#feature" },
      { label: "개발 철학", path: "/about#philosophy" },
    ],
  },
  {
    label: "사용",
    path: "/usage",
    image: [
              "/nav/usage/usage1.png",
              "/nav/usage/usage2.png",
            ],
    description: "문법 검색, 예시 화면, 상세 설명을 확인합니다.",
    links: [
      { label: "문법 검색", path: "/usage#search" },
      { label: "문법 설명", path: "/usage#description" },
    ],
  },
  {
    label: "연결",
    path: "/connect",
    image: [
              "/nav/connect/connect1.png",
              "/nav/connect/connect2.png",
              "/nav/connect/connect3.png",
              "/nav/connect/connect4.png",
            ],
    description: "공식 페이지와 프로젝트 저장소로 이동합니다.",
    links: [
      { label: "스팀 페이지", path: "https://store.steampowered.com/app/3594080/Suum/", external: true },
      { label: "유튜브 페이지", path: "https://www.youtube.com/@suumlang", external: true },
      { label: "공식 홈페이지", path: "https://suum.pro/", external: true },
      { label: "깃허브 페이지", path: "https://bhy0426.github.io/Rookie/", external: true },
    ],
  },
];

export default navGroups;