const jwt = require("jsonwebtoken");
const resCode = require("../config/res_code_config");
const setRes = require("../utils/response");
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const deocded = jwt.verify(token, process.env.SECRET_KEY);
    req.employeeData = deocded;
    next();
  } catch (error) {
    res
      .status(412)
      .send(setRes(resCode.TokenInvalid, null, true, "Auth Failed"));
  }
};
