import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations"; 
import "../styles/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

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

    try {
      const { data } = await addUser({
        variables: {
          input: {
            username,
            email,
            password,
          },
        },
      });

      if (data?.addUser?.token) {
        localStorage.setItem("token", data.addUser.token);
        navigate("/dashboard"); // Adjust route to your app flow
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during sign-up.");
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

        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Signing up..." : "Sign Up"}
        </button>

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
