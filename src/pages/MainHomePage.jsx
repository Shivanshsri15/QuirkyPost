import React, { useState } from "react";
import MainBlogBox from "../components/MainBlogBox";
import { Col, Row, Container, Image, Button } from "react-bootstrap";
import { FaTruckLoading } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import {
  useGetTrendingBlogsQuery,
  useLoadMoreBlogsApiMutation,
} from "../slices/blogApiSlice";
import Loader from "../utils/Loader";
import { FaFire } from "react-icons/fa";
import SpinnerPro from "../utils/Spinner";
import IconBox from "../components/IconBox";

const MainHomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);
  const [loadedBlogsData, setLoadedBlogsData] = useState([]);

  const [loadMoreBlogsApi, { isLoading: blogsLoading }, isError] =
    useLoadMoreBlogsApiMutation();

  const loadBlogHandler = async () => {
    try {
      const res = await loadMoreBlogsApi({ page });
      if (res?.data?.blogs.length < 4) {
        setLoadMore(false);
      }
      setLoadedBlogsData((prevBlogs) => [...prevBlogs, ...res?.data?.blogs]);
      setPage((prev) => prev + 1);
      console.log(res.data.blogs);
    } catch (error) {
      console.error(error);
      setLoadMore(false);
    }
  };
  const { data: trendingBlogs, isLoading } = useGetTrendingBlogsQuery();
  return (
    <div className="page-body pt-3 pb-5">
      <div
        className="bg-white w-75 h-75 card-Body text-secondary rounded mb-5"
        style={{ marginLeft: "13%" }}
      >
        <Row>
          <LinkContainer to={`/quirky/${userInfo?._id}`}>
            <Col className="d-flex justify-content-center pt-3">
              <Image
                src={userInfo?.photo}
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
                  {userInfo?.name} ({userInfo?.age})
                </strong>
                <p>CEO and founder</p>
              </p>
            </Col>
          </LinkContainer>
        </Row>
        <Row className="d-flex align-center justify-content-center ps-5">
          <Col style={{ textAlign: "center", paddingLeft: "18%" }}>
            <p className="w-75 px-5" style={{ fontSize: "13px" }}>
              {userInfo?.bio.substring(0, 300)}...
            </p>
          </Col>
        </Row>
      </div>
      <Container className="mb-4">
        <h1 className="itim-regular text-start ms-5 ps-5 fw-bold mb-3">
          <FaFire className="mb-2 me-1" />
          Trending Blogs
        </h1>
      </Container>
      <div className="page-body mx-5 px-5 ">
        <hr />
        <Container className="d-flex justify-center mx-5">
          <Row className="px-3 mx-5" style={{ width: "fit-content" }}>
            {isLoading ? (
              <Container
                className="
              d-flex justify-content-center
              "
              >
                <span className="text-center">
                  <Loader />
                </span>
              </Container>
            ) : (
              trendingBlogs?.map((b) => (
                <Col md={3} style={{ width: "fit-content" }} className="p-1">
                  <LinkContainer
                    to={`/quirky/${b?.author?._id}/quirkyPost/content/${b?._id}`}
                  >
                    <Container fluid>
                      <MainBlogBox
                        title={b?.title}
                        postImage={b?.blogCoverImage}
                        content={b?.content}
                        author={b?.author?.name}
                        date={new Date(b?.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                        user={b.author}
                      />
                    </Container>
                  </LinkContainer>
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
      <IconBox/>
      <div className="page-body mx-5 px-5 ">
      <hr />
      <Container className="d-flex justify-center mx-5 ">
        <Row className="px-3 mx-5" style={{ width: "fit-content" }}>
          {loadedBlogsData?.map((b) => (
            <Col md={3} style={{ width: "fit-content" }} className="p-1">
              <LinkContainer
                to={`/quirky/${b?.author?._id}/quirkyPost/content/${b?._id}`}
              >
                <Container fluid className="">
                  <MainBlogBox
                    title={b?.title}
                    postImage={b?.blogCoverImage}
                    content={b?.content}
                    author={b?.author?.name}
                    date={new Date(b?.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    user={b.author}
                  />
                </Container>
              </LinkContainer>
            </Col>
          ))}
        </Row>
        </Container>
        </div>
      <Container className="d-flex justify-content-center mx-5 py-5">
        {loadMore && (
          <Button
            variant="outline-light"
            onClick={loadBlogHandler}
            disabled={blogsLoading}
          >
            {blogsLoading ? (
              <SpinnerPro />
            ) : (
              <p>
                Load More <FaTruckLoading />
              </p>
            )}
          </Button>
        )}
      </Container>
    </div>
  );
};

export default MainHomePage;
