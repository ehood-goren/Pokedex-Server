const express = require('express');
const app = express();
const port = 9000;
const pokemonRouter = require('./src/routers/pokemonRouter');
const userRouter = require('./src/routers/userRouter');

app.listen(port, () => {
    console.log('listening...');
});

app.use('/pokemon', pokemonRouter);
app.use('/info', userRouter);
