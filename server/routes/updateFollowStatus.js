const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/verifyToken');
const verifyUserRole = require('../auth/verifyUserRole');
const holidays = require('../data-mysqul/data-providers/holidays');


router.use('/', verifyToken);
router.use(verifyUserRole);

router.post('/', async (req , res)=> {

    try {
        const { isHolidayExist, isFollowedByUser, followHoliday, getHolidays, unFollowed } = holidays; 
        const {holidayId} = req.body;
        const { id } = req.decoded[0];
        const holiday = await isHolidayExist(holidayId);
        if (!holiday) return res.json("Holiday does not exist..");
        const holidayFollowed = await isFollowedByUser(id, holidayId);
        if (!holidayFollowed) {
            const result = await followHoliday(id, holidayId);
            const data = await getHolidays(id);
            res.json({holidays: data});
        }  
        if (holidayFollowed) {
            const result = await unFollowed(holidayFollowed);
            const data = await getHolidays(id);
            res.json({holidays: data});
        }
        } catch {
            res.json({error: "something went wrong..", status: false});
    };
});


module.exports = router;