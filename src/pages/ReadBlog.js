import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { singleblog } from "../api";
import { Markup } from "interweave";

const ReadBlog = () => {
  const [blog, setBlog] = useState("");
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const getBlog = async () => {
      const response = await singleblog(params.id);
      if (response.success) {
        console.log(response.data.blog.content);
        setBlog(response.data.blog.content);
      }
    };
    getBlog();
  }, [params]);

  return (
    <div style={{padding:'10px 20px'}}>
      {" "}
      <Markup content={blog} />
    </div>
  );
};

export default ReadBlog;
