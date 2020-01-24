const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const holidayValidation = require('../validations/holidayValidation');
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');



router.use(verifyToken);
router.use(verifyAdminRole);
router.use(holidayValidation);

router.post('/', async (req, res, next) => {

    try{
    const insertId = await createHoliday(req.body);
    console.log(insertId);
    if (insertId) return res.json({message: "Holiday created successfully", redirect: true, holidayId: insertId })
    return res.json({message: "Create holiday error..", redirect: false})
} catch {
    return res.json("some error from post create holiday");
}
})

module.exports = router;

async function createHoliday (payload) {
    const { destination, start_date, end_date, price, picture } = payload;
    const result = await pool.execute(insertHolidayQuery(), [destination, start_date, end_date, price, picture]);
    return result;
}


function insertHolidayQuery() {
    return "INSERT INTO `myholidays`.`holidays` (`destination`, `start_date`, `end_date`, `price`, `picture`) VALUES (?,?,?,?,?)"; 
}


