import { useState } from "react";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaEnvelope,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "../Admin.css"

function TopNavbar() {

  const [darkMode, setDarkMode] = useState(false);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  return (

    <div className={`top-navbar ${darkMode ? "dark" : ""}`}>

      {/* Left */}

      <div className="top-left">

        <FaBars className="menu-icon" />

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

      </div>


      {/* Right */}

      <div className="top-right">


        <div className="current-date">
          📅 {today}
        </div>


        <div
          className="icon-box"
          onClick={() => setDarkMode(!darkMode)}
        >

          {darkMode ? <FaSun /> : <FaMoon />}

        </div>



        <div className="icon-box">

          <FaEnvelope />

          <span className="badge">
            3
          </span>

        </div>



        <div className="icon-box">

          <FaBell />

          <span className="badge">
            5
          </span>

        </div>



        <div className="profile">

          <FaUserCircle className="profile-icon" />

          <div>

            <h6>Kesavan</h6>

            <small>
              Administrator
            </small>

          </div>

        </div>


      </div>


    </div>

  );
}


export default TopNavbar;