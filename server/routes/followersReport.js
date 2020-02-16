const exprees = require('express');
const router = exprees.Router();
const verifyToken = require('../auth/verifyToken');
const verifyAdminRole = require('../auth/verifyAdminRole');
const holidays = require('../data-mysqul/data-providers/holidays');


router.use(verifyToken);
router.use(verifyAdminRole);

router.post('/', async (req, res) => {

    try{
        const { followersReport } = holidays; 
        const result = await followersReport();
        res.json({report: result, status: true});
    } catch {
        res.json({error: "error from report", status: false});
    };
});


module.exports = router;