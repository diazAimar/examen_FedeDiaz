import { useParams } from 'react-router-dom';

export default function Courses() {
  const params = useParams();

  return (
    <div>
      <span className="capitalize"> {params.modality} </span> courses.
    </div>
  );
}
