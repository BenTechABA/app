const express = require('express');
const router = express.Router();

// @routes GET api/authf
// @desc Register a user
// @access Public

router.post('/', (res, req) =>{
    res.send('Register a user');
});

module.exports = router;
