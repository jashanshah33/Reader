import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faPenToSquare,
  faXmark,
  faHouse,
  faUser,
  faContactBook,
  faPowerOff,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import {
  deleteNotifications,
  markNotificationAsReaded,
  userProfile,
} from "../api";
import Loader from "./Loader";

export const Navbar = (props) => {
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [activeNotification, setActiveNotification] = useState(false);
  const auth = useAuth();
  const { setCategory } = props;

  useEffect(() => {
    const getUserInfo = async () => {
      if (auth?.user?._id) {
        const response = await userProfile(auth?.user?._id);
        if (response.success) {
          setProfileInfo(response.data.userProfile);
          setNotifications(response.data.userProfile.notifications);
        }
      }
      setLoading(false);
    };
    getUserInfo();
  }, [profile, auth]);

  useEffect(() => {
    function handleClick() {
      setDropdown(false);
      setProfile(false);
      setNotification(false);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    if (notifications) {
      for (const i of notifications) {
        if (i.readed === false) {
          setActiveNotification(true);
        }
      }
    }
  }, [notifications]);

  const handelDropown = (e) => {
    e.stopPropagation();
    setDropdown(true);
  };

  const handelDropownClose = () => {
    setDropdown(false);
  };

  const handelProfile = async (e) => {
    e.stopPropagation();
    setProfile(!profile);
  };

  const handelLogout = () => {
    auth.logout();
  };

  const handelNotificationBox = async () => {
    await markNotificationAsReaded(auth?.user._id);

    setNotification(!notification);
    setActiveNotification(false);

    // if (notifications.length) {
    //   setNotifications((notifications) => [
    //     ...notifications,
    //     { ...notification, readed: true }
    //   ]);
    // }
  };

  const handelClearNotifications = async () => {
    const response = await deleteNotifications(auth?.user._id);
    if (response.success) {
      setNotifications([]);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <nav id="navbar">
      <section id="left">
        <FontAwesomeIcon onClick={handelDropown} icon={faBars} size="xl" />
      </section>
      {/* {dropdown ? ( */}
      <aside
        onClick={(e) => e.stopPropagation()}
        id="sidebar"
        className={dropdown ? "open" : "close"}
      >
        <main>
          <div id="cross_icon">
            <FontAwesomeIcon
              onClick={handelDropownClose}
              icon={faXmark}
              size="xl"
            />
          </div>
          <div id="all_list">
            <div>
              <ul>
                <Link to="/">
                  <li onClick={() => setDropdown(false)}>
                    <span>Home</span>{" "}
                    <FontAwesomeIcon icon={faHouse} size="lg" />
                  </li>
                </Link>
                <Link to={`/profile/${auth?.user?._id}`}>
                  <li onClick={() => setDropdown(false)}>
                    {" "}
                    <span> Profile</span>{" "}
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </li>
                </Link>
                <Link to="/profileSetting">
                  <li onClick={() => setDropdown(false)}>
                    {" "}
                    <span>Setting</span>{" "}
                    <FontAwesomeIcon icon={faGear} size="lg" />
                  </li>
                </Link>
                <Link to="/contact">
                  <li onClick={() => setDropdown(false)}>
                    {" "}
                    <span>Contact</span>{" "}
                    <FontAwesomeIcon icon={faContactBook} size="lg" />
                  </li>
                </Link>
              </ul>
            </div>
            <div>
              <h3>Blog Catagories</h3>
              <ul>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setCategory("viewAll");
                      setDropdown(false);
                    }}
                  >
                    View all{" "}
                  </li>
                </Link>
                <Link to={"/"}>
                  {" "}
                  <li
                    onClick={() => {
                      setCategory("design");
                      setDropdown(false);
                    }}
                  >
                    Design{" "}
                  </li>
                </Link>
                <Link to={"/"}>
                  {" "}
                  <li
                    onClick={() => {
                      setCategory("product");
                      setDropdown(false);
                    }}
                  >
                    Product{" "}
                  </li>
                </Link>
                <Link to={"/"}>
                  {" "}
                  <li
                    onClick={() => {
                      setCategory("development");
                      setDropdown(false);
                    }}
                  >
                    Development{" "}
                  </li>
                </Link>
                <Link to={"/"}>
                  <li
                    onClick={() => {
                      setCategory("customerSuccess");
                      setDropdown(false);
                    }}
                  >
                    Customer Success{" "}
                  </li>
                </Link>
                <Link to={"/"}>
                  {" "}
                  <li
                    onClick={() => {
                      setCategory("leaderShip");
                      setDropdown(false);
                    }}
                  >
                    LeaderShip{" "}
                  </li>
                </Link>
                <Link to={"/"}>
                  {" "}
                  <li
                    onClick={() => {
                      setCategory("management");
                      setDropdown(false);
                    }}
                  >
                    Management{" "}
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </main>
        <footer>
          {auth.user ? (
            <button onClick={handelLogout} id="logout_btn">
              <FontAwesomeIcon icon={faPowerOff} size="xl" />

              <p>Logout</p>
            </button>
          ) : (
            <Link to={"/login"}>
              <button id="logout_btn">
                <p>Login</p>
              </button>
            </Link>
          )}
        </footer>
      </aside>
      {/* ) : null} */}

      <section id="middle">
        <h3>
          <Link to="/">Reader</Link>
        </h3>
      </section>

      <section id="right">
        {auth.user ? (
          <>
            <div
              onClick={(e) => e.stopPropagation()}
              className="notification_wrapper"
            >
              {activeNotification ? <span className="red_dot"></span> : null}
              <FontAwesomeIcon
                onClick={handelNotificationBox}
                icon={faBell}
                size="xl"
              />
              <div
                className={
                  notification
                    ? "notification_box visible_notification_box"
                    : "notification_box"
                }
              >
                <div className="clear_notification_wrapper">
                  <span
                    onClick={handelClearNotifications}
                    className="clear_notification"
                  >
                    Clear{" "}
                    <FontAwesomeIcon className="clear_icon" icon={faXmark} />{" "}
                  </span>
                </div>
                {notifications?.length ? (
                  <>
                    {notifications.map((notification) => (
                      <Link
                        key={notification._id}
                        to={`/profile/${notification?.notificationFrom?._id}`}
                      >
                        <div
                          onClick={() => setNotification(false)}
                          className={
                            notification.readed
                              ? "notification_list"
                              : "notification_list unreaded"
                          }
                        >
                          <div className="notification_user_img">
                            {notification.notificationFrom.avatar ? (
                              <img
                                alt=""
                                width={"100%"}
                                height="100%"
                                src={`data:${notification.notificationFrom.avatar.type};base64,${notification.notificationFrom.avatar.img}`}
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

                          <p className="notification_text">
                            {" "}
                            {notification.type === "following" && (
                              <b> {notification.notificationFrom.name} </b>
                            )}
                            {notification.message}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="empty_text">Empty!</div>
                )}
              </div>
            </div>
            <div id="profile_container">
              {profileInfo.avatar ? (
                <img
                  onClick={handelProfile}
                  alt=""
                  width={"100%"}
                  height="100%"
                  src={`data:${profileInfo?.avatar?.type};base64,${profileInfo?.avatar?.img}`}
                />
              ) : (
                <img
                  onClick={handelProfile}
                  alt=""
                  width={"80%"}
                  height="100%"
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                />
              )}
              <div
                className={
                  profile
                    ? "navbar_profile open_profile"
                    : "navbar_profile close_profile"
                }
              >
                <div className="user_img_container">
                  {profileInfo.avatar ? (
                    <img
                      onClick={handelProfile}
                      alt=""
                      width={"100%"}
                      height="100%"
                      src={`data:${profileInfo?.avatar?.type};base64,${profileInfo?.avatar?.img}`}
                    />
                  ) : (
                    <img
                      onClick={handelProfile}
                      alt=""
                      width={"100%"}
                      height="100%"
                      src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                    />
                  )}
                </div>
                <div className="user_details">
                  <p>{profileInfo.name}</p>
                  <p>{profileInfo.email}</p>
                </div>
                <div className="user_follow">
                  <Link to={`/followList/followers`}>
                    <span>{profileInfo.followers?.length} Followers</span>
                  </Link>
                  <Link to={`/followList/following`}>
                    <span> {profileInfo.following?.length} Following</span>
                  </Link>
                </div>
                <div className="full_profile_page_Nav">
                  <Link to={`/profile/${profileInfo._id}`}> More...</Link>
                </div>
              </div>
            </div>
            <Link to={"/writeBlog"}>
              <div id="write_blog">
                <FontAwesomeIcon icon={faPenToSquare} size="sm" />
                <h5>Write</h5>
              </div>
            </Link>
          </>
        ) : (
          <>
            <div className="login_btn">
              <Link to="/login">Login</Link>
            </div>
            <div className="register_btn">
              <Link to="/register">Register</Link>
            </div>
          </>
        )}
      </section>
    </nav>
  );
};
