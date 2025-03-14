export default (sequelize, DataTypes) => {
  const TaskAssignment = sequelize.define(
    "TaskAssignment",
    {
      
      username: { type: DataTypes.STRING, allowNull: true }, 
      userId: { type: DataTypes.INTEGER, allowNull: false },
      taskId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  );

  return TaskAssignment;
};