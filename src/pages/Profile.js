import React from "react";
import { useAuth } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteBlog, userProfile as profile } from "../api";
import { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
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
        setUserProfile(response.data.userProfile);
      }
    };

    getuserProfile();
  }, [auth, id]);

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
  // console.log(userProfile);
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
            <Link to={"/profileSetting"}>
              <button>Edit Profile</button>
            </Link>
          </div>

          <div className="profile_details">
            <p>{userProfile.name}</p>
            <p>{userProfile.email}</p>
          </div>
          <div className="user_follow">
            <span>1 Followers</span>
            <span> 2 Following</span>
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
              <div key={blog._id} className="single_blog_fullContainer">
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
                      <p>{blog.description.slice(0, 200)}</p>
                    </div>
                  </div>
                  {blog.user === auth.user._id && (
                    <div>
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
              </div>
            ))}
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
