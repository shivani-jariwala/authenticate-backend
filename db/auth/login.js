const pool = require('../../database');
const logger = require('../../log');

exports.findUserByPhone = (phone) => {
    logger.debug({phone}, '[db/auth/login.js] [findUserByPhone] ');
    const query = `SELECT id, password, phone_no FROM users WHERE phone_no = ?;`;
    return pool.query(query, [phone])
};

exports.updateTokenForUser = (token, phone) => {
    logger.debug({phone, token}, '[db/auth/login.js] [updateTokenForUser] ');
    const query = `UPDATE users SET token = ? WHERE phone_no = ?;`;
    return pool.query(query, [token, phone])
};

exports.createUser = (name, email, password, phone, spam=0) => {
    logger.debug({phone}, '[db/auth/login.js] [findUserByPhone] ');
    logger.debug({name, email, password, phone, spam}, '[auth/db/login.js] [createUser] ');
    const query = `INSERT INTO users (name, password, phone_no, email_id, spam_count) VALUES (?,?,?,?,?);`;
    return pool.query(query, [name, password, phone, email, spam])
};