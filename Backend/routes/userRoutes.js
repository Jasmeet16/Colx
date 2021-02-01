// /api/user


const { Router } = require('express');
const express  = require('express');
const {authUser ,registerUser , getUserById , updateUser} = require('../Controllers/userController');
const {userAuthMiddleware} = require('../middlewares/userAuthMiddleware');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login' , authUser );
router.route('/profile').get( userAuthMiddleware , getUserById ).put(userAuthMiddleware,updateUser);

module.exports.userRoutes = router;
