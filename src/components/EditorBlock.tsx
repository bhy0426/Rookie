import { useMemo, useState } from 'react';

interface GrammarMember {
  name: string;
  value?: string;
  kind?: string;
  note?: string;
}

interface EditorContent {
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

export default function EditorBlock({ data }: { data: EditorContent }) {
  const [activeTab, setActiveTab] = useState('public');

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
