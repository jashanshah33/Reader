import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../hooks";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils";
import toast from "react-hot-toast";

const ProfileSetting = () => {
  const auth = useAuth();
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setName(`${auth?.user?.name}`);
    setEmail(`${auth?.user?.email}`);
  }, [auth, auth?.user]);

  const [file, setFile] = useState("");

  const handelEditInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const userId = auth.user._id;
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    // console.log('*************',token);

    if (userId && token) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/user/update?id=${userId}`,
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
  return (
    <div id="profile_full_Container">
      <div id="profileSetting">
        <header>
          <h1>EDIT INFORMATION</h1>
        </header>
        <form encType="multipart/form-data" onSubmit={handelEditInfo}>
          <div className="profile_pic_container">
            <div className="profile_pic">
              {auth.userProfileImage.length ? (
                <img
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
                type={"name"}
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
