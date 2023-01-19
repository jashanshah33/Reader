import React, { useRef, useState } from "react";
import { useAuth } from "../hooks";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils";

const useFormInfo = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function change(e) {
    setValue(e.target.value);
  }

  // function valueNull() {
  //   setValue("");
  // }

  return {
    value,
    onChange: change,
    // valueNull: valueNull,
  };
};
const ProfileSetting = () => {
  const name = useFormInfo("");
  const email = useFormInfo("");
  const [file, setFile] = useState("");

  const auth = useAuth();
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  // console.log('*************',token);

  const handelEditInfo = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("name", name.value);
    formData.append("email", email.value);

    const userId = auth.user._id;
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    // console.log('*************',token);

    if (userId && token) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/user/update?id=${auth?.user?._id}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer${token} `,
            },
            body: formData,
          }
        );
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  
  return (
    <div id="profile_full_Container">
      <div id="profileSetting">
        <header>
          <h1>EDIT INFORMATION</h1>
        </header>
        <form encType="multipart/form-data" onSubmit={handelEditInfo}>
          <div className="profile_pic_container">
            <div className="profile_pic">
              <img
                alt=""
                width={"100%"}
                height="100%"
                src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              />
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
                {...name}
                // onChange={(e)=>e.target.value}
              />
            </div>
            <div>
              <label htmlFor="email">Email :</label>
              <input
                name="email"
                id="email"
                type={"email"}
                {...email}
                // onChange={(e)=>e.target.value}
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
