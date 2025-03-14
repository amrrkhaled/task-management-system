 const associateModels = (models) => {
    models.User.hasMany(models.Project, { foreignKey: "managerId", as: "managedProjects" });
    models.User.belongsToMany(models.Project, { through: models.ProjectMember, foreignKey: "userId" });
    models.User.belongsToMany(models.Task, { through: models.TaskAssignment, as: "assignedTasks", foreignKey: "userId" });
    models.User.hasMany(models.ProjectMember, { foreignKey: "userId" });

    models.Project.belongsTo(models.User, { foreignKey: "managerId", as: "manager" });
    models.Project.belongsToMany(models.User, { through: models.ProjectMember, foreignKey: "projectId" });
    models.Project.hasMany(models.ProjectMember, { foreignKey: "projectId", as: "members" });
    models.Project.hasMany(models.Task, { foreignKey: "projectId" });

    models.Task.belongsTo(models.Project, { foreignKey: "projectId" });
    models.Task.belongsToMany(models.User, { through: models.TaskAssignment, as: "assignedUsers", foreignKey: "taskId" });

    models.ProjectMember.belongsTo(models.User, { foreignKey: "userId" });
    models.ProjectMember.belongsTo(models.Project, { foreignKey: "projectId" });
};
export default associateModels;