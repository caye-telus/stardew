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
  console.log(req.params.personId)
  res.send({ persons: personsData.filter(person => person.id === parseInt(req.params.personId)) })
});

// POST
router.post('/', function(req, res, next) {
  personsData.push(req.body)
  res.send({ persons: personsData })
});

// PATCH
router.patch('/', function(req, res, next) {
  let person = personsData.
  res.send({ persons: personsData })
})

module.exports = router;
