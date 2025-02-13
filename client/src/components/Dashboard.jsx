// Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { mockProjects } from "../Db";
import "../styles/dashboard.css";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";
import CreateProject from "../components/CreateProject";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="main-content">
        <TopNav
          pageTitle="Projects Overview"
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
        />

        <div className="dashboard-content">
          <div className="projects-grid">
            {/* All Projects */}
            <div className="project-card">
              <h3>All Projects</h3>
              <div className="projects-list">
                {mockProjects.map((project) => (
                  <div
                    key={project.id}
                    className="project-item"
                    onClick={() => handleProjectClick(project.id)}
                    style={{ cursor: "pointer" }}
                  >
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
                    <div
                      key={project.id}
                      className="project-item"
                      onClick={() => handleProjectClick(project.id)}
                      style={{ cursor: "pointer" }}
                    >
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
