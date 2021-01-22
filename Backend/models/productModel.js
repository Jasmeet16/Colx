const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'
    },
    name:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    inStock:{
        type:Boolean,
        default:true
    }
}, {
    timestamps:true
});

const Product = mongoose.model('Product' , productSchema);

module.exports.Product = Product;