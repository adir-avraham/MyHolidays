// General / Packages
const express = require('express');
const app = express();
require('dotenv').config();
const checkEnvParams = require('./utils/checkEnvParams');
const bodyParser = require('body-parser');
const cors = require('cors');

// Routes
const login = require('./auth/login');
const register = require('./auth/register');
const getHolidays = require('./routes/getHolidayes');
const updateFollowStatus = require('./routes/updateFollowStatus');
const createHoliday = require('./routes/createHoliday');

checkEnvParams(["PORT", "HOST", "DB_PORT", "PASSWORD", "DATABASE"]);



app.use(cors());
app.use(bodyParser.json());

app.use('/login', login);
app.use('/register', register);
app.use('/getHolidays', getHolidays);
app.use('/updateFollowStatus', updateFollowStatus);
app.use('/createHoliday', createHoliday);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port: ${process.env.PORT}`)
})