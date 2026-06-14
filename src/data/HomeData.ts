const homeSections = [
  {
    title: "숨",
    description:
      "<span class='highlight'>한글</span> 비주얼 <span class='highlight'>프로그래밍</span> 언어",
    variant: "main",
  },
  {
    eyebrow: "숨 이란?",
    title: "한글로 코딩하며, 비주얼로 코딩하다.",
    description:
      "숨은 순서도 기반 구조와 한글 표현을 결합해 프로그램의 흐름을 직관적으로 이해하도록 만든 비주얼 프로그래밍 언어입니다. ( •̀ ω •́ )✧",
    image: "/home/explain.png",
    variant: "explain",
  },
  {
    eyebrow: "숨에 관하여",
    title: "숨은 무엇이고, 어떻게 만들어졌을까?",
    description:
      "숨이 무슨 뜻이고, 왜 써야하며, 어떻게 만들었는지 궁금하지 않나요? (p≧w≦q)",
    primaryLabel: "숨이 무엇일까",
    primaryPath: "/about",
    points: ["숨은 무슨 뜻일까", "숨 이거 왜 써야하지?", "어쩌다 만들게 되었나"],
    variant: "search",
  },
  {
    eyebrow: "사용 방법",
    title: "숨은 어떻게 사용해야 할까?",
    description:
      "숨에도 문법과 코드가 있답니다. 숨의 문법을 검색부터 미리보기, 예시 코드, 상세 학습까지 한 눈에 확인해보세요. (～￣▽￣)～",
    primaryLabel: "문법 보러가기",
    primaryPath: "/usage",
    secondaryLabel: "연결 페이지",
    secondaryPath: "/connect",
    variant: "usage",
  },
  {
    eyebrow: "외부 연결 페이지",
    title: "숨과 관련된 다양한 페이지로 이동합니다.",
    description:
      "스팀, 유튜브, 공식 홈페이지와 깃허브로 이동하여 \n숨에 관한 다양한 정보를 수집해보세요.\no((>ω< ))o",
    variant: "connect",
    cards: [
      {
        title: "스팀 페이지",
        image: "/logo/SteamLogo.png",
        description:
          "숨의 스팀 판매 홈페이지로 이동합니다.\n숨의 구매 및 업데이트 소식을\n확인할 수 있습니다.",
        path: "https://store.steampowered.com/app/3594080/Suum/",
        bgColor: "#4e8edb",
      },
      {
        title: "숨 유튜브 채널",
        image: "/logo/YoutubeLogo.png",
        description:
          "숨의 공식 유튜브 채널로 이동합니다.\n숨의 강의 영상을 시청 할 수 있습니다.",
        path: "https://www.youtube.com/@suumlang",
        bgColor: "#ec5a5f",
      },
      {
        title: "공식 홈페이지",
        image: "/logo/SuumLogo.png",
        description:
          "숨의 공식 홈페이지로 이동합니다. 자세한 정보 및 업데이트 소식을\n확인 할 수 있습니다.",
        path: "https://suum.pro/",
        bgColor: "#797979",
      },
    ],
  },
];

export default homeSections;