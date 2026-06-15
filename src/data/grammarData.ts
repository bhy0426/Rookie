export interface GrammarMember {
  name: string;
  value?: string;
  kind?: 'variable' | 'function' | 'property' | 'rule';
  note?: string;
}

export interface EditorContent {
  name: string;
  summary: string;
  public: GrammarMember[];
  protected: GrammarMember[];
  private: GrammarMember[];
  warnings?: string[];
}

export interface GrammarItem {
  id: number;
  title: string;
  category: '기본 자료형' | '프로그램 구성' | '객체지향' | '제어문' | '자료형' | '참조/할당';
  shortcut: string;
  description: string;
  example: string;
  caution: string;
  image: string;
  uiType: 'editor' | 'flowchart' | 'list';
  content: EditorContent;
}

interface GrammarBaseItem {
  id: number;
  title: string;
  category: '기본 자료형' | '프로그램 구성' | '객체지향' | '제어문' | '자료형' | '참조/할당';
  shortcut: string;
  description: string;
  example: string;
  caution: string;
  uiType: 'editor' | 'flowchart' | 'list';
  content: EditorContent;
}

const makeContent = (
  name: string,
  summary: string,
  publicItems: GrammarMember[],
  protectedItems: GrammarMember[] = [],
  privateItems: GrammarMember[] = [],
  warnings: string[] = []
): EditorContent => ({ name, summary, public: publicItems, protected: protectedItems, private: privateItems, warnings });

