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

module.exports = router;
