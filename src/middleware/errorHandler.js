function errorHandler(err, req, res, next){
    switch (err) {
        case '403 catch':
            res.status(403).json({message: 'Pokemon already caught'});
            break;
        case '403 release':
            res.status(403).json({message: "Can't release an uncaught pokemon"});
            break;
        case '404':
            res.status(404).json({message: "Can't find pokemon"});
            break;
        case '401 empty':
            res.status(401).json({message: 'Unauthenticated user request (Please enter a username)'});
            break;
        case '401 not exist':
            res.status(401).json({message: 'Unauthenticated user request (Username does not exist)'});
            break;
        default:
            res.status(500).json({message: 'Server Error'});
            break;
    }
    res.send();
    next();
}

module.exports = errorHandler;
