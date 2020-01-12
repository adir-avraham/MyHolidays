const exprees = require('express');
const router = exprees.Router();
const pool = require('../db/pool');
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');



router.use(verifyToken);
router.use(verifyAdminRole);

router.post('/', async (req, res) => {

    try{
        const [result] = await pool.execute(followersReportQuery());
        return res.json(result);
    } catch {
        return res.json("Some error from report");
    }
});


module.exports = router;


function followersReportQuery () {
    return "SELECT myholidays.holidays.destination ,COUNT(holiday_id) AS sum_of_followers FROM myholidays.holidays JOIN followed_holidays ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id GROUP BY holiday_id ORDER BY sum_of_followers ASC";
}