import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearBlogData, setBlogCredentials } from "../slices/blogSlice";
import { toast } from "react-toastify";
import ProgressBarPro from "./ProgressBar";
import { PiSubtitlesFill } from "react-icons/pi";

const BlogTitle = () => {
  const [show,setShow] = useState(false)

  const dispatch = useDispatch();
  const { blogInfo } = useSelector((state) => state?.blog);
  const [title, setTitle] = useState(blogInfo?.title || "");

  useEffect(() => {
    if (blogInfo?.title) {
      setTitle(blogInfo?.title);
    }
  }, [blogInfo?.title]);
  const onChangeTitle = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const submitHandler = () => {
    if (title === "") {
      toast.error("Enter an appropriate title !")
    } else {
      dispatch(setBlogCredentials({ title: title }));
      toast.success("First step completed");
    }
  };

  const deleteHandler = () => {
    dispatch(clearBlogData())
    setTitle("")
    toast.success("Blog draft deleted successfully")
    modalHandler()
  }

  const modalHandler = () => {
    setShow(!show)
  }

  return (
    <Container fluid className="pt-4">
      {/* <ProgressBarPro val={20} var={"animated"} /> */}
      <Form className="mt-3">
        <Form.Group>
          <Form.Label className="fs-1 poppins-semibold pt-4">
            <span className="me-3">
              <PiSubtitlesFill />
            </span>
            <span>Enter a catchy title for your blog...</span>
          </Form.Label>
          <Form.Control
            value={title}
            onChange={onChangeTitle}
            type="text"
            placeholder="Let's start your blog!"
          />
        </Form.Group>
        {blogInfo?.title ? (
          <Button variant="danger" onClick={modalHandler} className="mt-4 me-2">
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
          Confirm
        </Button>
      </Form>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        centered
        onHide={modalHandler}
      >
        <Modal.Header closeButton>
       
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this draft?</p>
        </Modal.Body>
        <Modal.Footer>
          <Container>
            <Button variant="outline-danger" className="px-3 mx-2" onClick={deleteHandler}>Yes</Button>
            <Button variant="outline-success" className="px-3 mx-2" onClick={modalHandler}>No</Button>
          </Container>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BlogTitle;
