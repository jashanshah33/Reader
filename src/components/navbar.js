import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
  return (
    <nav id="navbar">
      <section id="left">
        <FontAwesomeIcon icon={faBars} size="xl" />
      </section>
      <section id="middle">
        <h3>Reader</h3>
      </section>
      <section id="right">
        <div>
          <FontAwesomeIcon icon={faBell} size="xl" />
        </div>
        <div id="profile_container">
          <img
            alt="Profile"
            src="https://cdn-icons-png.flaticon.com/512/3033/3033143.png"
            width='100%'
            height='100%'
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
