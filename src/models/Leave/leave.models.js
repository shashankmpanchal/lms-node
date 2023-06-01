const mongoose = require("mongoose");

const { Schema } = mongoose;
const leaveSchme = new Schema(
  {
    employeeId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "employee",
      required: true,
    },

    emergencyLeave: {
      Boolean,
      default: false,
    },
    leaveCount: {
      type: Number,
    },
    leave: {
      type: String,
      enum: ["Casual Leave", "Sick Leave"],
    },
    fromDate: {
      type: Date,
    },
    toDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

const leaves = mongoose.model("leaves", leaveSchme);
module.exports = leaves;
