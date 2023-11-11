import { Link } from 'react-router-dom';

export default function NoMatch() {
  return (
    <>
      <p>No matching route found for this URL.</p>
      <Link to="/">
        <button type="button">
          Home
        </button>
      </Link>
    </>
  );
}
