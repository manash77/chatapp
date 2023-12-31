const jwt = require('jsonwebtoken');
const User = require('../model/user');


const authenticate = async(req, res, next) => {
    try {
        const token = req.header('Authorization'); 
        console.log(token);
        const {userId} = jwt.verify(token,process.env.SECRET_KEY);
        const user = await User.findByPk(userId);
        if (user) {
            req.user = user;
            next()
        } else {
         return res.status(404).json({ err: "Authentication Failed" })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ err: "Error While Authenticating" })
    }
}

module.exports = { authenticate };