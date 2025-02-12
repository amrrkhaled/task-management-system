import { useState } from "react";
import { Link } from "react-router-dom"; 
import "../styles/register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Registering with:", username, email, password);
  };

  return (
    <div className="register-page">  {/* Background container */}
      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Create an Account</h2>
          <p className="register-subtitle">Join us today!</p>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="register-input"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                className="register-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                className="register-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-button">Register</button>

            <div className="register-links">
              <p>Already have an account? <Link to="/" className="register-link">Login!</Link></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
