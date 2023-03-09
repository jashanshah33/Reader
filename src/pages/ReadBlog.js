import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { singleblog } from "../api";
import { Markup } from "interweave";
import { useAuth } from "../hooks";
import Loader from "../components/Loader";

const ReadBlog = () => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState("");
  const params = useParams();
  const auth = useAuth();
  // console.log(params);

  useEffect(() => {
    const getBlog = async () => {
      const response = await singleblog(params.id, auth?.user._id);
      if (response.success) {
        // console.log(response.data.blog.content);
        setBlog(response.data.blog.content);
      }
      setLoading(false);
    };
    getBlog();
  }, [params]);
  if (loading) {
    return <Loader />;
  }
  return (
    <div
      style={{
        padding: "10px 20px",
        height: "calc(100vh - 60px)",
        overflow: "scroll",
        marginTop: " 60px",
        paddingBlock: "20px",
        boxSizing: "border-box",
      }}
    >
      {" "}
      <Markup content={blog} />
    </div>
  );
};

export default ReadBlog;
