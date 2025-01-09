import React, { useEffect, useState } from "react";
import BlogPageCover from "./BlogPageCover";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgArrowRight } from "react-icons/cg";
import OpenAi from "./OpenAi";
import { RiGeminiFill } from "react-icons/ri";
import IconBox from "./IconBox";
import { toast } from "react-toastify";
import { clearBlogData, setBlogCredentials } from "../slices/blogSlice";
import {
  PiAcornLight,
  PiAddressBookBold,
  PiAddressBookTabs,
  PiSubtitlesFill,
} from "react-icons/pi";
import {
  useAddBlogsMutation,
  useAddCoverPageMutation,
} from "../slices/blogApiSlice";
import MainBlogBox from "./MainBlogBox";
import { FaStar, FaStarOfLife, FaWatchmanMonitoring } from "react-icons/fa6";
import Loader from "../utils/Loader";

const BlogContentBox = () => {
  const { blogInfo } = useSelector((state) => state.blog);
  const { userInfo } = useSelector((state) => state.auth);
  const [image, setImage] = useState(blogInfo?.blogCoverImage || "");
  const [content, setContent] = useState(blogInfo?.content || "");

  const [show, setShow] = useState(false);
  const [dshow, setDshow] = useState(false);
  const [fshow, setFshow] = useState(false);
  const [wshow, setWshow] = useState(false);
  const [finalSubmit, setFinalSubmit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [uploadCoverPhoto] = useAddCoverPageMutation();
  const [addBlog, { isLoading: blogLoading }] = useAddBlogsMutation();

  const modalHandler = () => {
    setShow(!show);
  };
  const delmodalHandler = () => {
    setDshow(!dshow);
  };
  const fmodalHandler = () => {
    setFshow(!fshow);
  };

  const wmodaHandler = () => {
    setWshow(!wshow);
  };

  useEffect(() => {
    if (blogInfo?.content) {
      setContent(blogInfo?.content);
    }
  }, [blogInfo?.content]);
  const onChangeTitle = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const submitHandler = () => {
    if (content === "") {
      toast.error("Enter an appropriate Content !");
    } else {
      dispatch(
        setBlogCredentials({
          title: blogInfo.title,
          content: content,
          blogCoverImage: image,
        })
      );
      toast.success("Add a cover photo for the final touch!");
    }
  };

  const coversubmitHandler = () => {
    if (image === "") {
      toast.error("Enter an appropriate cover image !");
    } else {
      dispatch(
        setBlogCredentials({
          title: blogInfo.title,
          content: blogInfo.content,
          blogCoverImage: image,
        })
      );
      toast.success("Let's finish your blog post!");
    }
  };

  const deleteHandler = () => {
    dispatch(clearBlogData());
    navigate(`/quirky/${userInfo._id}/quirkyPost`);
    setContent("");
    toast.success("Blog draft deleted successfully");
    modalHandler();
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadCoverPhoto(formData).unwrap();
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };

  const finalSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await addBlog({
        title: blogInfo.title,
        content: blogInfo.content,
        blogCoverImage: blogInfo.blogCoverImage,
      }).unwrap();
      toast.success("Congratulations! Blog posted Successfully");
      setFinalSubmit(true);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container fluid className="p-0 page-body">
      <BlogPageCover>
        <Container fluid className="pt-4">
          <Form className="mt-3">
            <Form.Group>
              <Form.Label className="fs-1 poppins-semibold pt-4">
                <span className="me-3">
                  <PiAddressBookBold />
                </span>
                <span>Let's start your blog..!</span>
              </Form.Label>
              <Form.Control
                value={content}
                onChange={onChangeTitle}
                type="text"
                rows={15}
                className="itim-regular"
                as="textarea"
                placeholder="share your thoughts, experiences, or insights!"
              />
            </Form.Group>
            {blogInfo?.content ? (
              <Button
                variant="danger"
                onClick={delmodalHandler}
                className="mt-4 me-2"
              >
                Delete
              </Button>
            ) : (
              ""
            )}
            <Button
              variant="outline-primary"
              onClick={submitHandler}
              className="mt-4"
            >
              Confirm!
            </Button>
          </Form>
          <Form>
            <Form.Group className="mt-1">
              <Form.Label className="fs-3 poppins-semibold pt-5">
                <span className="me-3">
                  <PiAcornLight />
                </span>
                <span>Enter a catchy cover page for your blog...</span>
              </Form.Label>
              <Form.Control
                type="file"
                name="photo"
                placeholder="Change your profile photo"
                onChange={uploadFileHandler}
              />
            </Form.Group>
          </Form>
          {image && (
            <Container className="border rounded border-1 border-secondary p-5 my-1 text-center">
              <Image className="w-50 h-50 rounded" src={image} />
            </Container>
          )}
          <Container>
            <Button
              variant="outline-primary"
              onClick={coversubmitHandler}
              className="mt-4"
            >
              Confirm!
            </Button>
          </Container>
          <Container className="text-center">
            <Button
              className="px-5"
              variant="success"
              disabled={
                !blogInfo?.title ||
                !blogInfo?.content ||
                !blogInfo?.blogCoverImage
              }
              onClick={fmodalHandler}
            >
              Finish
            </Button>
          </Container>
          <Modal
            show={dshow}
            backdrop="static"
            keyboard={false}
            centered
            onHide={delmodalHandler}
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this draft?</p>
            </Modal.Body>
            <Modal.Footer>
              <Container>
                <Button
                  variant="outline-danger"
                  className="px-3 mx-2"
                  onClick={deleteHandler}
                >
                  Yes
                </Button>
                <Button
                  variant="outline-success"
                  className="px-3 mx-2"
                  onClick={delmodalHandler}
                >
                  No
                </Button>
              </Container>
            </Modal.Footer>
          </Modal>
          <Modal
            show={fshow}
            backdrop="static"
            keyboard={false}
            size="xl"
            onHide={fmodalHandler}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                {finalSubmit ? (
                  <p className="poppins-semibold">
                    <FaStar className="fs-3 m-2"/>
                    Congratulations!</p>
                ) : (
                  <p>
                    Final touch <PiAddressBookTabs />
                  </p>
                )}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="h-">
              {finalSubmit ? (
                <Alert variant="success">
                  <Alert.Heading>Hey, nice to see you</Alert.Heading>
                  <p>
                  "Congratulations! Your blog has been successfully posted on QuirkyPost. 🎉 Your voice is now part of our vibrant community of creators. Share your story, insights, or creativity with the world, and watch as your blog sparks engagement and inspiration. Happy blogging!"
                  </p>
                  <hr />
                 
                </Alert>
              ) : (
                <Container>
                  <Row>
                    <Col className="ms-5">
                      <MainBlogBox
                        user={userInfo}
                        title={blogInfo.title}
                        content={blogInfo.content}
                        postImage={blogInfo.blogCoverImage}
                        author={userInfo.name}
                      />
                    </Col>
                    <Col>
                      <h3>Title:</h3>
                      <p> {blogInfo.title}</p>
                      <h3>Content:</h3>
                      <p style={{ overflow: "auto", height: "10rem" }}>
                        {" "}
                        {blogInfo.content}
                      </p>
                    </Col>
                  </Row>
                </Container>
              )}
            </Modal.Body>
            {blogLoading ? (
              <Modal.Footer>
                <Loader />
              </Modal.Footer>
            ) : (
              <Modal.Footer>
                {finalSubmit ? (
                  <Button
                    variant="outline-success px-4 ms-auto"
                      onClick={() => { 
                        dispatch(clearBlogData())
                        navigate(`/quirky/${userInfo._id}/quirkyPost`)
                      }
                    }
                  >
                    Finish
                    <CgArrowRight />
                  </Button>
                ) : (
                  <Container>
                    <Button
                      variant="outline-danger"
                      className="px-3 mx-2"
                      onClick={finalSubmitHandler}
                    >
                      Yes
                    </Button>
                    <Button
                      variant="outline-success"
                      className="px-3 mx-2"
                      onClick={fmodalHandler}
                    >
                      No
                    </Button>
                  </Container>
                )}
              </Modal.Footer>
            )}
          </Modal>
        </Container>
      </BlogPageCover>
      <Container fluid className="text-center page-body">
        <Button variant="success" onClick={modalHandler} className="m-2">
          <RiGeminiFill className="me-3" />
          Open Ai
        </Button>
        <OpenAi show={show} handleClose={modalHandler} />
      </Container>

      <Container
        className="d-flex justify-content-between px-4 pb-4 page-body"
        fluid
      >
        {blogInfo?.title && blogInfo?.content ? (
          <>
            <Button
              variant="outline-light px-4 ms-auto"
              onClick={() => navigate(`/quirky/${userInfo._id}/quirkyPost`)}
            >
              Back
              <CgArrowRight />
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline-light px-4 ms-auto" onClick={wmodaHandler}>
              Back
              <CgArrowRight />
            </Button>
            <Modal
              show={wshow}
              backdrop="static"
              keyboard={false}
              onHide={wmodaHandler}
            >
              <Modal.Header closeButton>
                <Modal.Title>
                  <FaWatchmanMonitoring />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="poppins-semibold">
                <p>
                  Your data haven't been saved yet,Click on the confirm button
                  to save your Data. Are you sure you want to proceed?
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Container>
                  <Button
                    variant="outline-danger"
                    className="px-3 mx-2"
                    onClick={() =>
                      navigate(`/quirky/${userInfo._id}/quirkyPost`)
                    }
                  >
                    Yes
                  </Button>
                  <Button
                    variant="outline-success"
                    className="px-3 mx-2"
                    onClick={wmodaHandler}
                  >
                    No
                  </Button>
                </Container>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
      <Container fluid>
        <Row>
          <IconBox />
        </Row>
      </Container>
    </Container>
  );
};

export default BlogContentBox;
