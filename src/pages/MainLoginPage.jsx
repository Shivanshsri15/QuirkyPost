import React, { useEffect, useState } from "react";
import { Container, Col, Row, Image } from "react-bootstrap";
import MainLoginBox from "../components/MainLoginBox";
import MainRegisterBox from "../components/MainRegisterBox";
import loginImage from "../images/loginImage.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MainLoginPage = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    navigate(userInfo? "/quirky/home":"/")
  },[userInfo,navigate])
  const [loginBoxOpen, setLoginBoxOpen] = useState(true);
  return (
   
    <>
      <Container fluid style={{ backgroundColor: "#F9E6E6", height: "100vh" }}>
        <h1 className="text-primary itim-regular ps-5 pt-2">QuirkyPost</h1>
        <Row className="pt-5">
          <Col>
            {loginBoxOpen ? <MainLoginBox /> : <MainRegisterBox />}
            <p className="ps-5 mx-5" style={{ fontSize: "12px" }}>
              {loginBoxOpen ? (
                <>
                  <span>Not registered yet?</span>
                  <span className="text-primary ms-1">Create an account</span>
                  <span
                    className="mx-1 textHover"
                    style={{ fontWeight: "600" }}
                    onClick={() => setLoginBoxOpen((prev) => !prev)}
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  <span>Already a user?</span>
                  <span className="text-primary "></span>
                  <span
                    className="mx-1 text-primary textHover"
                    style={{ fontWeight: "600" }}
                    onClick={() => setLoginBoxOpen((prev) => !prev)}
                  >
                    Login
                  </span>
                </>
              )}
            </p>
          </Col>
          <Col>
            <Image src={loginImage} className="ps-3 pt-2" />
          </Col>
        </Row>
        <Container  style={{ backgroundColor: "#F9E6E6" }} className="mt-5 pt-4">
          <Row>
            <p className="text-center">All rights reserved @QuirkyPost 2024</p>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default MainLoginPage;
