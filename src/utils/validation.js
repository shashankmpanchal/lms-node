const setRes = require("../utils/response");
const resCode = require("../config/res_code_config");

function validateRequest(req, res, next, schema, type = "body") {
  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  let errorData = "";
  let valueData = "";
  if (type === "body") {
    const { error, value } = schema.validate(req.body, options);
    errorData = error;
    valueData = value;
  } else {
    const { error, value } = schema.validate(req.query, options);
    errorData = error;
    valueData = value;
  }

  if (errorData) {
    return res
      .status(406)
      .send(
        setRes(resCode.NotActive, null, true, errorData.details[0].message)
      );
  } else {
    req.body = valueData;
    next();
  }
}

module.exports = validateRequest;
