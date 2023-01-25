import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const PostBlog = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <>
      <div>
        <label htmlFor="coverPhoto">Cover Photo</label>
        <FileUploader id="coverPhoto" handleChange={handleChange} name="file" />
        {file ? <p>* {file.name}</p> : null}
      </div>
      <div className="dropDown">
        <select>
          <option disabled selected>
            Select a category
          </option>
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
        <button>Submitt</button>
      </div>
    </>
  );
};

export default PostBlog;
