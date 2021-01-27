const { Router } = require('express');
const express  = require('express');
const {userController} = require('../Controllers/userController');

const router = express.Router();

router.post('/auth' , userController );

module.exports.userRoutes = router;
