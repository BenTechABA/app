const express = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @route POST api/users
// @desc Regiter a user
// @access Public

router.post('/', [
    check('name', 'Please add name').not().isEmpty(),
    check('email', 'Please fill in a valid email address').isEmail(),
    check('password', 'Put in a password with 6 characters or more').isLength({min: 6})
], async (req, res) =>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
   };
   const {name, email, password} = req.body;
   try{
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({msg:'User already exists'});
    }
    user = new User({
        name,
        email,
        password
    });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt); 
    await user.save();
    const payload = {
        user:{
            id: user.id
        }
    }
    jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000
    }, (err, token) =>{
        if(err)throw err;
        res.json({token});
    });
   }catch(err){
     console.error(err.message);
     res.status(500).send('Server error')
   }
   
});

module.exports = router;
