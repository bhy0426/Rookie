// EditorBlock.tsx
// 이 파일은 상세 페이지에서 "문법의 내부 구조를 탭으로 살펴보는 UI"를 담당합니다.
// 중요한 점은 탭을 누를 때마다 다른 배열(public/protected/private)을 보여준다는 것입니다.
// 그래서 이 파일은 useState로 선택된 탭을 관리하고, useMemo로 각 탭의 항목 개수를 계산합니다.

import { useMemo, useState } from 'react';

interface GrammarMember {
  // GrammarMember를 따로 interface로 만든 이유:
  // public, protected, private 배열의 항목들이 모두 같은 모양을 가지기 때문입니다.
  // 같은 타입을 반복해서 적지 않고 이름을 붙이면 코드가 읽기 쉬워집니다.

  name: string;
  value?: string;
  kind?: string;
  note?: string;
  // ?를 붙인 이유:
  // 모든 항목이 value, kind, note를 항상 가지지는 않습니다.
  // 예를 들어 함수 이름만 표시할 때는 value가 없어도 됩니다.
}

interface EditorContent {
  // EditorContent는 부모 GrammarDetail.tsx에서 넘겨받는 data의 모양입니다.
  // 이 모양을 미리 정해야 data.public, data.private 같은 접근을 TypeScript가 이해할 수 있습니다.

  name: string;
  summary: string;
  public: GrammarMember[];
  protected: GrammarMember[];
  private: GrammarMember[];
  warnings?: string[];
}

const tabs = [
  { key: 'public', label: 'public', helper: '사용자가 밖에서 직접 사용할 수 있는 기능' },
  { key: 'protected', label: '관리 값', helper: '객체가 상태를 기억하고 관리하는 값' },
  { key: 'private', label: '내부 처리', helper: '밖에서 건드리지 않아도 되는 내부 동작' }
];
// 탭 정보를 배열로 뺀 이유:
// 버튼 3개가 key, label, helper라는 같은 구조를 가집니다.
// JSX에서 버튼을 3번 직접 쓰는 대신 map으로 반복하면 중복이 줄고,
// 나중에 탭 이름을 바꾸거나 추가할 때 이 배열만 고치면 됩니다.

