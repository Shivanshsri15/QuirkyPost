import React, { useEffect, useId, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileBox from "../components/ProfileBox";
import MainBlogBox from "../components/MainBlogBox";
import blogPosts from "../utils/DummyData";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useGetUserBlogsQuery } from "../slices/blogApiSlice";
import Loader from "../utils/Loader";
import { FaAirbnb, FaBlog } from "react-icons/fa";
const MainProfilePage = () => {
  const [userBlogs, setUserBlogs] = useState();
  const { userId } = useParams();
  const { data: blogsData, isLoading } = useGetUserBlogsQuery(userId);
  useEffect(() => {
    if (blogsData) {
      setUserBlogs(blogsData?.slice().reverse());
    }
  }, [blogsData]);

  console.log(userBlogs);

  return (
    <Container className="page-body " fluid>
      <ProfileBox />
      <p className="text-center fs-1 mb-5">
        <FaCanadianMapleLeaf />
      </p>
      <Container>

      <h2 className="poppins-semibold"><FaBlog/> Your Blogs</h2>
      </Container>
      <hr />
      <Container className="d-flex justify-center ms-3 ps-3 pb-5">
        <Row className="ps-5 ms-5" style={{ width: "fit-content" }}>
          {isLoading && (
            <Container className="d-flex justify-content-center align-items-center" >
              <Loader />
            </Container>
          )}
          {userBlogs?.map((b) => (
            <Col md={3} style={{ width: "fit-content" }} className="p-1">
              <MainBlogBox
                title={b.title}
                postImage={b.blogCoverImage}
                content={b.content}
                author={b.author.name}
                user={b.author}
                date={new Date(b.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
};

export default MainProfilePage;
