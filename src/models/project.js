export default (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.TEXT },
      attachments: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
      managerId: { type: DataTypes.INTEGER, allowNull: false },
    },
    { timestamps: true }
  );

  return Project;
};

