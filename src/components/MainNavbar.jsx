import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Button,
  Image,
  Modal,
} from "react-bootstrap";
import { MdLightMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import { logout } from "../slices/authSlice";
import Loader from "../utils/Loader";
import { LinkContainer } from "react-router-bootstrap";
import { USERS_URL } from "../constants";
import axios from "axios";
import SpinnerPro from "../utils/Spinner";
import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidError } from "react-icons/bi";

const MainNavbar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setSearchLoading(true);
      const response = await axios.get(
        `${USERS_URL}/search?searchtext=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSearchLoading(false);
      setSearchResults(response.data);
      setIsSearchOpen(true);
      setSearchText("");
    } catch (error) {
      console.error("Error searching users:", error);
      setIsSearchOpen(false);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });
  const { userInfo } = useSelector((state) => state.auth);

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
              <LinkContainer to={`/quirky/${userInfo._id}/quirkyPost`}>
                <Nav.Link href="#" className="px-3">
                  Single Post
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                title="Extras"
                id="basic-nav-dropdown "
                className="px-3"
              >
                <LinkContainer to={`/quirky/${userInfo._id}`}>
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                </LinkContainer>

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
                    value={searchText}
                    name="search"
                    placeholder="Search"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="outline-light"
                  style={{ fontSize: "12px", height: "fit-content" }}
                  className="mt-1 ms-2"
                  onClick={handleSearch}
                  disabled={searchLoading}
                >
                  {searchLoading ? <SpinnerPro /> : "Search"}
                </Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Modal
          size="lg"
          show={isSearchOpen}
          onHide={() => setIsSearchOpen(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <BiSearchAlt2 className="fs-1" />
          </Modal.Header>
          <Modal.Body style={{ height: "30rem", overflow: "auto" }}>
            {isSearchOpen && searchResults.length > 0 ?(
              <div className=" ">
                {searchResults.map((user) => (
                  <LinkContainer to={`/quirkyUser/${user._id}`}>
                    <div
                      key={user._id}
                      className=" textHover"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <Container
                        className="mb-3 p-3 rounded border border-secondary shadow"
                        fluid
                      >
                        <span>
                          <Image
                            src={user.photo}
                            roundedCircle
                            style={{
                              width: "40px",
                              height: "40px",
                              marginRight: "10px",
                            }}
                          />
                        </span>
                        <span>
                          <span className="me-2">
                            <strong>Name:</strong> {user.name}
                          </span>
                          <span>
                            <strong>Email:</strong> {user.email}
                          </span>
                        </span>
                      </Container>
                    </div>
                  </LinkContainer>
                ))}
              </div>
            ) : (
                <Container className="text-center itim-regular mt-5">
                  <BiSolidError style={{ fontSize: "3rem" }}
                  
                  />                   No user found
                        </Container>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
