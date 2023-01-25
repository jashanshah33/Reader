import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { faL } from "@fortawesome/free-solid-svg-icons";
import PostBlog from "../components/PostBlog";

const WriteBlog = () => {
  const [post, setPost] = useState(false);
  const editorRef = useRef();

  const handelPost = (e) => {
    e.stopPropagation();
    setPost(!post);
  };

  window.document.addEventListener("click", function () {
    setPost(false);
  });
  return (
    <div className="writeBlog">
      <Editor onClick={()=>setPost(false)}
        onInit={(evt, editor) => (editorRef.current = editor)}
        init={{
          selector: "textarea#basic-example",
          height: "calc(100vh - 60px)",
          width: "100vw",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            // "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            // "media",
            "table",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic backcolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}
      />
      {post ? (
        <div onClick={(e) => e.stopPropagation()} className="postBlogContainer">
          <PostBlog/>
        </div>
      ) : null}

      <div className="submitBtnContainer">
        <button onClick={handelPost}>{post ? "Cancel" : "Submit"} </button>
      </div>
    </div>
  );
};

export default WriteBlog;
