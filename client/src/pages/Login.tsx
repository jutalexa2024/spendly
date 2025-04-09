import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const [loading, setLoading] = useState(false); // Fix: Added useState for loading
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  
    // Clear error when the user starts typing
    setError("");

    if (!email || !password) {
      if (!email && !password){
        setError("Please enter both email and password.");
      }
      else if (!email){
        setError("Please Enter a valid email address.");
      } 
      else {
        setError("A Valid Password is Required.");
      } 
      return;
    }

    // TODO: Replace with API call to backend authentication
    if (email === "myemail@email.com" && password === "password123") {
      navigate("/subscription"); // Redirect to dashboard page if login is successful
    } else {
      setError("Invalid credentials. Please try again.");
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

        {error && <p className="error-message">{error}</p>}  {/*This display the error message*/}

        <button type="submit">Login</button>
        <h3>
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </h3>
      </form>
    </div>
  );
};

export default Login;


