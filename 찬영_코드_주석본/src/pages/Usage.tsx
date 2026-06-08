// Usage.tsx
// 이 파일은 내가 맡은 "숨 언어 사용 페이지"의 중심 파일입니다.
// 단순히 화면을 나누는 파일이 아니라, 검색/분류/미리보기/상세 이동 기능을 한 곳에서 관리합니다.
// 그래서 이 파일은 발표할 때 "부모 컴포넌트가 상태를 가지고, 자식 카드 컴포넌트에 props로 내려준다"는 흐름을 설명하기 좋습니다.

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// 여러 훅을 한 줄에서 가져온 이유:
// 이 페이지는 값이 바뀌는 기능이 많습니다. 검색어, 선택 분류, 미리보기 항목은 상태로 관리해야 합니다.
// input 자동 포커스와 미리보기 위치 이동은 실제 DOM 요소를 잡아야 하므로 useRef가 필요합니다.
// 검색 결과 계산은 렌더링마다 반복될 수 있어서 useMemo로 계산 시점을 제한했습니다.
// 자식 컴포넌트에 넘기는 함수는 리렌더링 때마다 새로 만들어질 수 있어서 useCallback으로 재사용하게 했습니다.

import { Link } from 'react-router-dom';
// 상세 페이지로 이동할 때 a 태그 대신 Link를 쓴 이유:
// a href로 내부 페이지를 이동하면 브라우저가 새로고침처럼 동작할 수 있습니다.
// Link는 React Router가 주소만 바꾸고 필요한 컴포넌트만 갈아끼우게 해 줍니다.
// 그래서 /usage에서 /grammar/5로 이동해도 React 앱 흐름 안에서 자연스럽게 이동합니다.

import { grammarData } from '../data/grammarData';
// 화면에 직접 데이터를 하드코딩하지 않고 grammarData에서 가져오는 이유:
// 28개의 문법 정보를 JSX 안에 직접 쓰면 검색, 상세 페이지, 이미지 연결에서 같은 데이터를 여러 번 반복해야 합니다.
// 데이터를 따로 분리하면 Usage.tsx와 GrammarDetail.tsx가 같은 원본 데이터를 공유할 수 있습니다.
// 즉, 하나의 데이터 배열을 카드 목록과 상세 페이지가 같이 쓰는 구조입니다.

const categories: string[] = ['전체', '프로그램 구성', '객체지향', '제어문', '자료형', '기본 자료형', '참조/할당'];
// 분류 버튼을 JSX로 하나하나 직접 쓰지 않고 배열로 만든 이유:
// 같은 모양의 버튼이 반복되기 때문입니다.
// 배열로 만들면 아래에서 map을 사용해 버튼을 자동 생성할 수 있고, 분류가 추가되어도 배열에 글자만 추가하면 됩니다.
// string[]은 이 배열에 문자열만 들어간다는 뜻이라 실수로 숫자 같은 값을 넣는 것을 막아줍니다.

interface GrammarItem {
  // 이 페이지에서 필요한 문법 항목의 최소 모양을 정합니다.
  // grammarData.ts의 전체 데이터에는 example, caution, content도 있지만,
  // 카드와 미리보기에서는 id, title, category, shortcut, description, image만 필요합니다.
  // 이렇게 필요한 모양을 정해 두면 props로 어떤 데이터가 오가는지 발표 때 설명하기 쉽습니다.

  id: number;
  // id가 필요한 이유:
  // 카드 목록에서는 번호를 보여주고, 상세 페이지 이동 주소(`/grammar/${item.id}`)를 만들 때도 사용합니다.

  title: string;
  // title은 카드 제목과 미리보기 제목에 공통으로 사용됩니다.

  category: string;
  // category는 분류 필터에서 비교할 기준값입니다.

  shortcut: string;
  // shortcut은 화면 표시뿐 아니라 검색 대상에도 포함됩니다.

  description: string;
  // description은 카드 설명과 미리보기 설명에 함께 사용됩니다.

  image: string;
  // image는 미리보기 이미지 src에 들어갑니다.
}

interface GrammarCardProps {
  // GrammarCard를 따로 컴포넌트로 분리한 이유:
  // 28개의 문법 카드는 구조가 모두 같습니다.
  // 같은 JSX를 28번 반복 작성하는 대신, 카드 하나의 모양을 GrammarCard로 만들고 map으로 반복 사용합니다.
  // 이때 부모 Usage가 자식 GrammarCard에게 필요한 값을 props로 넘깁니다.

  item: GrammarItem;
  // 카드 하나가 표시할 데이터입니다.

