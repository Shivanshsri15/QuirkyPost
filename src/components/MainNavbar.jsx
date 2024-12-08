import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import Loader from "../utils/Loader";
import { LinkContainer } from "react-router-bootstrap";

const MainNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logOutFunc, { isLoading: logoutLoading }] = useLogoutMutation();

  const logoutHandler = async (e) => {
    try {
      await logOutFunc();
      toast.success("Logged out successfully");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Navbar
      expand="lg"
      className=" p-0 "
      data-bs-theme={isDarkMode ? "dark" : "light"}
    >
      <Container className="page-body page-para" fluid>
        <Navbar.Brand href="#home" className="itim-regular my-2 mx-2">
          QuirkyPost
        </Navbar.Brand>
        <Container className="text-center ms-5 ps-5 page-body">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="text-center"
          />
          <Navbar.Collapse>
            <Nav className="mx-auto px-auto text-white">
              <LinkContainer to={"/quirky/home"}>
                <Nav.Link href="#home" className="px-3">
                  Home
                </Nav.Link>
              </LinkContainer>
              <Nav.Link href="#link" className="px-3">
                Blog
              </Nav.Link>
              <Nav.Link href="#Post" className="px-3">
                Single Post
              </Nav.Link>
              <Nav.Link href="#Contact" className="px-3">
                Contact
              </Nav.Link>

              <NavDropdown
                title="Extras"
                id="basic-nav-dropdown "
                className="px-3"
              >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>
                  {logoutLoading ? <Loader /> : "Logout"}
                </NavDropdown.Item>
              </NavDropdown>
              <Button
                fluid
                onClick={toggleTheme}
                className="bg-transparent lead"
                style={{ border: "none", color: "white" }}
              >
                {isDarkMode ? (
                  <MdLightMode className="fs-5" />
                ) : (
                  <MdOutlineLightMode className="fs-5" />
                )}
              </Button>
              <Form className="ms-5 ps-5 d-flex">
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={search}
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="outline-light"
                  style={{ fontSize: "12px", height: "fit-content" }}
                  className="mt-1 ms-2"
                >
                  Search
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
