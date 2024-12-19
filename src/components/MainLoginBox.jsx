import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { FaHandPeace } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";

const MainLoginBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const togglePassoword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading: loginLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: loginEmail,
        password: loginPassword,
      }).unwrap();
      dispatch(setCredentials(res));
      navigate("/quirky/home");
      toast.success("Login Successfull");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container style={{ width: "75%" }}>
      <h4 style={{ fontWeight: "600" }}>Login now</h4>
      <p>
        Hi, Welcome Back! <FaHandPeace className="mb-1" />
      </p>
      <hr />
      <Row>
        <Col>
          <Form>
            <Form.Group className="mt-1">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                style={{ backgroundColor: "#FFA3BE" }}
                type="email"
                value={loginEmail}
                name="loginEmail"
                placeholder="Enter your email"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-1">
              <div>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "#FFA3BE" }}
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  name="loginPassword"
                  placeholder="Enter your Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEye
                    className="lead my-2 textHover"
                    onClick={togglePassoword}
                  />
                ) : (
                  <IoEyeOffSharp
                    onClick={togglePassoword}
                    className="lead my-2 textHover"
                  />
                )}
              </div>
            </Form.Group>
            {loginLoading ? (
              <Loader />
            ) : (
              <Button
                type="submit"
                variant="primary"
                style={{ width: "100%" }}
                className="my-2"
                onClick={submitHandler}
              >
                Login
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MainLoginBox;
