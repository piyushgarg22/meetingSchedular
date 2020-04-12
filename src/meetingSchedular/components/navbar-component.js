import React from "react";

export const Navbar = (props) => {
  return (
    <nav className="navbar navbar-light bg-light navbar-expand-lg text-dark">
      <div className="container">
        <span className="navbar-brand">Vector Agency</span>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <span className="nav-link text-dark">/</span>
            </li>
            <li className="navbar-item">
              <span className="nav-link text-dark">
                {props.status ? "Meetings" : "Add Meetings"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
