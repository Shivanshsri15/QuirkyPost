import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { FaHandPeace } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const MainRegisterBox = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePassoword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, age, email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate("/quirky/home");
      toast.success("Welcome to QuirkyPost!!")
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container style={{ width: "75%" }}>
      <h4 style={{ fontWeight: "600" }}>Register now</h4>
      <p>
        Hi, Welcome to QuirkyPost! <FaHandPeace className="mb-1" />
      </p>
      <hr />
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                style={{ backgroundColor: "#FFA3BE" }}
                type="text"
                value={name}
                name="name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Age:</Form.Label>
              <Form.Control
                style={{ backgroundColor: "#FFA3BE" }}
                type="number"
                value={age}
                name="age"
                placeholder="Enter your age"
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mt-1">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                style={{ backgroundColor: "#FFA3BE" }}
                type="email"
                value={email}
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mt-1">
              <div>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  style={{ backgroundColor: "#FFA3BE" }}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  name="loginPassword"
                  placeholder="Enter your Password"
                  onChange={(e) => setPassword(e.target.value)}
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
            {registerLoading ? (
              <Loader />
            ) : (
              <Button
                type="submit"
                onClick={submitHandler}
                variant="primary"
                style={{ width: "100%" }}
                className="my-2"
              >
                Register
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default MainRegisterBox;
