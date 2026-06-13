import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import EditorBlock from '../components/EditorBlock';
import { grammarData } from '../data/grammarData';
import '../styles/pages/Usage.css';

const categories: string[] = ['전체', '프로그램 구성', '객체지향', '제어문', '자료형', '기본 자료형', '참조/할당'];

interface GrammarItem {
  id: number;
  title: string;
  category: string;
  shortcut: string;
  description: string;
  example: string;
  caution: string;
  image: string;
  content: {
    name: string;
    summary: string;
    public: { name: string; value?: string; kind?: string; note?: string }[];
    protected: { name: string; value?: string; kind?: string; note?: string }[];
    private: { name: string; value?: string; kind?: string; note?: string }[];
    warnings?: string[];
  };
}

const learningSteps = [
  { number: '01', title: '검색', text: '문법 이름, 설명, 단축키로 필요한 항목을 빠르게 찾습니다.' },
  { number: '02', title: '미리보기', text: '화면 자료와 사용 예시를 먼저 확인해 흐름을 파악합니다.' },
  { number: '03', title: '상세 학습', text: '상세 페이지에서 주의사항과 구성 요소를 이어서 확인합니다.' },
];

function Usage() {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [previewItem, setPreviewItem] = useState<GrammarItem>(grammarData[0]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const previewSectionRef = useRef<HTMLDivElement | null>(null);

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
        item.shortcut.toLowerCase().includes(keyword) ||
        item.example.toLowerCase().includes(keyword);

      return matchesCategory && matchesKeyword;
    });
  }, [searchText, selectedCategory]);

  const categoryCounts = useMemo(() => {
    return categories.reduce<Record<string, number>>((acc, category) => {
      acc[category] = category === '전체' ? grammarData.length : grammarData.filter((item) => item.category === category).length;
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
    previewSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <main className="usagePage">
      <section className="usageIntro">
        <div className="usageIntroCopy">
          <p className="eyebrow">SUUM GUIDE</p>
          <h1>숨 언어 사용 가이드</h1>
          <p>
            숨의 문법을 단순 카드 목록으로 넘기지 않고, 검색부터 미리보기, 예시 코드, 상세 학습까지 하나의 실습 흐름으로
            확인할 수 있게 구성했습니다.
          </p>
        </div>

        <div className="usageStats" aria-label="사용 페이지 구성 요약">
          <div>
            <strong>{grammarData.length}</strong>
            <span>정리된 문법</span>
          </div>
          <div>
            <strong>{categories.length - 1}</strong>
            <span>분류 체계</span>
          </div>
          <div>
            <strong>1</strong>
            <span>통합 미리보기</span>
          </div>
        </div>
      </section>

      <section className="usageSteps" aria-label="학습 흐름">
        {learningSteps.map((step) => (
          <div className="usageStep" key={step.number}>
            <span>{step.number}</span>
            <div>
              <h2>{step.title}</h2>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="usageWorkbench" ref={previewSectionRef}>
        <aside className="usageControlPanel">
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
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                <span>{category}</span>
                <strong>{categoryCounts[category]}</strong>
              </button>
            ))}
          </div>
        </aside>

        <section className="usagePreviewPanel">
          <div className="previewHeader">
            <div>
              <p className="eyebrow">선택한 문법</p>
              <h2>{previewItem.id}. {previewItem.title}</h2>
              <p>{previewItem.description}</p>
            </div>
            <Link className="previewDetailLink" to={`/grammar/${previewItem.id}`}>상세 보기</Link>
          </div>

          <div className="usagePreviewGrid">
            <div className="previewImageFrame">
              <span>자료 화면</span>
              <img src={previewItem.image} alt={`${previewItem.title} 자료 화면`} />
            </div>

            <div className="previewTextStack">
              <div className="syntaxPanel">
                <div className="syntaxTopline">
                  <span>사용 예시</span>
                  <strong>{previewItem.shortcut}</strong>
                </div>
                <code>{previewItem.example}</code>
              </div>

              <div className="cautionPanel">
                <span>주의할 점</span>
                <p>{previewItem.caution}</p>
              </div>

              <div className="relatedPanel">
                <span>같은 분류의 문법</span>
                <div>
                  {relatedItems.length > 0 ? relatedItems.map((item) => (
                    <button key={item.id} type="button" onClick={() => handlePreview(item)}>
                      {item.title}
                    </button>
                  )) : <p>같은 분류의 다른 문법이 없습니다.</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* <section className="usageEditorSection">
        <EditorBlock data={previewItem.content} />
      </section> */}

      <section className="grammarBrowser">
        <div className="browserHeader">
          <div>
            <p className="eyebrow">BROWSE</p>
            <h2>문법 탐색</h2>
          </div>
          <span>{filteredGrammar.length}개 표시 / 전체 {grammarData.length}개</span>
        </div>

        <div className="grammarList">
          {filteredGrammar.map((item) => (
            <button
              type="button"
              key={item.id}
              className={previewItem.id === item.id ? 'grammarRow active' : 'grammarRow'}
              onClick={() => handlePreview(item)}
            >
              <span className="grammarNumber">{String(item.id).padStart(2, '0')}</span>
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
    </main>
  );
}

export default Usage;
