import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaPenRuler } from "react-icons/fa6";
import { BsFillEnvelopeOpenFill } from "react-icons/bs";
import ProgressBarPro from "./ProgressBar";
import { useLocation } from "react-router-dom";
import { IoIosAdd, IoIosAirplane } from "react-icons/io";
import { IoIosAperture } from "react-icons/io";
import { IoIosAlarm } from "react-icons/io";
import { IoIosBook } from "react-icons/io";
import { IoIosBaseball } from "react-icons/io";
import { IoIosCart } from "react-icons/io";
import { IoIosChatboxes } from "react-icons/io";
import { IoIosColorPalette } from "react-icons/io";
const BlogPageCover = ({ children }) => {
  const location = useLocation();
  const [progressValue, setProgressValue] = useState(20);

  useEffect(() => {
    if (location.pathname.endsWith("/content")) {
      setProgressValue(75);
    } else {
      setProgressValue(20);
    }
  }, [location]);

  return (
    <Container fluid className="page-body pt-2 px-5">
      <Row className="mb-5">
        <Col md={6} className="px-3 pt-3">
          <h1 className="p-3">Share your unique thoughts with the world.</h1>
          <p className="px-3 fs-5 ms-1">
            <span className="me-2">
              <FaPenRuler />
            </span>
            Share a personal story or experience.
          </p>
          <p className="px-3 fs-5 ms-1">
            <span className="me-2">
              <FaPenRuler />
            </span>
            Present your insights or advice.
          </p>
          <p className="px-3 fs-5 ms-1">
            <span className="me-2">
              <BsFillEnvelopeOpenFill />
            </span>
            Dive into a topic you’re passionate about.
          </p>
        </Col>
        <Col md={6} className="py-5 ps-5">
          <Row className="my-3">
            <Col className="text-center">
              <IoIosAirplane className="fs-1" />
            </Col>
            <Col className="text-center">
              <IoIosAlarm className="fs-1" />
            </Col>
            <Col className="text-center">
              <IoIosAperture className="fs-1" />
            </Col>
          </Row>

          <Row className="my-3">
            <Col className="text-center">
              <IoIosBook className="fs-1" />
            </Col>
            <Col className="text-center">
              <IoIosBaseball className="fs-1" />
            </Col>
            <Col className="text-center">
              <IoIosChatboxes className="fs-1" />
            </Col>
          </Row>

          <Row className="my-3">
            <Col className="text-center">
              <IoIosAdd className="fs-1" />
            </Col>
            <Col className="text-center">
              <IoIosCart className="fs-1" />
            </Col>
            <Col className="text-center">
              <IoIosColorPalette className="fs-1" />
            </Col>
          </Row>
        </Col>
      </Row>
      <hr />
      <Row className="mx-2 pb-0 my-4">
        <Col className="p-3 card-Body rounded">
          <ProgressBarPro val={progressValue} var={"animated"} />
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPageCover;
