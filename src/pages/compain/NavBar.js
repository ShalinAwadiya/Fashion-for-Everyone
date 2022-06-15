import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="topnav">
      <a className="active" href="/home">
        Home
      </a>
      <a href="/postComplain">Post</a>
      <a className="active" href="/viewComplain">
        View
      </a>
      <a href="/viewComplainReply">Reply</a>
    </nav>
  );
};

export default NavBar;
