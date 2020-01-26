function getUserLoginQuery() {
    return "SELECT * FROM myholidays.users WHERE user_name = ? AND password = ?";
}

function getUserSaltQuery() {
    return "SELECT myholidays.users.salt FROM myholidays.users WHERE user_name = ?";
}

function isUserExistQuery() {
    return "SELECT * FROM myholidays.users WHERE user_name = ?";
}

function insertNewUserQuery() {
    return "INSERT INTO `myholidays`.`users` (`first_name`, `last_name`, `user_name`, `password`, `salt`) VALUES (?,?,?,?,?)";
}

module.exports = { getUserLoginQuery, getUserSaltQuery, isUserExistQuery, insertNewUserQuery };