  isSelected: boolean;
  // 선택 상태를 자식 카드 내부에서 직접 판단하지 않고 부모에서 내려주는 이유:
  // 어떤 카드가 선택되었는지는 previewItem이라는 부모 상태가 알고 있습니다.
  // 자식은 그 결과만 받아서 selected 클래스를 붙이면 됩니다.

  onPreview: (item: GrammarItem) => void;
  // 자식이 부모 상태를 직접 바꿀 수 없기 때문에 함수 props를 넘깁니다.
  // 버튼을 누르면 자식은 onPreview(item)을 호출하고,
  // 실제 previewItem 상태 변경은 부모 Usage 안에서 일어납니다.
}

function GrammarCard({ item, isSelected, onPreview }: GrammarCardProps) {
  // GrammarCard는 상태를 가지지 않습니다.
  // 이유: 카드마다 독립 상태를 만들면 "현재 어떤 카드가 미리보기인지"를 전체적으로 관리하기 어렵습니다.
  // 그래서 선택 상태와 클릭 결과는 부모 Usage가 관리하고, 카드는 화면 표시와 클릭 전달만 담당합니다.

  return (
    <div className={isSelected ? 'grammarCard selected' : 'grammarCard'}>
      {/* 삼항 연산자를 쓴 이유:
          선택된 카드와 일반 카드는 같은 div지만 className만 다릅니다.
          if문으로 JSX를 두 벌 만들면 중복이 생기므로, className만 조건으로 바꾸는 것이 간단합니다. */}

      <div className="cardMeta">
        <span>{item.category}</span>
        <span className="shortcutText">{item.shortcut}</span>
      </div>

      <h3>{item.id}. {item.title}</h3>
      <p>{item.description}</p>

      <div className="cardActions">
        <button type="button" onClick={() => onPreview(item)}>미리보기</button>
        {/* onClick={onPreview(item)}라고 바로 쓰지 않은 이유:
            그렇게 쓰면 클릭할 때가 아니라 렌더링되는 순간 함수가 실행됩니다.
            그래서 () => onPreview(item)처럼 "클릭했을 때 실행할 함수"를 새로 감싸서 넘깁니다. */}

        <Link to={`/grammar/${item.id}`}>상세 보기</Link>
        {/* 템플릿 문자열을 쓴 이유:
            상세 페이지 주소는 문법 번호에 따라 /grammar/1, /grammar/2처럼 달라집니다.
            `${item.id}`를 사용하면 현재 카드의 id에 맞춰 주소를 자동으로 만들 수 있습니다. */}
      </div>
    </div>
  );
}

