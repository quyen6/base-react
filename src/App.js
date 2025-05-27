import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/esm/Container";

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Home from "./components/Home";
import Login from "./components/Login";

import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";

function App() {
  const { user, loginContext } = useContext(UserContext);
  console.log("🚀 ~ App ~ user:", user);

  useEffect(() => {
    if (localStorage.getItem("user-email")) {
      loginContext(localStorage.getItem("user-email"));
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
