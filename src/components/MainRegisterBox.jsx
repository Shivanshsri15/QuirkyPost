import React, { useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { FaHandPeace } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";

const MainRegisterBox = () => {
  const [showPassword,setShowPassword] = useState(false)

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const togglePassoword = () => {
    setShowPassword(!showPassword)
  }
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
                  <FaEye className="lead my-2" onClick={togglePassoword} />
                ) : (
                  <IoEyeOffSharp
                    onClick={togglePassoword}
                    className="lead my-2"
                  />
                )}
              </div>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              style={{ width: "100%" }}
              className="my-2"
            >
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default MainRegisterBox;
