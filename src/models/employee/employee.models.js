const mongoose = require("mongoose");

const { Schema } = mongoose;
const employeeSchme = new Schema(
  {
    fullName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    casualLeave: {
      type: Number,
      default: 12,
    },
    sickLeave: {
      type: Number,
      default: 6,
    },
    role: {
      type: String,
      enum: ["manager", "employee"],
      default: "employee",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const Employee = mongoose.model("employee", employeeSchme);
module.exports = Employee;
