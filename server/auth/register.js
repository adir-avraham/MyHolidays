const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const bcrypt = require('bcryptjs'); 
const registerValidation = require('../validations/registerValidation');


router.use(registerValidation);

router.post('/', async (req, res, next) => {
    
    try{
        const { userName } = req.body;
        const user = await isUserExist(userName);
        if (user) return res.json({message: "User already exist", redirect: false})
        const insertId = await saveUser(req.body);
        console.log(insertId)
        if (insertId) return res.json({message: "Registration completed successfully", redirect: true, userId: insertId })
        return res.json({message: "Register error!", redirect: false})
    } catch {
        return res.json("some error from post register");
    }
})



module.exports = router;


async function isUserExist(userName) {
    try{
        const [result] = await pool.execute(isUserExistQuery(), [userName]);
        const [firstUser] = result;
        return firstUser;
    } catch {
        return res.json("some error from user exsit");
    }
}

function isUserExistQuery() {
    return "SELECT * FROM myholidays.users WHERE user_name = ?";
}

async function saveUser(payload) {
    try{
        const { firstName, lastName, userName, password } = payload;
        const salt = bcrypt.genSaltSync(10);
        const result = await pool.execute(insertNewUserQuery(), [firstName, lastName, userName, bcrypt.hashSync(password, salt), salt])
        console.log(result)
        return result;
    } catch {
        return res.json("some error from save user");
    }
}

function insertNewUserQuery() {
    return "INSERT INTO `myholidays`.`users` (`first_name`, `last_name`, `user_name`, `password`, `salt`) VALUES (?,?,?,?,?)";
}