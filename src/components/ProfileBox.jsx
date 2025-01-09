import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { FaComments } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { VscNotebook } from "react-icons/vsc";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaPen } from "react-icons/fa6";
import { GrAchievement } from "react-icons/gr";
import {
  useUpdateUserProfileMutation,
  useUploadUserPhotoMutation,
} from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";
import ProgressBarPro from "./ProgressBar";
import SpinnerPro from "../utils/Spinner";

const ProfileBox = ({blogsLength,user,userLoading}) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const modalHandler = () => {
    setShow(!show);
  };
  useEffect(() => {
    setName(userInfo.name);
    setAge(userInfo.age);
    setBio(userInfo.bio);
    setEmail(userInfo.email);
    setImage(userInfo.photo);
  }, [userInfo]);

  const [updateUserPhoto] = useUploadUserPhotoMutation();
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateUserProfileMutation();

  const updateUserProfileHandler = async (e) => {
    e.preventDefault();
    const updatedUserData = {
      name,
      age,
      bio,
      email,
      photo: image,
    };
    const res = await updateProfile(updatedUserData);
    dispatch(setCredentials({ ...res.data }));
    toast.success("Profile updated successfully !");
    setShow(!show);
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await updateUserPhoto(formData).unwrap();
      console.log(res.message);
      setImage(res.image);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      className="page-body card-Body mb-2 "
      style={{ borderRadius: "15px" }}
    >
      <div className="card-body pb-3 pt-3">
        <Row>
          <Col md={3} className="pt-4">
            <Image
              src={userInfo.photo}
              style={{ width: "10rem", height: "7rem" }}
              rounded
              className="mx-5 my-3"
            />
          </Col>
          <Col className="pt-3 itim-regular">
            <span className="poppins-regular mt-5 itim-regular fs-4">
              {userInfo.name}
            </span>

            <span className="ps-3 fs-5" style={{ fontSize: "14px" }}>
              {userInfo.age}
            </span>
            <span
              variant="outline-primary"
              className="ms-3 mb-2 p-2 boxShadow textHover rounded card-Body"
              onClick={modalHandler}
            >
              <FaPen className="" style={{ fontSize: "18px" }} />
            </span>
            <p style={{ fontSize: "15px", opacity: "0.7" }}>
              ({userInfo.email})
            </p>
            <p className="">{userInfo.bio}</p>
          </Col>
        </Row>

        <hr />
        <Row className="ps-5">
          <Col className="ps-5 pt-3" md={4}>
            <span>
              <VscNotebook className="fs-1 mb-1 " />
              <span className="fs-5 ps-2 ">Blogs </span>
            </span>
            <p className="ps-5 fs-3   poppins-bold">
            {userLoading && <SpinnerPro/> }

              {blogsLength}</p>
          </Col>
          <Col className="ps-5 pt-3" md={4}>
            <span>
              <FaPersonCirclePlus className="fs-1 mb-1 " />
              <span className="fs-5 ps-2 ">Followers </span>
            </span>
            <p className="ps-5 fs-3  poppins-bold">
            {userLoading && <SpinnerPro/> }

              {user?.followers?.length}</p>
          </Col>
          <Col className="ps-5 pt-3" md={4}>
            <span>
              <FaPersonCirclePlus className="fs-1 mb-1 " />
              <span className="fs-5 ps-2 ">Followings</span>
            </span>
            <p className="ps-5 fs-3 poppins-bold">
            {userLoading && <SpinnerPro/> }

              {user?.followings?.length}</p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col md={7} className="justify-content-between">
            <Container className="mb-1">
              <GrAchievement className="fs-4 m-2"/>
              <span className="itim-regular m-0">Blogs written this month 4/10:</span>
              <ProgressBarPro val={40} var="success" className="m-1" />
            </Container>
            <Container className="mb-1">
            <FaComments className="fs-4 m-2"/>
            <span className="itim-regular m-0">Comments received this month 60/10:</span>
              <ProgressBarPro val={60} var="info" className="m-1" />
            </Container>
            <Container className="mb-1">
            <FaHeart className="fs-4 m-2"/>
            <span className="itim-regular m-0">Likes received on the recent blog 40/100:</span>
              <ProgressBarPro val={40} var="warning" className="m-1" />
            </Container>
           

        
          </Col>
          <Col></Col>
        </Row>
      </div>
      <Modal
        show={show}
        onHide={modalHandler}
        backdrop="static"
        keyboard={false}
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    name="name"
                    placeholder="Enter your name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Age:</Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    name="age"
                    placeholder="Enter your age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mt-1">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    name="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-1">
                  <Form.Label>Bio:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={bio}
                    name="bio"
                    placeholder="Enter your Bio"
                    onChange={(e) => setBio(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-1">
                  <Form.Label>Profile photo:</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    placeholder="Change your profile photo"
                    onChange={uploadFileHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {updateLoading ? (
              <Loader />
            ) : (
              <Button
                variant="primary"
                onClick={updateUserProfileHandler}
                type="submit"
              >
                Update
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ProfileBox;
