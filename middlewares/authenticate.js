const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { SECRET_KEY } = process.env;
const {User} = require('../models/users')
const dotenv = require('dotenv');
dotenv.config();

const authenticate = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    //  const authHeader = req.headers.authorization;
    // const [bearer, token] = authHeader.split(" ",2);
    if (bearer !== "Bearer") {
        next(HttpError(401))  
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || !user.token === token) {
            next(HttpError(401))
        }
        req.user=user;
        next()
    } catch  {
         next(HttpError(401))
    }

}
module.exports = authenticate;



