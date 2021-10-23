const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const username = req.headers.username;
    res.send(username);
})


module.exports = router;
