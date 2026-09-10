import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="not-found-page">
      <p className="not-found-code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or may have moved.</p>
      <Link to="/" className="primary-button">Back to home</Link>
    </main>
  );
}

export default NotFound;
