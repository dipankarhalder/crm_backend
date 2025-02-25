const express = require('express');
const router = express.Router();

const { routers } = require('../../constant');
const {
  healthServices,
  authServices,
  profileServices,
  categoryServices,
  consumerServices,
  transactionServices,
  eventServices,
} = require('../../controllers');
const verifyAuthToken = require('../../middleware/verifyAuthToken');

/* health check */
router.get(routers.allRouters.health, healthServices.getHealth);

/* authentication */
router.post(routers.allRouters.signup, authServices.userSignup);
router.post(routers.allRouters.signin, authServices.userSignin);
router.post(routers.allRouters.signout, authServices.userLogout);

/* profile */
router.get(
  routers.allRouters.getProfile,
  verifyAuthToken,
  profileServices.userProfile,
);
router.get(
  routers.allRouters.getColProfile,
  verifyAuthToken,
  profileServices.userProfileList,
);
router.patch(
  routers.allRouters.updatePassword,
  verifyAuthToken,
  profileServices.updatePassword,
);
router.patch(
  routers.allRouters.updateAddress,
  verifyAuthToken,
  profileServices.updateAddress,
);

/* consumers */
router.post(
  routers.allRouters.newConsumer,
  verifyAuthToken,
  consumerServices.createConsumer,
);
router.get(
  routers.allRouters.listConsumers,
  verifyAuthToken,
  consumerServices.listConsumers,
);
router.get(
  routers.allRouters.consumerItem,
  verifyAuthToken,
  consumerServices.getConsumer,
);
router.delete(
  routers.allRouters.consumerItem,
  verifyAuthToken,
  consumerServices.deleteConsumer,
);

/* catagories */
router.post(
  routers.allRouters.newCategory,
  verifyAuthToken,
  categoryServices.createCategory,
);
router.get(
  routers.allRouters.listCategory,
  verifyAuthToken,
  categoryServices.listCategories,
);
router.get(
  routers.allRouters.categoryItem,
  verifyAuthToken,
  categoryServices.getCategory,
);
router.delete(
  routers.allRouters.categoryItem,
  verifyAuthToken,
  categoryServices.deleteCategory,
);

/* transaction */
router.post(
  routers.allRouters.newTransaction,
  verifyAuthToken,
  transactionServices.createTransaction,
);
router.get(
  routers.allRouters.listTransactions,
  verifyAuthToken,
  transactionServices.getAllTransaction,
);
router.get(
  routers.allRouters.transactionItem,
  verifyAuthToken,
  transactionServices.getTransaction,
);

/* event */
router.post(
  routers.allRouters.newEvent,
  verifyAuthToken,
  eventServices.createEvent,
);
router.get(
  routers.allRouters.listEvents,
  verifyAuthToken,
  eventServices.getAllEvents,
);
router.get(
  routers.allRouters.eventItem,
  verifyAuthToken,
  eventServices.getEvent,
);

module.exports = {
  v1Routes: router,
};
