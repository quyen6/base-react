import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logoApp from "../assets/images/logo192 copy.png";
import { toast } from "react-toastify";

const Header = (props) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user-email");
    navigate("/");
    toast.success("Logout successful!");
    // You can also redirect to the login page or home page after logout
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-body-tertiary"
        bg="light"
        data-bs-theme="light"
      >
        <Container>
          <Navbar.Brand href="/">
            <img
              alt="logo"
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top logo-spin"
            />
            <span> QUINN-MQ</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto ">
              <Nav>
                <NavLink to="/" className="nav-link">
                  {/* Add class nav-link's bootstrap   */}
                  Home
                </NavLink>

                <NavLink to="/users" className="nav-link">
                  Manage Users
                </NavLink>
              </Nav>
            </Nav>
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown ">
                <NavLink to="/login" className="dropdown-item">
                  Login
                </NavLink>

                <NavDropdown.Item onClick={() => handleLogout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
