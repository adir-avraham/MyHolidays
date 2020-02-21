const express = require("express");
const router = express.Router();



router.use('/', (req, res, next) =>{
    const { role } = req.decoded[0];
    if (role !== "admin") return res.json({message: "Role is not authorized", status: false})
    next()
});

  
module.exports = router;