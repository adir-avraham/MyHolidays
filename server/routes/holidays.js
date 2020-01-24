const exprees = require('express');
const router = exprees.Router();
const pool = require('../db/pool');
const verifyToken = require('../auth/verifyToken');

router.use(verifyToken);

router.post('/', async (req, res, next) => {

    try{
        const { id } = req.decoded[0];
        const [result] = await pool.execute(getHolidaysQuery(), [id]);
        return res.json({holidays: result, status: true});
    } catch {
        return res.json("some error");
    }
});


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


module.exports = router;