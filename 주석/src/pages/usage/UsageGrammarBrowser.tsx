// FILE: pages/usage/UsageGrammarBrowser.tsx
// PURPOSE: USAGE GRAMMAR BROWSER. 검색어, 카테고리, 선택 문법, 파생 목록을 훅으로 관리합니다.
// FLOW 01: 검색어, 선택 카테고리, 선택된 preview 문법을 state로 준비합니다.
// FLOW 02: 검색 input과 workbench DOM을 ref로 잡습니다.
// FLOW 03: mount effect가 검색 input에 focus를 줍니다.
// FLOW 04: searchText 또는 selectedCategory가 바뀌면 filteredGrammar를 다시 계산합니다.
// FLOW 05: previewItem이 바뀌면 relatedItems를 다시 계산합니다.
// FLOW 06: 문법 row나 관련 버튼을 누르면 handlePreview가 previewItem을 바꾸고 workbench로 스크롤합니다.



import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { grammarData } from "../../data/GrammarData";
import type { GrammarItem } from "../../data/GrammarData";

// DATA: hook이 아니라 렌더링에 참조되는 정적 데이터입니다.
const categories = ["전체", "프로그램 구성", "객체지향", "제어문", "자료형", "기본 자료형", "참조/할당"];

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
export default function UsageGrammarBrowser() {
// HOOK STATE: Usage 문법 브라우저의 검색 input 값을 저장합니다.
// FLOW STEP 01: 검색 input 값이 바뀔 때마다 이 상태가 먼저 업데이트됩니다.
  const [searchText, setSearchText] = useState("");
// HOOK STATE: Usage 문법 브라우저에서 선택된 카테고리 필터를 저장합니다.
// FLOW STEP 02: 카테고리 버튼 클릭 결과를 저장합니다.
  const [selectedCategory, setSelectedCategory] = useState("전체");
// HOOK STATE: Usage 문법 브라우저에서 미리보기로 선택된 문법 항목을 저장합니다.
// FLOW STEP 03: 목록에서 선택한 문법을 preview 패널에 보여주기 위해 저장합니다.
  const [previewItem, setPreviewItem] = useState<GrammarItem>(grammarData[0]);
// HOOK REF: Usage 검색 input DOM을 저장해 첫 렌더링 후 focus를 줍니다.
// FLOW STEP 04: mount 후 focus를 주기 위해 검색 input DOM을 잡습니다.
  const searchInputRef = useRef<HTMLInputElement | null>(null);
// HOOK REF: Usage workbench DOM을 저장해 문법 선택 시 미리보기 위치로 스크롤합니다.
  const previewSectionRef = useRef<HTMLDivElement | null>(null);

// HOOK EFFECT: Usage 페이지 진입 시 문법 검색 input에 자동 focus를 줍니다.
// FLOW STEP 05: 컴포넌트가 처음 뜨면 검색 input에 focus를 줍니다.
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

// HOOK MEMO: 검색어와 카테고리가 바뀔 때만 문법 목록 필터 결과를 다시 계산합니다.
// FLOW STEP 06: searchText/selectedCategory 변화에 맞춰 보여줄 문법 목록을 계산합니다.
  const filteredGrammar = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return grammarData.filter((item) => {
      const matchesCategory = selectedCategory === "전체" || item.category === selectedCategory;
      const matchesKeyword =
        keyword.length === 0 ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.shortcut.toLowerCase().includes(keyword) ||
        item.example.toLowerCase().includes(keyword);

      return matchesCategory && matchesKeyword;
    });
  }, [searchText, selectedCategory]);

// HOOK MEMO: 카테고리별 문법 개수를 한 번 계산해 버튼 숫자로 재사용합니다.
// FLOW STEP 07: 카테고리 버튼에 표시할 개수를 계산합니다.
  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category] =
        category === "전체"
          ? grammarData.length
          : grammarData.filter((item) => item.category === category).length;
      return acc;
    }, {});
  }, []);

// HOOK MEMO: 선택된 문법과 같은 카테고리의 관련 문법만 다시 계산합니다.
// FLOW STEP 08: previewItem과 같은 카테고리의 관련 문법을 계산합니다.
  const relatedItems = useMemo(() => {
    return grammarData
      .filter((item) => item.category === previewItem.category && item.id !== previewItem.id)
      .slice(0, 4);
  }, [previewItem]);

// HOOK CALLBACK: 문법 항목 클릭 시 미리보기 항목을 바꾸고 workbench 위치로 스크롤합니다.
// FLOW STEP 09: 문법 선택 이벤트가 발생하면 previewItem 갱신 후 workbench로 스크롤합니다.
  const handlePreview = useCallback((item: GrammarItem) => {
    setPreviewItem(item);
    previewSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <section id="search" className="usageWorkbench" ref={previewSectionRef}>
        <section className="usageControlPanel">
          <div className="usageSearchBox">
            <label htmlFor="grammar-search">문법 검색</label>
            <input
              id="grammar-search"
              ref={searchInputRef}
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="예: 조건문, 객체, Alt + C"
            />
          </div>

          <div className="usageCategoryList" aria-label="문법 분류">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={selectedCategory === category ? "active" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                <span>{category}</span>
                <strong>{categoryCounts[category]}</strong>
              </button>
            ))}
          </div>
        </section>

        <section id="grammar" className="grammarBrowser">
          <div className="browserHeader">
            <div>
              <p className="eyebrow">BROWSE</p>
              <h2>문법 탐색</h2>
            </div>
            <span>
              {filteredGrammar.length}개 표시 / 전체 {grammarData.length}개
            </span>
          </div>

          <div className="grammarList">
            {filteredGrammar.map((item) => (
              <button
                type="button"
                key={item.id}
                className={previewItem.id === item.id ? "grammarRow active" : "grammarRow"}
                onClick={() => handlePreview(item)}
              >
                <span className="grammarNumber">{String(item.id).padStart(2, "0")}</span>
                <span className="grammarMainText">
                  <strong>{item.title}</strong>
                  <em>{item.description}</em>
                </span>
                <span className="grammarCategory">{item.category}</span>
                <span className="grammarShortcut">{item.shortcut}</span>
              </button>
            ))}
          </div>
        </section>
      </section>

      <section className="usagePreviewPanel suum-container">
        <div className="previewHeader">
          <div>
            <p className="eyebrow">선택한 문법</p>
            <h2>
              {previewItem.id}. {previewItem.title}
            </h2>
            <p>{previewItem.description}</p>
          </div>
          <Link className="previewDetailLink" to={`/grammar/${previewItem.id}`}>
            상세 보기
          </Link>
        </div>

        <div className="usagePreviewGrid">
          <div className="previewTextStack">
            <div className="syntaxPanel">
              <div className="syntaxTopline">
                <span>사용 예시</span>
                <strong>{previewItem.shortcut}</strong>
              </div>
              <code>{previewItem.example}</code>
            </div>
          </div>

          <div className="relatedPanel">
            <span>같은 분류의 문법</span>
            <div>
              {relatedItems.length > 0 ? (
                relatedItems.map((item) => (
                  <button key={item.id} type="button" onClick={() => handlePreview(item)}>
                    {item.title}
                  </button>
                ))
              ) : (
                <p>같은 분류의 다른 문법이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
