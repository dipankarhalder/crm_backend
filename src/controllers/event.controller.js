const { StatusCodes } = require('http-status-codes');
const Consumer = require('../models/consumer.model');
const Event = require('../models/event.model');
const { msg } = require('../constant');
const { verifyToken, sendErrorResponse } = require('../utils');

/* create event */
const createEvent = async (req, res) => {
  try {
    const decoded = await verifyToken(req, res);
    if (!decoded) return;

    const { eventName, totalAmount, initialPaid, consumerId } = req.body;
    const findConsumer = await Consumer.findById(consumerId).select('-address');
    if (!findConsumer) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        message: 'Consumer not found.',
      });
    }

    const newEvent = new Event({
      eventName,
      totalAmount,
      initialPaid,
      consumerId,
      consumer: { ...findConsumer.toObject() },
    });

    await newEvent.save();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      event: newEvent,
      message: msg.categoryMsg.newCategoryCreated,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* list of event */
const getAllEvents = async (req, res) => {
  try {
    const decoded = await verifyToken(req, res);
    if (!decoded) return;

    const allEvents = await Event.find();
    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      event: allEvents,
      message: msg.categoryMsg.newCategoryCreated,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

/* get event */
const getEvent = async (req, res) => {
  try {
    const decoded = await verifyToken(req, res);
    if (!decoded) return;

    const consumerId = req.params.id;
    const eventItem = await Event.find({ consumerId });
    if (!eventItem) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: StatusCodes.NOT_FOUND,
        message: 'Event not found for this consumer.',
      });
    }

    return res.status(StatusCodes.OK).json({
      status: StatusCodes.OK,
      event: eventItem,
      message: msg.categoryMsg.newCategoryCreated,
    });
  } catch (error) {
    return sendErrorResponse(res, error);
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEvent,
};
