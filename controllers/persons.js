const models = require('../models')
const schema = require('../schema/persons')

const getAllPersons = async (req, res, next) => {
  const persons = await models.Person.findAll()
  res.send({ persons: persons })
}

const getPersonById = (req, res, next) => {
  const filterPerson = persons.data
    .filter(person => person.id === parseInt(req.params.personId))
  if (filterPerson.length > 0) {
    return res.send({ persons: filterPerson })
  }
  res.status(400).send({ error: `User ${req.params.personId} not found` })
}

const addPerson = (req, res, next) => {
  const { error } = schema.newPerson.validate(req.body)
  if (!!error) {
    return res.status(400).json(error)
  }
  const id = persons.data.length + 1
  const newPerson = { id, ...req.body }
  persons.data.push(newPerson)
  res.send({ persons: [newPerson] })
}

const updatePerson = (req, res, next) => {
  const personIndex = persons.data
    .findIndex(person => person.id === parseInt(req.params.personId))
    console.log(personIndex)
  // Make sure user exists to update it
  if (personIndex < 0) {
    return res.status(400).send({ error: `User ${req.params.personId} not found` })
  }
  // Make sure data is valid before updating
  const { error } = schema.updatePerson.validate(req.body)
  if (!!error) {
    return res.status(400).json(error)
  }
  // Update person
  const updatedPerson = {
    ...persons.data[personIndex],
    ...req.body
  }
  persons.data[personIndex] = updatedPerson // updates whole list (persons.data)
  res.send({ persons: [updatedPerson] })
}

const deletePerson = (req, res, next) => {
  // Make sure user exists to be able to delete them
  const personIndex = persons.data
    .findIndex(person => person.id === parseInt(req.params.personId))
  if (personIndex < 0) {
    return res.status(400).send({ error: `User ${req.params.personId} not found` })
  }
  persons.data.splice(personIndex, 1)
  res.send({ persons: persons.data })
}

module.exports = {
  getAllPersons,
  getPersonById,
  addPerson,
  updatePerson,
  deletePerson
}