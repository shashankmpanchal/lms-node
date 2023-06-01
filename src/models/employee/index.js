const express = require("express");

const router = express.Router();
const controller = require("./employee.controller");
const { createEmployee, login } = require("./employee.Validation");

const checkAuth = require("../../middleware/checkAuth");

router.post("/create-employee", createEmployee, controller.createEmployee);
router.post("/login", login, controller.login);

module.exports = router;
