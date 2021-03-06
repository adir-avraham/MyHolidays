const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');
const holidays = require('../data-mysqul/data-providers/holidays');



router.use(verifyToken);
router.use(verifyAdminRole);

router.post('/', async (req, res)=> {

    try {
    const { isFollowed, deleteHoliday, getHolidays, deleteFollowedHoliday } = holidays;
    const { holidayId } = req.body;
    if (!holidayId) return res.json({ message: "Holiday not found", status: false }); 
    const holidayFollowed = await isFollowed(holidayId);
    
    if (!holidayFollowed) {       
        const result = await deleteHoliday(holidayId);
        const affectedRows = result.affectedRows;
        if (affectedRows > 0) {
            const data = await getHolidays(holidayId); 
            return res.json({ message: "holiday deleted!!", status: true, affectedRows: affectedRows, holidays: data });
        } 
        res.json({ message: "No deleted holiday", status: false }); 
    }  

    if (holidayFollowed) {
        const result = await deleteFollowedHoliday(holidayId);
        const affectedRows = result.affectedRows;
        if (affectedRows > 0) {
            const result = await deleteHoliday(holidayId);
            const affectedRows = result.affectedRows;
            if (affectedRows > 0) {
                const data = await getHolidays(holidayId); 
                return res.json({ message: "holiday deleted!!", status: true, affectedRows: affectedRows, holidays: data });
            }; 
            res.json({ message: "No deleted holiday", status: false }); 
        };
    };
    } catch {
        res.json({ error: "some error from delete", status: false }); 
    };

});


module.exports = router;