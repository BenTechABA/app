const express = require('express');
const router = express.Router();

// @routes GET api/auth
// @desc Get logged in user
// @access Private

router.get('/', (res, req) =>{
    res.send('Get logged in user');
});

// @routes GET api/auth
// @desc Get logged in user
// @access Private

router.get('/', (res, req) =>{
    res.send('Get logged in user');
});

module.exports = router;
