import { Link } from "react-router-dom";
import { useContext } from "react";
import "../../styles/nav.css"; // Create this file for styling
import { AppContext } from "../../App"; // AppContext is where user data is stored for now.

const NavLinks = () => {
  const context = useContext(AppContext);
  if (!context) {
    return (
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/subscription">Subscription</Link>
        <Link to="/bills">Bills</Link>
        <Link to="/login">Login</Link>

  
      </nav>
    );
  }

  const { user, setUser} = context;

  const handleLogout = () => {
    // Clear the user state to log out
    setUser(null);
  };

  return (
    <nav className="nav-links">
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/subscription">Subscription</Link>
      <Link to="/bills">Bills</Link>
      {user? (
        <div className="user-section">
          <span>{user.username}</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>

      ) : (
        <Link to="/login">Login</Link>
      )}

    </nav>
  );
};

export default NavLinks;