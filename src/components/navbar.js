import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faPenToSquare,
  faXmark,
  faHouse,
  faUser,
  faContactBook
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  // let sideBarClass = ["sidebar"];

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
        <div id="cross_icon">
          <FontAwesomeIcon
            onClick={handelDropownClose}
            icon={faXmark}
            size="xl"
          />
        </div>
        <main id="all_list">
          <div>
            <ul>
              <li>
                <span>Home</span> <FontAwesomeIcon icon={faHouse} size="la" />
              </li>
              <li>
                {" "}
                <span>Profile</span>{" "}
                <FontAwesomeIcon icon={faUser} size="la" />
              </li>
              <li>
                {" "}
                <span>Contact</span>{" "}
                <FontAwesomeIcon icon={faContactBook} size="la" />
              </li>
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
        </main>
      </aside>
      {/* ) : null} */}

      <section id="middle">
        <h3>Reader</h3>
      </section>
      <section id="right">
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
      </section>
    </nav>
  );
};
