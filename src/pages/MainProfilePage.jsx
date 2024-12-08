import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileBox from "../components/ProfileBox";
import MainBlogBox from "../components/MainBlogBox";
import { ImBooks } from "react-icons/im";
import blogPosts from "../utils/DummyData";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
const MainProfilePage = () => {
  return (
    <Container className="page-body " fluid>
      <ProfileBox />
      <p className="text-center fs-1 mb-5">
        <FaCanadianMapleLeaf />
      </p>
      <Container className="d-flex justify-center ms-3 ps-3 pb-5">
        <Row className="ps-5 ms-5" style={{ width: "fit-content" }}>
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
    </Container>
  );
};

export default MainProfilePage;
