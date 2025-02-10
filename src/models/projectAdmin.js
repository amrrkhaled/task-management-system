module.exports = (sequelize, DataTypes) => {
    const ProjectAdmin = sequelize.define("ProjectAdmin", {}, { timestamps: false });
  
    ProjectAdmin.associate = (models) => {
      ProjectAdmin.belongsTo(models.User, { foreignKey: "userId" });
      ProjectAdmin.belongsTo(models.Project, { foreignKey: "projectId" });
    };
  
    return ProjectAdmin;
  };
  