const { getHealth } = require('./health.controller');
const { userSignup, userSignin, userLogout } = require('./auth.controller');
const { userProfile, userProfileList, updatePassword, updateAddress } = require('./profile.controller');
const { createCategory, getCategory, listCategories, deleteCategory } = require('./category.controller');
const { createConsumer, listConsumers, getConsumer, deleteConsumer } = require('./consumer.controller');
const { createTransaction, getAllTransaction, getTransaction } = require('./transaction.controller');
const { createEvent, getAllEvents, getEvent } = require('./event.controller');

module.exports = {
  healthServices: {
    getHealth,
  },
  authServices: {
    userSignup,
    userSignin,
    userLogout,
  },
  profileServices: {
    userProfile,
    userProfileList,
    updatePassword,
    updateAddress,
  },
  categoryServices: {
    createCategory,
    listCategories,
    getCategory,
    deleteCategory,
  },
  consumerServices: {
    createConsumer,
    listConsumers,
    getConsumer,
    deleteConsumer,
  },
  transactionServices: {
    createTransaction,
    getAllTransaction,
    getTransaction,
  },
  eventServices: {
    createEvent,
    getAllEvents,
    getEvent,
  },
};
