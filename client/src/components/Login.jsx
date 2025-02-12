import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="login-page">  {/* Ensures full-page background */}
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome Back!</h2>
          <p className="login-subtitle">Login to your account</p>
          
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                className="login-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">Login</button>

            <div className="login-links">
              <Link to="/forget-password" className="login-link">Forgot Password?</Link>
              <p>Don't have an account? <Link to="/register" className="login-link">Register Now!</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
