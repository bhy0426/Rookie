import { useMemo, useState } from 'react';
import type { EditorContent, GrammarMember } from '../data/grammarData';

type AccessTab = 'public' | 'protected' | 'private';

const tabMeta: Record<AccessTab, { label: string; helper: string }> = {
  public: { label: '공개 기능', helper: '사용자가 밖에서 직접 사용할 수 있는 기능' },
  protected: { label: '관리 값', helper: '객체가 상태를 기억하고 관리하는 값' },
  private: { label: '내부 처리', helper: '밖에서 건드리지 않아도 되는 내부 동작' }
};

const kindLabel: Record<NonNullable<GrammarMember['kind']>, string> = {
  variable: 'VAR',
  function: 'FN',
  property: 'PROP',
  rule: 'RULE'
};

function getKindClass(kind: GrammarMember['kind']) {
  return `memberKind ${kind ?? 'property'}`;
}

export default function EditorBlock({ data }: { data: EditorContent }) {
  const [activeTab, setActiveTab] = useState<AccessTab>('public');

  const counts = useMemo(
    () => ({
      public: data.public.length,
      protected: data.protected.length,
      private: data.private.length
    }),
    [data]
  );

  const currentList = data[activeTab];

  return (
    <section className="editorBlock" aria-label={`${data.name} 체험형 에디터`}>
      <div className="editorTopbar">
        <div>
          <p className="eyebrow">직접 살펴보기</p>
          <h2>{data.name}</h2>
        </div>
        <div className="windowDots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>

      <p className="editorSummary">{data.summary}</p>

      <div className="editorWorkspace">
        <aside className="editorSidebar">
          {(Object.keys(tabMeta) as AccessTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              <span>{tabMeta[tab].label}</span>
              <small>{counts[tab]}</small>
            </button>
          ))}
        </aside>

        <div className="editorPanel">
          <div className="panelHeader">
            <strong>{tabMeta[activeTab].label} 영역</strong>
            <span>{tabMeta[activeTab].helper}</span>
          </div>

          {currentList.length === 0 ? (
            <div className="emptyState">등록된 항목이 없습니다.</div>
          ) : (
            <div className="memberList">
              {currentList.map((item, index) => (
                <div key={`${item.name}-${index}`} className="memberRow">
                  <span className={getKindClass(item.kind)}>{kindLabel[item.kind ?? 'property']}</span>
                  <span className="memberName">{item.name}</span>
                  {item.value && <span className="memberValue">{item.value}</span>}
                  {item.note && <span className="memberNote">{item.note}</span>}
                </div>
              ))}
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
    </section>
  );
}

