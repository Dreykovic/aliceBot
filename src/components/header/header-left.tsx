import { ArrowLeft } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

export default function HeaderLeft() {
  return (
    <button className="btn btn-ghost  btn-circle btn-sm">
      <Link to={'/'} className=" rounded-full">
        <ArrowLeft className="w-5 h-5" />
      </Link>
    </button>
  );
}
