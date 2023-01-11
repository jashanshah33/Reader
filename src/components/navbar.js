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
  });

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
                  <li>
                    <span>Home</span>{" "}
                    <FontAwesomeIcon icon={faHouse} size="lg" />
                  </li>
                </Link>
                <Link to="/profile">
                  <li>
                    {" "}
                    <span> Profile</span>{" "}
                    <FontAwesomeIcon icon={faUser} size="lg" />
                  </li>
                </Link>
                <Link to="/contact">
                  <li>
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
              <img
                alt="Profile"
                src="https://cdn-icons-png.flaticon.com/512/3033/3033143.png"
                width="100%"
                height="100%"
              />
            </div>
            <div id="write_blog">
              <FontAwesomeIcon icon={faPenToSquare} size="sm" />
              <h5>Write</h5>
            </div>
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
