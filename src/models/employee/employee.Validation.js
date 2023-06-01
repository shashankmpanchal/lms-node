const Joi = require("joi");
const validateRequest = require("../../utils/validation");

function createEmployee(req, res, next) {
  const schemaRules = {
    fullName: Joi.string().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    phoneNumber: Joi.number().optional(),
    role: Joi.string().optional(),
  };
  validateRequest(req, res, next, Joi.object(schemaRules));
}

function login(req, res, next) {
  const schemaRules = {
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
  };
  validateRequest(req, res, next, Joi.object(schemaRules));
}

module.exports = {
  createEmployee,
  login,
};
