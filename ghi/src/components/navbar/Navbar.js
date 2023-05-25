import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { ImHome, ImMenu } from "react-icons/im";
import React from "react";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-container-image">
        <ImHome className="navbar-logo"></ImHome>
        <NavLink className="navbar-title" to="/">
          MuscleUp
        </NavLink>
      </div>

      <div className="right-bar">
        <div className="navbar-container-links">
          <ul className="navbar-links">
            <li className="navbar-item">
              <NavLink className="navbar-link" to="">
                Trainers
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink className="navbar-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-button">
          <NavLink className="navbar-link" to="">
            Muscle UP!
          </NavLink>
        </div>
        <div className="navbar-hamburger-menu">
          <ImMenu className="navbar-hamburger-menu-icon"></ImMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
