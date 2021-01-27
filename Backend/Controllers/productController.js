const {Product} = require('../models/productModel');

//get products
// to api/products
const getProducts = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.json(products);    
    } catch (error) {
        console.error(error);        
    }
}

//getsingleproduct
//to api/products/:id
const getSingleProduct = async (req ,res)=>{
    try {
        const prod = await Product.findById(req.params.id);
        res.json(prod);
    } catch (error) {
        console.error(error);
    }
}

module.exports.getProducts = getProducts
module.exports.getSingleProduct = getSingleProduct

