const pool = require('../../database');
const logger = require('../../log');

exports.incrementSpamCount = (phone) => {
    logger.debug({phone}, '[db/user/contact.js] [incrementSpamCount] ');
    const query = `UPDATE users SET spam_count = spam_count + 1 WHERE phone_no = ?;`;
    return pool.query(query, [phone])
};

exports.searchUser = (key) => {
    logger.debug({key}, '[db/user/contact.js] [searchUser] ');
    const query = `SELECT name, phone_no from users WHERE (name regexp ? or phone_no regexp ?);`;
    return pool.query(query, [key, key])
};