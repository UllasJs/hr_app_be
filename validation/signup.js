const validator = require("validator");
const isEmpty = require("./empty");

const MIN_PASSWORD_LENGTH = 8;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%?&]).{8,}$/;
const spaceRegex = /\s/;

// Helper functions for specific validations
const validateUsername = (username) => {
  if (validator.isEmpty(username)) {
    return "Username is required";
  }
  return "";
};

const validateEmail = (email) => {
  if (email) {
    if (!validator.isEmail(email)) {
      return "Invalid email format";
    }
  }
  return "";
};

const validatePassword = (password) => {
  if (validator.isEmpty(password)) {
    return "Password field is required";
  }
  // if (!passwordRegex.test(password)) {
  //   return `Password must be at least ${MIN_PASSWORD_LENGTH} characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character.`;
  // }
  if (spaceRegex.test(password)) {
    return "Password must not contain spaces";
  }
  return ""; // Return an empty string if no validation errors are found
};

module.exports = function SignupValidation(data) {
  let errors = {};

  // Validate each field
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  const usernameError = validateUsername(data.username);
  const emailError = validateEmail(data.email);
  const passwordError = validatePassword(data.password);

  if (usernameError) errors.username = usernameError;
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
