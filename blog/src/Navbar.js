import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div
      className="navbar"
    >
      <h1 id="title">PrajjWal  </h1>
      <ul>
        <li className="items" ><Link to="/" className="link">Home</Link></li>
        <li className="items" ><Link to="/post" className="link">Post</Link></li>
        <li className="items">About</li>
        <li className="items">Contact</li>
        <li className="items">Login</li>
      </ul>
    </div>
  );
}
