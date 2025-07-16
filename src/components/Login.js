import { useContext, useState } from "react";
import { toast } from "react-toastify";
import "./Login.scss";
import { loginUser } from "../services/UserService";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-solid fa-eye-slash");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);

  const handleToggle = () => {
    if (type === "password") {
      setIcon("fa-solid fa-eye");
      setType("text");
    } else {
      setIcon("fa-solid fa-eye-slash");
      setType("password");
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }
    setLoading(true);
    const emailTrimmed = email.trim();
    let res = await loginUser(emailTrimmed, password);
    let data = res.data;

    const foundUser = data.find((item) => emailTrimmed === item.email);

    if (foundUser) {
      setLoading(false);
      toast.success("Login successful!");
      loginContext(email);
      navigate("/");
    } else {
      setLoading(false);
      toast.error("Login failed! Please check your email and password.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <>
      <div className="login-container ">
        <div className="title">Login </div>
        <div className="text">
          <strong>
            Email or Username ( Sincere@april.biz || Password : 12345 ){" "}
          </strong>
        </div>
        <form>
          <input
            type="text"
            placeholder="Email or Username"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="password-container">
            <input
              type={type}
              className="password-input"
              placeholder="Enter password"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
            />

            <i className={icon} onClick={handleToggle}></i>
          </div>
        </form>
        <button
          className={email && password ? "active" : ""}
          disabled={email && password ? false : true}
          onClick={() => handleLogin()}
        >
          {loading && <i className="fa-solid fa-sync fa-spin me-2"></i>}
          Login
        </button>
        <div className="go-back">
          <i className="fa-solid fa-chevron-left"></i>
          <span style={{ fontSize: 15 }} onClick={() => handleGoBack()}>
            Go back
          </span>
        </div>
      </div>
    </>
  );
};
export default Login;
