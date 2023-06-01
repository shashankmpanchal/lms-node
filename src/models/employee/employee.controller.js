const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resCode = require("../../config/res_code_config");
const setRes = require("../../utils/response");
require("dotenv").config();
const userService = require("./employeee.service");

exports.createEmployee = async (req, res) => {
  try {
    const { email, password, phoneNumber, fullName } = req.body;
    const user = await userService.findEmployee({ email: email });
    if (user.length === 0) {
      bcrypt.hash(password, 10, async (err, hash) => {
        const result = await userService.createEmployee(
          email,
          hash,
          phoneNumber,
          fullName
        );

        if (result) {
          return res
            .status(200)
            .send(
              setRes(resCode.OK, result, false, "Employee created Successfully")
            );
        }
      });
    } else {
      return res
        .status(409)
        .send(setRes(resCode.Conflict, [], false, "Employee Exist"));
    }
  } catch (err) {
    console.log(err);
    let message = "something went wrong";
    // if (err.code === 11000) message = handleDuplicateField(err);
    if (err.name === "ValidationError") message = handleValidationError(err);
    return res
      .status(500)
      .send(setRes(resCode.InternalServer, null, true, message));
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;
    const data = await userService.findEmployee({ email });
    if (data.length < 1) {
      return res
        .status(402)
        .send(
          setRes(
            resCode.Invalid,
            null,
            true,
            "The Email entered is incorrect, please try again."
          )
        );
    }

    bcrypt.compare(password, data[0].password, async (err, result) => {
      if (err || !result) {
        return res
          .status(402)
          .send(
            setRes(
              resCode.Invalid,
              null,
              true,
              "The password entered is incorrect, please try again."
            )
          );
      } else {
        const token = jwt.sign(
          {
            email: data[0].email,
            employeeId: data[0]._id,
            role: data[0].role,
          },
          process.env.SECRET_KEY
        );

        const user = {
          token,
          email: data[0].email,
          name: data[0].fullName,
          employeeId: data[0]._id,
        };
        console.log('user => ', user);
        return res
          .status(200)
          .send(setRes(resCode.OK, user, false, "Login Successful"));
      }
    });
  } catch (err) {
    let message = "something went wrong";
    if (err.name === "ValidationError") message = handleValidationError(err);
    return res
      .status(500)
      .send(setRes(resCode.InternalServer, null, true, message));
  }
};
