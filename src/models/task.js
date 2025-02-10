module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      status: { type: DataTypes.ENUM("todo", "in_progress", "done"), defaultValue: "todo" },
      projectId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.Project, { foreignKey: "projectId" });
    Task.belongsToMany(models.User, { through: models.TaskAssignment });
    Task.hasMany(models.Comment, { foreignKey: "taskId" });
    Task.hasMany(models.Attachment, { foreignKey: "taskId" });
  };

  return Task;
};
