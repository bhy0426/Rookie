import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import EditorBlock from '../../components/EditorBlock';
import { grammarData } from '../../data/grammarData';

export default function GrammarDetail() {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const currentId = Number(id);
  const currentIndex = grammarData.findIndex((item) => item.id === currentId);
  const currentData = grammarData[currentIndex];

  const neighbors = useMemo(() => ({
    previous: currentIndex > 0 ? grammarData[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < grammarData.length - 1 ? grammarData[currentIndex + 1] : undefined
  }), [currentIndex]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    if (!currentData) return;
    try {
      await navigator.clipboard.writeText(currentData.shortcut);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  };

  if (!currentData) {
    return (
      <main className="detailPage">
        <section className="notFoundBox">
          <h1>문법 데이터를 찾을 수 없습니다.</h1>
          <p>주소의 번호를 확인하거나 사용 페이지에서 다시 선택해 주세요.</p>
          <Link to="/usage">사용 페이지로 이동</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="detailPage">
      <section className="detailHero">
        <Link className="backLink" to="/usage">사용 페이지</Link>
        <p className="eyebrow">문법 살펴보기</p>
        <h1>{currentData.id}. {currentData.title}</h1>
        <p>{currentData.description}</p>
      </section>

      <section className="detailGrid">
        <div className="shortcutBox">
          <div>
            <span>단축키</span>
            <kbd>{currentData.shortcut}</kbd>
          </div>
          <button type="button" onClick={handleCopy}>{copied ? '복사됨' : '복사'}</button>
        </div>

        <div className="syntaxBox">
          <span>사용 예시</span>
          <pre><code>{currentData.example}</code></pre>
        </div>

        <div className="cautionBox">
          <span>주의사항</span>
          <p>{currentData.caution}</p>
        </div>
      </section>

      <section className="grammarImageSection">
        <p className="eyebrow">자료 화면</p>
        <img src={currentData.image} alt={`${currentData.title} 자료 화면`} />
      </section>

      <EditorBlock data={currentData.content} />

      <nav className="detailNav" aria-label="이전 다음 문법 이동">
        {neighbors.previous ? (
          <Link to={`/grammar/${neighbors.previous.id}`}>이전: {neighbors.previous.title}</Link>
        ) : <span />}
        {neighbors.next ? (
          <Link to={`/grammar/${neighbors.next.id}`}>다음: {neighbors.next.title}</Link>
        ) : <span />}
      </nav>
    </main>
  );
}
