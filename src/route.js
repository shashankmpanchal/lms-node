module.exports = function (app) {
  app.use("/", require("./models/employee"));
  app.use("/", require("./models/Leave"));
};
