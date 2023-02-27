import React, { useEffect, useState } from "react";
import { allUser, recentlyReaded, toggleFollow } from "../api";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

const MainAside = () => {
  const auth = useAuth();
  const [recentlyReadedList, setRecentlyReadedList] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    if (auth.user) {
      const recentlyReadedList = async () => {
        const response = await recentlyReaded(auth?.user?._id);
        if (response.success) {
          setRecentlyReadedList(response.data.recentlyReaded);
        }
      };
      const getAllUsers = async () => {
        const response = await allUser(auth?.user?._id);
        if (response.success) {
          setAllUsers(response.data.allUser);
          setFollowing(response.data.userFollow.following);
        }
      };
      getAllUsers();
      recentlyReadedList();
    }
  }, [auth]);

  const removeUsers = (user) => {
    for (const i of following) {
      if (i._id === user._id) {
        setAllUsers((users) => {
          return users.filter((user) => user._id !== i._id);
        });
      }
    }

    if (user._id === auth?.user._id) {
      setAllUsers((users) => {
        return users.filter((user) => user._id !== auth?.user._id);
      });
    }
  };

  const handelToggleFollow = async (user) => {
    const response = await toggleFollow(auth?.user._id, user._id);
    if (response.success) {
      if (follow) {
        setFollowing((prevFollowing) =>
          prevFollowing.filter((presendUser) => presendUser._id !== user._id)
        );

        return setFollow(false);
      }
      setFollowing((prevFollowing) => [...prevFollowing, user]);
      return setFollow(true);
    }
  };

  const handelCheckFollowing = (id) => {
    if (following) {
      for (const i of following) {
        if (i._id === id) {
          return "Following";
        }
      }
      return "Follow";
    }
  };

  return (
    <div className="full_aside_conatiner">
      <div className="trending_topics">
        <h2>Trending Topics:</h2>

        <ol>
          <li>Design</li>
          <li>Product</li>
          <li>Development</li>
        </ol>
      </div>

      <div className="intrested_people">
        <h3>People You might be Interested</h3>

        {allUsers?.length ? (
          <>
            {allUsers?.slice(0, 3).map((user) => (
              <div
                key={user._id}
                onLoad={() => removeUsers(user)}
                className="intrested_people_profile"
              >
                <Link
                  className="intrested_people_left"
                  to={`profile/${user._id}`}
                >
                  {/* <div > */}
                  <div className="intrested_people_img">
                    {user.avatar ? (
                      <>
                        <img
                          alt=""
                          width={"100%"}
                          height="100%"
                          src={`data:${user.avatar.type};base64,${user.avatar.img}`}
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
                  <div className="intrested_people_details">
                    <h4>{user.name}</h4>
                    <p>{user.position}</p>
                  </div>
                  {/* </div> */}
                </Link>

                <div className="intrested_people_btn">
                  <button onClick={() => handelToggleFollow(user)}>
                    {" "}
                    {handelCheckFollowing(user._id)}
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="empty_text">No Suggestions!</div>
        )}
      </div>

      {/* recently_readed */}
      <div className="recently_readed">
        <h3>Recently Readed</h3>
        {recentlyReadedList.length ? (
          <>
            {recentlyReadedList?.map((blog) => (
              <Link to={`readBlog/${blog._id}`} key={blog._id}>
                <div className="readed_blog">
                  <div className="readed_blog_img">
                    <img
                      width={"100%"}
                      height="100%"
                      alt="coverPhoto"
                      src={`data:image/png;base64,${btoa(
                        String.fromCharCode(
                          ...new Uint8Array(blog.coverPhoto.img.data)
                        )
                      )}`}
                    />
                  </div>
                  <div className="readed_blog_details">
                    <h4>{blog.title} </h4>
                    {blog.description.length < 100 ? (
                      <p>{blog.description}</p>
                    ) : (
                      <p>{blog.description.slice(0, 100)}...</p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <div className="empty_text">Empty List!</div>
        )}
      </div>
    </div>
  );
};

export default MainAside;
