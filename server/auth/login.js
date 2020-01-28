const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const users = require('../data-mysqul/data-providers/users');


router.post('/', async (req, res) => {
    
    try {
        const { getUserSalt, getUserLogin, getJwt, isUserExist } = users;
        const {userName, password} = req.body;
        if (!userName || !password) return res.json({message: "missing password or username", status: false});
        const isUser = await isUserExist(userName);
        if (!isUser) return res.json({message: "Incorrect password or username", status: false}); 
        const salt = await getUserSalt(userName);
        if (!salt) return res.json({message: "somethins is wrong..", status: false});
        const user = await getUserLogin(userName, bcrypt.hashSync(password, salt)); 
        if (user.length === 0) return res.json({message: "Incorrect password or username", status: false});
        const jwtToken = await getJwt({...user});
        res.json({message: "User logged in", user: user, token: jwtToken, status: true});  
        return; 
    } catch {
        res.json({error: "some error from login", status: false});
        return; 
    }
}) 


module.exports = router;



