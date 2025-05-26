import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logoApp from "../assets/images/logo192 copy.png";

const Header = (props) => {
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
                <NavLink to="/" active className="nav-link">
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
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
