import NavLinks from "../nav/index"
import "../../styles/layout.css"; // Import your CSS file
import logo from "../../assets/spendly-logo.png"; // Adjust the path to your logo
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/">
        <img src={logo} alt="Spendly Logo" className="logo" />
        </Link>
      </div>
      {location.pathname === "/" ? (
        <div className= "nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </div>
      ) : (
        <NavLinks />
      )}
    </header>
  );
};

export default Header;
