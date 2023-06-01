const Employee = require("./employee.models");

exports.findEmployee = async (data) => {
  return await Employee.find(data);
};

exports.createEmployee = async (
  email,
  password,
  phoneNumber,
  fullName,
  role
) => {
  const user = new Employee({
    email,
    password,
    phoneNumber,
    fullName,
    role,
  });
  return await user.save();
};
