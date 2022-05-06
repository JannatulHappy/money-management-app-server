const bcrypt = require("bcrypt");
const registerValidator = require("../validator/registerValidator");
const User = require("../model/User");
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
      User.findOne({ email });
      console
        .log(email)
        .then((user) => {
          if (user) {
            return res.status(400).json({
              message: "User is Already exist",
            });
          }

          bcrypt.hash(password, 11, (err, hash) => {
            if (err) {
              return res.status(500).json({
                message: "Server Error Occurred",
              });
            }
            let user = new User({
              name,
              email,
              password: hash,
            });
            res.json(user);
            user
              .save()
              .then(user=>{
                res.status(201).json({
                  message:"User created successfully",
                  user
                })
              })
              .catch((error) => {
                console.log(error);
                res.status(500).json({
                  message: "Server error occurred",
                });
              });
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json({
            message: "Server error occurred",
          });
        });
    }
    //if wrong show error
    //check for duplicate user
    //new user object
    //save to db
    //res to client with new data
  },
};
