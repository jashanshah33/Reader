import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useAuth } from "../hooks";
import { LOCALSTORAGE_TOKEN_KEY } from "../utils";
import toast from "react-hot-toast";
import { Redirect } from "react-router-dom";

const PostBlog = (props) => {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { blogContent } = props;

  const auth = useAuth();

  const handleChange = (file) => {
    setFile(file);
  };

  const submitBlog = async (e) => {
    e.preventDefault();

    if (!file || !category || !blogContent || !title || !description) {
      return toast.error("Please Fill All The Feilds");
    }

    const formData = new FormData();
    formData.append("coverPhoto", file);
    formData.append("content", blogContent);
    formData.append("category", category);
    formData.append("title", title);
    formData.append("description", description);

    const userId = auth?.user._id;
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

    if (userId && token) {
      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/blog/create?id=${userId}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        const data = await response.json();

        if (data.success) {
          toast.success(data.message);
          setRedirect(true);
        }
      } catch (error) {
        console.error(error);
      }
    } 
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div>
        <label htmlFor="coverPhoto">Cover Photo</label>
        <FileUploader id="coverPhoto" handleChange={handleChange} name="file" />
        {file ? <p>* {file.name}</p> : null}
      </div>
      <div id="title_container">
        <input
          htmlFor="title"
          type={"text"}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Write a Blog Title..."
        />
      </div>
      <div className="dropDown">
        <select
          defaultValue={"Select a category"}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled>Select a category</option>
          <option>Design</option>
          <option>Product</option>
          <option>Software Enginnering</option>
          <option>Customer Success</option>
          <option>LeaderShip</option>
          <option>Management</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a small blog description..."
          rows={4}
          cols={40}
        />
      </div>
      <div>
        <button onClick={submitBlog}>Submitt</button>
      </div>
    </>
  );
};

export default PostBlog;
