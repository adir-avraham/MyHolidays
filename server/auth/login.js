const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 


router.post('/', async (req, res, next) => {
    
    try {
        const {userName, password} = req.body;
        if (!userName || !password) return res.json({message: "missing password or username", redirect: false});
        const salt = await getUserSalt(userName);
        if (!salt) return res.json({message: "somethins is wrong..", redirect: false});
        const [user] = await pool.execute(getUserLoginQuery() , [userName, bcrypt.hashSync(password, salt)]); 
        if (user.length === 0) return res.json({message: "Incorrect password or username", redirect: false});
        const jwtToken = await getJwt({...user});
        return res.json({message: "User logged in", user: user, token: jwtToken, redirect: true});  
    } catch {
        return res.json("some error from main post")
    }
}) 


module.exports = router;

async function getUserSalt(userName) {
    try {
        const [result] = await pool.execute(getUserSaltQuery(), [userName]);
        const [first] = result 
        return first.salt;
    } catch {
        return res.json("some error from salt")
    }
} 


function getUserLoginQuery() {
    return "SELECT * FROM myholidays.users WHERE user_name = ? AND password = ?";
}

function getUserSaltQuery() {
    return "SELECT myholidays.users.salt FROM myholidays.users WHERE user_name = ?";
}

function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject("error");
            resolve(token);
        })
    })
}