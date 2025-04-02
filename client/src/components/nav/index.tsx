import { Link } from "react-router-dom";
import "../../styles/nav.css"; // Create this file for styling

const NavLinks = () => {
  return (
    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/subscription">Subscription</Link>
      <Link to="/bills">Bills</Link>
      <Link to="/login">Login</Link>

    </nav>
  );
};

export default NavLinks;