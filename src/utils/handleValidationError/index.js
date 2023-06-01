const handleValidationError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`;
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  console.log(message);
  return message;
};

module.exports = handleValidationError;

// const handleDuplicateField = (err) => {
//     let message;
//     const keys = Object.keys(err.keyValue);
//     if (keys.includes("email")) message = "User already exists";
//     return message;
//   };

//   const handleCastError = (err) => {
//     const message = `Invalid ${err.errors.path}: ${err.errors.value}.`;
//     return message;
//   };
