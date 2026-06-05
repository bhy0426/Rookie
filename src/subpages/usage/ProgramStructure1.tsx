import React from 'react';
import { Link } from 'react-router-dom';
import { programStructureData } from '../../data/programStructureData';

const ProgramStructure1: React.FC = () => {
  const data = programStructureData.find((item) => item.id === 1);

  if (!data) return <main className="detailPage">데이터를 불러올 수 없습니다.</main>;

  return (
    <main className="structureDetailPage">
      <Link className="backLink" to="/usage">사용 페이지</Link>
      <p className="eyebrow">프로그램 구성 01</p>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <section className="featureBox">{data.feature}</section>
      <ul className="pointList">
        {data.points.map((point) => <li key={point}>{point}</li>)}
      </ul>
    </main>
  );
};

export default ProgramStructure1;

