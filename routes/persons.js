var express = require('express');
var router = express.Router();

let personsData = [
  {
  id: 1,
  name: 'Emily',
  address: '2 Willow Lane'
  },
  {
    id: 2,
    name: 'Haley',
    address: '2 Willow Lane'
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ persons: personsData })
});

// GET by id
router.get('/id/:personId', function(req, res, next) {
  res.send({ persons: personsData
    .filter(person => person.id === parseInt(req.params.personId))
  })
});

// POST
router.post('/', function(req, res, next) {
  // req.body = { name: 'Caye', address: 'Pelican Town' }
  const id = personsData.length + 1
  console.log(req.body)
  const newPerson = { id, ...req.body }
  personsData.push(newPerson)
  res.send(newPerson)
});

// PATCH
router.patch('/id/:personId', function(req, res, next) {
  const personIndex = personsData
    .findIndex(person => person.id === parseInt(req.params.personId))
  const updatedPerson = {
    ...personsData[personIndex],
    ...req.body
  }
  personsData[personIndex] = updatedPerson // updates whole list (personsData)
  res.send(updatedPerson)
})

// DELETE
router.delete('/id/:personId', function(req, res, next) {
  const personIndex = personsData
    .findIndex(person => person.id === parseInt(req.params.personId))
  personsData.splice(personIndex, 1)
  // delete personsData[personIndex]
  res.send(personsData)
})

module.exports = router;
