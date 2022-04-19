module.exports = (Sequelize, DataTypes) => {
  const user = Sequelize.define(
    "User",
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      surname: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: { type: DataTypes.STRING, allowNull: false, minlength: 5 },
    },
    { timestamps: false }
  );
  return user;
};
