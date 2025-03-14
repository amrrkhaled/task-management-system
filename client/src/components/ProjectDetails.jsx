import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { mockProjects, updateProject, currentUser } from "../Db";
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Lock,
  Calendar,
  Paperclip,
  BarChart
} from "lucide-react";
import "../styles/projectDetails.css";
import Sidebar from "../components/Sidebar";
import TopNav from "../components/TopNav";

const ProjectDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [project, setProject] = useState(null);
  const [expandedMember, setExpandedMember] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const { id } = useParams();

  useEffect(() => {
    const foundProject = mockProjects.find(p => p.id === parseInt(id));
    setProject(foundProject);
  }, [id]);

  const toggleTaskCompletion = (taskId) => {
    setError(null);
    
    try {
      setProject(prev => {
        const task = prev.tasks.find(t => t.id === taskId);
        
        // Check if current user is assigned to this task
        if (task.assignedTo !== currentUser.id) {
          throw new Error("You can only modify your own tasks");
        }

        const updatedTasks = prev.tasks.map(task =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        
        // Update member assigned tasks as well
        const updatedMembers = prev.members.map(member => ({
          ...member,
          assignedTasks: member.assignedTasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        }));

        // Calculate new progress
        const completedTasks = updatedTasks.filter(task => task.completed).length;
        const totalTasks = updatedTasks.length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        const updatedProject = {
          ...prev,
          tasks: updatedTasks,
          members: updatedMembers,
          progress
        };

        // Update the global state
        updateProject(updatedProject, taskId);

        return updatedProject;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleMemberTasks = (memberId) => {
    setExpandedMember(expandedMember === memberId ? null : memberId);
  };

  const canModifyTask = (taskId) => {
    const task = project.tasks.find(t => t.id === taskId);
    return task.assignedTo === currentUser.id;
  };

  const renderTaskItem = (task, showLockIcon = true) => (
    <div
      key={task.id}
      className={`task-card ${!canModifyTask(task.id) ? 'disabled' : ''}`}
      onClick={() => canModifyTask(task.id) && toggleTaskCompletion(task.id)}
    >
      <div className="task-info">
        <span>{task.name}</span>
        {showLockIcon && !canModifyTask(task.id) && (
          <Lock size={16} className="lock-icon" />
        )}
      </div>
      <div className={`task-checkbox ${task.completed ? 'completed' : ''}`}>
        {task.completed && <Check size={16} color="white" />}
      </div>
    </div>
  );

  const renderOverviewTab = () => (
    <div className="tab-panel">
      <div className="project-description">
        <h2>Description</h2>
        <p>{project.description}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <BarChart className="stat-icon" />
          <div className="stat-text">
            <span className="stat-value">{project.progress}%</span>
            <span className="stat-label">Overall Progress</span>
          </div>
        </div>
        <div className="stat-box">
          <Users className="stat-icon" />
          <div className="stat-text">
            <span className="stat-value">{project.members.length}</span>
            <span className="stat-label">Team Members</span>
          </div>
        </div>
        <div className="stat-box">
          <Check className="stat-icon" />
          <div className="stat-text">
            <span className="stat-value">
              {project.tasks.filter(task => task.completed).length}/{project.tasks.length}
            </span>
            <span className="stat-label">Tasks Completed</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMyTasksTab = () => (
    <div className="tab-panel">
      <h2>My Tasks</h2>
      <div className="tasks-container">
        <div className="task-column">
          <h3>In Progress</h3>
          <div className="task-list">
            {project.tasks
              .filter(task => task.assignedTo === currentUser.id && !task.completed)
              .map(task => renderTaskItem(task, false))}
          </div>
        </div>
        <div className="task-column">
          <h3>Completed</h3>
          <div className="task-list">
            {project.tasks
              .filter(task => task.assignedTo === currentUser.id && task.completed)
              .map(task => renderTaskItem(task, false))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTeamTab = () => (
    <div className="tab-panel">
      <h2><Users size={20} className="section-icon" /> Team Members & Their Tasks</h2>
      <div className="team-list">
        {project.members.map(member => (
          <div key={member.id} className="member-card">
            <div 
              className="member-header"
              onClick={() => toggleMemberTasks(member.id)}
            >
              <div className="member-info">
                <img 
                  src={member.avatar} 
                  alt={member.name} 
                  className="member-avatar"
                />
                <div className="member-details">
                  <span className="member-name">
                    {member.name}
                    {member.id === currentUser.id && " (You)"}
                  </span>
                  <span className="member-role">{member.role}</span>
                </div>
              </div>
              <div className="member-stats">
                <span className="task-count">
                  {member.assignedTasks.filter(t => t.completed).length}/{member.assignedTasks.length} Tasks
                </span>
                {expandedMember === member.id ? 
                  <ChevronUp size={20} /> : 
                  <ChevronDown size={20} />
                }
              </div>
            </div>
            
            {expandedMember === member.id && (
              <div className="member-tasks">
                <div className="task-list">
                  {member.assignedTasks.map(task => renderTaskItem(task))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderFilesTab = () => (
    <div className="tab-panel">
      <h2><Paperclip size={20} className="section-icon" /> Project Files</h2>
      <div className="files-grid">
        {project.attachments.map(attachment => (
          <div key={attachment.id} className="file-card">
            <div className="file-icon"></div>
            <div className="file-details">
              <span className="file-name">{attachment.name}</span>
              <span className="file-size">{attachment.size}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!project) return <div className="loading-state">Loading...</div>;

  return (
    <div className="dashboard">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="main-content">
        <TopNav 
          pageTitle={project.name}
          isNotificationsOpen={isNotificationsOpen}
          setIsNotificationsOpen={setIsNotificationsOpen}
        />

        <div className="project-details-content">

          {error && (
            <div className="error-alert">
              {error}
            </div>
          )}

          <div className="project-header">
            <div className="progress-container">
              <div className="progress-track">
                <div 
                  className="progress-indicator" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="progress-label">{project.progress}% Complete</span>
            </div>
          </div>

          <div className="tab-nav">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'my-tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-tasks')}
            >
              My Tasks
            </button>
            <button 
              className={`tab-btn ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => setActiveTab('team')}
            >
              Team
            </button>
            <button 
              className={`tab-btn ${activeTab === 'files' ? 'active' : ''}`}
              onClick={() => setActiveTab('files')}
            >
              Files
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && renderOverviewTab()}
            {activeTab === 'my-tasks' && renderMyTasksTab()}
            {activeTab === 'team' && renderTeamTab()}
            {activeTab === 'files' && renderFilesTab()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;