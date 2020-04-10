const jwt = require("jsonwebtoken");

const authRequest = (req, res, next) => {
    //let token = '';
    let token = req.get('x-access-token');
    if (!token)
        return res.status(403).send({ auth: false, message: 'You need to be logged in to perform this action' });
    jwt.verify(token, process.env.HASH_KEY, function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        // if everything good, save to request for use in other routes
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
    });
};

module.exports = {
    authRequest,
};
