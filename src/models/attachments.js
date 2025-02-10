export default (sequelize, DataTypes) => {
    const Attachment = sequelize.define(
      "Attachment",
      {
        fileUrl: { type: DataTypes.STRING, allowNull: false },
        projectId: { type: DataTypes.INTEGER },
        taskId: { type: DataTypes.INTEGER },
      },
      { timestamps: true }
    );
  
    Attachment.associate = (models) => {
      Attachment.belongsTo(models.Task, { foreignKey: "taskId" });
      Attachment.belongsTo(models.Project, { foreignKey: "projectId" });
    };
  
    return Attachment;
  };
  