const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3000;
const pokemonRouter = require("./src/routers/pokemonRouter");
const userRouter = require("./src/routers/userRouter");
const errorHandler = require("./src/middleware/errorHandler");
const userHandler = require("./src/middleware/userHandler");

app.listen(port, () => {
  console.log("listening...");
});

app.use((req, res, next) => {
  //res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "*");
  res.append("Access-Control-Allow-Headers", "*");
  next();
});
app.use(userHandler);

app.use("/pokemon", pokemonRouter);
app.use("/info", userRouter);

app.use(errorHandler);
// app.use((req, res, next) => {
//   res.status(500).json({ error: "server error" });
// });
