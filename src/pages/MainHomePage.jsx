import React from "react";
import MainBlogBox from "../components/MainBlogBox";
import blogPosts from "../utils/DummyData";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import homePageImg from "../utils/homepageImg.png";
import { FaTruckLoading } from "react-icons/fa";
const MainHomePage = () => {
  return (
    <div className="page-body pt-3 pb-5">
      <div
        className="bg-white w-75 h-75 card-Body text-secondary rounded mb-5"
        style={{ marginLeft: "13%" }}
      >
        <Row>
          <Col className="d-flex justify-content-center pt-3">
            <Image
              src={homePageImg}
              style={{
                height: "40px",
                width: "40px",
              }}
              roundedCircle
            />
            <p
              style={{ display: "inline-block", fontSize: "12px" }}
              className="py-1 px-2 textHover"
            >
              <strong>

              Shivansh srivastava
              </strong>
              <p>CEO and founder</p>
            </p>
          </Col>
        </Row>
        <Row className="d-flex align-center justify-content-center ps-5">
          <Col style={{ textAlign: "center",paddingLeft:"18%" }} >
            <p className="w-75 px-5" style={{fontSize:"13px"}}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ducimus ipsum debitis minus, ab voluptatum libero explicabo omnis, laudantium corporis perferendis eaque consectetur nam inventore! Veniam repudiandae sed maxime in.
            </p>
          </Col>
        </Row>
      </div>
      <div className="page-body mx-5 px-5 ">
        <Container className="d-flex justify-center mx-5">
          <Row className="px-5 mx-5" style={{ width: "fit-content" }}>
            {blogPosts?.map((b) => (
              <Col md={3} style={{ width: "fit-content" }} className="p-1">
                <MainBlogBox
                  title={b.title}
                  postImage={b.postImage}
                  content={b.content}
                  author={b.author}
                  date={b.date}
                  user={b.user}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      <Container className="d-flex justify-content-center mx-5 py-5">
        <Button variant="outline-light">
          Load More <FaTruckLoading/>
        </Button>
      </Container>
      
    </div>
    
  );
};

export default MainHomePage;
