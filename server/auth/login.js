const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const jwt = require('jsonwebtoken');


router.post('/', async (req, res, next) => {
    
    try {
        const {userName, password} = req.body;
        const [user] = await pool.execute(getUserLoginQuery() , [userName, password]); 
        if (!user.length) return res.json({message: "Incorrect password or username", redirect: false});
        const jwtToken = await getJwt({...user});
        return res.json({message: "User logged in", user: user, token: jwtToken, redirect: true});  
    } catch {
        return res.json("some error")
    }
}) 


module.exports = router;


function getUserLoginQuery() {
    return "SELECT * FROM myholidays.users WHERE user_name = ? AND password = ?";
}


function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error");
            resolve(token);
        })
    })
}