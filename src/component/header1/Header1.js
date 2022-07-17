import React from "react";
import "./header1.css";
import { Link } from "react-router-dom";

const Header1 = () => {
  return (
    <div className="py-2 bg-primary text-white px-2 sticky-top">
      <div className="d-flex align-items-center justify-content-end gap-4">
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          <p className="m-0 text-uppercase">Home</p>
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/movie">
          <p className="m-0 text-uppercase">Movies</p>
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/addMovie">
          <p className="m-0 text-uppercase">Add Movie</p>
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          <p className="m-0 text-uppercase">Color Game</p>
        </Link>
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          <p className="m-0 text-uppercase">Light Mode</p>
        </Link>
      </div>
    </div>
  );
};

export default Header1;
