const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resCode = require("../../config/res_code_config");
const setRes = require("../../utils/response");
require("dotenv").config();
const leaveService = require("./leave.service");
const handleValidationError = require("../../utils/handleValidationError");

exports.applyLeave = async (req, res) => {
  try {
    if (req.employeeData.role === "employee") {
      const result = await leaveService.applyLeave({
        ...req.body,
        employeeId: req.employeeData.employeeId,
      });
      console.log(result);
      if (result)
        return res
          .status(200)
          .send(
            setRes(resCode.OK, result, false, "Leave applyed Successfully")
          );
      else
        return res
          .status(500)
          .send(
            setRes(
              resCode.InternalServer,
              result,
              false,
              "something went wrong"
            )
          );
    } else {
      return res
        .status(402)
        .send(setRes(resCode.Invalid, [], false, "Not a Valid User"));
    }
  } catch (err) {
    console.log(err);
    let message = "something went wrong";
    if (err.name === "ValidationError") message = handleValidationError(err);
    return res
      .status(500)
      .send(setRes(resCode.InternalServer, null, true, message));
  }
};

exports.updateLeave = async (req, res) => {
  try {
    if (req.employeeData.role === "employee") {
      const { id } = req.params;
      const result = await leaveService.updateLeave({ _id: id }, req.body);
      if (result)
        return res
          .status(200)
          .send(setRes(resCode.OK, [], false, "Leave Updateduccessfully"));
      else
        return res
          .status(500)
          .send(
            setRes(
              resCode.InternalServer,
              result,
              false,
              "something went wrong"
            )
          );
    } else {
      return res
        .status(402)
        .send(setRes(resCode.Invalid, [], false, "Not a Valid User"));
    }
  } catch (err) {
    console.log(err);
    let message = "something went wrong";
    if (err.name === "ValidationError") message = handleValidationError(err);
    return res
      .status(500)
      .send(setRes(resCode.InternalServer, null, true, message));
  }
};

exports.getUserLeave = async (req, res) => {
  try {
    if (req.employeeData.role === "employee") {
      const result = await leaveService.FineLeave({
        employeeId: req.employeeData.employeeId,
        isDeleted: false,
      });
      if (result)
        return res
          .status(200)
          .send(setRes(resCode.OK, result, false, "User Leave List"));
    } else {
      return res
        .status(402)
        .send(setRes(resCode.Invalid, [], false, "Not a Valid User"));
    }
  } catch (err) {
    console.log(err);
    let message = "something went wrong";
    if (err.name === "ValidationError") message = handleValidationError(err);
    return res
      .status(500)
      .send(setRes(resCode.InternalServer, null, true, message));
  }
};

exports.LeaveCount = async (req, res) => {
  try {
    if (req.employeeData.role === "employee") {
      const result = await leaveService.FineLeaveCount(
        req.employeeData.employeeId
      );
      if (result) {
        const data = {
          "Total Leaves": 16,
          "Applied Leaves": result[0].count,
          "Available Leaves": 16 - Number(result[0].count),
        };
        return res
          .status(200)
          .send(setRes(resCode.OK, data, false, "User Leave List"));
      }
    } else {
      return res
        .status(402)
        .send(setRes(resCode.Invalid, [], false, "Not a Valid User"));
    }
  } catch (err) {
    console.log(err);
    let message = "something went wrong";
    if (err.name === "ValidationError") message = handleValidationError(err);
    return res
      .status(500)
      .send(setRes(resCode.InternalServer, null, true, message));
  }
};

exports.approveLeave = async (req, res) => {
  try {
    if (req.employeeData.role === "manager") {
      const { id } = req.params;
      const updatedData = {
        status: "approved",
      };
      const result = await leaveService.updateLeave({ _id: id }, updatedData);
      if (result)
        return res
          .status(200)
          .send(setRes(resCode.OK, [], false, "Leave Approved successfully"));
      else
        return res
          .status(500)
          .send(
            setRes(
              resCode.InternalServer,
              result,
              false,
              "something went wrong"
            )
          );
    } else {
      return res
        .status(402)
        .send(setRes(resCode.Invalid, [], false, "Not a Valid User"));
    }
  } catch (err) {
    console.log(err);
    let message = "something went wrong";
    if (err.name === "ValidationError") message = handleValidationError(err);
    return res
      .status(500)
      .send(setRes(resCode.InternalServer, null, true, message));
  }
};
