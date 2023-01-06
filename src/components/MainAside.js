import React from "react";

const MainAside = () => {
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
        <div className="intrested_people_profile">
          <div className="intrested_people_left">
            <div className="intrested_people_img">
              <img
                width={"100%"}
                height="100%"
                alt="profile"
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              />
            </div>
            <div className="intrested_people_details">
              <h4>Jashan</h4>
              <p>Position Position Position Position a a a a Position</p>
            </div>
          </div>
          <div className="intrested_people_btn">
            <button>Follow</button>
          </div>
        </div>
        {/* delete */}
        <div className="intrested_people_profile">
          <div className="intrested_people_left">
            <div className="intrested_people_img">
              <img
                width={"100%"}
                height="100%"
                alt="profile"
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              />
            </div>
            <div className="intrested_people_details">
              <h4>Jashan</h4>
              <p>Position Position Position Position a a a a Position</p>
            </div>
          </div>
          <div className="intrested_people_btn">
            <button>Follow</button>
          </div>
        </div>{" "}
        <div className="intrested_people_profile">
          <div className="intrested_people_left">
            <div className="intrested_people_img">
              <img
                width={"100%"}
                height="100%"
                alt="profile"
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              />
            </div>
            <div className="intrested_people_details">
              <h4>Jashan</h4>
              <p>Position Position Position Position a a a a Position</p>
            </div>
          </div>
          <div className="intrested_people_btn">
            <button>Follow</button>
          </div>
        </div>
        {/* delete */}
      </div>

      {/* recently_readed */}
      <div className="recently_readed">
        <h3>Recently Readed</h3>
        <div className="readed_blog">
          <div className="readed_blog_img">
            <img
              width={"100%"}
              height="100%"
              alt="profile"
              src="https://cdn.hswstatic.com/gif/water-update.jpg"
            />
          </div>
          <div className="readed_blog_details">
            <h4>Lorem Lorem Lorem Lorem Lorem </h4>
            <p>Lorem Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
          {/* delete */}
          <div className="readed_blog">
          <div className="readed_blog_img">
            <img
              width={"100%"}
              height="100%"
              alt="profile"
              src="https://cdn.hswstatic.com/gif/water-update.jpg"
            />
          </div>
          <div className="readed_blog_details">
            <h4>Lorem Lorem Lorem Lorem Lorem </h4>
            <p>Lorem Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>      <div className="readed_blog">
          <div className="readed_blog_img">
            <img
              width={"100%"}
              height="100%"
              alt="profile"
              src="https://cdn.hswstatic.com/gif/water-update.jpg"
            />
          </div>
          <div className="readed_blog_details">
            <h4>Lorem Lorem Lorem Lorem Lorem </h4>
            <p>Lorem Lorem Lorem Lorem Lorem LoremLorem Lorem Lorem Lorem Lorem Lorem</p>
          </div>
        </div>
      {/* delete */}
      </div>
    
    </div>
  );
};

export default MainAside;
