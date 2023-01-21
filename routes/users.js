const express = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');

const router = express.Router();

// @route POST api/users
// @desc Regiter a user
// @access Public

router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please fill in a valid email address').isEmail(),
    check('password', 'Put in a password with 6 characters or more').isLength({min: 6})
], (req, res) =>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
   };
   const {name, email, password} = req.body;
   
   res.send('passes');
});

module.exports = router;
