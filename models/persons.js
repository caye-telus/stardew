const getPersonModel = (db, { DataTypes }) => {
  // API Ref: https://sequelize.org/api/v7/classes/_sequelize_core.model#init
  // Validations vs Constraints: https://sequelize.org/docs/v7/core-concepts/validations-and-constraints/
  const Person = db.define('persons', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
        notEmpty: true
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
  });

  return Person;
};

module.exports = {
  getPersonModel
}