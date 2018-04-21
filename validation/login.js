const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput({ email = "", password = "" }) {
  let errors = {};

  if (!Validator.isEmail(email)) {
    //handles no email submitted or incorrect
    errors.email = "Valid email address is required";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
