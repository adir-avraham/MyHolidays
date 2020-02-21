const express = require("express")
const router = express.Router();
const jwt = require("jsonwebtoken");



router.get("/", async (req, res, next) => {

    try {
            const { authorization } = req.headers
            jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
                if (err) return res.json({ status: false })
                const { first_name, role } = decoded["0"];
                res.json({status: true, firstName: first_name, role: role })
            })
    } catch (err) {
        res.json({ error: err.message, status: false })
    };
});


module.exports = router;