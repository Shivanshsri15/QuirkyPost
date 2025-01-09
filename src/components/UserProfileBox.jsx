import React, { useEffect, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { VscNotebook } from "react-icons/vsc";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { FaBell } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useFollowAndUnfollowUserMutation } from "../slices/usersApiSlice";
import SpinnerPro from "../utils/Spinner";
import { toast } from "react-toastify";

const UserProfileBox = ({ user, blogsCount }) => {
  const followersLength = user?.followers?.length;
  const [isFollowing, setIsFollowing] = useState(true);
  const [userloggedIn,setUserLoggedIn] = useState(false)
  const [followersCount, setFollowersCount] = useState(followersLength);
  const { userInfo } = useSelector((state) => state.auth);
  const [followUnfollowUserApiFunc, { isLoading: isFollowingLoading }] =
    useFollowAndUnfollowUserMutation();
  const followUnfollowHandler = async () => {
    setIsFollowing(!isFollowing);
    try {
      const res = await followUnfollowUserApiFunc(user._id);
      toast.success(res.data);
    } catch (err) {
      console.log(err);
    }
    if (isFollowing) {
      setFollowersCount(followersCount-1)
    } else {
      setFollowersCount(followersCount+1)
    }
  };
  useEffect(() => {
    const isUserFollowed = user.followers.some((u) => u === userInfo._id);
    setIsFollowing(isUserFollowed);
    setUserLoggedIn(userInfo._id === user._id)
  }, [user,userInfo]);


  return (
    <Container
      className="page-body card-Body mb-2 "
      style={{ borderRadius: "15px" }}
    >
      <div className="card-body pb-3 pt-3">
        <Row>
          <Col md={3} className="pt-4">
            <Image
              src={user?.photo}
              style={{ width: "10rem", height: "7rem" }}
              rounded
              className="mx-5 my-3"
            />
          </Col>
          <Col className="pt-3 itim-regular">
            <span className="poppins-regular mt-5 itim-regular fs-4">
              {user?.name}
            </span>
            <span className="ps-3 fs-5" style={{ fontSize: "14px" }}>
              {user?.age}
            </span>

            <span
              variant="outline-primary"
              className="ms-3 mb-2 p-2 boxShadow textHover rounded card-Body"
            ></span>
            <p style={{ fontSize: "15px", opacity: "0.7" }}>({user?.email})</p>
            <p className="">{user?.bio}</p>
          </Col>
          {userloggedIn ? " " :
          <p className="px-5 mt-3">
            {isFollowing ? (
              <Button
                variant="primary"
                className="w-100 "
                onClick={followUnfollowHandler}
                disabled={isFollowingLoading}
              >
                {isFollowingLoading ? <SpinnerPro/> : "Unfollow"}
                
                <FaBell />
              </Button>
            ) : (
              <Button
                variant="outline-primary"
                className="w-100 "
                onClick={followUnfollowHandler}
                disabled={isFollowingLoading}
              >
                {isFollowingLoading ? <SpinnerPro/> : "Follow"}
                <FaBell />
              </Button>
            )}
          </p>
      }
        </Row>

        <hr />
        <Row className="ps-5">
          <Col className="ps-5 pt-3" md={4}>
            <span>
              <VscNotebook className="fs-1 mb-1 " />
              <span className="fs-5 ps-2 ">Blogs </span>
            </span>
            <p className="ps-5 fs-3   poppins-bold">{blogsCount }</p>
          </Col>
          <Col className="ps-5 pt-3" md={4}>
            <span>
              <FaPersonCirclePlus className="fs-1 mb-1 " />
              <span className="fs-5 ps-2 ">Followers </span>
            </span>
            <p className="ps-5 fs-3  poppins-bold">{followersCount} </p>
          </Col>
          <Col className="ps-5 pt-3" md={4}>
            <span>
              <FaPersonCirclePlus className="fs-1 mb-1 " />
              <span className="fs-5 ps-2 ">Followings</span>
            </span>
            <p className="ps-5 fs-3 poppins-bold">{user?.followings?.length}</p>
          </Col>
        </Row>
        
      </div>
    </Container>
  );
};

export default UserProfileBox;
