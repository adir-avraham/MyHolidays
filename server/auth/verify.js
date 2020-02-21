const express = require("express")
const router = express.Router();
const verifyToken = require('./verifyToken');



router.use(verifyToken);

router.get("/", async (req, res, next) => {
    const { first_name, role } = req.decoded[0];
    res.json({status: true, firstName: first_name, role: role })
});


module.exports = router;