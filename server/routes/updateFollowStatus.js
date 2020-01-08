const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const verifyToken = require('../auth/verifyToken');

router.use('/', verifyToken);

router.post('/', async (req , res, next)=> {
     try {
        const {holidayId} = req.body;
        const { id } = req.decoded[0];
        const holiday = await isHolidayExist(holidayId);
        if (!holiday) return res.json("Holiday does not exist..");
        const holidayFollowed = await isFollowed(id, holidayId);
        if (!holidayFollowed) {
            const result = await followHoliday(id, holidayId);
            //if result succes retrun true => update redux. 
            const [data] = await pool.execute(getHolidaysQuery(), [id]);
            return res.json({holidays: data})  
        }  
        if (holidayFollowed) {
            const result = await unFollowed(holidayFollowed);
            //const {affectedRows} = result;
            const [data] = await pool.execute(getHolidaysQuery(), [id]);
            return res.json({holidays: data})
        }
    } catch {
        return res.json("something went wrong..")
    }
})

module.exports = router;


async function isFollowed(id, holidayId) {
    const [result] = await pool.execute(isFollowedQuery(), [id, holidayId]);
    const [first] = result;
    return first;
}

async function isHolidayExist(holiday_id) {
    const [result] = await pool.execute(isHolidayExistQuery(), [holiday_id]);
    const [first] = result;
    return first;
}

async function unFollowed(holidayFollowed) {
    //console.log("toremove", holidayFollowed);
    const { user_id, holiday_id } = holidayFollowed;
    const [result] = await pool.execute(deleteFollowedHolidayQuery(), [user_id, holiday_id]);
    return result;
}

async function followHoliday(id, holiday_id) {
    console.log("to add", id, holiday_id)
    const [result] = await pool.execute(addFollowHolidayQuery(), [id, holiday_id]);
    return result;
}

function isFollowedQuery() {
    return 'SELECT * FROM myholidays.followed_holidays WHERE user_id = ? AND holiday_id = ?';
}

function isHolidayExistQuery() {
    return 'SELECT * FROM myholidays.holidays WHERE id = ?';
}

function deleteFollowedHolidayQuery() {
    return 'DELETE FROM myholidays.followed_holidays WHERE user_id = ? AND holiday_id = ?';
}

function addFollowHolidayQuery() {
    return "INSERT INTO `myholidays`.`followed_holidays` (`user_id`, `holiday_id`) VALUES (?, ?)";
}

function getHolidaysQuery() {
    return "SELECT myholidays.holidays.id, myholidays.holidays.destination, DATE_FORMAT(myholidays.holidays.from,'%d/%m/%Y') as 'from', DATE_FORMAT(myholidays.holidays.to,'%d/%m/%Y') as 'to', myholidays.holidays.price, myholidays.holidays.picture, myholidays.holidays.followers, myholidays.followed_holidays.user_id  FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id and (myholidays.followed_holidays.user_id = null OR myholidays.followed_holidays.user_id = ?) ORDER BY holiday_id DESC";
}
