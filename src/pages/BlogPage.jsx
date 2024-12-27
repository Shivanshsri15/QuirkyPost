import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useCommentBlogMutation,
  useGetBlogByBlogIdQuery,
  useGetBlogCommentsApiMutation,
  useLikeBlogMutation,
  useSaveUserBlogsMutation,
} from "../slices/blogApiSlice";
import Loader from "../utils/Loader";
import { BiLike } from "react-icons/bi";
import { FaComment, FaRegCommentAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import IconBox from "../components/IconBox";
import Canvas from "../components/Canvas";
import {  useSelector } from "react-redux";
import { BiSolidLike } from "react-icons/bi";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa6";
import {
  useGetSavedUserBlogQuery,
 
} from "../slices/usersApiSlice";
import SpinnerPro from "../utils/Spinner";


const BlogPage = () => {
  const { savedBlogs } = useSelector((state) => state.blog);
  const { userInfo } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [isLiked, setIsliked] = useState(false);
  const [blogComments, setBlogComments] = useState("");
  const [commentContent, setCommentContent] = useState("");
  
  const { blogId } = useParams();
  const { data: userBlog, isLoading: blogLoading } =
  useGetBlogByBlogIdQuery(blogId);
  const [getBlogComments, { isLoading: commentLoading }] =
  useGetBlogCommentsApiMutation();
  const [sendBlogComment, { isLoading: commentSending }] =
  useCommentBlogMutation();
  const { data: saveduserBlogs, isLoading: savedBlogsLoading } =
  useGetSavedUserBlogQuery();
  const [saved, setSaved] = useState();

  const canvasHandler = async () => {
    setShow(!show);
    if (!show) {
      const response = await getBlogComments(blogId);
      setBlogComments(response.data.blogComments.slice().reverse());
    }
  };

  const likeHandler = () => {
    setIsliked(!isLiked);
  };

  const saveHandler = () => {
    setSaved(!saved);
  };

  const likeApiCall = async () => {
    try {
      await likeBlogFunc(blogId);
    } catch (err) {
      console.log(err);
    }
  };

  const [likeBlogFunc] = useLikeBlogMutation();
  const [saveBlogFunc, { isLoading: saveLoading }] = useSaveUserBlogsMutation();

  const saveBlogApi = async () => {
    try {
      const res = await saveBlogFunc(blogId);

      toast.success(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    try {
      await sendBlogComment({
        id: blogId,
        data: {
          commentName: userInfo.name,
          commentContent,
          commentUser: userInfo._id,
        },
      });
      setCommentContent("");
      const response = await getBlogComments(blogId);
      setBlogComments(response.data.blogComments.slice().reverse());
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (saveduserBlogs && userBlog) {
      const isBlogSaved = saveduserBlogs.some(blog => blog._id === blogId);
      setSaved(isBlogSaved);
    }
    if (userBlog) {
      setIsliked(userBlog.blogLikes.includes(userInfo._id));
    }
  }, [userBlog, userInfo, savedBlogs,saveduserBlogs,saveBlogFunc]);
  return (
    <Container fluid className="page-body">
      {blogLoading && <Loader />}
      <Container className="page-body pt-4 w-50 pb-5">
        <Row className="mx-auto text-center ">
          <Col className="text-start">
            <h2 className="poppins-bold">{userBlog?.title}</h2>
            <Row className="d-flex ">
              <div className=" w-25">
                <span
                  onClick={() => {
                    likeHandler();
                    likeApiCall();
                  }}
                >
                  {isLiked ? (
                    <BiSolidLike className="fs-5 me-3 textHover" />
                  ) : (
                    <BiLike className="fs-5 me-3 textHover" />
                  )}
                </span>
                <span>
                  <FaRegCommentAlt
                    className="fs-5 me-3 textHover"
                    onClick={canvasHandler}
                  />
                </span>
                {saveLoading || savedBlogsLoading ? (
                  <span className="mx-5 ">
                    <SpinnerPro  className="mx-5"/>
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      saveHandler();
                      saveBlogApi();
                    }}
                  >
                    {saved ? (
                      <FaBookmark className="fs-5 me-3 textHover" />
                    ) : (
                      <CiBookmark className="fs-5 me-3 textHover" />
                    )}
                  </span>
                )}
              </div>
            </Row>
          </Col>
        </Row>
        <hr />
        <Row className="mt-3">
          <Col>
            <span className="ms-2">
              <Image
                src={userBlog?.author?.photo}
                className="rounded-circle"
                style={{ width: "2rem", height: "2rem" }}
              />
            </span>
            <span
              className="pt-2 ms-2 text-secondary"
              style={{ fontSize: "12px" }}
            >
              {userBlog?.author?.name}
            </span>
            <span
              className="pt-2 ms-4 text-secondary"
              style={{ fontSize: "12px" }}
            >
              {new Date(userBlog?.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </Col>
        </Row>
        <Row className="py-3 rounded">
          <Image
            src={userBlog?.blogCoverImage}
            style={{ borderRadius: "2rem" }}
          />
        </Row>

        <Row className="px-4 oswald-font pt-3">{userBlog?.content}</Row>
      </Container>
      <Canvas
        show={show}
        placement={"bottom"}
        handleClose={canvasHandler}
        title={"Comments"}
      >
        <Form>
          <Form.Group>
            <Form.Control
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Let the user know what you think"
              as="textarea"
              className="itim-regular"
            />
          </Form.Group>
          {commentSending ? (
            <Loader />
          ) : (
            <Button
              variant="outline-primary"
              onClick={commentHandler}
              className="m-1 mt-2"
            >
              Comment <FaComment className="ms-1" />
            </Button>
          )}
        </Form>

        {commentLoading && <Loader />}
        {blogComments && blogComments.length > 0 ? (
          blogComments?.map((c) => (
            <>
              <Container className="card-Body p-3 rounded mt-3" fluid>
                <Row className="mt-3">
                  <Col>
                    <span className="ms-2">
                      <Image
                        src={c?.commentUser?.photo}
                        className="rounded-circle"
                        style={{ width: "2rem", height: "2rem" }}
                      />
                    </span>
                    <span
                      className="pt-2 ms-2 text-secondary"
                      style={{ fontSize: "12px" }}
                    >
                      {c?.commentName}
                    </span>
                    <span
                      className="pt-2 ms-4 text-secondary"
                      style={{ fontSize: "12px" }}
                    >
                      {new Date(c?.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </Col>
                </Row>
                <Row className="mx-5 mt-3 itim-regular">
                  <p>{c?.commentContent}</p>
                </Row>
              </Container>
              <hr />
            </>
          ))
        ) : (
          <p className="text-center">No comments yet</p>
        )}
      </Canvas>
      <IconBox />
    </Container>
  );
};

export default BlogPage;