export default function EditorBlock({ data }: { data: EditorContent }) {
  // data를 props로 받는 이유:
  // EditorBlock은 특정 문법 하나만 아는 컴포넌트가 아니라, 어떤 문법 데이터든 받아서 같은 UI로 보여주는 재사용 컴포넌트입니다.
  // GrammarDetail.tsx가 현재 문법의 content를 data로 넘겨줍니다.

  const [activeTab, setActiveTab] = useState('public');
  // activeTab을 상태로 둔 이유:
  // 사용자가 탭 버튼을 누를 때마다 화면에 보여줄 목록이 바뀌어야 합니다.
  // 일반 변수로 두면 값이 바뀌어도 React가 화면을 다시 그리지 않습니다.
  // useState를 사용하면 setActiveTab 실행 후 컴포넌트가 다시 렌더링되어 currentList가 새로 결정됩니다.

  const counts = useMemo(
    () => ({
      public: data.public.length,
      protected: data.protected.length,
      private: data.private.length
    }),
    [data]
  );
  // useMemo를 쓴 이유:
  // 탭 버튼 옆에 각 영역의 항목 개수를 보여주기 위해 매번 length를 계산합니다.
  // 계산 자체는 어렵지 않지만, "data가 바뀔 때만 다시 계산한다"는 훅 사용 예시가 됩니다.
  // 의존성 배열 [data]는 부모가 다른 문법 데이터를 넘겼을 때만 개수를 다시 계산하게 합니다.

  let currentList: GrammarMember[] = data.public;
  let activeLabel = 'public';
  let activeHelper = '사용자가 밖에서 직접 사용할 수 있는 기능';
  // 기본값을 public으로 둔 이유:
  // 처음 activeTab 초기값이 'public'이므로, 아무 조건에도 걸리지 않으면 public 영역을 보여주면 됩니다.
  // if문으로 protected/private일 때만 값을 바꾸면 코드 흐름이 단순해집니다.

  if (activeTab === 'protected') {
    currentList = data.protected;
    activeLabel = '관리 값';
    activeHelper = '객체가 상태를 기억하고 관리하는 값';
  }
  // activeTab이 protected일 때 보여줄 배열과 설명을 바꿉니다.
  // 이 구조를 쓴 이유는 JSX 안에서 복잡한 조건식을 반복하지 않기 위해서입니다.

  if (activeTab === 'private') {
    currentList = data.private;
    activeLabel = '내부 처리';
    activeHelper = '밖에서 건드리지 않아도 되는 내부 동작';
  }
  // activeTab 값에 따라 currentList를 미리 결정해 두면,
  // 아래 JSX는 currentList만 map으로 출력하면 되므로 훨씬 읽기 쉽습니다.

  return (
    <div className="editorBlock">
      <div className="editorTopbar">
        <div>
          <p className="eyebrow">직접 살펴보기</p>
          <h2>{data.name}</h2>
        </div>
        <div className="windowDots">
          <div />
          <div />
          <div />
        </div>
      </div>

      <p className="editorSummary">{data.summary}</p>

      <div className="editorWorkspace">
        <div className="editorSidebar">
          {tabs.map((tab) => {
            // map을 쓴 이유:
            // tabs 배열에 있는 3개 정보를 버튼 3개로 바꾸기 위해서입니다.
            // 같은 구조의 버튼을 반복 작성하지 않아도 됩니다.

            let tabCount = counts.public;
            // 기본값을 public 개수로 둔 이유:
            // public 탭이 기본 탭이기 때문입니다.

            if (tab.key === 'protected') {
              tabCount = counts.protected;
            }

            if (tab.key === 'private') {
              tabCount = counts.private;
            }
            // tab.key에 따라 보여줄 개수를 바꾸는 이유:
            // 각 버튼 옆에는 자기 탭에 들어 있는 항목 개수를 보여줘야 하기 때문입니다.

            return (
              <button
                key={tab.key}
                type="button"
                className={activeTab === tab.key ? 'active' : ''}
                onClick={() => setActiveTab(tab.key)}
              >
                {/* onClick에서 setActiveTab(tab.key)를 호출하는 이유:
                    버튼을 누른 탭 key를 상태에 저장해야 오른쪽 목록이 바뀝니다.
                    바로 setActiveTab(tab.key)를 쓰지 않고 화살표 함수로 감싼 이유는
                    클릭할 때 실행되게 만들기 위해서입니다. */}

                <span>{tab.label}</span>
                <span className="tabCount">{tabCount}</span>
              </button>
            );
          })}
        </div>

        <div className="editorPanel">
          <div className="panelHeader">
            <h3>{activeLabel} 영역</h3>
            <span>{activeHelper}</span>
          </div>

          {currentList.length === 0 ? (
            <div className="emptyState">등록된 항목이 없습니다.</div>
          ) : (
            <div className="memberList">
              {currentList.map((item, index) => {
                // currentList를 map으로 출력하는 이유:
                // 탭마다 항목 개수가 다르기 때문에 JSX를 고정으로 적을 수 없습니다.
                // 배열의 항목 개수만큼 memberRow를 자동으로 만들어야 합니다.

                let kindLabel = 'PROP';
                let kindClass = 'memberKind property';
                // 기본값을 PROP으로 둔 이유:
                // kind가 없거나 variable/function/rule이 아니면 일반 속성처럼 표시하기 위해서입니다.

                if (item.kind === 'variable') {
                  kindLabel = 'VAR';
                  kindClass = 'memberKind variable';
                }

                if (item.kind === 'function') {
                  kindLabel = 'FN';
                  kindClass = 'memberKind function';
                }

                if (item.kind === 'rule') {
                  kindLabel = 'RULE';
                  kindClass = 'memberKind rule';
                }
                // if문을 쓴 이유:
                // 사용자가 배우지 않은 복잡한 객체 매핑 방식 대신,
                // kind 값에 따라 라벨과 CSS 클래스를 직접 바꾸는 흐름이 이해하기 쉽기 때문입니다.

                return (
                  <div key={`${item.name}-${index}`} className="memberRow">
                    {/* key에 index를 같이 넣은 이유:
                        같은 name이 있을 경우에도 React가 줄을 구분할 수 있게 하기 위해서입니다. */}

                    <span className={kindClass}>{kindLabel}</span>
                    <span className="memberName">{item.name}</span>

                    {item.value && <span className="memberValue">{item.value}</span>}
                    {/* item.value가 있을 때만 보여주는 이유:
                        모든 항목에 값이 있는 것은 아니므로 빈 칸을 억지로 만들 필요가 없습니다. */}

                    {item.note && <span className="memberNote">{item.note}</span>}
                    {/* note도 선택 속성이므로 있을 때만 출력합니다. */}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {data.warnings && data.warnings.length > 0 && (
        <div className="editorWarnings">
          {data.warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}
      {/* warnings를 조건부 렌더링한 이유:
          주의사항이 없는 문법도 있습니다.
          빈 박스를 항상 보여주기보다, 실제 경고 문구가 있을 때만 영역을 보여주는 것이 자연스럽습니다. */}
    </div>
  );
}
