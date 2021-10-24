const fs = require('fs');

function userHandler(req, res, next){
    const username = req.headers.username;
    try {
        fs.readdirSync(`./users/${username}`);
    } catch (error) {
        next('401 not exist');
    }
    if(!username){
        next('401 empty');
    }
    next();
}


module.exports = userHandler;
