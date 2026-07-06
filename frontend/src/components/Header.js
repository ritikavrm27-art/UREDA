import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { BASE_URL } from "../config";

function Header({ timeLeft, moduleName }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : {};
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      window.location.href = "/login";
    }

    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };

    return () => {
      window.onpopstate = null;
    };
  }, []);

  const handleLogout = async () => {
    try {
      const userData = localStorage.getItem("user");

      let username = "";

      if (userData) {
        const user = JSON.parse(userData);
        username = user.username;
      }

      await fetch(`${BASE_URL}/user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      });
    } catch (err) {
      console.log(err);
    }

    localStorage.clear();
    sessionStorage.clear();

    window.location.href = "/logout";
  };

  return (
    <div className="position-relative iq-banner">
      <nav className="navbar px-3 py-2 bg-custom-teal">
        
        {/* Brand */}
        <Link to="/dashboard" className="navbar-brand d-flex align-items-center gap-2 text-decoration-none">
          <Image
            src="../assets/images/logo.jpg"
            alt="logo"
            className="rounded-2 logo-img"
          />
          <div className="lh-sm">
            <div className="text-white fw-semibold fs-6">UREDA</div>
            <small className="text-white-50">{moduleName}</small>
          </div>
        </Link>

        {/* Right section */}
        <div className="d-flex align-items-center gap-2">

          {/* Session info */}
          <div className="text-end lh-sm pe-3 border-end border-light border-opacity-25">
            <div class="small fw-bold text-white">
          {user.empname}
           {user.role && (<span class="badge rounded-pill bg-rolewhite bg-opacity-25 ms-1" style={{fontSize:".65rem"}}>{user.role}</span>)}
        </div>
            <small className="small text-white-50">
              Session expires in&nbsp;
              <span className="fw-bold" style={{color:"#7CE3B8"}}>
                {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
              </span>
            </small>
          </div>

          <Link to={Number(user.role_id) === 1 ? "/dashboard" : "/empdashboard"} className="btn btn-sm btn-outline-light d-flex align-items-center gap-1 px-3" >
            <i className="fa fa-th-large" aria-hidden="true"></i> Dashboard
          </Link>

          <div className="vr text-white opacity-25"></div>

          <button className="btn btn-sm btn-danger d-flex align-items-center gap-1 px-3" onClick={handleLogout} >
            <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
          </button>

        </div>
      </nav>
    </div>
  );
}

export default Header;
