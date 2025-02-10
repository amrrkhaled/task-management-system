module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      "Comment",
      {
        text: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        taskId: { type: DataTypes.INTEGER, allowNull: false },
      },
      { timestamps: true }
    );
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.Task, { foreignKey: "taskId" });
    };
  
    return Comment;
  };
  