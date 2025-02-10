export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, allowNull: false },
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

    // ✅ FIX: Use models.Notification instead of Notification
    User.belongsToMany(models.Notification, { through: "UserNotifications" });
  };

  return User;
};
