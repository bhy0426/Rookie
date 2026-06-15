import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import EditorBlock from './EditorBlock';
import { grammarData } from '../../data/grammarData';
import '../../styles/subpages/grammar/GrammarDetail.css';

export default function GrammarDetail() {
  const { id } = useParams();

  const currentId = Number(id);
  const currentIndex = grammarData.findIndex((item) => item.id === currentId);
  const currentData = grammarData[currentIndex];

  const neighbors = useMemo(() => ({
    previous: currentIndex > 0 ? grammarData[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < grammarData.length - 1 ? grammarData[currentIndex + 1] : undefined
  }), [currentIndex]);

  if (!currentData) {
    return (
      <div className="detailPage">
        <div className="notFoundBox">
          <h1>문법 데이터를 찾을 수 없습니다.</h1>
          <p>주소의 번호를 확인하거나 사용 페이지에서 다시 선택해 주세요.</p>
          <Link to="/usage">사용 페이지로 이동</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detailPage">
      <div className="detailHero">
        <Link className="backLink" to="/usage">사용 페이지</Link>
        <p className="eyebrow">문법 살펴보기</p>
        <h1>{currentData.id}. {currentData.title}</h1>
        <p>{currentData.description}</p>
      </div>

      <div className="detailGrid">
        <div className="shortcutBox">
          <div>
            <span>단축키</span>
            <span className="shortcutText">{currentData.shortcut}</span>
          </div>
        </div>

        <div className="syntaxBox">
          <span>사용 예시</span>
          <div className="exampleCode">{currentData.example}</div>
        </div>

        <div className="cautionBox">
          <span>주의사항</span>
          <p>{currentData.caution}</p>
        </div>
      </div>

      <div className="grammarImageSection">
        <p className="eyebrow">자료 화면</p>
        <img src={currentData.image} alt={`${currentData.title} 자료 화면`} />
      </div>

      <EditorBlock data={currentData.content} />

      <div className="detailNav">
        {neighbors.previous ? (
          <Link to={`/grammar/${neighbors.previous.id}`}>이전: {neighbors.previous.title}</Link>
        ) : <span />}
        {neighbors.next ? (
          <Link to={`/grammar/${neighbors.next.id}`}>다음: {neighbors.next.title}</Link>
        ) : <span />}
      </div>
    </div>
  );
}
