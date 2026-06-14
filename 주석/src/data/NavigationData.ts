// FILE: data/NavigationData.ts
// PURPOSE: NAVIGATION DATA. NavigationBar가 사용할 메뉴 그룹과 미리보기 정보를 보관합니다.
// FLOW 01: NavigationBar가 import할 메뉴 그룹 데이터를 배열로 정의합니다.
// FLOW 02: 각 그룹은 path, label, description, preview image, 하위 link 정보를 가집니다.



// DATA: hook이 아니라 렌더링에 참조되는 정적 데이터입니다.
const navGroups = [
  {
    label: "숨이란?",
    path: "/about",
    image: [
              "/nav/about/about1.png",
              "/nav/about/about2.png",
              "/nav/about/about3.png",
            ],
    description: "숨의 목적, 특징, 개발 철학을 소개합니다.",
    links: [
      { label: "프로젝트 소개", path: "/about" },
      { label: "언어 특징", path: "/about" },
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
      { label: "문법 목록", path: "/usage#grammar" },
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