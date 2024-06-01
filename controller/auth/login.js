const {generateAuthToken} = require("../../helpers/auth");
const logger = require("../../log");
const db = require("../../db/auth/login");
const errors = require('../../helpers/error');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.login = async (req, res) => {
  try {
    const { phone_no, password } = req.body;
    //incomplete body request
    if (!Object.keys(req.body).length || !phone_no || !password)
      return res.status(errors.BAD_REQUEST).json({
        errorMessage: "Email/Phone Number is missing",
        message: "failure",
      });
    const [result] = await db.findUserByPhone(phone_no);
    logger.debug({result}, '[auth/controller/login.js] [login]');
    if (result.length === 0)
      return res.status(errors.CONFLICT).json({
        errorMessage: "User not found",
        message: "failure",
      });
    //compare passwords using bcrypt, but here not signing in so not using bcrypt
    let passwordMatched = await bcrypt.compare(password, result[0].password)
    if (!passwordMatched) return res.status(errors.FORBIDDEN).json({
        errorMessage: `Incorrect Password`,
        message: 'failure',
      });
    const token = generateAuthToken(
      result[0].id,
      result[0].phone_no
    );
    await db.updateTokenForUser(token, phone_no);
    return res
      .set({
        Authorization: token,
        "Access-Control-Expose-Headers": "Authorization",
      })
      .status(errors.OK)
      .json({
        message: "success",
        token: token,
      });
  } catch (err) {
    logger.error({err}, '[auth/controller/login.js] [err] [login]');
    res
      .status(errors.INTERNAL_SERVER_ERROR)
      .json(errors.randomError(err.message));
  }
};

exports.signUp = async (req, res) => {
  try {
    const { email, password, name, phone_no } = req.body;
    //incomplete body request
    if (!Object.keys(req.body).length || !email || !password || !phone_no || !name)
      return res.status(errors.BAD_REQUEST).json({
        errorMessage: "Email/Password/Name/Phone Number not found",
        message: "failure",
      });
    const [result] = await db.findUserByPhone(phone_no);
    logger.debug({result}, '[auth/controller/login.js] [signUp]');
    if (result.length)
      return res.status(errors.CONFLICT).json({
        errorMessage: "Phone number already in use",
        message: "failure",
      });
    //hash password
    const hash = await bcrypt.hash(password, saltRounds);
    await db.createUser(name, email, hash, phone_no);
    return res
      .status(errors.OK)
      .json({
        message: "success"
      });
  } catch (err) {
    logger.error({err}, '[auth/controller/login.js] [err] [login]');
    res
      .status(errors.INTERNAL_SERVER_ERROR)
      .json(errors.randomError(err.message));
  }
};
