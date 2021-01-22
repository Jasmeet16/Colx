const express = require('express');
const {Product} = require('../models/productModel');

const router =  express.Router();

router.get('/' , async (req,res)=>{
    try {
        const products = await Product.find({});
        res.json(products);    
    } catch (error) {
        console.error(error);        
    }

} );

router.get('/:id', async (req ,res)=>{
    try {
        const prod = await Product.findById(req.params.id);
        res.json(prod);
    } catch (error) {
        console.error(error);
    }
} );

module.exports.productRoutes = router;