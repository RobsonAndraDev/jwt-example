const jwt = require("jsonwebtoken");
const privateKey = "chave";

function getToken(username, password) {
  const token = jwt.sign({ username, password }, privateKey, {
    expiresIn: "1m",
  });

  return token;
}

function validateToken(req, res, next) {
  const token = req.header("token");

  if (req.originalUrl == "/login") {
    return next();
  }

  if (!token) {
    return res.status(401).json({ error: "Not logged in" });
  }

  try {
    req.decoded = jwt.verify(token, privateKey);
    return next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ error: "Unauthorized" });
  }
}

module.exports = {
  getToken,
  validateToken,
};
