function userHandler(req, res, next){
    const username = req.headers.username;
    if(!username){
        throw Error('401');
    }
    next();
}


module.exports = userHandler;
