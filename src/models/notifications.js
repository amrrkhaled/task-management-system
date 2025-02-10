export default (sequelize, DataTypes) => {
    const Notification = sequelize.define(
      "Notification",
      {
        text: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        taskId: { type: DataTypes.INTEGER, allowNull: false },
        seen: { type: DataTypes.BOOLEAN, defaultValue: false }, 
      },
      { timestamps: true }
    );
  
    Notification.associate = (models) => {
      // ✅ FIX: Add "through" table to belongsToMany
      Notification.belongsToMany(models.User, { through: "UserNotifications" });
    };
  
    return Notification;
  };
  