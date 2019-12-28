const exprees = require('express');
const router = exprees.Router();
const pool = require('../db/pool');


router.get('/', async (req, res, next) => {

    try{
        const [result] = await pool.execute(getHolidaysQuery());
        return res.json(result);
    } catch {
        return res.json("some error");
    }
})


function getHolidaysQuery() {
    return "SELECT myholidays.holidays.id, myholidays.holidays.destination, DATE_FORMAT(myholidays.holidays.from,'%d/%m/%Y') as 'from', DATE_FORMAT(myholidays.holidays.to,'%d/%m/%Y') as 'to', myholidays.holidays.price, myholidays.holidays.picture, myholidays.holidays.follow FROM myholidays.holidays";
}


module.exports = router;