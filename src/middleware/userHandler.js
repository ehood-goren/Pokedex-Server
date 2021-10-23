const fs = require("fs");
function userHandler(req, res, next) {
  const username = req.headers.username;
  try {
    let users = fs.readFileSync("./users");
    let index = users.indexOf(username);
    if (index === -1) {
      throw Error("401");
    } else {
      next();
      return;
    }
  } catch (error) {
    next();
    throw Error("401");
  }
}

module.exports = userHandler;
