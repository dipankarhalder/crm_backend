const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const { msg } = require('../constant');
const { authValidate } = require('../validation');
const { validateFields, sendErrorResponse, notFoundItem } = require('../utils');

/* user profile */
const userProfile = async (req, res) => {
  try {
    const decoded = req.user;
    const user = await User.findById(decoded.userid).select('-password');
    if (!user) {
      return notFoundItem(res, msg.userMsg.userNotFound);
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: user,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* user profile list */
const userProfileList = async (req, res) => {
  try {
    const role = req.query.role;
    const userList =
      role === 'all'
        ? await User.find().select('-password').sort({ _id: -1 })
        : await User.find({ role }).select('-password').sort({ _id: -1 });
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      data: userList,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* update user password */
const updatePassword = async (req, res) => {
  try {
    const decoded = req.user;

    /* validate the password input fields */
    const { error, value } = authValidate.passwordSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return validateFields(res, error.details.map((detail) => detail.message).join(', '));
    }

    /* use the password info after validate it */
    const { oldPassword, newPassword } = value;
    const user = await User.findById(decoded.userid);
    if (!user) {
      return validateFields(res, msg.userMsg.userNotFound);
    }

    /* check if the old password matches */
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return validateFields(res, msg.userMsg.userWrongPassword);
    }

    /* update password */
    user.password = newPassword;
    await user.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.userMsg.updatedUserPassword,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* update user address */
const updateAddress = async (req, res) => {
  try {
    const decoded = req.user;

    /* user address request */
    const { name, phone, area, landmark, city, state, pincode } = req.body;
    const user = await User.findById(decoded.userid);
    if (!user) {
      return validateFields(res, msg.userMsg.userNotFound);
    }

    /* update address */
    if (name) user.name = name;
    if (phone) user.phone = phone;
    user.address = { area, landmark, city, state, pincode };
    await user.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.userMsg.updatedUserProfile,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

module.exports = {
  userProfile,
  userProfileList,
  updatePassword,
  updateAddress,
};
