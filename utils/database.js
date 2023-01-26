require('dotenv/config')
const Sequelize = require('sequelize');

// Initialize db
const db = new Sequelize(
  process.env.DATABASE, // db_name
  process.env.DATABASE_USER, // db_user
  process.env.DATABASE_PASSWORD, // db_user_password
  {
    host: process.env.HOST,
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
);

module.exports = db