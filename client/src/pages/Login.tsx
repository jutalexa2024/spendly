import "../styles/login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false); // Fix: Added useState for loading
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear error when the user starts typing
    if (error) setError("");

    if (!email || !password) {
      if (!email && !password)
        setError("Please enter both email and password.");
      else if (!email) setError("Please Enter a valid email address.");
      else setError("A Valid Password is Required.");
      return;
    }

    // TODO: Replace with API call to backend authentication
    
    if (email === "myemail@email.com" && password === "password123") {
      navigate("/dashboard"); // Redirect to dashboard page if login is successful
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login To $pendly</h2>
        
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;


