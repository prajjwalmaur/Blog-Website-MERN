import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';


function Post() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleContentChange(e) {
        setContent(e.target.value);
    }

    function submit() {
        fetch("/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                content: content
            })
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            navigate('/');
        })
        .catch(error => {
            console.error("Error submitting post:", error);
        });
    }

    return (
        <div className="con">
            <h1 >Write Blog</h1>
            <input type="text" placeholder="Enter the Blog Title" onChange={handleTitleChange} />
            <textarea name="content" cols="30" rows="10" placeholder="Enter Content" onChange={handleContentChange}></textarea>
            <button onClick={submit}>Submit</button>
        </div>
    );
}

export default Post;
