const express = require('express');
const router = express.Router();

// @routes GET api/auth
// @desc Get logged by user
// @access Private

router.post('/', (res, req) =>{
    res.send('Register a user');
});

module.exports = router;
