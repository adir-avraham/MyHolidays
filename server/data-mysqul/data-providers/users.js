const pool = require('../../db/pool');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const usersQueries = require('../data-access/usersQueries');


async function getUserSalt(userName) {
    try {
        const { getUserSaltQuery } = usersQueries
        const [result] = await pool.execute(getUserSaltQuery(), [userName]);
        const [first] = result 
        return first.salt;
    } catch {
        res.json("some error from salt");
        return;
    };
}; 

async function getUserLogin(userName, password) {
    try {
        const { getUserLoginQuery } = usersQueries
        const [user] = await pool.execute(getUserLoginQuery() , [userName, password]); 
        return user;
    } catch {
        res.json("error from user login");
        return; 
    };
}; 

function getJwt(p) {
    return new Promise((resolve, reject) => {
        jwt.sign(p, process.env.SECRET, { expiresIn: '3h' }, (err, token) => {
            if (err) reject("error");
            resolve(token);
        })
    });
};

async function isUserExist(userName) {
    try{
        const { isUserExistQuery } = usersQueries;
        const [result] = await pool.execute(isUserExistQuery(), [userName]);
        const [firstUser] = result;
        return firstUser;
    } catch {
        res.json("some error from user exsit");
        return; 
    };
};

async function saveUser(payload) {
    try{
        const { firstName, lastName, userName, password } = payload;
        const salt = bcrypt.genSaltSync(10);
        const { insertNewUserQuery } = usersQueries;
        const result = await pool.execute(insertNewUserQuery(), [firstName, lastName, userName, bcrypt.hashSync(password, salt), salt]);
        return result;
    } catch {
        res.json("some error from save user");
        return; 
    };
};

module.exports = { getUserSalt, getUserLogin, getJwt, isUserExist, saveUser }