const grammarItems: GrammarBaseItem[] = [
  {
    id: 1,
    title: '기본 자료형',
    category: '기본 자료형',
    shortcut: 'Alt + 1',
    description: '숫자, 글자, 참거짓처럼 프로그램이 처음 다루는 값을 정리합니다.',
    example: '정수 점수 = 100; 글자 이름 = "Soom";',
    caution: '자료형을 먼저 고르면 값의 의미와 사용할 수 있는 연산이 더 분명해집니다.',
    uiType: 'editor',
    content: makeContent('자료형 보관함', '값의 종류를 고르고 이름을 붙이는 첫 단계입니다.', [
      { name: '정수 점수', value: '100', kind: 'variable' },
      { name: '실수 속도', value: '3.5', kind: 'variable' },
      { name: '참거짓 성공', value: '참', kind: 'variable' }
    ])
  },
  {
    id: 2,
    title: '선택 화면',
    category: '프로그램 구성',
    shortcut: 'Ctrl + Space',
    description: '사용자가 다음 행동을 고를 수 있도록 보기 좋은 선택지를 배치합니다.',
    example: '선택화면 열기; 항목 추가("시작", "설정", "종료");',
    caution: '선택지는 너무 많아지면 읽기 어려우므로 역할별로 묶어야 합니다.',
    uiType: 'editor',
    content: makeContent('메뉴 화면', '첫 화면에서 이동 가능한 기능을 보여줍니다.', [
      { name: '시작()', kind: 'function' },
      { name: '설정()', kind: 'function' },
      { name: '종료()', kind: 'function' }
    ])
  },
  {
    id: 3,
    title: '그림 화면',
    category: '프로그램 구성',
    shortcut: 'Alt + G',
    description: '이미지 자원을 화면에 배치하고 크기와 위치를 조정합니다.',
    example: '그림 배경 = 불러오기("forest.png"); 배경.보이기();',
    caution: '이미지는 경로와 파일 이름이 정확해야 화면에 표시됩니다.',
    uiType: 'editor',
    content: makeContent('그림 자원', '화면에 보이는 시각 요소를 관리합니다.', [
      { name: '배경', value: 'forest.png', kind: 'property' },
      { name: '아이콘', value: 'button.png', kind: 'property' }
    ])
  },
  {
    id: 4,
    title: '소리 화면',
    category: '프로그램 구성',
    shortcut: 'Alt + S',
    description: '효과음과 배경음악을 등록하고 재생 상태를 다룹니다.',
    example: '소리 클릭음 = 불러오기("click.wav"); 클릭음.재생();',
    caution: '반복 재생과 한 번 재생을 구분하면 소리가 겹치는 문제를 줄일 수 있습니다.',
    uiType: 'editor',
    content: makeContent('소리 자원', '재생 가능한 소리 파일을 모아둡니다.', [
      { name: '클릭음', value: 'click.wav', kind: 'property' },
      { name: '배경음', value: 'theme.mp3', kind: 'property' }
    ], [{ name: '음량', value: '80%', kind: 'variable' }])
  },
  {
    id: 5,
    title: '객체 화면',
    category: '객체지향',
    shortcut: 'Enter 또는 ;',
    description: '객체 내부에 들어가 변수와 함수를 공용, 보호, 전용 영역으로 나누어 관리합니다.',
    example: '객체 플레이어 { 공용: 이동(); 보호: 체력; 전용: 위치갱신(); }',
    caution: '외부에서 직접 쓰면 안 되는 값은 전용 영역에 두는 편이 좋습니다.',
    uiType: 'editor',
    content: makeContent('플레이어 객체', '객체가 가진 값과 행동을 접근 범위별로 보여줍니다.', [
      { name: 'x', value: '4바이트 실수', kind: 'variable' },
      { name: 'y', value: '4바이트 실수', kind: 'variable' },
      { name: '이동()', kind: 'function' }
    ], [
      { name: '생성자()', kind: 'function' },
      { name: '체력', value: '4바이트 정수', kind: 'variable' }
    ], [
      { name: '그리기()', kind: 'function' },
      { name: '충돌검사()', kind: 'function' }
    ], ['공용 영역이 커질수록 객체의 내부 구조가 쉽게 흔들릴 수 있습니다.'])
  },
  {
    id: 6,
    title: '함수',
    category: '객체지향',
    shortcut: 'Alt + F',
    description: '반복해서 사용할 명령 묶음에 이름을 붙입니다.',
    example: '함수 점프하기() { y = y - 10; }',
    caution: '함수 이름은 하는 일을 바로 알 수 있게 짓는 것이 좋습니다.',
    uiType: 'editor',
    content: makeContent('행동 묶음', '명령을 재사용 가능한 단위로 나눕니다.', [
      { name: '점프하기()', kind: 'function' },
      { name: '점수더하기(값)', kind: 'function' }
    ])
  },
  {
    id: 7,
    title: '실행문',
    category: '제어문',
    shortcut: 'Shift + Enter',
    description: '위에서 아래로 차례대로 실행되는 기본 명령입니다.',
    example: '점수 = 점수 + 10; 화면.새로고침();',
    caution: '실행 순서가 바뀌면 결과도 달라질 수 있습니다.',
    uiType: 'editor',
    content: makeContent('실행 흐름', '명령이 순서대로 처리되는 모습을 보여줍니다.', [
      { name: '점수계산()', kind: 'function' },
      { name: '화면갱신()', kind: 'function' }
    ])
  },
  {
    id: 8,
    title: '연산자',
    category: '기본 자료형',
    shortcut: 'Alt + O',
    description: '값을 더하고 비교하고 조건을 판단하는 기호를 사용합니다.',
    example: '총점 = 국어 + 영어; 통과 = 총점 >= 120;',
    caution: '비교 연산과 대입 연산을 헷갈리지 않게 표시해야 합니다.',
    uiType: 'editor',
    content: makeContent('연산 실험실', '값을 계산하거나 비교하는 규칙입니다.', [
      { name: '+, -, *, /', value: '산술', kind: 'rule' },
      { name: '>, <, ==', value: '비교', kind: 'rule' }
    ])
  },
  {
    id: 9,
    title: '괄호와 항목 연산자',
    category: '기본 자료형',
    shortcut: 'Alt + P',
    description: '계산 순서를 정하거나 객체의 항목에 접근합니다.',
    example: '결과 = (a + b) * c; 플레이어.체력;',
    caution: '괄호가 많아질수록 한 줄에 너무 많은 의미를 넣지 않는 편이 좋습니다.',
    uiType: 'editor',
    content: makeContent('접근 규칙', '묶음과 항목 접근을 구분합니다.', [
      { name: '(값)', value: '우선 계산', kind: 'rule' },
      { name: '객체.항목', value: '멤버 접근', kind: 'rule' }
    ])
  },
  {
    id: 10,
    title: '그리기',
    category: '프로그램 구성',
    shortcut: 'Alt + D',
    description: '화면에 도형, 글자, 이미지를 그리는 명령입니다.',
    example: '화면.원그리기(x, y, 20);',
    caution: '그리기 명령은 보통 화면 갱신 흐름 안에서 반복 실행됩니다.',
    uiType: 'editor',
    content: makeContent('캔버스', '화면에 보이는 결과를 만드는 명령입니다.', [
      { name: '원그리기()', kind: 'function' },
      { name: '글자쓰기()', kind: 'function' }
    ])
  },
  {
    id: 11,
    title: '변수',
    category: '자료형',
    shortcut: 'Alt + V',
    description: '값을 기억하기 위해 이름을 붙인 저장 공간입니다.',
    example: '정수 생명 = 3; 생명 = 생명 - 1;',
    caution: '같은 이름을 여러 의미로 쓰면 코드를 읽기 어려워집니다.',
    uiType: 'editor',
    content: makeContent('변수 목록', '상태를 기억하는 이름표입니다.', [
      { name: '생명', value: '3', kind: 'variable' },
      { name: '점수', value: '0', kind: 'variable' }
    ])
  },
  {
    id: 12,
    title: '초기값',
    category: '자료형',
    shortcut: 'Alt + I',
    description: '변수를 처음 만들 때 넣어두는 시작 값입니다.',
    example: '정수 점수 = 0; 글자 상태 = "대기";',
    caution: '초기값이 없으면 화면이나 계산 결과가 예상과 다를 수 있습니다.',
    uiType: 'editor',
    content: makeContent('초기 상태', '프로그램이 시작될 때의 기본값입니다.', [
      { name: '점수', value: '0', kind: 'variable' },
      { name: '상태', value: '대기', kind: 'variable' }
    ])
  },
  {
    id: 13,
    title: '조건문',
    category: '제어문',
    shortcut: 'Alt + C',
    description: '조건이 참일 때만 특정 명령을 실행합니다.',
    example: '만약 체력 <= 0 이면 { 게임종료(); }',
    caution: '조건이 거짓일 때의 흐름도 함께 생각해야 합니다.',
    uiType: 'editor',
    content: makeContent('조건 분기', '상황에 따라 다른 명령을 고릅니다.', [
      { name: '만약', value: '참일 때 실행', kind: 'rule' },
      { name: '아니면', value: '거짓일 때 실행', kind: 'rule' }
    ])
  },
  {
    id: 14,
    title: '간이 반복문',
    category: '제어문',
    shortcut: 'Alt + R',
    description: '짧은 반복을 간단한 형태로 표현합니다.',
    example: '3번 반복 { 별그리기(); }',
    caution: '반복 횟수가 명확할 때 사용하면 읽기 좋습니다.',
    uiType: 'editor',
    content: makeContent('짧은 반복', '정해진 횟수만큼 명령을 실행합니다.', [
      { name: '3번 반복', value: '고정 횟수', kind: 'rule' },
      { name: '항목마다', value: '목록 순회', kind: 'rule' }
    ])
  },
  {
    id: 15,
    title: '반복문',
    category: '제어문',
    shortcut: 'Alt + L',
    description: '조건이 유지되는 동안 명령을 반복합니다.',
    example: '동안 게임중 { 입력확인(); 화면갱신(); }',
    caution: '끝나는 조건이 없으면 프로그램이 멈춘 것처럼 보일 수 있습니다.',
    uiType: 'editor',
    content: makeContent('반복 흐름', '계속 실행되는 명령 묶음입니다.', [
      { name: '동안', value: '조건 반복', kind: 'rule' },
      { name: '반복끝', value: '탈출 지점', kind: 'rule' }
    ])
  },
  {
    id: 16,
    title: '입력',
    category: '프로그램 구성',
    shortcut: 'Alt + K',
    description: '키보드, 마우스 같은 사용자 입력을 받아 프로그램에 전달합니다.',
    example: '만약 키보드.눌림("왼쪽") 이면 { x = x - 1; }',
    caution: '입력은 매 순간 바뀌므로 화면 갱신 흐름과 함께 확인하는 경우가 많습니다.',
    uiType: 'editor',
    content: makeContent('입력 상태', '사용자 행동을 읽는 통로입니다.', [
      { name: '키보드', value: '방향키', kind: 'property' },
      { name: '마우스', value: '클릭/위치', kind: 'property' }
    ])
  },
  {
    id: 17,
    title: '지시자',
    category: '참조/할당',
    shortcut: 'Alt + T',
    description: '현재 객체나 특정 대상을 가리켜 명령의 주체를 분명히 합니다.',
    example: '이객체.위치 = 새위치;',
    caution: '무엇을 가리키는지 불분명하면 값이 엉뚱한 곳에 적용될 수 있습니다.',
    uiType: 'editor',
    content: makeContent('대상 표시', '명령이 적용될 대상을 가리킵니다.', [
      { name: '이객체', value: '현재 객체', kind: 'rule' },
      { name: '부모', value: '상위 객체', kind: 'rule' }
    ])
  },
  {
    id: 18,
    title: '할당문',
    category: '참조/할당',
    shortcut: 'Alt + A',
    description: '변수나 객체 항목에 새 값을 넣습니다.',
    example: '속도 = 속도 + 1; 플레이어.체력 = 10;',
    caution: '오른쪽 값을 먼저 계산한 뒤 왼쪽 공간에 저장한다고 이해하면 쉽습니다.',
    uiType: 'editor',
    content: makeContent('값 저장', '계산 결과를 이름 있는 공간에 넣습니다.', [
      { name: '점수 = 점수 + 10', value: '갱신', kind: 'rule' },
      { name: '상태 = "완료"', value: '변경', kind: 'rule' }
    ])
  },
  {
    id: 19,
    title: '참조문',
    category: '참조/할당',
    shortcut: 'Alt + Q',
    description: '다른 곳에 있는 값이나 객체를 직접 복사하지 않고 가리킵니다.',
    example: '참조 대상 = 플레이어;',
    caution: '참조한 대상이 바뀌면 그 대상을 보는 곳의 결과도 함께 달라질 수 있습니다.',
    uiType: 'editor',
    content: makeContent('참조 연결', '값을 복사하지 않고 대상을 연결합니다.', [
      { name: '대상', value: '플레이어', kind: 'property' },
      { name: '대상.체력', value: '읽기 가능', kind: 'property' }
    ])
  },
  {
    id: 20,
    title: '결합참조',
    category: '참조/할당',
    shortcut: 'Alt + B',
    description: '여러 참조를 묶어 하나의 구조처럼 다룹니다.',
    example: '결합참조 파티 = [플레이어, 동료];',
    caution: '묶인 대상의 순서와 의미를 문서화하면 유지보수가 쉬워집니다.',
    uiType: 'editor',
    content: makeContent('결합 대상', '여러 객체를 한 번에 관리합니다.', [
      { name: '플레이어', value: '첫 번째 대상', kind: 'property' },
      { name: '동료', value: '두 번째 대상', kind: 'property' }
    ])
  },
  {
    id: 21,
    title: '접근문',
    category: '객체지향',
    shortcut: 'Alt + Y',
    description: '보호 또는 전용 영역의 구성 요소에 안전하게 접근하도록 허용하는 구문입니다.',
    example: '접근 허용 체력읽기() => 체력;',
    caution: '접근문은 내부 값을 전부 열어두는 장치가 아니라 필요한 통로만 만드는 장치입니다.',
    uiType: 'editor',
    content: makeContent('몬스터 객체', '접근문으로 필요한 정보만 밖에 공개합니다.', [
      { name: '체력읽기()', kind: 'function' },
      { name: '피해입기(값)', kind: 'function' }
    ], [
      { name: '체력', value: '4바이트 정수', kind: 'variable' },
      { name: '공격력', value: '4바이트 정수', kind: 'variable' }
    ], [
      { name: '상태계산()', kind: 'function' }
    ], ['접근문을 너무 많이 만들면 전용 영역을 둔 의미가 약해질 수 있습니다.'])
  },
  {
    id: 22,
    title: '상속',
    category: '객체지향',
    shortcut: 'Alt + E',
    description: '기존 객체의 공통 특징을 물려받아 새 객체를 만듭니다.',
    example: '객체 보스 는 몬스터 를 상속 { }',
    caution: '공통 기능은 부모에 두고, 달라지는 기능만 자식 객체에서 바꾸는 편이 좋습니다.',
    uiType: 'editor',
    content: makeContent('보스 객체', '몬스터의 기본 행동을 물려받습니다.', [
      { name: '이동()', kind: 'function' },
      { name: '공격()', kind: 'function' }
    ], [{ name: '패턴단계', value: '정수', kind: 'variable' }], [{ name: '광폭화계산()', kind: 'function' }])
  },
  {
    id: 23,
    title: '지정되지 않은 추상함수',
    category: '객체지향',
    shortcut: 'Alt + U',
    description: '이름과 규칙만 정하고 실제 내용은 하위 객체에서 채우는 함수입니다.',
    example: '추상함수 그리기();',
    caution: '추상함수는 반드시 구현해야 하는 약속처럼 다루어야 합니다.',
    uiType: 'editor',
    content: makeContent('추상 객체', '공통 약속만 먼저 정의합니다.', [
      { name: '그리기()', value: '구현 필요', kind: 'function' },
      { name: '업데이트()', value: '구현 필요', kind: 'function' }
    ], [], [], ['구현하지 않은 추상함수는 실행 대상이 될 수 없습니다.'])
  },
  {
    id: 24,
    title: '일반화',
    category: '객체지향',
    shortcut: 'Alt + N',
    description: '여러 객체의 공통 부분을 뽑아 더 넓은 개념으로 정리합니다.',
    example: '플레이어와 몬스터의 공통 기능을 캐릭터로 일반화;',
    caution: '너무 이른 일반화는 오히려 구조를 복잡하게 만들 수 있습니다.',
    uiType: 'editor',
    content: makeContent('캐릭터 객체', '공통 필드와 행동을 한곳에 둡니다.', [
      { name: '위치', value: '좌표', kind: 'variable' },
      { name: '이동()', kind: 'function' }
    ], [{ name: '체력', value: '정수', kind: 'variable' }])
  },
  {
    id: 25,
    title: '고차함수',
    category: '객체지향',
    shortcut: 'Alt + H',
    description: '함수를 값처럼 전달하거나 반환하여 행동을 조합합니다.',
    example: '목록.각각(항목 => 항목.그리기());',
    caution: '처음 배우는 사용자에게는 입력과 결과를 시각적으로 보여주는 것이 중요합니다.',
    uiType: 'editor',
    content: makeContent('함수 조합', '행동 자체를 값처럼 다룹니다.', [
      { name: '각각(행동)', kind: 'function' },
      { name: '걸러내기(조건)', kind: 'function' }
    ])
  },
  {
    id: 26,
    title: '열거형',
    category: '자료형',
    shortcut: 'Alt + M',
    description: '정해진 후보 중 하나만 선택되는 값을 만듭니다.',
    example: '열거형 방향 { 위, 아래, 왼쪽, 오른쪽 }',
    caution: '문자열보다 열거형을 쓰면 오타로 인한 오류를 줄일 수 있습니다.',
    uiType: 'editor',
    content: makeContent('방향 값', '정해진 선택지만 허용합니다.', [
      { name: '위', kind: 'rule' },
      { name: '아래', kind: 'rule' },
      { name: '왼쪽', kind: 'rule' },
      { name: '오른쪽', kind: 'rule' }
    ])
  },
  {
    id: 27,
    title: '예외',
    category: '제어문',
    shortcut: 'Alt + X',
    description: '예상하지 못한 상황이 생겼을 때 별도의 처리 흐름으로 넘깁니다.',
    example: '시도 { 파일열기(); } 실패하면 { 안내보이기(); }',
    caution: '예외는 문제를 숨기는 용도가 아니라 회복 가능한 흐름을 만드는 용도입니다.',
    uiType: 'editor',
    content: makeContent('오류 처리', '실패 상황을 사용자에게 안전하게 연결합니다.', [
      { name: '시도', value: '위험한 명령', kind: 'rule' },
      { name: '실패하면', value: '복구 흐름', kind: 'rule' }
    ])
  },
  {
    id: 28,
    title: '소리 재생',
    category: '프로그램 구성',
    shortcut: 'Alt + Music',
    description: '등록된 소리를 원하는 시점에 재생하거나 멈춥니다.',
    example: '배경음.반복재생(); 효과음.한번재생();',
    caution: '동시에 재생되는 소리가 많으면 사용자가 중요한 피드백을 놓칠 수 있습니다.',
    uiType: 'editor',
    content: makeContent('재생 제어', '효과음과 배경음을 상황에 맞게 제어합니다.', [
      { name: '한번재생()', kind: 'function' },
      { name: '반복재생()', kind: 'function' },
      { name: '멈춤()', kind: 'function' }
    ], [{ name: '기본음량', value: '70%', kind: 'variable' }])
  }
];

export const grammarData: GrammarItem[] = grammarItems.map((item) => ({
  ...item,
  image: `grammar/${item.id}.png`
}));
