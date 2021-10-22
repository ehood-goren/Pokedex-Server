const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("shouldnt get here");
})

router.get('/:id', (req, res) => {
    console.log("GGGG");
    const { id } = req.params;
    console.log(id);
    res.send(req.params);
})

module.exports = router;
