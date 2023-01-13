import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const auth = useAuth();
  
  let dateFormat = { day: 'numeric',month: 'short',  year: 'numeric',  }
  const formatter = new Intl.DateTimeFormat("en", dateFormat);
  const joined = formatter.format(new Date(auth.user? auth.user.createdAt: null));


  return (
    <main className="profile_outer_container">
      <div className="profile_container">
        <div className="profile">
          <div className="profile_img">
            <img
              alt=""
              width={"100%"}
              height="100%"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
            />
          </div>
          <div className="edit_Btn">
            <button>Edit Profile</button>
          </div>

          <div className="profile_details">
            <p>{auth.user?.name}</p>
            <p>{auth.user?.email}</p>
            {/* <p>JahshanPreet</p>
            <p> Jashan@gmail.com</p> */}
          </div>
          <div className="user_follow">
            <span>1 Followers</span>
            <span> 2 Following</span>
          </div>

          <div className="joined">
            <span>
              {" "}
              <p>
                {" "}
                <FontAwesomeIcon icon={faHandshake} size="xl" />
              </p>{" "}
              <p> Joined on {joined? joined:null}</p>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
