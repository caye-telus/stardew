var express = require('express');
var router = express.Router();

const personsController = require('../controllers/persons')

/* GET home page. */
router.get('/', personsController.getAllPersons);

// GET by id
router.get('/id/:personId', personsController.getPersonById);

// POST
router.post('/', personsController.addPerson);

// PATCH
router.patch('/id/:personId', personsController.updatePerson)

// DELETE
router.delete('/id/:personId', personsController.deletePerson)

module.exports = router;
