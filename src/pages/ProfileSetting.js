import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils";
import toast from "react-hot-toast";
import { userProfile } from "../api";
import Loader from "../components/Loader";

const ProfileSetting = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [profileInfo, setProfileInfo] = useState({});

  // useEffect(() => {
  //   setName(`${auth?.user?.name}`);
  //   setEmail(`${auth?.user?.email}`);
  // }, [auth, auth?.user]);

  useEffect(() => {
    const getUserInfo = async () => {
      if (auth?.user?._id) {
        const response = await userProfile(auth?.user?._id);
        if (response.success) {
          const profile = response.data.userProfile;
          setProfileInfo(profile);
          setName(`${profile.name}`);
          setEmail(`${profile.email}`);
          if (profile?.position) {
            setPosition(`${profile.position}`);
          }
        }
      }
      setLoading(false);
    };
    getUserInfo();
  }, [auth]);

  const [file, setFile] = useState("");

  const handelEditInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("position", position);
    formData.append("password", password);

    const userId = auth.user._id;
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    // console.log('*************',token);

    if (userId && token) {
      try {
        const response = await fetch(
          `http://35.183.238.115/api/v1/user/update?id=${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token} `,
            },
            body: formData,
          }
        );
        const data = await response.json();

        if (data.success) {
          await auth.login(email, password);
          toast.success(data.message);
          setRedirect(true);
          return;
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (redirect) {
    return <Redirect to={`/profile/${auth?.user._id}`} />;
  }
  if (loading) {
    return <Loader />;
  }
  return (
    <div id="profile_full_Container">
      <div id="profileSetting">
        <header>
          <h1>EDIT INFORMATION</h1>
        </header>
        <form encType="multipart/form-data" onSubmit={handelEditInfo}>
          <div className="profile_pic_container">
            <div className="profile_pic">
              {profileInfo.avatar ? (
                <img
                  alt=""
                  width={"100%"}
                  height="100%"
                  // src={`data:image/png;base64,${btoa(
                  //   String.fromCharCode(
                  //     ...new Uint8Array(auth.userProfileImage)
                  //   )
                  // )}`}
                  src={`data:${profileInfo?.avatar?.type};base64,${profileInfo?.avatar?.img}`}
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
            <div className="edit_btn_container">
              <label htmlFor="file">Choose a file</label>
              <input
                name="avatar"
                id="file"
                multiple
                type={"file"}
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file && <p>*{file.name}</p>}
            </div>
          </div>
          <div className="acccount_info_heading">
            <h1>ACCOUNT INFORMATION</h1>
          </div>
          <div className="acount_information">
            <div>
              <label htmlFor="name">Name :</label>
              <input
                name="name"
                id="name"
                type={"text"}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="email">Email :</label>
              <input
                name="email"
                id="email"
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="position">Employment status :</label>
              <input
                name="position"
                id="position"
                placeholder="EX:Software Developer"
                type={"text"}
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Current Password :</label>
              <input
                name="password"
                id="password"
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="submit_btn_container">
            <button type="submit" className="submit_btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetting;
