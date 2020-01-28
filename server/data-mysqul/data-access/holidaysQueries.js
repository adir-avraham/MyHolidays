
function getHolidaysQuery() {
    return `select id, destination, DATE_FORMAT(start_date, "%Y-%d-%m") AS start_date, DATE_FORMAT(end_date, "%Y-%d-%m")
    AS end_date, price, picture , followers, user_id 
    FROM (SELECT myholidays.holidays.id, myholidays.holidays.destination, myholidays.holidays.start_date,
    myholidays.holidays.end_date, myholidays.holidays.price, myholidays.holidays.picture, myholidays.followed_holidays.user_id
    FROM myholidays.holidays LEFT JOIN myholidays.followed_holidays
    ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id 
    AND (myholidays.followed_holidays.user_id = null or myholidays.followed_holidays.user_id = ?)) as table1
    LEFT JOIN    
    (SELECT holiday_id ,COUNT(holiday_id) AS followers
    FROM followed_holidays
    GROUP BY holiday_id) as table2 on table1.id = table2.holiday_id`;
};

function insertHolidayQuery() {
    return "INSERT INTO `myholidays`.`holidays` (`destination`, `start_date`, `end_date`, `price`, `picture`) VALUES (?,?,?,?,?)"; 
}
function deleteHolidayQuery() {
    return "DELETE FROM `myholidays`.`holidays` WHERE (`myholidays`.`holidays`.`id` = ?)";
}

function isFollowedQuery() {
    return 'SELECT * FROM myholidays.followed_holidays WHERE holiday_id = ?';
}

function deleteFollowedHolidayQuery() {
    return "DELETE FROM `myholidays`.`followed_holidays` WHERE (`myholidays`.`followed_holidays`.`holiday_id` = ?)";
}

function followersReportQuery () {
    return `SELECT myholidays.holidays.destination ,COUNT(holiday_id) AS sum_of_followers 
    FROM myholidays.holidays JOIN followed_holidays 
    ON myholidays.holidays.id = myholidays.followed_holidays.holiday_id 
    GROUP BY holiday_id ORDER BY sum_of_followers ASC`;
}

function isHolidayExistQuery() {
    return 'SELECT * FROM myholidays.holidays WHERE id = ?';
}


function isFollowedByUserQuery() {
    return 'SELECT * FROM myholidays.followed_holidays WHERE user_id = ? AND holiday_id = ?';
}

function deleteFollowedHolidayByUserQuery() {
    return 'DELETE FROM myholidays.followed_holidays WHERE user_id = ? AND holiday_id = ?';
}

function addFollowHolidayQuery() {
    return "INSERT INTO `myholidays`.`followed_holidays` (`user_id`, `holiday_id`) VALUES (?, ?)";
}

function updateHolidayQuery() {
    return "UPDATE `myholidays`.`holidays` SET `destination` = ?, `start_date` = ?, `end_date` = ?, `price` = ?, `picture` = ? WHERE (`id` = ?)";
}


module.exports = { getHolidaysQuery, insertHolidayQuery, deleteHolidayQuery,
     isFollowedQuery, deleteFollowedHolidayQuery, followersReportQuery,
     isHolidayExistQuery, isFollowedByUserQuery, deleteFollowedHolidayByUserQuery,
     addFollowHolidayQuery, updateHolidayQuery };