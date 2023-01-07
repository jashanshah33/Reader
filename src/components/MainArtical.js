import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const MainArtical = () => {
  return (
    <section id="Main_blog_full_container">
      <header id="Main_blog_header">
        <div id="search_container">
          <FontAwesomeIcon className="search_icon" icon={faSearch} size="lg" />
          <input placeholder="Search" />
        </div>
        <div id="topics">
          <p>Topics: </p>
          <ul>
            <li>View all </li>
            <li>Design </li>
            <li>Development </li>
            <li>Product </li>
          </ul>
        </div>
      </header>
      <main>
        <div className="single_blog_fullContainer">
          <div className="blog_container">
            <div className="blog_profile_details">
              <div className="blog_profile_img">
                <img
                  width={"100%"}
                  height="100%"
                  alt="profile"
                  src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                />
              </div>
              <div className="blog_Profile_discription">
                <div className="blog_user_name">
                  <h4>Jashanshah</h4>
                  <p><h1>.</h1> June 16, 2022</p>
                </div>
                <div className="blog_user_position"> President </div>
              </div>
            </div>
            <div className="blog_header"><h2>My First Blog</h2></div>
            <div className="blog_content">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
      
            </div>
          </div>
          <div className="blog_img_container">
            <img
              width={"100%"}
              height="100%"
              alt="profile"
              src="https://cdn.hswstatic.com/gif/water-update.jpg"
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default MainArtical;
