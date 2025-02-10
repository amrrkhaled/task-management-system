module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define(
      "Project",
      {
        name: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING },
        attachments: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
        managerId: { type: DataTypes.INTEGER, allowNull: false },
      },
      { timestamps: true }
    );
  
    Project.associate = (models) => {
      Project.belongsTo(models.User, { foreignKey: "managerId", as: "manager" });
      Project.belongsToMany(models.User, {
        through: models.ProjectMember,
        foreignKey: "projectId",
        as: "members",
      });
      Project.belongsToMany(models.User, {
        through: models.ProjectAdmin,
        foreignKey: "projectId",
        as: "admins",
      });
      Project.hasMany(models.Task, { foreignKey: "projectId" });
      Project.hasMany(models.Attachment, { foreignKey: "projectId" });
    };
    
  
    return Project;
  };
  