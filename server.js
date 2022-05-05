const express = require("express");
const morgan = require("morgan"); //to see log,its a middleware
const cors = require("cors");
const bodyParser = require("body-parser"); //the data we will sent to the server from client,it will attach the object with req body.to parse the req body
const mongoose = require("mongoose");
const userRouter = require("./routers/userRoute");
const app = express();
app.use(morgan("dev")); //who is hitting which route,which method etc etc ,we can keep eye on all this with morgan
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// by using mongoose u dont need to connect with database directly.it will work for it.we just need to make some model.

app.use("/api/users/", userRouter);
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to our application!!",
  });
});

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`);
  mongoose.connect(
    "mongodb://localhost:27017/money-management-app",
    { useNewUrlParser: true },
    () => {
      console.log("database connected...");
    }
  );
});