export default function Usage() {
  // Usage가 부모 컴포넌트 역할을 합니다.
  // 검색어, 선택 분류, 미리보기 항목처럼 여러 자식 카드와 미리보기 영역이 같이 써야 하는 값은 부모에 두는 것이 맞습니다.

  const [searchText, setSearchText] = useState('');
  // 검색어를 useState로 둔 이유:
  // input에 글자를 입력할 때마다 화면의 카드 목록이 바뀌어야 합니다.
  // 일반 변수는 값이 바뀌어도 React가 화면을 다시 그리지 않으므로, 상태로 관리해야 합니다.

  const [selectedCategory, setSelectedCategory] = useState('전체');
  // 선택 분류를 상태로 둔 이유:
  // 분류 버튼을 누르면 어떤 버튼이 active인지, 어떤 카드가 보일지 같이 바뀝니다.
  // 이 값도 화면 렌더링에 영향을 주므로 useState가 필요합니다.

  const [previewItem, setPreviewItem] = useState<GrammarItem | null>(grammarData[0]);
  // previewItem을 상태로 둔 이유:
  // 미리보기 버튼을 누를 때마다 미리보기 제목, 설명, 이미지, 상세 링크가 바뀌어야 합니다.
  // 처음 화면이 비어 있으면 어색하므로 grammarData[0]을 초기값으로 넣어 첫 번째 문법을 바로 보여줍니다.
  // null도 허용한 이유는 "선택된 항목이 없는 상태"까지 타입으로 표현하기 위해서입니다.

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  // 검색 input을 ref로 잡은 이유:
  // 렌더링 후 검색창에 자동으로 커서를 놓으려면 실제 input DOM 요소에 접근해야 합니다.
  // 상태는 값을 기억하는 용도이고, ref는 실제 HTML 요소를 가리키는 용도입니다.

  const previewSectionRef = useRef<HTMLDivElement | null>(null);
  // 미리보기 영역을 ref로 잡은 이유:
  // 미리보기 버튼을 누르면 사용자가 직접 스크롤하지 않아도 미리보기 영역으로 이동시키기 위해서입니다.
  // 이 기능은 특정 div 위치를 알아야 하므로 ref가 필요합니다.

  useEffect(() => {
    // useEffect를 쓴 이유:
    // input focus는 화면에 input이 실제로 만들어진 뒤에 가능하기 때문입니다.
    // 렌더링 전에 focus를 하려고 하면 아직 input이 없어서 실패할 수 있습니다.

    if (searchInputRef.current) {
      // current가 있는지 확인하는 이유:
      // 첫 렌더링 순간에는 ref가 null일 수도 있습니다.
      // null 상태에서 focus를 호출하면 오류가 나므로 if로 먼저 확인합니다.
      searchInputRef.current.focus();
    }
  }, []);
  // 빈 의존성 배열 []을 쓴 이유:
  // 검색창 자동 포커스는 페이지가 처음 열릴 때 한 번만 하면 됩니다.
  // 검색어가 바뀔 때마다 focus를 다시 줄 필요가 없으므로 []로 둡니다.

  const filteredGrammar = useMemo(() => {
    // useMemo를 쓴 이유:
    // filteredGrammar는 grammarData 전체를 filter로 돌면서 계산합니다.
    // 검색어와 분류가 바뀌지 않았는데 다른 이유로 렌더링될 때마다 다시 계산할 필요는 없습니다.
    // 그래서 searchText 또는 selectedCategory가 바뀔 때만 다시 계산하도록 했습니다.

    const keyword = searchText.trim().toLowerCase();
    // trim을 쓴 이유:
    // 사용자가 앞뒤에 공백을 넣어도 검색 결과가 이상해지지 않게 하기 위해서입니다.
    // toLowerCase를 쓴 이유:
    // Alt와 alt처럼 영어 대소문자가 달라도 검색되게 하기 위해서입니다.

    return grammarData.filter((item) => {
      // filter를 쓴 이유:
      // 전체 배열에서 조건에 맞는 항목만 남긴 새 배열이 필요하기 때문입니다.
      // map은 개수를 유지하면서 모양을 바꾸는 함수이고,
      // filter는 조건에 맞는 것만 골라 개수가 줄어들 수 있는 함수입니다.

      const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
      // '전체'일 때는 모든 카테고리를 보여줘야 하므로 첫 조건을 둡니다.
      // 그 외에는 item.category가 선택된 분류와 같아야 합니다.

      const matchesKeyword =
        keyword.length === 0 ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.shortcut.toLowerCase().includes(keyword);
      // 검색어가 없으면 모든 항목을 보여줘야 하므로 keyword.length === 0을 먼저 둡니다.
      // 검색어가 있으면 제목, 설명, 단축키 중 하나라도 포함되는지 검사합니다.

      return matchesCategory && matchesKeyword;
      // 분류 조건과 검색 조건이 둘 다 맞아야 화면에 표시합니다.
    });
  }, [searchText, selectedCategory]);
  // 의존성 배열에 grammarData를 넣지 않은 이유:
  // grammarData는 외부 파일에서 가져온 고정 배열이고, 이 컴포넌트 안에서 바뀌지 않습니다.
  // 실제로 다시 계산이 필요한 값은 searchText와 selectedCategory입니다.

  const handleCategoryChange = useCallback((category: string) => {
    // useCallback을 쓴 이유:
    // 이 함수는 분류 버튼의 onClick에 반복해서 전달됩니다.
    // 컴포넌트가 렌더링될 때마다 함수가 새로 만들어지는 것을 줄이고,
    // "부모가 자식에게 함수를 props로 넘긴다"는 훅 사용 예시로 설명하기 좋습니다.

    setSelectedCategory(category);
  }, []);
  // 빈 배열인 이유:
  // 함수 안에서 바뀌는 외부 상태를 직접 읽지 않고 setSelectedCategory만 사용합니다.
  // 그래서 렌더링마다 새 함수로 만들 필요가 없습니다.

  const handlePreview = useCallback((item: GrammarItem) => {
    // handlePreview를 따로 만든 이유:
    // 미리보기 버튼은 "선택 항목 변경"과 "미리보기 영역으로 이동" 두 가지 일을 합니다.
    // JSX 안에 전부 적으면 복잡해지므로 함수로 분리했습니다.

    setPreviewItem(item);
    // 상태를 먼저 바꾸는 이유:
    // 미리보기 영역에 표시될 제목, 설명, 이미지가 클릭한 item으로 바뀌어야 하기 때문입니다.

    if (previewSectionRef.current) {
      previewSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // ref를 통해 실제 미리보기 div로 이동합니다.
      // 미리보기 버튼을 누른 사용자가 결과를 바로 볼 수 있게 만든 코드입니다.
    }
  }, []);
  // 빈 배열인 이유:
  // setPreviewItem과 previewSectionRef는 렌더링되어도 같은 역할을 유지합니다.
  // 따라서 함수를 계속 새로 만들 필요가 없습니다.

  return (
    <div className="usagePage">
      <div className="usageHero">
        <div>
          <p className="eyebrow">사용 가이드</p>
          <h1>숨 언어 배우기</h1>
          <p>문법을 검색하고 예시를 확인하며 숨 언어의 규칙을 하나씩 살펴보세요.</p>
        </div>

        <div className="hookPanel">
          <span>빠른 시작</span>
          <h2>찾고, 고르고, 바로 확인하기</h2>
          <p>문법 검색, 카테고리 필터, 미리보기와 상세 예시를 한 화면에서 이용할 수 있습니다.</p>
        </div>
      </div>

      <div className="toolbarSection">
        <div className="searchBox">
          <label htmlFor="grammar-search">문법 검색</label>

          <input
            id="grammar-search"
            ref={searchInputRef}
            // ref를 input에 붙인 이유:
            // useEffect에서 searchInputRef.current.focus()를 실행하려면 이 input과 ref가 연결되어 있어야 합니다.
            value={searchText}
            // value를 searchText 상태와 연결한 이유:
            // React가 input 값을 직접 관리하는 controlled input 형태로 만들기 위해서입니다.
            onChange={(event) => setSearchText(event.target.value)}
            // onChange에서 setSearchText를 호출하는 이유:
            // 사용자가 입력한 글자가 상태에 저장되어야 filteredGrammar가 다시 계산됩니다.
            placeholder="예: 객체, 조건문, Alt + Y"
          />
        </div>

        <div className="categoryTabs">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
          {/* map으로 버튼을 만든 이유:
              분류 버튼이 모두 같은 구조이기 때문에 반복 생성하는 것이 자연스럽습니다.
              key가 필요한 이유는 React가 어떤 버튼이 어떤 데이터에서 나온 것인지 구분해야 하기 때문입니다. */}
        </div>
      </div>

      <div className="previewSection" ref={previewSectionRef}>
        {/* ref를 previewSection에 붙인 이유:
            handlePreview에서 scrollIntoView를 호출할 대상이 바로 이 div이기 때문입니다. */}

        <div className="previewInfo">
          <p className="eyebrow">미리보기</p>
          <h2>{previewItem ? previewItem.title : '문법 미리보기'}</h2>
          <p>{previewItem ? previewItem.description : '궁금한 문법 카드를 누르면 핵심 설명을 먼저 확인할 수 있습니다.'}</p>
          {/* previewItem 조건을 검사하는 이유:
              타입상 previewItem은 null일 수 있습니다.
              null일 때 previewItem.title을 바로 읽으면 오류가 나므로, 삼항 연산자로 안전하게 처리합니다. */}

          <div className="previewFooter">
            {previewItem && (
              <Link className="previewDetailLink" to={`/grammar/${previewItem.id}`}>
                상세 보기
              </Link>
            )}
            {/* &&를 쓴 이유:
                previewItem이 있을 때만 상세 보기 링크를 보여주면 됩니다.
                없을 때는 아무것도 표시하지 않는 조건부 렌더링입니다. */}
          </div>
        </div>

        <div className="hookNotes">
          <h3>자료 화면</h3>
          {previewItem ? (
            <img className="previewImage" src={previewItem.image} alt={`${previewItem.title} 자료 화면`} />
          ) : (
            <div className="previewImageFallback">문법을 선택하면 자료 화면이 표시됩니다.</div>
          )}
          <p className="imageGuide">
            카드에서 미리보기를 누르면 해당 문법 자료가 표시됩니다. 자세한 설명과 예시는 상세 보기에서 확인할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grammarSection">
        <div className="sectionTitle">
          <p className="eyebrow">문법 목록</p>
          <h2>숨 언어 문법</h2>
          <span>{filteredGrammar.length}개 표시 / 전체 {grammarData.length}개</span>
          {/* filteredGrammar.length를 보여주는 이유:
              검색이나 분류를 적용했을 때 현재 몇 개가 남았는지 사용자에게 알려주기 위해서입니다. */}
        </div>

        <div className="grammarGrid">
          {filteredGrammar.map((item) => (
            <GrammarCard
              key={item.id}
              item={item}
              isSelected={previewItem !== null && previewItem.id === item.id}
              onPreview={handlePreview}
            />
          ))}
          {/* GrammarCard에 onPreview를 넘기는 이유:
              자식 카드에서 버튼 클릭은 일어나지만, 실제 previewItem 상태는 부모 Usage가 가지고 있습니다.
              그래서 자식은 함수를 호출하고 부모가 상태를 바꾸는 구조가 됩니다. */}
        </div>
      </div>
    </div>
  );
}
