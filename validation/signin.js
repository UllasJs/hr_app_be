const validator = require("validator");
const isEmpty = require("./empty");

module.exports = function SigninValidation(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // username checks
  if (validator.isEmpty(data.username)) {
    errors.username = "username is required";
  }
  
  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
