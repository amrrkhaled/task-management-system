import React from 'react';
import { Upload, Users, Plus } from 'lucide-react';
import '../styles/createProject.css';

const CreateProject = () => {
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
                />
              </div>

              <div className="input-group">
                <label className="input-label">Description</label>
                <textarea 
                  className="text-input textarea"
                  placeholder="Describe your project..."
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
                  />
                  <button className="button button-primary">
                    <Users className="button-icon" />
                    Add
                  </button>
                </div>
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
                <div className="flex-row">
                  <input 
                    type="text"
                    className="text-input"
                    placeholder="Enter task description..."
                  />
                  <button className="button button-primary">
                    <Plus className="button-icon" />
                    Add
                  </button>
                </div>
              </div>

              <div className="task-list">
                <p className="empty-task-message">No tasks added yet</p>
              </div>
            </div>
          </div>
        </div>

        <button className="create-project-button">
          Create Project
        </button>
      </div>
    </div>
  );
};

export default CreateProject;