const validator = require("validator");
const validate = (user) => {
  let error = {};
  if (!user.name) {
    error.name = "Please Provide Your Name";
  }
  if (!user.email) {
    error.email = "Please Provide Your Email";
  } else if (!validator.isEmail(user.email)) {
    error.email = "Please Provide a Valid Email";
  }
  if (!user.password) {
    error.password = "Please Provide Your Password";
  } else if (user.password.length < 6) {
    error.password = "Password Must be greater or equal 6 character long";
  }
  if (!user.confirmPassword) {
    error.confirmPassword = "Please provide Confirm Password";
  } else if (user.password !== user.confirmPassword) {
    error.confirmPassword = "Password doesn't matched";
  }
  return {
    error,
    isValid: Object.keys(error).length === 0,
  };
};
module.exports = validate;
