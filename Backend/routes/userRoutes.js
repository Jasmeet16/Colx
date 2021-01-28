const { Router } = require('express');
const express  = require('express');
const {authUser , getUserById} = require('../Controllers/userController');
const {userAuthMiddleware} = require('../middlewares/userAuthMiddleware');

const router = express.Router();

router.post('/login' , authUser );
router.route('/profile').get( userAuthMiddleware , getUserById );

module.exports.userRoutes = router;
