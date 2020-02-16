const express = require('express');
const router = express.Router();
const registerValidation = require('../validations/registerValidation');
const users = require('../data-mysqul/data-providers/users');


router.use(registerValidation);

router.post('/', async (req, res) => {
    
    try{
        const { isUserExist, saveUser } = users;
        const { userName } = req.body;
        const user = await isUserExist(userName);
        if (user) return res.json({message: "User already exist, please choose a different user name", status: false});
        const insertId = await saveUser(req.body);
        if (insertId) return res.json({message: "Registration completed successfully, You can login now!", status: true, userId: insertId })
        res.json({message: "Register error!", status: false});
    } catch {
        res.json({error: "some error from post register", status: false});
    }
})


module.exports = router;