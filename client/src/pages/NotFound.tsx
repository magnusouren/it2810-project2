import { Link } from 'react-router-dom';

/**
 *
 * NotFound component.
 * Component to be displayed when the user tries to access a page that does not exist.
 *
 * @returns {React.JSX.Element}
 */

export const NotFound = () => (
  <div>
    <h1>404 - Not Found!</h1>
    <Link to='/'>Go Home</Link>
  </div>
);
