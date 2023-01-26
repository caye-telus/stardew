const Sequelize = require('sequelize');
const db = require('../utils/database')
const { getPersonModel } = require('./persons');

const models = {
  Person: getPersonModel(db, Sequelize)
}

module.exports = models
