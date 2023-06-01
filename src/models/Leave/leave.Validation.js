const Joi = require("joi");
const validateRequest = require("../../utils/validation");

function applyLeave(req, res, next) {
  const schemaRules = {
    emergencyLeave: Joi.boolean().optional(),
    leaveCount: Joi.number().required(),
    leave: Joi.string().required().valid("Casual Leave", "Sick Leave"),
    fromDate: Joi.date().required(),
    toDate: Joi.date().required(),
  };
  validateRequest(req, res, next, Joi.object(schemaRules));
}

module.exports = {
  applyLeave,
};
