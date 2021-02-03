const express = require('express');
const { getProducts, getSingleProduct , createProduct , deleteProduct } = require('../Controllers/productController');
const {userAuthMiddleware} = require('../middlewares/userAuthMiddleware');

const router =  express.Router();

router.route('/').get(getProducts ).post( userAuthMiddleware , createProduct );

router.route('/:id').get( getSingleProduct).delete( userAuthMiddleware , deleteProduct );

module.exports.productRoutes = router;