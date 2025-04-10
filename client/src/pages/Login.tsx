import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";; // Make sure the path is correct
import { AppContext } from "../App";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const context = useContext(AppContext);

  const [login, { loading }] = useMutation(LOGIN);

  if (!context) {
    return <p>Error: AppContext not available.</p>;
  }

  const { setUser } = context;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      if (!email && !password) {
        setError("Please enter both email and password.");
      } else if (!email) {
        setError("Please enter a valid email address.");
      } else {
        setError("A valid password is required.");
      }
      return;
    }

    try {
      const { data } = await login({
        variables: { email, password },
      });

      if (data?.login?.token) {
        // Store the token and update context
        localStorage.setItem("id_token", data.login.token);
        setUser({ username: data.login.user.username });

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login To $pendly</h2>

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

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <h3>
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </h3>
      </form>
    </div>
  );
};

export default Login;



