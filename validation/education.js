const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput({
  school = "",
  degree = "",
  fieldofstudy = "",
  from = ""
}) {
  let errors = {};

  if (Validator.isEmpty(school)) {
    errors.school = "School field is required";
  }

  if (Validator.isEmpty(degree)) {
    errors.degree = "Degree field is required";
  }

  if (Validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
  }

  if (Validator.isEmpty(from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
