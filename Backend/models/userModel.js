const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.methods.matchPassword = async function(passwordEntered){
    return await bcrypt.compare( passwordEntered , this.password );
}

const User = mongoose.model('User' , userSchema);

module.exports.User = User;
//module.exports.matchPassword = matchPassword;
