module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: true }
  );

  User.associate = (models) => {
    User.hasMany(models.Project, { foreignKey: "managerId", as: "managedProjects" });
    User.belongsToMany(models.Project, { through: models.ProjectMember });
    User.belongsToMany(models.Task, { through: models.TaskAssignment });
    User.hasMany(models.Comment, { foreignKey: "userId" });
  };

  return User;
};
