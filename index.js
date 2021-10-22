const express = require('express');
const app = express();
const port = 9000;
const pokemonRouter = require('./routers/pokemonRouter');

app.listen(port, () => {
    console.log('listening...');
});

app.use('/pokemon', pokemonRouter);

