import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaRegNoteSticky } from "react-icons/fa6";
export const Navbar = ({ userData ,logout}) => {

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fw-bold">
        <div className="container">
          <li className="fs-2 list-unstyled fw-bold">
          <FaRegNoteSticky className="me-2"/>
            Notes</li>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {userData ? (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link  className="nav-link"
                  to={"/"}
                  onClick={logout}>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                   className={({isActive})=>
                    isActive ? "navActive nav-link rounded-3 me-1"
                    : "nav-link "
                   }
                   to="register"
                   >
                    Register
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink
                   className={({isActive})=>
                  isActive ? "navActive nav-link rounded-3 ms-1" : "nav-link"
                  } 
                   to="/">
                    Login
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
