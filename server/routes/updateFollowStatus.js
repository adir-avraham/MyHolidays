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

            return res.json(result)  
        }  
        if (holidayFollowed) {
            const result = await unFollowed(holidayFollowed);
            const {affectedRows} = result;
            if (affectedRows > 0) return res.json("unfollowed success");
            return res.json(affectedRows)
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


