const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
    },
    college:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const User = mongoose.model('User' , userSchema);

module.exports.User = User;