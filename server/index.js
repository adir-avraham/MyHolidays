// General / Packages
const express = require('express');
const app = express();
require('dotenv').config();
const checkEnvParams = require('./utils/checkEnvParams');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const verifyToken = require('./auth/verifyToken');
const login = require('./auth/login');
const register = require('./auth/register');
const holidays = require('./routes/holidays');
const updateFollowStatus = require('./routes/updateFollowStatus');
const createHoliday = require('./routes/createHoliday');
const deleteHoliday = require('./routes/deleteHoliday');
const updateHoliday = require('./routes/updateHoliday');
const followersReport = require('./routes/followersReport');

checkEnvParams(["PORT", "HOST", "DB_PORT", "PASSWORD", "DATABASE"]);



app.use(cors());
app.use(bodyParser.json());


app.use('/verifyToken',verifyToken, (req, res) =>{
    console.log(req.decoded[0])
    const { first_name, role } = req.decoded[0];
    res.json({status: "ok", firstName: first_name, role: role })
});



app.use('/login', login);
app.use('/register', register);
app.use('/holidays', holidays);
app.use('/updateFollowStatus', updateFollowStatus);
app.use('/createHoliday', createHoliday);
app.use('/deleteHoliday1', deleteHoliday);
app.use('/updateHoliday', updateHoliday);
app.use('/followersReport', followersReport);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`)
})