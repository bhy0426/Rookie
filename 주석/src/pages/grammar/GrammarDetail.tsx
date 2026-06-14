// FILE: pages/grammar/GrammarDetail.tsx
// PURPOSE: GRAMMAR DETAIL PAGE. URL 파라미터로 문법을 찾고 이전/다음 문법을 계산합니다.
// FLOW 01: useParams로 URL의 id 값을 읽습니다.
// FLOW 02: id를 숫자로 바꾸고 grammarData에서 현재 문법 인덱스를 찾습니다.
// FLOW 03: useMemo가 현재 인덱스 기준으로 이전/다음 문법 링크를 계산합니다.
// FLOW 04: currentData가 없으면 not found 화면을 렌더링합니다.
// FLOW 05: currentData가 있으면 상세 설명, 예시, 이미지, EditorBlock, 이전/다음 링크를 렌더링합니다.



import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import EditorBlock from './EditorBlock';
import { grammarData } from '../../data/GrammarData';
import '../../styles/subpages/grammar/GrammarDetail.css';

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
export default function GrammarDetail() {
// ROUTER PARAMS: /grammar/:id의 id 값을 읽어 현재 문법 데이터를 찾습니다.
// FLOW STEP 01: URL에서 id 파라미터를 읽어 현재 문법 번호로 사용합니다.
  const { id } = useParams();

// FLOW STEP 02: 문자열 id를 숫자로 바꾸고 grammarData에서 인덱스를 찾습니다.
  const currentId = Number(id);
  const currentIndex = grammarData.findIndex((item) => item.id === currentId);
  const currentData = grammarData[currentIndex];

// HOOK MEMO: 현재 문법 인덱스가 바뀔 때만 이전/다음 문법 링크를 다시 계산합니다.
// FLOW STEP 03: 현재 인덱스 기준으로 이전/다음 문법 링크를 계산합니다.
  const neighbors = useMemo(() => ({
    previous: currentIndex > 0 ? grammarData[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < grammarData.length - 1 ? grammarData[currentIndex + 1] : undefined
  }), [currentIndex]);

// FLOW STEP 04: id에 맞는 데이터가 없으면 not found 화면으로 흐름을 종료합니다.
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
