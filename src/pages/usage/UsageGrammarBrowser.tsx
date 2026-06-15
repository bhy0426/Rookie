import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { grammarData } from '../../data/grammarData';
import type { GrammarItem } from "../../data/grammarData";

const categories = ["전체", "프로그램 구성", "객체지향", "제어문", "자료형", "기본 자료형", "참조/할당"];

export default function UsageGrammarBrowser() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [previewItem, setPreviewItem] = useState<GrammarItem>(grammarData[0]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const previewSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

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

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category] =
        category === "전체"
          ? grammarData.length
          : grammarData.filter((item) => item.category === category).length;
      return acc;
    }, {});
  }, []);

  const relatedItems = useMemo(() => {
    return grammarData
      .filter((item) => item.category === previewItem.category && item.id !== previewItem.id)
      .slice(0, 4);
  }, [previewItem]);

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

        <section className="grammarBrowser">
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

      <section id="description" className="usagePreviewPanel suum-container">
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
