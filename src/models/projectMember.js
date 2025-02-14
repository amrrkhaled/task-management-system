export default (sequelize, DataTypes) => {
  const ProjectMember = sequelize.define(
    "ProjectMember",
    {
      role: {
        type: DataTypes.ENUM("member", "admin"),
        defaultValue: "member",
      },
      userId: { type: DataTypes.INTEGER, allowNull: false },
      projectId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: false }
  );

  return ProjectMember;
};