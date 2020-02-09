const express = require('express');
const router = express.Router();
const holidayValidation = require('../validations/holidayValidation');
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');
const holidays = require('../data-mysqul/data-providers/holidays');


router.use(verifyToken);
router.use(verifyAdminRole);
router.use(holidayValidation);

router.post('/', async (req, res) => {

    try{
        const { createHoliday } = holidays;
        const insertId = await createHoliday(req.body);
        if (insertId) return res.json({message: "Holiday created successfully", status: true, holidayId: insertId });
        res.json({message: "Create holiday error..", status: false}); 
        return; 
        } catch {
        res.json({ error: "some error from post create holiday", status: false});
        return; 
    };
});


module.exports = router;