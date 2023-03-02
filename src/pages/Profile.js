import React from "react";
import { useAuth } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteBlog, toggleFollow, userProfile as profile } from "../api";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState({});
  const [follow, setFollow] = useState(false);
  const auth = useAuth();
  const { id } = useParams();

  let dateFormat = { day: "numeric", month: "short", year: "numeric" };
  const formatter = new Intl.DateTimeFormat("en", dateFormat);
  const joined = formatter.format(
    new Date(auth.user ? auth.user.createdAt : null)
  );

  useEffect(() => {
    const getuserProfile = async () => {
      const response = await profile(id);
      if (response.success) {
        const profile = response.data.userProfile;
        setUserProfile(profile);

        for (const i of profile.followers) {
          if (i === auth?.user._id) {
            setFollow(true);
          }
        }
      }
      setLoading(false);
    };

    getuserProfile();
  }, [auth, id]);

  // useEffect(() => {
  //   console.log(userProfile?.following);
  //   // if (userProfile.following.length) {
  //     for (const i of userProfile?.following) {
  //       console.log(i);
  //     // }
  //   }
  // });
  const handelDeletePost = async (blogId, userId) => {
    if (userId === auth.user._id) {
      const response = await deleteBlog(blogId, auth?.user._id);
      if (response.success) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          blogs: prevProfile.blogs.filter((blog) => blog._id !== blogId),
        }));
        return toast.success(response.message);
      }
    }
  };
  const handelToggleFollow = async () => {
    const response = await toggleFollow(auth?.user._id, userProfile._id);

    if (response.success) {
      if (follow) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          followers: prevProfile.followers.filter(
            (follower) => follower !== auth?.user._id
          ),
        }));
      } else {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          followers: [...prevProfile.followers, auth?.user._id],
        }));
      }
      setFollow(!follow);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <main className="profile_outer_container">
      <div className="profile_container">
        <div className="profile">
          <div className="profile_img">
            {userProfile.avatar ? (
              <img
                alt=""
                width={"100%"}
                height="100%"
                src={`data:${userProfile.avatar.type};base64,${userProfile.avatar.img}`}
              />
            ) : (
              <img
                alt=""
                width={"100%"}
                height="100%"
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              />
            )}
          </div>
          <div className="edit_Btn">
            {userProfile._id === auth?.user._id ? (
              <Link to={"/profileSetting"}>
                <button>Edit Profile</button>
              </Link>
            ) : (
              <button onClick={handelToggleFollow}>
                {follow ? "Following" : "Follow"}
              </button>
            )}
          </div>

          <div className="profile_details">
            <p>{userProfile.name}</p>
            <p>{userProfile.email}</p>
          </div>
          <div className="user_follow">
            {userProfile._id === auth?.user._id ? (
              <>
                <Link to={`/followList/followers`}>
                  <span>{userProfile?.followers?.length} Followers</span>
                </Link>
                <Link to={`/followList/following`}>
                  <span> {userProfile?.following?.length} Following</span>
                </Link>
              </>
            ) : (
              <>
                <span>{userProfile?.followers?.length} Followers</span>
                <span> {userProfile?.following?.length} Following</span>
              </>
            )}
          </div>

          <div className="joined">
            <span>
              {" "}
              <p>
                {" "}
                <FontAwesomeIcon icon={faHandshake} size="xl" />
              </p>{" "}
              <p> Joined on {joined ? joined : null}</p>
            </span>
          </div>
        </div>
      </div>
      {userProfile?.blogs?.length ? (
        <>
          <div className="user_blogs_container">
            {userProfile?.blogs?.map((blog) => (
              <Link
                className="single_blog_fullContainer"
                to={`/readBlog/${blog._id}`}
                key={blog._id}
              >
                {/* <div > */}
                <div className="blog_container">
                  <div className="blog_profile_details">
                    <div className="blog_profile_img">
                      {userProfile.avatar ? (
                        <>
                          <img
                            alt=""
                            width={"100%"}
                            height="100%"
                            src={`data:${userProfile.avatar.type};base64,${userProfile.avatar.img}`}
                          />
                        </>
                      ) : (
                        <>
                          <img
                            alt=""
                            width={"100%"}
                            height="100%"
                            src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                          />
                        </>
                      )}
                    </div>
                    <div className="blog_Profile_discription">
                      <div className="blog_user_name">
                        <h4>{userProfile.name} </h4>
                        <p>
                          &nbsp;
                          {/* <b> . </b>&nbsp;June 16, 2022 */}
                          <b> . </b>&nbsp;{blog.createdAt.slice(0, 10)}
                        </p>
                      </div>
                      <div className="blog_user_position"> President </div>
                    </div>
                  </div>
                  <div className="blog_descriptions">
                    <div className="blog_header">
                      <h2>{blog.title}</h2>
                    </div>
                    <div className="blog_content">
                      <p>{blog.description}</p>
                    </div>
                  </div>
                  {blog.user === auth.user._id && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                      }}
                    >
                      <button
                        onClick={() => handelDeletePost(blog._id, blog.user)}
                      >
                        Delete Post
                      </button>
                    </div>
                  )}
                </div>
                <div className="blog_img_container">
                  <img
                    alt=""
                    width={"100%"}
                    height="100%"
                    src={`data:${blog.coverPhoto.type};base64,${blog.coverPhoto.img}`}
                  />
                </div>
                {/* </div> */}
              </Link>
            ))}
            <hr />
          </div>
        </>
      ) : (
        <div className="No_blogs">
          <h1>Blog list is empty!</h1>
        </div>
      )}
    </main>
  );
};

export default Profile;
