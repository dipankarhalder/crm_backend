const { StatusCodes } = require('http-status-codes');
const User = require('../models/user.model');
const Consumer = require('../models/consumer.model');
const { msg } = require('../constant');
const { consumerValidate } = require('../validation');
const { verifyToken, validateFields, sendErrorResponse, notFoundItem } = require('../utils');

/* create consumer */
const createConsumer = async (req, res) => {
  try {
    const decoded = await verifyToken(req, res);
    if (!decoded) return;

    const { error, value } = consumerValidate.consumerInfoSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return validateFields(res, error.details.map((detail) => detail.message).join(', '));
    }

    const { name, email, phone, area, landmark, city, state, pincode } = value;
    const existingConsumer = await Consumer.findOne({
      email,
    });
    if (existingConsumer) {
      return validateFields(res, msg.consumerMsg.consumerAlreadyExist);
    }

    const user = await User.findById(decoded.userid).select('-password');
    const newConsumer = new Consumer({
      name,
      email,
      phone,
      address: {
        area,
        landmark,
        city,
        state,
        pincode,
      },
      user,
    });

    await newConsumer.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      category: newConsumer,
      message: msg.consumerMsg.newConsumerCreated,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* list of consumers */
const listConsumers = async (req, res) => {
  try {
    const consumers = await Consumer.find();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      list: consumers,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* get consumer */
const getConsumer = async (req, res) => {
  try {
    const consumerId = req.params.id;
    const consumerDetails = await Consumer.findById(consumerId);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      details: consumerDetails,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* delete consumer */
const deleteConsumer = async (req, res) => {
  try {
    const consumerId = req.params.id;
    const consumer = await Consumer.findById(consumerId);
    if (!consumer) {
      return notFoundItem(res, msg.consumerMsg.consumerNotFound);
    }
    await Consumer.findByIdAndDelete(consumerId);
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      message: msg.consumerMsg.consumerDeleted,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

module.exports = {
  createConsumer,
  listConsumers,
  getConsumer,
  deleteConsumer,
};
