
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const {User} = require('../models/userModel');

const userAuthMiddleware = asyncHandler( async(req, res, next)=>{
    let token;
    if( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        token = req.headers.authorization.split(' ')[1];
        try {
            const retrievedUser = await jwt.verify(token , process.env.JSON_SECRET);
             console.log(retrievedUser)

            const user =  await User.findById(retrievedUser.id).select('-password');
            req.user = user;
            next();

        } catch (error) {
            res.status(401);
            res.send('not authorized');
        }
    }
    token = req.headers.authorization.split(' ')[1];
    if(!token ){
        res.status(401);
        res.send('not authorized');
    }
    
})

module.exports.userAuthMiddleware = userAuthMiddleware;