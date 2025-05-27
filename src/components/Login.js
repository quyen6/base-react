import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Login.scss";
import { loginUser } from "../services/UserService";
import { set } from "lodash";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-solid fa-eye-slash");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    if (type === "password") {
      setIcon("fa-solid fa-eye");
      setType("text");
    } else {
      setIcon("fa-solid fa-eye-slash");
      setType("password");
    }
  };

  useEffect(() => {
    let userEmail = localStorage.getItem("user-email");
    if (userEmail) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }
    setLoading(true);
    let res = await loginUser(email, password);
    let data = res.data;

    const foundUser = data.find((item) => email === item.email);

    if (foundUser) {
      setLoading(false);
      toast.success("Login successful!");
      localStorage.setItem("user-email", email);
      navigate("/");
    } else {
      setLoading(false);
      toast.error("Login failed! Please check your email and password.");
    }
  };

  return (
    <>
      <div className="login-container ">
        <div className="title">Login </div>
        <div className="text">
          <strong>Email or Username (Sincere@april.biz) </strong>
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
          onClick={() => handleLogin()}
        >
          {loading && <i className="fa-solid fa-sync fa-spin me-2"></i>}
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
