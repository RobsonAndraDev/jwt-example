const express = require("express");
const bodyParser = require("body-parser");
const { validateToken } = require("./controller/authentication");
const userController = require("./controller/user");
app = express();

app.use(bodyParser.json());
app.use(validateToken);
userController.set(app);

app.listen(3000, () => {
  console.log("magic happens on 3000");
});
