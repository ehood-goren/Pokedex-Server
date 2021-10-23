function errorHandler(err, req, res, next) {
  if (err.message === "403 catch") {
    res.status(403).json({ message: "Pokemon already caught" });
  } else if (err.message === "403 release") {
    res.status(403).json({ message: "Can't release an uncaught pokemon" });
  } else if (err.message === "404") {
    res.status(404).json({ message: "Can't find pokemon" });
  } else if (err.message === "500") {
    res.status(500).json({ message: "Server Error" });
  } else if (err.message === "401") {
    res
      .status(401)
      .json({
        message: "Unauthenticated user request (Please enter your username)",
      });
  }
  next();
}

module.exports = errorHandler;
