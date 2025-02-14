import React, { useState } from 'react';
import { Upload, Users, Plus } from 'lucide-react';
import { mockProjects, currentUser } from '../db';
import '../styles/createProject.css';

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    members: [],
    tasks: [],
    attachments: [],
    isOwner: true,
  });

  const [newMember, setNewMember] = useState('');
  const [newTask, setNewTask] = useState({
    description: '',
    assignedTo: '',
  });

  const handleAddMember = () => {
    if (!newMember.trim()) return;
    
    const member = {
      id: projectData.members.length + 1,
      name: newMember,
      role: 'Team Member',
      avatar: '/api/placeholder/32/32',
      assignedTasks: []
    };

    setProjectData(prev => ({
      ...prev,
      members: [...prev.members, member]
    }));
    setNewMember('');
  };

  const handleAddTask = () => {
    if (!newTask.description.trim() || !newTask.assignedTo) return;

    const task = {
      id: projectData.tasks.length + 1,
      name: newTask.description,
      completed: false,
      assignedTo: parseInt(newTask.assignedTo)
    };

    setProjectData(prev => ({
      ...prev,
      tasks: [...prev.tasks, task]
    }));

    setNewTask({ description: '', assignedTo: '' });
  };

  const handleCreateProject = () => {
    const newProject = {
      id: mockProjects.length + 1,
      ...projectData,
      progress: 0
    };

    // In a real app, you would make an API call here
    mockProjects.push(newProject);
    
    // Reset form
    setProjectData({
      name: '',
      description: '',
      members: [],
      tasks: [],
      attachments: [],
      isOwner: true,
    });
  };

  return (
    <div className="project-container">
      <div className="content-wrapper">
        <div className="grid-layout">
          {/* Project Details Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Create Project</h2>
            </div>
            <div className="card-content">
              <div className="input-group">
                <label className="input-label">Project Name</label>
                <input 
                  type="text"
                  className="text-input"
                  placeholder="Enter project name"
                  value={projectData.name}
                  onChange={(e) => setProjectData(prev => ({
                    ...prev,
                    name: e.target.value
                  }))}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea 
                  className="text-input textarea"
                  placeholder="Describe your project..."
                  value={projectData.description}
                  onChange={(e) => setProjectData(prev => ({
                    ...prev,
                    description: e.target.value
                  }))}
                />
              </div>

              <div className="input-group">
                <label className="input-label">Attachments</label>
                <div className="file-upload-area">
                  <Upload className="upload-icon" />
                  <p className="upload-text">Drop files here or click to upload</p>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Team Members</label>
                <div className="flex-row">
                  <input 
                    type="text"
                    className="text-input"
                    placeholder="Add team member..."
                    value={newMember}
                    onChange={(e) => setNewMember(e.target.value)}
                  />
                  <button 
                    className="button button-primary"
                    onClick={handleAddMember}
                  >
                    <Users className="button-icon" />
                    Add
                  </button>
                </div>
                {projectData.members.length > 0 && (
                  <div className="member-list">
                    {projectData.members.map(member => (
                      <div key={member.id} className="member-item">
                        {member.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Tasks</h2>
            </div>
            <div className="card-content">
              <div className="input-group">
                <label className="input-label">New Task</label>
                <div className="task-input-group">
                  <input 
                    type="text"
                    className="text-input"
                    placeholder="Enter task description..."
                    value={newTask.description}
                    onChange={(e) => setNewTask(prev => ({
                      ...prev,
                      description: e.target.value
                    }))}
                  />
                  <select
                    className="text-input"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask(prev => ({
                      ...prev,
                      assignedTo: e.target.value
                    }))}
                  >
                    <option value="">Assign to...</option>
                    {projectData.members.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                  <button 
                    className="button button-primary"
                    onClick={handleAddTask}
                  >
                    <Plus className="button-icon" />
                    Add
                  </button>
                </div>
              </div>

              <div className="task-list">
                {projectData.tasks.length === 0 ? (
                  <p className="empty-task-message">No tasks added yet</p>
                ) : (
                  projectData.tasks.map(task => (
                    <div key={task.id} className="task-item">
                      <span>{task.name}</span>
                      <span className="task-assignee">
                        Assigned to: {projectData.members.find(m => m.id === task.assignedTo)?.name}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <button 
          className="create-project-button"
          onClick={handleCreateProject}
        >
          Create Project
        </button>
      </div>
    </div>
  );
};

export default CreateProject;