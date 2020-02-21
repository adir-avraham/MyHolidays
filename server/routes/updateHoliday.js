const express = require('express');
const router = express.Router();
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');
const updateHolidayValidation = require('../validations/updateHolidayValidation');
const holidays = require('../data-mysqul/data-providers/holidays');


router.use(verifyToken);
router.use(verifyAdminRole);
router.use(updateHolidayValidation);

router.put('/', async (req, res)=>{

    try{
        const { id } = req.body;
        const { updateHoliday, getHolidays } = holidays;
        const result = await updateHoliday(req.body);      
        const affectedRows = result.affectedRows;
        if (affectedRows > 0) {
            const data = await getHolidays(id); 
            return res.json({ message: "holiday updated!!", status: true, affectedRows: affectedRows, holidays: data });
        };
        res.json({ message: "Updated holiday failed", status: false }); 
    } catch {
        res.json({ message: "Some error from update holiday", status: false }); 
    };
});


module.exports = router;