const express = require('express');
const router = express.Router(); 
const contactController = require('../../controller/user/contact');
const {authMiddleware} = require("../../helpers/auth");

router.post('/mark-spam/:phone_no', authMiddleware , contactController.markUserSpam);

router.get('/search-user', authMiddleware, contactController.searchUser)

module.exports = router;