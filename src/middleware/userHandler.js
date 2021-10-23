const fs = require('fs');

function userHandler(req, res, next){
    const username = req.headers.username;
    try {
        fs.readdirSync(`./users/${username}`);
    } catch (error) {
        throw Error('401');
    }
    if(!username){
        throw Error('401');
    }
    next();
}


module.exports = userHandler;
