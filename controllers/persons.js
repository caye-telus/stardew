const persons = require('../models/persons')
const schema = require('../schema/persons')

exports.getAllPersons = (req, res, next) => {
  res.send({ persons: persons.data })
}

exports.getPersonById = (req, res, next) => {
  const filterPerson = persons.data
    .filter(person => person.id === parseInt(req.params.personId))
  if (filterPerson.length > 0) {
    return res.send({ persons: filterPerson })
  }
  res.status(400).send({ error: `User ${req.params.personId} not found` })
}

exports.addPerson = (req, res, next) => {
  const { error } = schema.newPerson.validate(req.body)
  if (!!error) {
    return res.status(400).json(error)
  }
  const id = persons.data.length + 1
  const newPerson = { id, ...req.body }
  persons.data.push(newPerson)
  res.send({ persons: [newPerson] })
}

exports.updatePerson = (req, res, next) => {
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

exports.deletePerson = (req, res, next) => {
  // Make sure user exists to be able to delete them
  const personIndex = persons.data
    .findIndex(person => person.id === parseInt(req.params.personId))
  if (personIndex < 0) {
    return res.status(400).send({ error: `User ${req.params.personId} not found` })
  }
  persons.data.splice(personIndex, 1)
  res.send({ persons: persons.data })
}
