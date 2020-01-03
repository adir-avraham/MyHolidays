const exprees = require('express');
const router = exprees.Router();
const pool = require('../db/pool');
const verifyToken = require('../auth/verifyToken');

router.use('/', verifyToken);

router.post('/', async (req, res, next) => {

    try{
        const { id } = req.decoded[0];
        const [result] = await pool.execute(getHolidaysQuery(), [id]);
        console.log("check this=====>", result)
        return res.json(result);
    } catch {
        return res.json("some error");
    }
})


function getHolidaysQuery() {
    return "SELECT myholidays.holidays.id, myholidays.holidays.destination, DATE_FORMAT(myholidays.holidays.from,'%d/%m/%Y') as 'from', DATE_FORMAT(myholidays.holidays.to,'%d/%m/%Y') as 'to', myholidays.holidays.price, myholidays.holidays.picture, myholidays.holidays.followers, myholidays.followed_holidays.user_id  FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id and (myholidays.followed_holidays.user_id = null OR myholidays.followed_holidays.user_id = ?) ORDER BY holiday_id DESC";
}
// get all from singel table
// function getHolidaysQuery() {
//     return "SELECT myholidays.holidays.id, myholidays.holidays.destination, DATE_FORMAT(myholidays.holidays.from,'%d/%m/%Y') as 'from', DATE_FORMAT(myholidays.holidays.to,'%d/%m/%Y') as 'to', myholidays.holidays.price, myholidays.holidays.picture, myholidays.holidays.followers FROM myholidays.holidays";
// }
// jion and order by query
//    SELECT myholidays.holidays.id, myholidays.holidays.destination, DATE_FORMAT(myholidays.holidays.from,'%d/%m/%Y') as 'from', DATE_FORMAT(myholidays.holidays.to,'%d/%m/%Y') as 'to', myholidays.holidays.price, myholidays.holidays.picture, myholidays.holidays.followers, myholidays.followed_holidays.user_id  FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays
//    ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id and (myholidays.followed_holidays.user_id = null or myholidays.followed_holidays.user_id = 3)  ORDER BY holiday_id DESC;

module.exports = router;