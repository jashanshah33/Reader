import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import { blog } from "../api/index";
// import { Markup } from 'interweave';

const convertToHtml = (blogContainer, content) => {
  const div = document.getElementById(blogContainer);
  // console.log({ div });
  if (div) {
    div.innerHTML = content;
  }
};

const MainArtical = () => {
  const [blogs, setBlogs] = useState([]);
  const blogContainer = useRef();

  useEffect(() => {
    const getBlog = async () => {
      const response = await blog();
      if (response.success) {
        setBlogs(response.data.blog);
      }
    };
    getBlog();
  }, []);

  // console.log({ blogs });

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
        {blogs.length ? (
          <>
            {blogs.map((blog) => (
              // <Link to={"/"} key={blog._id}>
              <div className="single_blog_fullContainer" key={blog._id}>
                <div className="blog_container">
                  <div className="blog_profile_details">
                    <div className="blog_profile_img">
                      <img
                        alt=""
                        width={"100%"}
                        height="100%"
                        src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                      />
                    </div>
                    <div className="blog_Profile_discription">
                      <div className="blog_user_name">
                        <h4>Jashanshah </h4>
                        <p>
                          &nbsp;
                          <b> . </b>&nbsp;June 16, 2022
                        </p>
                      </div>
                      <div className="blog_user_position"> President </div>
                    </div>
                  </div>
                  <div className="blog_header">
                    <h2>{blog.title}</h2>
                  </div>
                  <div
                    id={`${blog?._id}-blog_content`}
                    className="blog_content"
                  >
                    {/* <Markup content={ blog.content} /> */}
                    {convertToHtml(
                      `${blog._id}-blog_content`,
                      blog.content
                    )}

                    {}
                    {/* {convertToHtml(blog.content)} */}
                    {/* {Buffer.from(blog.content, 'utf8')} */}
                    {/* <h1>{blog.content.replace(/<.{1,2}>|<.{2,3}>/g, '')}</h1> */}
                    {/* {blog.content.replace(/\s\w+="[^"]*"/g,'')}
                      {console.log(blog.content)} */}
                    {/* <ReactQuill value={blog.content} readOnly /> */}
                  </div>
                </div>
                <div className="blog_img_container">
                  <img
                    alt=""
                    width={"100%"}
                    height="100%"
                    src={`data:image/png;base64,${btoa(
                      String.fromCharCode(
                        ...new Uint8Array(blog.coverPhoto.img.data)
                      )
                    )}`}
                  />
                </div>
              </div>
              // </Link>
            ))}
          </>
        ) : (
          <h1>Empty</h1>
        )}
      </main>
    </section>
  );
};

export default MainArtical;
