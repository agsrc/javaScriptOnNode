const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{ // root of the website and callback function param -- this is a route
    res.render('index',{title: 'My Express App', message:  'hello'})
    });

    exports.exports = router;