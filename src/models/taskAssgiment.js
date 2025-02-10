export default (sequelize, DataTypes) => {
    const TaskAssignment = sequelize.define("TaskAssignment", {}, { timestamps: false });
  
    return TaskAssignment;
  };
  