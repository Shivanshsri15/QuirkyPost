import React, { useEffect, useState } from "react";
import BlogTitle from "../components/BlogTitle";
import BlogPageCover from "../components/BlogPageCover";
import { Container, Button, Col, Row } from "react-bootstrap";
import { CgArrowRight } from "react-icons/cg";
import { RiGeminiFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBox from "../components/IconBox";
import OpenAi from "../components/OpenAi";

const BlogDraftPage = () => {
  const [show, setShow] = useState(false);

  const modalHandler = () => {
    setShow(!show);
  };

  const navigate = useNavigate();

  const { blogInfo } = useSelector((state) => state.blog);
  const { userInfo } = useSelector((state) => state.auth);

  const [highlight, setHighlight] = useState(false);

useEffect(() => {
  if (blogInfo?.title) {
    setHighlight(true);
    const timer = setTimeout(() => {
      setHighlight(false); 
    }, 500); 
    return () => clearTimeout(timer); 
  }
}, [blogInfo]);

  return (
    <Container className="page-body" fluid>
      <Row>
        <Col md={12} className="p-1">
          <BlogPageCover>
            <BlogTitle />
          </BlogPageCover>
          <Container className="text-center page-body">
            <Button
              variant="success"
              onClick={modalHandler}
              className="m-2"
            >
              <RiGeminiFill className="me-3" />
              Open Ai
            </Button>
            <OpenAi show={show} handleClose={modalHandler} />
          </Container>
        </Col>
      </Row>
      <Row>
        <Container className="d-flex page-body justify-content-between px-4 mt-4 pb-4">
          {blogInfo?.title ? (
            <>
              <Button
                variant="outline-light px-4 ms-auto"
                className={highlight ? "highlight" : ""}
                onClick={() =>
                  navigate(`/quirky/${userInfo._id}/quirkyPost/content`)
                }
              >
                Next
                <CgArrowRight />
              </Button>
            </>
          ) : (
            ""
          )}
        </Container>
      </Row>
      <Row>
        <IconBox />
      </Row>
    </Container>
  );
};

export default BlogDraftPage;
