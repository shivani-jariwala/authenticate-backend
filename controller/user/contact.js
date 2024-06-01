const logger = require("../../log");
const authDb = require("../../db/auth/login");
const db = require("../../db/user/contact");
const errors = require('../../helpers/error');

exports.markUserSpam = async (req, res) => {
  try {
    const phone_no = req.params.phone_no;
    const [result] = await authDb.findUserByPhone(phone_no);
    logger.debug({result}, '[auth/controller/login.js] [markUserSpam]');
    if (result.length === 0){
        await authDb.createUser('anonymous', null, 'anonymous', phone_no, 1);
    } else {
      if(result[0].phone_no == req.user.phone_no){
        throw new Error('You Cannot mark yourself spam');
      } 
      await db.incrementSpamCount(phone_no);
    }
    return res
      .status(errors.OK)
      .json({
        message: "success",
        description : `You have Spammed the user with phone no ${req.params.phone_no}`,
      });
  } catch (err) {
    logger.error({err}, '[auth/controller/login.js] [err] [login]');
    res
      .status(errors.INTERNAL_SERVER_ERROR)
      .json(errors.randomError(err.message));
  }
};

exports.searchUser = async (req, res) => {
  try {
    const {key} = req.query;
    const [result] = await db.searchUser(key);
      return res
      .status(errors.OK)
      .json({
        message: "success",
        data : result.length ? result : [],
      });
  } catch (err) {
    logger.error({err}, '[auth/controller/login.js] [err] [login]');
    res
      .status(errors.INTERNAL_SERVER_ERROR)
      .json(errors.randomError(err.message));
  }
};

