// FILE: pages/grammar/EditorBlock.tsx
// PURPOSE: EDITOR BLOCK. 선택된 탭에 따라 문법 콘텐츠 영역을 바꿔 보여줍니다.
// FLOW 01: EditorBlock은 props로 받은 data를 기준으로 탭 UI를 구성합니다.
// FLOW 02: activeTab state가 현재 선택된 영역(public/protected/private)을 저장합니다.
// FLOW 03: counts memo가 각 탭에 들어 있는 항목 수를 계산합니다.
// FLOW 04: activeTab 값에 따라 currentList, activeLabel, activeHelper를 선택합니다.
// FLOW 05: 탭 버튼 클릭으로 activeTab이 바뀌면 해당 영역의 member list가 다시 렌더링됩니다.



import { useMemo, useState } from 'react';

import '../../styles/components/EditorBlock.css';

// TYPE: data와 props가 어떤 형태인지 TypeScript에 알려줍니다.
interface GrammarMember {
  name: string;
  value?: string;
  kind?: string;
  note?: string;
}

// TYPE: data와 props가 어떤 형태인지 TypeScript에 알려줍니다.
interface EditorContent {
  name: string;
  summary: string;
  public: GrammarMember[];
  protected: GrammarMember[];
  private: GrammarMember[];
  warnings?: string[];
}

// DATA: hook이 아니라 렌더링에 참조되는 정적 데이터입니다.
const tabs = [
  { key: 'public', label: 'public', helper: '사용자가 밖에서 직접 사용할 수 있는 기능' },
  { key: 'protected', label: '관리 값', helper: '객체가 상태를 기억하고 관리하는 값' },
  { key: 'private', label: '내부 처리', helper: '밖에서 건드리지 않아도 되는 내부 동작' }
];

// COMPONENT: props, state, hook 결과를 조합해 JSX 화면을 반환합니다.
export default function EditorBlock({ data }: { data: EditorContent }) {
// HOOK STATE: EditorBlock에서 public/protected/private 중 현재 선택된 탭을 저장합니다.
// FLOW STEP 01: 사용자가 선택한 탭(public/protected/private)을 저장합니다.
  const [activeTab, setActiveTab] = useState('public');

// HOOK MEMO: EditorBlock 탭별 항목 수를 data가 바뀔 때만 다시 계산합니다.
// FLOW STEP 02: data가 바뀔 때만 탭별 항목 수를 다시 계산합니다.
  const counts = useMemo(
    () => ({
      public: data.public.length,
      protected: data.protected.length,
      private: data.private.length
    }),
    [data]
  );

  let currentList: GrammarMember[] = data.public;
  let activeLabel = 'public';
  let activeHelper = '사용자가 밖에서 직접 사용할 수 있는 기능';

// FLOW STEP 03: activeTab 값에 따라 보여줄 리스트와 헤더 문구를 선택합니다.
  if (activeTab === 'protected') {
    currentList = data.protected;
    activeLabel = '관리 값';
    activeHelper = '객체가 상태를 기억하고 관리하는 값';
  }

  if (activeTab === 'private') {
    currentList = data.private;
    activeLabel = '내부 처리';
    activeHelper = '밖에서 건드리지 않아도 되는 내부 동작';
  }

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
            let tabCount = counts.public;

            if (tab.key === 'protected') {
              tabCount = counts.protected;
            }

            if (tab.key === 'private') {
              tabCount = counts.private;
            }

            return (
              <button
                key={tab.key}
                type="button"
                className={activeTab === tab.key ? 'active' : ''}
                onClick={() => setActiveTab(tab.key)}
              >
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
                let kindLabel = 'PROP';
                let kindClass = 'memberKind property';

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

                return (
                  <div key={`${item.name}-${index}`} className="memberRow">
                    <span className={kindClass}>{kindLabel}</span>
                    <span className="memberName">{item.name}</span>
                    {item.value && <span className="memberValue">{item.value}</span>}
                    {item.note && <span className="memberNote">{item.note}</span>}
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
    </div>
  );
}
