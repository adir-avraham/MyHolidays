const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post('/', (req, res, next) =>{
    
    try {
        const { authorization } = req.headers;
        if (!authorization) return res.json({message: "Verification failed", redirect: false});
        jwt.verify(authorization, process.env.SECRET, (err, decoded) =>{
            if (err) return res.json({message: "Verification failed", status: false});
            //console.log("deco", decoded);
            req.decoded = decoded;
            next()
        });
    } catch {
        return res.json({ status: false })
    }
  });


  
  module.exports = router;