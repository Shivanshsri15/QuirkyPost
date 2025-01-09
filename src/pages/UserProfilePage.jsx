import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileBox from "../components/ProfileBox";
import MainBlogBox from "../components/MainBlogBox";
import { FaCanadianMapleLeaf } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useGetUserBlogsQuery } from "../slices/blogApiSlice";
import Loader from "../utils/Loader";
import { FaBlog } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import UserProfileBox from "../components/UserProfileBox";
import { useGetUserQuery } from "../slices/usersApiSlice";
import SpinnerPro from "../utils/Spinner";
const UserProfilePage = () => {
  const [userBlogs, setUserBlogs] = useState();
  const [userData, setUserData] = useState();
  const { userId } = useParams();
  const { data: blogsData, isLoading } = useGetUserBlogsQuery(userId);
  const { data: mainUserData, isLoading: userLoading } =
    useGetUserQuery(userId);
  useEffect(() => {
    if (blogsData) {
      setUserBlogs(blogsData?.slice().reverse());
    }
    if (userData) {
      setUserData(mainUserData);
    }
  }, [blogsData]);

  return (
    <Container className="page-body " fluid>
      {userLoading ? (
        <Container className="d-flex justify-content-center">
          <span className="text-center">
            <SpinnerPro />
          </span>
        </Container>
      ) : (
          <UserProfileBox user={mainUserData} blogsCount={ blogsData?.length} />
      )}
      <p className="text-center fs-1 mb-5">
        <FaCanadianMapleLeaf />
      </p>
      <Container>
        <h2 className="poppins-semibold">
          <FaBlog /> Blogs
        </h2>
      </Container>
      <hr />
      
      <Container className="d-flex justify-center ms-3 ps-3 pb-5">
        <Row className="ps-3 ms-3" style={{ width: "fit-content" }}>
          {isLoading && (
            <Container className="d-flex justify-content-center">
              <span>
                <Loader />
              </span>
            </Container>
          )}
         
          {
            userBlogs?.length>1 ? (

              userBlogs?.map((b) => (
                <Col md={3} style={{ width: "fit-content" }} className="p-1">
              <LinkContainer
                to={{
                  pathname: `/quirky/${userId}/quirkyPost/content/${b._id}`,
                }}
              >
                <Container fluid>
                  <MainBlogBox
                    id={b._id}
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
                </Container>
              </LinkContainer>
            </Col>
                  )
              )) : 
              (<Container>
                No blogs yet
          </Container>)
          }
        </Row>
      </Container>
    </Container>
  );
};

export default UserProfilePage;
