import React, { useState, useEffect } from "react";

function Blogs({ title, content, id }) {
  const [titleEdit, setTitle] = useState(title);
  const [contentEdit, setContent] = useState(content);
  const [edit, setEdit] = useState(false);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleContentChange(e) {
    setContent(e.target.value);
  }
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(["No Comment Available"]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/comment?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setError(null); // Reset error state if successful
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
        setError("Failed to fetch comments");
      });
  }, [id]);

  function handleComment(e) {
    setComment(e.target.value);
  }

  function postComment() {
    fetch(`/comment?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        com: comment,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        if (comments[0] === "No Comments") {
          setComments(comment);
        } else {
          setComments([...comments, comment]);
        }
        setComment("");
        console.log("Comment posted successfully:", data);
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setError("Failed to post comment");
      });
  }

  function deleteblog() {
    fetch(`/post?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        window.location.href ="/";
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        setError("Failed to post comment");
      });
  }

  function editPost() {
    setEdit(true);
  }

  async function changeEdit() {
    fetch(`/post?id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleEdit,
        content: contentEdit,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        
        setEdit(false);
      })
      .catch((error) => {
        console.error("Error submitting post:", error);
      });
  }

  return (
    <div className="con">
      {edit ? (
        <>
          <input
            type="text"
            placeholder="Enter the Blog Title"
            onChange={handleTitleChange}
            value={titleEdit}
          />
          <textarea
            name="content"
            cols="30"
            rows="10"
            placeholder="Enter Content"
            onChange={handleContentChange}
            value={contentEdit}
          ></textarea>
        </>
      ) : (
        <>
          <h2>{titleEdit}</h2>
          <p>{contentEdit}</p>
        </>
      )}
      {edit ? (
        <button onClick={changeEdit}>Add Change</button>
      ) : (
        <div className="blog-but">
          <button onClick={editPost}>Edit✏️✏️</button>
          <button onClick={deleteblog}>Delete</button>
        </div>
      )}

      <h3>Comments:</h3>
      {error ? <p>{error}</p> : null}
      {comments.map((comm, index) => (
        <div className="" key={index}>
          {comm}
        </div>
      ))}
      <input
        type="text"
        placeholder="Enter Comment"
        value={comment}
        onChange={handleComment}
      />
      <button onClick={postComment}>Add Comment</button>
    </div>
  );
}

export default Blogs;
