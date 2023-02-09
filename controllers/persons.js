const models = require('../models')
const schema = require('../schema/persons')

const getAllPersons = async (req, res, next) => {
  // Simple SELECT queries:
  // https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#simple-select-queries
  const persons = await models.Person.findAll()
  res.send({ persons: persons })
}

const getPersonById = async (req, res, next) => {
  const person = await models.Person.findByPk(parseInt(req.params.personId))
  if (person) {
    return res.send({ persons: [person] })
  }
  res.status(400).send({ error: `User ${req.params.personId} not found` })
}

const addPerson = async (req, res, next) => {
  // Simple INSERT queries:
  // https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#simple-insert-queries
  const { error } = schema.newPerson.validate(req.body)
  if (!!error) {
    return res.status(400).json(error)
  }
  const newPerson = await models.Person.create(req.body)
  res.send({ persons: [newPerson] })
}

const updatePerson = async (req, res, next) => {
  // Simple UPDATE queries:
  // https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#simple-update-queries
  const paramsId = parseInt(req.params.personId)
  const person = await models.Person.findByPk(paramsId)
  // If user doesn't exist, let's send the error asap
  if (!person) {
    return res.status(400).send({ error: `User ${req.params.personId} not found` })
  }
  // If our code reaches this part, it means user exists
  // Let's proceed with validation
  const { error } = schema.updatePerson.validate(req.body)
  if (!!error) { // If there's a validation error, let's return the error
    return res.status(400).json(error)
  }
  
  // Finally updating
  await models.Person.update(req.body, {
    where: {
      id: paramsId
    }
  });
  const updatedPerson = await models.Person.findByPk(paramsId)
  res.send({ persons: [updatedPerson] })
}

const deletePerson = async (req, res, next) => {
  // Simple DELETE queries:
  // https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#simple-delete-queries
  // Make sure user exists to be able to delete them
  const paramsId = parseInt(req.params.personId)
  const person = await models.Person.findByPk(paramsId)
  if (!person) {
    return res.status(400).send({ error: `User ${req.params.personId} not found` })
  }
  await models.Person.destroy({
    where: {
      id: paramsId
    }
  });
  res.status(200).send({ message: `User ${paramsId} successfully deleted` })
}

module.exports = {
  getAllPersons,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson
}