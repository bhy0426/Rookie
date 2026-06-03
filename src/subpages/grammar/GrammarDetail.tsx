import { useParams } from 'react-router-dom';

export default function GrammarDetail() {
  const { id } = useParams();
  return <h1>Grammar Detail {id}</h1>;
}
