const pool = require('../../db/pool');
const holidaysQueries = require('../data-access/holidaysQueries');
const moment = require('moment');

async function getHolidays(id) {
    const { getHolidaysQuery } = holidaysQueries;
    const [result] = await pool.execute(getHolidaysQuery(), [id]);
    return result;
}

async function createHoliday (payload) {
    const { insertHolidayQuery } = holidaysQueries;
    const { destination, start_date, end_date, price, picture } = payload;
    const result = await pool.execute(insertHolidayQuery(), [destination, start_date, end_date, price, picture]);
    return result;
}

async function isFollowed(holidayId) {
    const { isFollowedQuery } = holidaysQueries;
    const [result] = await pool.execute(isFollowedQuery(), [holidayId]);
    const [first] = result;
    return first;
}

async function deleteHoliday(holidayId) {
    const { deleteHolidayQuery } = holidaysQueries;
    const [result] = await pool.execute(deleteHolidayQuery(), [holidayId]);
    return result;
}

async function deleteFollowedHoliday(holidayId) {
    const { deleteFollowedHolidayQuery } = holidaysQueries;
    const [result] = await pool.execute(deleteFollowedHolidayQuery(), [holidayId]);
    return result;
}

async function followersReport() {
    const { followersReportQuery } = holidaysQueries;
    const [result] = await pool.execute(followersReportQuery());
    return result;
}

async function isHolidayExist(holiday_id) {
    const { isHolidayExistQuery } = holidaysQueries;
    const [result] = await pool.execute(isHolidayExistQuery(), [holiday_id]);
    const [first] = result;
    return first;
}

async function isFollowedByUser(id, holidayId) {
    const { isFollowedByUserQuery } = holidaysQueries;
    const [result] = await pool.execute(isFollowedByUserQuery(), [id, holidayId]);
    const [first] = result;
    return first;
}

async function followHoliday(id, holiday_id) {
    const { addFollowHolidayQuery } = holidaysQueries;
    const [result] = await pool.execute(addFollowHolidayQuery(), [id, holiday_id]);
    return result;
}

async function unFollowed(holidayFollowed) {
    const { deleteFollowedHolidayByUserQuery } = holidaysQueries;
    const { user_id, holiday_id } = holidayFollowed;
    const [result] = await pool.execute(deleteFollowedHolidayByUserQuery(), [user_id, holiday_id]);
    return result;
}

async function updateHoliday(payload) {
    const { destination, start_date, end_date, price, picture, id } = payload;
    const { updateHolidayQuery } = holidaysQueries;
    const [result] = await pool.execute(updateHolidayQuery(), [destination, start_date, end_date, price, picture, id])      
    return result;
}

module.exports = { getHolidays, createHoliday, isFollowed, deleteHoliday, deleteFollowedHoliday,
    followersReport, isHolidayExist, isFollowedByUser, followHoliday, unFollowed, updateHoliday };