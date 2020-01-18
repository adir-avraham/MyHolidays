const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');
const updateHolidayValidation = require('../validations/updateHolidayValidation');



router.use(verifyToken);
router.use(verifyAdminRole);
router.use(updateHolidayValidation);

router.put('/', async (req, res)=>{

    try{
        const { destination, from, to, price, picture, id } = req.body;
        console.log("from update", req.body)
        const [result] = await pool.execute(updateHolidayQuery(), [destination, from, to, price, picture, id])      
        const affectedRows = result.affectedRows;
        if (affectedRows > 0) {
            const [data] = await pool.execute(getHolidaysQuery(), [id]); 
            return res.json({ message: "holiday updated!!", status: true, affectedRows: affectedRows, holidays: data });
        } 
        return res.json({ message: "Updated holiday failed", status: false }); 
    } catch {
        return res.json({ message: "Some error from update holiday", status: false }); 
    }
})


module.exports = router;


function updateHolidayQuery() {
    return "UPDATE `myholidays`.`holidays` SET `destination` = ?, `from` = ?, `to` = ?, `price` = ?, `picture` = ? WHERE (`id` = ?)";
}

function getHolidaysQuery() {
    return "SELECT myholidays.holidays.id, myholidays.holidays.destination, DATE_FORMAT(myholidays.holidays.from,'%d/%m/%Y') as 'from', DATE_FORMAT(myholidays.holidays.to,'%d/%m/%Y') as 'to', myholidays.holidays.price, myholidays.holidays.picture, myholidays.holidays.followers, myholidays.followed_holidays.user_id  FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id and (myholidays.followed_holidays.user_id = null OR myholidays.followed_holidays.user_id = ?) ORDER BY holiday_id DESC";
}