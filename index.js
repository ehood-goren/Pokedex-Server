const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
const port = 9000;
const pokemonRouter = require('./src/routers/pokemonRouter');
const userRouter = require('./src/routers/userRouter');
const errorHandler = require('./src/middleware/errorHandler');
const userHandler = require('./src/middleware/userHandler');

app.listen(port, () => {
    console.log('listening...');
});

app.use(userHandler);

app.use('/pokemon', pokemonRouter);
app.use('/info', userRouter);
app.use('/*', (req, res) => {
    res.status(500).json({ error: "server error" });
    res.send();
});

app.use(errorHandler);

