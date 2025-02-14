export default (sequelize, DataTypes) => {
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

  return Task;
};