const registerValidator = require("../validator/registerValidator");
// login controller
module.exports = {
  login(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    res.json({
      message: `Welcome ${name}.we will contact with you by ${email}.stay connected`,
    });
  },
  register(req, res) {
    let { name, email, password, confirmPassword } = req.body; //read data

    let validate = registerValidator({
      name,
      email,
      password,
      confirmPassword,
    }); //validation check user data

    if (!validate.isValid) {
      res.status(400).json(validate.error);
    } else {
      res.status(200).json({
        message: "Everything is Okay!!",
      });
    }
    //if wrong show error
    //check for duplicate user
    //new user object
    //save to db
    //res to client with new data
  },
};
