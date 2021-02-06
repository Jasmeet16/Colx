// /api/user


const { Router } = require('express');
const express  = require('express');
const { authUser, registerUser, getUserById, updateUser,getUserByPassedId } = require('../Controllers/userController');
const { getProductsOfUser } = require('../Controllers/productController');

const {userAuthMiddleware} = require('../middlewares/userAuthMiddleware');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login' , authUser );
router.route('/profile').get(userAuthMiddleware, getUserById).put(userAuthMiddleware, updateUser);
router.route('/:id').get(getUserByPassedId);
router.route('/profile/products').get(userAuthMiddleware, getProductsOfUser)



module.exports.userRoutes = router;
