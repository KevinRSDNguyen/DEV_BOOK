const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput({
  title = "",
  company = "",
  from = ""
}) {
  let errors = {};

  if (Validator.isEmpty(title)) {
    errors.title = "Job Title field is required";
  }

  if (Validator.isEmpty(company)) {
    errors.company = "Company field is required";
  }

  if (Validator.isEmpty(from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
