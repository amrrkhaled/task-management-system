import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockProjects, updateProject } from "../Db";
import { Check } from "lucide-react";
import "../styles/projectDetails.css";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

const ProjectDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const foundProject = mockProjects.find(p => p.id === parseInt(id));
    setProject(foundProject);
  }, [id]);

  const toggleTaskCompletion = (taskId) => {
    setProject(prev => {
      const updatedTasks = prev.tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      
      // Calculate new progress
      const completedTasks = updatedTasks.filter(task => task.completed).length;
      const totalTasks = updatedTasks.length;
      const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

      const updatedProject = {
        ...prev,
        tasks: updatedTasks,
        progress
      };

      // Update the global state
      updateProject(updatedProject);

      return updatedProject;
    });
  };

  if (!project) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="main-content">
        <TopNav 
          pageTitle={`${project.name} - ${project.progress}% Complete`}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
        />

        <div className="project-details-content">
          <div className="description-section">
            <h2>Description</h2>
            <p>{project.description}</p>
          </div>

          <div className="details-grid">
            <div className="tasks-section">
              <h2>Tasks ({project.progress}% Complete)</h2>
              <div className="tasks-list">
                {project.tasks.map(task => (
                  <div
                    key={task.id}
                    className="task-item"
                    onClick={() => toggleTaskCompletion(task.id)}
                  >
                    <span>{task.name}</span>
                    <div className={`task-checkbox ${task.completed ? 'completed' : ''}`}>
                      {task.completed && <Check size={16} color="white" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="attachments-section">
              <h2>Attachments</h2>
              <div className="attachments-list">
                {project.attachments.map(attachment => (
                  <div key={attachment.id} className="attachment-item">
                    <div className="attachment-icon"></div>
                    <div className="attachment-details">
                      <span className="attachment-name">{attachment.name}</span>
                      <span className="attachment-size">{attachment.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;