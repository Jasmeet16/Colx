const expressAsyncHandler = require('express-async-handler');
const asyncHandler = require('express-async-handler');
//const matchPassword = require('../models/userModel');
const {User} = require('../models/userModel');
const {generateToken} = require('../utils/generateTokens');



// description  get token and authhh user
// route POST : api/user/login

const authUser = asyncHandler( async ( req , res )=>{
    const {email ,password} = req.body;

    const user = await User.findOne({email});

   // console.log(user)
    if( user && (await user.matchPassword( password )) ){
        res.json({
            _id:user._id,
            email:user.email,
            name:user.name,
            token:generateToken(user._id),
        })
    }else{
        res.status(401);
        throw new Error ( "wrong email or password" ) ;
    }
});


// desc : register a new user
//route POST : api/user 

const registerUser = async (req, res)=>{
    const { name , email, password , phone , college , city} = req.body;

    const exist = await User.findOne({email});
    if( exist ){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        phone,
        college,
        city
    })

    if( user ){
        res.status(201);
        res.send({
            _id:user._id,
            email:user.email,
            name:user.name,
            token:generateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error('cannot create user');
    }

}

//edit user 
// route  /api/user/profile

const updateUser = async (req, res)=>{
    const user= await User.findById(req.user._id);
    //console.log(user)
    if( user ){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.college = req.body.college || user.college;
        user.city = req.body.city || user.city;
        user.phone = req.body.phone || user.phone;
        if( req.body.password ){
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            email:updatedUser.email,
            name:updatedUser.name,
            token:generateToken(updatedUser._id),
        })
        
    }else{
        res.status(401);
        throw new Error ( "wrong email or password" ) ;
    }
}





// description  user id fetched from middleware(token)
//route GET : api/user/profile

const getUserById = asyncHandler( async(req,res)=>{
    const user= await User.findById(req.user._id);
    //console.log(user)
    if( user ){
        res.send({
            _id:user._id,
            email:user.email,
            name:user.name,
            college:user.college,
            city:user.city,
            phone:user.phone
        })
    }else{
        res.status(401);
        throw new Error ( "wrong email or password" ) ;
    }

})

module.exports.authUser = authUser;
module.exports.getUserById = getUserById;
module.exports.registerUser = registerUser;
module.exports.updateUser = updateUser;


