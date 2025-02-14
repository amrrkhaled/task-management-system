export default (sequelize, DataTypes) => {
  const TaskAssignment = sequelize.define(
    "TaskAssignment",
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      taskId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  );

  return TaskAssignment;
};