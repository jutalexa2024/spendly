import { Link } from "react-router-dom";
import "../styles/errorpage.css";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="home-link">Go Back Home</Link>
    </div>
  );
};

export default ErrorPage;
