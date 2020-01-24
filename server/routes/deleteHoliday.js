const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');



router.use(verifyToken);
router.use(verifyAdminRole);

router.post('/', async (req, res, next)=> {

    try {
    const { holidayId } = req.body;
    if (!holidayId) return res.json({ message: "Holiday not found", status: false }); 
    const holidayFollowed = await isFollowed(holidayId);
    
    if (!holidayFollowed) {       
        const [result] = await pool.execute(deleteHolidayQuery(), [holidayId]);
        const affectedRows = result.affectedRows;
        if (affectedRows > 0) {
            const [data] = await pool.execute(getHolidaysQuery(), [holidayId]); 
            return res.json({ message: "holiday deleted!!", status: true, affectedRows: affectedRows, holidays: data });
        } 
        return res.json({ message: "No deleted holiday", status: false }); 
    }  

    if (holidayFollowed) {
        const [result] = await pool.execute(deleteFollowedHolidayQuery(), [holidayId]);
        const affectedRows = result.affectedRows;
        if (affectedRows > 0) {
            const [result] = await pool.execute(deleteHolidayQuery(), [holidayId]);
            const affectedRows = result.affectedRows;
            if (affectedRows > 0) {
                const [data] = await pool.execute(getHolidaysQuery(), [holidayId]); 
                return res.json({ message: "holiday deleted!!", status: true, affectedRows: affectedRows, holidays: data });
            } 
            return res.json({ message: "No deleted holiday", status: false }); 
        }
    }
    } catch {
    return res.json({ message: "some error from delete", status: false }); 
    }

})


module.exports = router;

async function isFollowed(holidayId) {
    const [result] = await pool.execute(isFollowedQuery(), [holidayId]);
    const [first] = result;
    return first;
}


function deleteHolidayQuery() {
    return "DELETE FROM `myholidays`.`holidays` WHERE (`myholidays`.`holidays`.`id` = ?)";
}

function isFollowedQuery() {
    return 'SELECT * FROM myholidays.followed_holidays WHERE holiday_id = ?';
}

function getHolidaysQuery() {
    return `select id, destination, start_date, end_date, price, picture , followers, user_id from 
    (SELECT myholidays.holidays.id, myholidays.holidays.destination, myholidays.holidays.start_date,
    myholidays.holidays.end_date, myholidays.holidays.price, myholidays.holidays.picture, myholidays.followed_holidays.user_id
    FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays
    ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id 
    AND (myholidays.followed_holidays.user_id = null or myholidays.followed_holidays.user_id = ?)) as table1
    LEFT JOIN    
    (SELECT holiday_id ,COUNT(holiday_id) AS followers
    FROM followed_holidays
    GROUP BY holiday_id) as table2 on table1.id = table2.holiday_id`;
}

function deleteFollowedHolidayQuery() {
    return "DELETE FROM `myholidays`.`followed_holidays` WHERE (`myholidays`.`followed_holidays`.`holiday_id` = ?)";
}