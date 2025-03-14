import React from "react";
import Icons from "../assets/Icons";
import "../styles/sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <h1 className={!isOpen ? "hidden" : ""}>Collabtask</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sidebar-toggle"
        >
          {isOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-item">
          <Icons.Home />
          <span className={!isOpen ? "hidden" : ""}>Home</span>
        </div>
        <div className="nav-item">
          <Icons.Folder />
          <span className={!isOpen ? "hidden" : ""}>Projects</span>
        </div>
        <div className="nav-item">
          <Icons.User />
          <span className={!isOpen ? "hidden" : ""}>Profile</span>
        </div>
        <div className="nav-item">
          <Icons.Settings />
          <span className={!isOpen ? "hidden" : ""}>Settings</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;