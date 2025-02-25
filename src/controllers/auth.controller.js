const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const { envConfig } = require('../config');
const { msg } = require('../constant');
const { authValidate } = require('../validation');
const { validateFields, sendErrorResponse } = require('../utils');

/* user signup */
const userSignup = async (req, res) => {
  try {
    const { error, value } = authValidate.userInfoSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return validateFields(
        res,
        error.details.map((detail) => detail.message).join(', '),
      );
    }

    const { email, password, name, phone, role } = value;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return validateFields(res, msg.userMsg.emailAlreadyExist);
    }

    const user = new User({
      email,
      password,
      name,
      phone,
      role,
    });
    await user.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.userMsg.newUserCreated,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* user signin */
const userSignin = async (req, res) => {
  try {
    const { error, value } = authValidate.userLoginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return validateFields(
        res,
        error.details.map((detail) => detail.message).join(', '),
      );
    }

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) {
      return validateFields(res, msg.userMsg.existUserEmail);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return validateFields(res, msg.userMsg.userWrongPassword);
    }

    const token = user.generateAuthToken();
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: envConfig.NODEENV,
      maxAge: envConfig.EXPTIME,
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      token: token,
      message: msg.userMsg.userLoginSuccessfully,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* user signin */
const userLogout = async (req, res) => {
  try {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: envConfig.NODEENV,
      sameSite: 'Strict',
    });

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.userMsg.userLogoutSuccessfully,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

module.exports = {
  userSignup,
  userSignin,
  userLogout,
};
