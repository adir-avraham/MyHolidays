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
        const { destination, start_date, end_date, price, picture, id } = req.body;
        console.log("up", req.body)
        const [result] = await pool.execute(updateHolidayQuery(), [destination, start_date, end_date, price, picture, id])      
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
    return "UPDATE `myholidays`.`holidays` SET `destination` = ?, `start_date` = ?, `end_date` = ?, `price` = ?, `picture` = ? WHERE (`id` = ?)";
}

function getHolidaysQuery() {
        return `select id, destination, start_date, end_date, price, picture , followers, user_id FROM 
    (SELECT myholidays.holidays.id, myholidays.holidays.destination, myholidays.holidays.start_date,
    myholidays.holidays.end_date, myholidays.holidays.price, myholidays.holidays.picture, myholidays.followed_holidays.user_id
    FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays
    ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id 
    AND (myholidays.followed_holidays.user_id = null OR myholidays.followed_holidays.user_id = ?)) as table1
    LEFT JOIN    
    (SELECT holiday_id ,COUNT(holiday_id) AS followers
    FROM followed_holidays
    GROUP BY holiday_id) as table2 on table1.id = table2.holiday_id`;
}