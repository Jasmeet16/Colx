const asyncHandler = require('express-async-handler');
//const matchPassword = require('../models/userModel');
const {User} = require('../models/userModel');

// description  get token and authhh user
// route api/user/login

const authUser = asyncHandler( async ( req , res )=>{
    const {email ,password} = req.body;

    const user = await User.findOne({email});

   // console.log(user)
    if( user && (await user.matchPassword( password )) ){
        res.send({
            _id:user._id,
            email:user.email,
            name:user.name,
            token:null
        })
    }else{
        res.status(401);
        throw new Error ( "wrong email or password" ) ;
    }
});

module.exports.userController = authUser;