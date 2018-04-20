const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput({name}) {
  let errors = {};

  if (!Validator.isLength(name, {min:2, max: 30})) {
    errors.name = 'Name must be between 2 and 30 Characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}