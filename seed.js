const Employee = require("./src/models/employee/employee.models");
const mongoose = require("mongoose");
const config = require("./src/config/mongo_config");
const bcrypt = require("bcrypt");
const resCode = require("./src/config/res_code_config");
require("dotenv").config();
const userService = require("./src/models/employee/employeee.service");

mongoose.connect(config.mongo.url + config.mongo.db);

const conn = mongoose.connection;
conn.on("open", () => console.log("connected"));

try {
  Employee.find({ role: "manager" })
    .exec()
    .then((manager) => {
      if (manager.length !== 0) {
        console.log("manager Already created");
        mongoose.disconnect();
      } else {
        bcrypt.hash("admin@123", 10, async (err, hash) => {
          const result = await userService.createEmployee(
            "admin@admin.com",
            hash,
            "98989898989",
            "Admin",
            "manager"
          );

          console.log("Admin created Successfully");
        });
      }
    })
    .catch((err) => {
      return res
        .status(500)
        .send(setRes(resCode.InternalServer, null, true, err));
    });
} catch (error) {
  console.log("error => ", error);
}
