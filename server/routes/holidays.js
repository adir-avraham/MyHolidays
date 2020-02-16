const exprees = require('express');
const router = exprees.Router();
const verifyToken = require('../auth/verifyToken');
const holidays = require('../data-mysqul/data-providers/holidays');



router.use(verifyToken);

router.post('/', async (req, res) => {

    try{
        const { getHolidays } = holidays;
        const { id } = req.decoded[0];
        const result = await getHolidays(id);  
        res.json({holidays: result, status: true});
    } catch {
        res.json({error :"some error from get holidays", status: false});
    };
});


module.exports = router;