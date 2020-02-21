require('dotenv').config();
const express = require('express');
const app = express();
const checkEnvParams = require('./utils/checkEnvParams');
const bodyParser = require('body-parser');
const cors = require('cors');

const verify = require('./auth/verify');
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


app.use('/verify',verify);
app.use('/login', login);
app.use('/register', register);
app.use('/holidays', holidays);
app.use('/updateFollowStatus', updateFollowStatus);
app.use('/createHoliday', createHoliday);
app.use('/deleteHoliday', deleteHoliday);
app.use('/updateHoliday', updateHoliday);
app.use('/followersReport', followersReport);


app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`)
})