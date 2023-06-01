const Leave = require("./leave.models");

exports.FineLeave = async (data) => {
  return await Leave.find(data);
};

exports.FineLeaveCount = async (data) => {
  return await Leave.aggregate([
    ({
      $match: {
        employeeId: data,
        status: "approved",
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "leaveApply",
        count: {
          $sum: "$leaveCount",
        },
      },
    }),
  ]);
};

exports.applyLeave = async (data) => {
  const user = new Leave({
    ...data,
  });
  return await user.save();
};

exports.updateLeave = async (id, data) => {
  return await Leave.updateOne(id, { $set: data });
};
