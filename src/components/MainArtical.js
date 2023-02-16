import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { blog } from "../api/index";

const MainArtical = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [designBlog, setDesignBlog] = useState([]);
  const [developmentBlog, setDevelopmentBlog] = useState([]);
  const [productBlog, setProductBlog] = useState([]);
  const [customerSuccessBlog, setCustomerSuccessBlog] = useState([]);
  const [leaderShipBlog, setLeaderShipBlog] = useState([]);
  const [managementBlog, setManagementBlog] = useState([]);

  const [topics, setTopics] = useState({
    viewAll: true,
    design: false,
    development: false,
    product: false,
    customerSuccess: false,
    leaderShip: false,
    management: false,
  });

  // const blogContainer = useRef();
  const { category } = props;

  useEffect(() => {
    const getBlog = async () => {
      const response = await blog();
      if (response.success) {
        const { data } = response;
        setBlogs(data.blog);
        setDesignBlog(data.designBlog);
        setDevelopmentBlog(data.developmentBlog);
        setProductBlog(data.productBlog);
        setCustomerSuccessBlog(data.customerSuccessBlog);
        setLeaderShipBlog(data.LeaderShipBlog);
        setManagementBlog(data.managementBlog);
      }
    };
    getBlog();
  }, []);

  const handleTopicClick = (topic) => {
    setTopics((prevState) => {
      let newTopics = { ...prevState };
      for (let key in newTopics) {
        newTopics[key] = false;
      }
      newTopics[topic] = true;
      return newTopics;
    });
  };

  useEffect(() => {
    if (category) {
      handleTopicClick(category);
    }
  }, [category]);

  let selectedBlog = [];

  if (topics.viewAll) {
    selectedBlog = blogs;
  } else if (topics.design) {
    selectedBlog = designBlog;
  } else if (topics.development) {
    selectedBlog = developmentBlog;
  } else if (topics.product) {
    selectedBlog = productBlog;
  } else if (topics.customerSuccess) {
    selectedBlog = customerSuccessBlog;
  } else if (topics.leaderShip) {
    selectedBlog = leaderShipBlog;
  } else if (topics.management) {
    selectedBlog = managementBlog;
  }

  const topicList = ["viewAll", "design", "development", "product"];
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
            {topicList.map((topic) => (
              <li
                key={topic}
                className={topics[topic] ? "slected_type" : null}
                onClick={() => handleTopicClick(topic)}
              >
                {topic === "viewAll" ? "View all" : topic}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        {selectedBlog.length ? (
          <>
            {selectedBlog.map((blog) => (
              // <Link to={`/readBlog/${blog._id}`} key={blog._id}>
              <div key={blog._id} className="single_blog_fullContainer">
                <div className="blog_container">
                  <Link to={`/profile/${blog.user._id}`}>
                    <div className="blog_profile_details">
                      <div className="blog_profile_img">
                        {blog.user?.avatar?.img.data.length ? (
                          <>
                            <img
                              alt=""
                              width={"100%"}
                              height="100%"
                              src={`data:image/png;base64,${btoa(
                                String.fromCharCode(
                                  ...new Uint8Array(blog.user.avatar.img.data)
                                )
                              )}`}
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
                          <h4>{blog.user.name} </h4>
                          <p>
                            &nbsp;
                            {/* <b> . </b>&nbsp;June 16, 2022 */}
                            <b> . </b>&nbsp;{blog.createdAt.slice(0, 10)}
                          </p>
                        </div>
                        <div className="blog_user_position"> President </div>
                      </div>
                    </div>
                  </Link>
                  <Link to={`/readBlog/${blog._id}`} key={blog._id}>
                    <div className="blog_descriptions">
                      <div className="blog_header">
                        <h2>{blog.title}</h2>
                      </div>
                      <div className="blog_content">
                        <p>{blog.description.slice(0, 200)}</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <Link
                  className="blog_img_container"
                  to={`/readBlog/${blog._id}`}
                  key={blog._id}
                >
                  {/* <div > */}
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
                  {/* </div> */}
                </Link>
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
