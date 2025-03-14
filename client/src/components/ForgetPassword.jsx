import { useState } from "react";
import "../styles/forgetPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleSendCode = () => {
    console.log("Sending code to:", email);
  };

  const handleVerifyCode = () => {
    console.log("Verifying code:", code);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <h2 className="forgot-password-title">Forgot Password?</h2>
          <p className="forgot-password-subtitle">Enter your email to receive a reset code</p>

          <div className="input-group">
            <input
              type="email"
              className="forgot-password-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="forgot-password-button" onClick={handleSendCode}>
              Send
            </button>
          </div>

          <div className="input-group">
            <input
              type="text"
              className="forgot-password-input"
              placeholder="Enter the code sent to you"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="forgot-password-button" onClick={handleVerifyCode}>
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
