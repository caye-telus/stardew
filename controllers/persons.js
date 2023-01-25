const persons = require('../models/persons')
const schema = require('../schema/persons')

exports.getAllPersons = (req, res, next) => {
  res.send({ persons: persons.data })
}

exports.getPersonById = (req, res, next) => {
  res.send({ persons: persons.data
    .filter(person => person.id === parseInt(req.params.personId))
  })
}

exports.addPerson = (req, res, next) => {
  const { error } = schema.newPerson.validate(req.body)
  if (!!error) {
    return res.status(400).json(error)
  }
  const id = persons.data.length + 1
  const newPerson = { id, ...req.body }
  persons.data.push(newPerson)
  res.send(newPerson)
}

exports.updatePerson = (req, res, next) => {
  const { error } = schema.updatePerson.validate(req.body)
  if (!!error) {
    return res.status(400).json(error)
  }
  const personIndex = persons.data
    .findIndex(person => person.id === parseInt(req.params.personId))
  const updatedPerson = {
    ...persons.data[personIndex],
    ...req.body
  }
  persons.data[personIndex] = updatedPerson // updates whole list (persons.data)
  res.send(updatedPerson)
}

exports.deletePerson = (req, res, next) => {
  const personIndex = persons.data
    .findIndex(person => person.id === parseInt(req.params.personId))
  persons.data.splice(personIndex, 1)
  res.send({ persons: persons.data })
}
