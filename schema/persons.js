var Joi = require('joi')

exports.newPerson = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required()
})

exports.updatePerson = Joi.object({
  name: Joi.string(),
  address: Joi.string()
})