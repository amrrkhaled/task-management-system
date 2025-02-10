module.exports = (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define(
    "ProjectMember",
    {
      role: {
        type: DataTypes.ENUM("member", "admin"),
        defaultValue: "member",
      },
    },
    { timestamps: false } // No need for timestamps unless required
  );

  ProjectMember.associate = (models) => {
    ProjectMember.belongsTo(models.User, { foreignKey: "userId" });
    ProjectMember.belongsTo(models.Project, { foreignKey: "projectId" });
  };

  return ProjectMember;
};
