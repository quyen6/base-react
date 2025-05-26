import { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-solid fa-eye-slash");

  const handleToggle = () => {
    if (type === "password") {
      setIcon("fa-solid fa-eye");
      setType("text");
    } else {
      setIcon("fa-solid fa-eye-slash");
      setType("password");
    }
  };

  return (
    <>
      <div className="login-container ">
        <div className="title">Login </div>
        <div className="text">
          <strong>Email or Username </strong>
        </div>
        <input
          type="text"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-container">
          <input
            type={type}
            className="password-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <i className={icon} onClick={handleToggle}></i>
        </div>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
        >
          Login
        </button>
        <div className="go-back">
          <i className="fa-solid fa-chevron-left"></i>
          <span style={{ fontSize: 15 }}>Go back</span>
        </div>
      </div>
    </>
  );
};
export default Login;
