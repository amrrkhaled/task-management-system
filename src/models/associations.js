const associateModels = (models) => {
    models.User.hasMany(models.Project, { foreignKey: "managerId", as: "managedProjects" });
    models.User.belongsToMany(models.Project, { through: models.ProjectMember });
    models.User.belongsToMany(models.Task, { through: models.TaskAssignment, as: "assignedTasks" });
  
    models.Project.belongsTo(models.User, { foreignKey: "managerId", as: "manager" });
    models.Project.belongsToMany(models.User, { through: models.ProjectMember });
    models.Project.hasMany(models.ProjectMember, { foreignKey: "projectId", as: "members" });
    models.Project.hasMany(models.Task, { foreignKey: "projectId" });
  
    models.Task.belongsTo(models.Project, { foreignKey: "projectId" });
    models.Task.belongsToMany(models.User, { through: models.TaskAssignment, as: "assignedUsers" });
  
    models.ProjectMember.belongsTo(models.User, { foreignKey: "userId" });
    models.ProjectMember.belongsTo(models.Project, { foreignKey: "projectId" });
  };
  
  export default associateModels;
  