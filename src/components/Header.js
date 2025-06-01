import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";

import logoApp from "../assets/images/logo192 copy.png";
import { UserContext } from "../context/UserContext";

const Header = (props) => {
  const { logout, user } = useContext(UserContext);

  // useEffect(() => {
  //   if (window.location.pathname === "/login") {
  //     setHideHeader(true);
  //   }
  // }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from UserContext
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
          <Navbar.Brand as={NavLink} to="/">
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
            {((user && user.auth) ||
              window.location.pathname === "/" ||
              window.location.pathname === "/users") && (
              <>
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
                  {user && user.email && (
                    <span className="nav-link">Welcome {user.email}</span>
                  )}
                  <NavDropdown title="Setting" id="basic-nav-dropdown ">
                    {user && user.auth === true ? (
                      <NavDropdown.Item onClick={() => handleLogout()}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
