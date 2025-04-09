import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Clear error when the user starts typing
    setError("");

    // Validate required fields
    if (!username || !email || !password) {
      if (!username && !email && !password) {
        setError("Please enter a username, email, and password.");
      } else if (!username) {
        setError("Please enter a username.");
      } else if (!email) {
        setError("Please enter a valid email address.");
      } else {
        setError("Please enter a valid password.");
      }
      return;
    }

    // TODO: Replace with API call to backend for user creation
    try {
      localStorage.setItem("signupData", JSON.stringify({ username, email, password }));
      navigate("/login");
    } catch (err) {
      setError("An error occurred during sign-up. Please try again."); 
    }

  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create a $pendly Account</h2>

        <label>Username*:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email*:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password*:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <button type="submit">Sign Up</button>
        <h3>
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Login here
          </a>
        </h3>
      </form>
    </div>
  );
};

export default Signup;