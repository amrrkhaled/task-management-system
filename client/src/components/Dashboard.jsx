import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icons from "../assets/Icons";
import "../styles/dashboard.css";
import CreateProject from "../components/CreateProject";

const mockProjects = [
  { id: 1, name: "Website Redesign", progress: 70, isOwner: true },
  { id: 2, name: "Mobile App Development", progress: 45, isOwner: false },
  { id: 3, name: "Database Migration", progress: 90, isOwner: true },
  { id: 4, name: "API Integration", progress: 60, isOwner: false },
];

const mockNotifications = [
  { id: 1, message: "User 1 updated Project A", time: "2 min ago" },
  { id: 2, message: "User 2 commented on a task", time: "5 min ago" },
  { id: 3, message: "New project invitation received", time: "1 hour ago" },
];

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h1 className={!isSidebarOpen ? "hidden" : ""}>Dashboard</h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="sidebar-toggle"
          >
            {isSidebarOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item">
            <Icons.Home />
            <span className={!isSidebarOpen ? "hidden" : ""}>Home</span>
          </div>
          <div className="nav-item">
            <Icons.Folder />
            <span className={!isSidebarOpen ? "hidden" : ""}>Projects</span>
          </div>
          <div className="nav-item">
            <Icons.User />
            <span className={!isSidebarOpen ? "hidden" : ""}>Profile</span>
          </div>
          <div className="nav-item">
            <Icons.Settings />
            <span className={!isSidebarOpen ? "hidden" : ""}>Settings</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <div className="top-nav">
          <h2>Projects Overview</h2>
          <div className="notifications">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="notification-button"
            >
              <Icons.Bell />
              <span className="notification-badge">3</span>
            </button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <div className="notifications-dropdown">
                <div className="notifications-content">
                  <h3>Notifications</h3>
                  {mockNotifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <p>{notification.message}</p>
                      <span className="notification-time">
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="projects-grid">
            {/* All Projects */}
            <div className="project-card">
              <h3>All Projects</h3>
              <div className="projects-list">
                {mockProjects.map((project) => (
                  <div key={project.id} className="project-item">
                    <div className="project-header">
                      <span className="project-name">{project.name}</span>
                      <span className="project-progress">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My Projects */}
            <div className="project-card">
              <h3>My Projects</h3>
              <div className="projects-list">
                {mockProjects
                  .filter((p) => p.isOwner)
                  .map((project) => (
                    <div key={project.id} className="project-item">
                      <div className="project-header">
                        <span className="project-name">{project.name}</span>
                        <span className="project-progress">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              <Link to="/create-project">
                <button className="create-project-buttons">
                  Create Project
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
