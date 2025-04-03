import NavLinks from "../nav/index"
import "../../styles/layout.css"; // Import your CSS file
import logo from "../../assets/spendly-logo.png"; // Adjust the path to your logo
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/">
        <img src={logo} alt="Spendly Logo" className="logo" />
        </Link>
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
