import { Link, useLocation } from "react-router-dom";
import "../../styles/nav.css";

const Navbar = () => {
  const currentPage = useLocation();
  const hideHeader = currentPage.pathname === "/login" || currentPage.pathname === "/signup";
  return (
    <nav className="layout">
      <h1 className="logo">SubTrack</h1> {/* App name/logo */}
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/bills">Bills</Link></li>
        <li><Link to="/subscription">Subscriptions</Link></li>
        <li><Link to="/usersettings">Settings</Link></li>
        <li><Link to="/login" className="login-btn">Login</Link></li>
      </ul>
    </nav>
  );
};
export default Navbar;
