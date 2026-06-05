import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { grammarData, type GrammarItem } from '../data/grammarData';

const categories = ['전체', '프로그램 구성', '객체지향', '제어문', '자료형', '기본 자료형', '참조/할당'] as const;
type CategoryFilter = typeof categories[number];

interface GrammarCardProps {
  item: GrammarItem;
  isSelected: boolean;
  onPreview: (item: GrammarItem) => void;
}

function GrammarCard({ item, isSelected, onPreview }: GrammarCardProps) {
  return (
    <article className={isSelected ? 'grammarCard selected' : 'grammarCard'}>
      <div className="cardMeta">
        <span>{item.category}</span>
        <kbd>{item.shortcut}</kbd>
      </div>
      <h3>{item.id}. {item.title}</h3>
      <p>{item.description}</p>
      <div className="cardActions">
        <button type="button" onClick={() => onPreview(item)}>미리보기</button>
        <Link to={`/grammar/${item.id}`}>상세 보기</Link>
      </div>
    </article>
  );
}

export default function Usage() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('전체');
  const [previewItem, setPreviewItem] = useState<GrammarItem | null>(grammarData[4] ?? grammarData[0]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const previewSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const filteredGrammar = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();

    return grammarData.filter((item) => {
      const matchesCategory = selectedCategory === '전체' || item.category === selectedCategory;
      const matchesKeyword =
        keyword.length === 0 ||
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword) ||
        item.shortcut.toLowerCase().includes(keyword);

      return matchesCategory && matchesKeyword;
    });
  }, [searchText, selectedCategory]);

  const handleCategoryChange = useCallback((category: CategoryFilter) => {
    setSelectedCategory(category);
  }, []);

  const handlePreview = useCallback((item: GrammarItem) => {
    setPreviewItem(item);
    window.setTimeout(() => {
      previewSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, []);

  return (
    <main className="usagePage">
      <section className="usageHero">
        <div>
          <p className="eyebrow">숨 가이드</p>
          <h1>숨 언어 배우기</h1>
          <p>문법을 검색하고 예시를 확인하며 숨 언어의 규칙을 하나씩 익혀보세요.</p>
        </div>
        <aside className="hookPanel">
          <span>빠른 시작</span>
          <strong>찾고, 고르고, 바로 확인하기</strong>
          <p>문법 검색, 카테고리 필터, 미리보기와 상세 예시를 한 화면에서 이용할 수 있습니다.</p>
        </aside>
      </section>

      <section className="toolbarSection" aria-label="문법 검색과 필터">
        <div className="searchBox">
          <label htmlFor="grammar-search">문법 검색</label>
          <input
            id="grammar-search"
            ref={searchInputRef}
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="예: 객체, 조건문, Alt + Y"
          />
        </div>
        <div className="categoryTabs" role="tablist" aria-label="문법 카테고리">
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
        </div>
      </section>

      <section className="previewSection" ref={previewSectionRef}>
        <div className="previewInfo">
          <p className="eyebrow">미리보기</p>
          <h2>{previewItem ? previewItem.title : '문법 미리보기'}</h2>
          <p>{previewItem ? previewItem.description : '궁금한 문법 카드를 누르면 핵심 설명을 먼저 확인할 수 있습니다.'}</p>
          <div className="previewFooter">
            {previewItem && (
              <Link className="previewDetailLink" to={`/grammar/${previewItem.id}`}>
                상세 보기
              </Link>
            )}
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
            카드에서 미리보기를 누르면 해당 문법 자료가 표시됩니다. 자세한 단축키와 예시는 상세 보기에서 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="grammarSection">
        <div className="sectionTitle">
          <p className="eyebrow">문법 목록</p>
          <h2>숨 언어 문법</h2>
          <span>{filteredGrammar.length}개 표시 / 전체 {grammarData.length}개</span>
        </div>
        <div className="grammarGrid">
          {filteredGrammar.map((item) => (
            <GrammarCard
              key={item.id}
              item={item}
              isSelected={previewItem?.id === item.id}
              onPreview={handlePreview}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
