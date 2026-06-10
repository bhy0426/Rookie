// GrammarDetail.tsx
// 이 파일은 문법 상세 페이지 하나를 담당합니다.
// 중요한 점: 28개의 상세 페이지 파일을 따로 만들지 않고, 주소의 id 값만 바꿔서 같은 컴포넌트를 재사용합니다.

import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import EditorBlock from '../../components/EditorBlock';
// EditorBlock을 분리한 이유:
// 상세 페이지 안에는 제목/설명/이미지 영역도 있고, 탭으로 보는 에디터 영역도 있습니다.
// 에디터 UI까지 한 파일에 모두 넣으면 GrammarDetail이 너무 길어지므로 별도 컴포넌트로 나눴습니다.

import { grammarData } from '../../data/grammarData';
// grammarData를 사용하는 이유:
// 상세 페이지도 Usage 페이지와 같은 28개 문법 데이터를 기준으로 화면을 만들어야 합니다.
// 데이터를 공유하면 카드 목록과 상세 내용이 서로 어긋날 가능성이 줄어듭니다.

export default function GrammarDetail() {
  const { id } = useParams();
  // useParams를 쓴 이유:
  // App.tsx에서 path="/grammar/:id"라고 만들었기 때문에 주소의 숫자 부분을 읽어야 합니다.
  // 예를 들어 /grammar/7이면 id는 '7'입니다.

  const currentId = Number(id);
  // Number로 바꾸는 이유:
  // useParams로 얻은 id는 문자열입니다.
  // 그런데 grammarData의 id는 number 타입이므로 정확히 비교하려면 숫자로 변환해야 합니다.

  const currentIndex = grammarData.findIndex((item) => item.id === currentId);
  // findIndex를 쓴 이유:
  // 현재 문법 데이터뿐 아니라 이전/다음 문법도 찾아야 하기 때문입니다.
  // find는 항목 자체만 찾지만, findIndex는 배열에서 몇 번째 위치인지 알려줍니다.
  // 인덱스(배열의 자리)를 알면 currentIndex - 1, currentIndex + 1로 이전/다음을 쉽게 찾을 수 있습니다.

  const currentData = grammarData[currentIndex];
  // currentIndex로 현재 데이터를 꺼낸 이유:
  // 상세 화면의 제목, 설명, 예시, 이미지, EditorBlock data가 모두 currentData에서 나옵니다.

  const neighbors = useMemo(() => ({
    previous: currentIndex > 0 ? grammarData[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < grammarData.length - 1 ? grammarData[currentIndex + 1] : undefined
  }), [currentIndex]);
  // useMemo를 쓴 이유:
  // 이전/다음 문법 계산은 currentIndex가 바뀔 때만 다시 하면 됩니다.
  // 상세 페이지 안에서 다른 이유로 렌더링되더라도 currentIndex가 같으면 같은 결과를 재사용합니다.
  // 삼항 연산자를 쓴 이유:
  // 첫 번째 문법에는 이전 항목이 없고, 마지막 문법에는 다음 항목이 없기 때문입니다.

  if (!currentData) {
    // 이 예외 처리를 둔 이유:
    // 사용자가 /grammar/999처럼 존재하지 않는 주소로 들어올 수 있습니다.
    // currentData가 없는 상태에서 currentData.title을 읽으면 오류가 나므로,
    // 먼저 없는 경우를 처리해서 안전한 안내 화면을 보여줍니다.

    return (
      <div className="detailPage">
        <div className="notFoundBox">
          <h1>문법을 찾을 수 없습니다.</h1>
          <p>주소의 번호가 실제 문법 목록에 없는 경우입니다.</p>
          <Link to="/usage">사용 페이지로 돌아가기</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detailPage">
      <div className="detailHero">
        <Link className="backLink" to="/usage">목록으로</Link>
        {/* Link를 쓴 이유:
            내부 페이지 이동이므로 React Router의 Link를 사용합니다.
            이렇게 하면 앱 전체를 새로고침하지 않고 /usage로 돌아갈 수 있습니다. */}

        <p className="eyebrow">문법 상세</p>
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

        <div className="featureBox">
          <img src={currentData.image} alt={`${currentData.title} 자료 화면`} />
          {/* currentData.image를 쓴 이유:
              각 문법마다 이미지 경로가 다릅니다.
              grammarData.ts에서 id에 맞는 이미지 경로를 만들어 두었기 때문에 여기서는 그대로 src에 넣으면 됩니다. */}
        </div>
      </div>

      <EditorBlock data={currentData.content} />
      {/* EditorBlock에 currentData.content만 넘기는 이유:
          EditorBlock은 제목/이미지/예시가 아니라 탭 UI에 필요한 content만 필요합니다.
          필요한 데이터만 props로 넘기면 컴포넌트 역할이 분명해집니다. */}

      <div className="detailNav">
        {neighbors.previous ? (
          <Link to={`/grammar/${neighbors.previous.id}`}>이전: {neighbors.previous.title}</Link>
        ) : (
          <span>첫 번째 문법입니다.</span>
        )}
        {/* previous가 있을 때만 링크를 보여주는 이유:
            1번 문법에서는 이전 페이지가 없으므로 잘못된 링크를 만들지 않기 위해서입니다. */}

        {neighbors.next ? (
          <Link to={`/grammar/${neighbors.next.id}`}>다음: {neighbors.next.title}</Link>
        ) : (
          <span>마지막 문법입니다.</span>
        )}
        {/* next가 있을 때만 링크를 보여주는 이유:
            28번 문법에서는 다음 페이지가 없으므로 안내 문구를 보여주는 것이 맞습니다. */}
      </div>
    </div>
  );
}
