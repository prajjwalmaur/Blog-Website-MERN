import React, { useState, useEffect } from "react";
import Blogs from "./Blogs";
import { Link } from "react-router-dom";

export default function Home() {
  const [blogs, setBlogs] = useState([
    { _id: "1", title: "No Blog is Available", content: "....." },
  ]);

  useEffect(() => {
    fetch("/blogs")
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          setBlogs(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  return (
    <>
      {blogs.map((blog) => (
        <Blogs
          key={blog._id}
          title={blog.title}
          content={blog.content}
          id={blog._id}
        />
      ))}
      <button id="writePost">
        <Link to="/post" className="link"> Add New Post 🖊️</Link>
      </button>
    </>
  );
}
