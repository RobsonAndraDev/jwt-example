const { getToken } = require("./authentication");
const users = [
  {
    username: "admin",
    password: "123",
  },
];

function set(app) {
  app.post("/login", login);
  app.get("/users", getUsers);
}

function login(req, res, next) {
  const { username, password } = req.body;

  let user = users.filter((u) => u.username == username);
  if (user.length == 0) {
    return res.status(401).json({ error: "User not found" });
  }

  user = user.filter((u) => u.username == username && u.password == password);
  if (user.length == 0) {
    return res.status(401).json({ error: "Wrong password" });
  }

  const token = getToken(username, password);

  return res.json({ token });
}

function getUsers(req, res) {
  return res.json(users);
}

module.exports = {
  set,
};
