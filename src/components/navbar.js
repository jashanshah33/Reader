import React from "react";
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
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [profile, setProfile] = useState(false);
  const auth = useAuth();

  const handelDropown = (e) => {
    e.stopPropagation();
    setDropdown(true);
  };

  const handelDropownClose = () => {
    setDropdown(false);
  };

  window.document.addEventListener("click", function () {
    setDropdown(false);
    setProfile(false);
  });

  const handelProfile = (e) => {
    e.stopPropagation();
    setProfile(!profile);
  };

  const handelLogout = () => {
    auth.logout();
  };
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
                <Link to="/profile">
                  <li onClick={() => setDropdown(false)}>
                    {" "}
                    <span> Profile</span>{" "}
                    <FontAwesomeIcon icon={faUser} size="lg" />
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
                <li>View all </li>
                <li>Design </li>
                <li>Product </li>
                <li>SoftWare Enginnering </li>
                <li>Customer Success </li>
                <li>LeaderShip </li>
                <li>Management </li>
              </ul>
            </div>
          </div>
        </main>
        <footer>
          <button onClick={handelLogout} id="logout_btn">
            <FontAwesomeIcon icon={faPowerOff} size="xl" />
            {auth.user ? (
              <p>Logout</p>
            ) : (
              <Link to={"/login"}>
                <p>Login</p>
              </Link>
            )}
          </button>
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
            <FontAwesomeIcon icon={faBell} size="xl" />
            <div id="profile_container">
              {auth?.userProfileImage ? (
                <img
                  onClick={handelProfile}
                  alt=""
                  width={"100%"}
                  height="100%"
                  src={`data:image/png;base64,${btoa(
                    String.fromCharCode(
                      ...new Uint8Array(auth.userProfileImage)
                    )
                  )}`}
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
                  {auth.userProfileImage ? (
                    <img
                      onClick={handelProfile}
                      alt=""
                      width={"100%"}
                      height="100%"
                      src={`data:image/png;base64,${btoa(
                        String.fromCharCode(
                          ...new Uint8Array(auth.userProfileImage)
                        )
                      )}`}
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
                  <p>{auth?.user?.name}</p>
                  <p>{auth?.user?.email}</p>
                </div>
                <div className="user_follow">
                  <span>1 Followers</span>
                  <span> 2 Following</span>
                </div>
                <div className="full_profile_page_Nav">
                  <Link to={"/profile"}> More...</Link>
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
