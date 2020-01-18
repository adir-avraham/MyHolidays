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
    return "SELECT myholidays.holidays.id, myholidays.holidays.destination, DATE_FORMAT(myholidays.holidays.from,'%d/%m/%Y') as 'from', DATE_FORMAT(myholidays.holidays.to,'%d/%m/%Y') as 'to', myholidays.holidays.price, myholidays.holidays.picture, myholidays.holidays.followers, myholidays.followed_holidays.user_id  FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id and (myholidays.followed_holidays.user_id = null OR myholidays.followed_holidays.user_id = ?) ORDER BY holiday_id DESC";
}

function deleteFollowedHolidayQuery() {
    return "DELETE FROM `myholidays`.`followed_holidays` WHERE (`myholidays`.`followed_holidays`.`holiday_id` = ?)";
}