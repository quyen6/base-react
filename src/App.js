import { ToastContainer } from "react-toastify";
import Container from "react-bootstrap/esm/Container";

import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";

function App() {
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <TableUsers />
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
