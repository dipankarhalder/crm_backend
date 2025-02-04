const express = require('express');
const router = express.Router();

const { routers } = require('../../constant');
const {
  healthServices,
  authServices,
  profileServices,
  categoryServices,
  consumerServices,
} = require('../../controllers');

/* health check */
router.get(routers.allRouters.health, healthServices.getHealth);

/* authentication */
router.post(routers.allRouters.signup, authServices.userSignup);
router.post(routers.allRouters.signin, authServices.userSignin);
router.post(routers.allRouters.signout, authServices.userLogout);

/* profile */
router.get(routers.allRouters.getProfile, profileServices.userProfile);
router.get(routers.allRouters.getColProfile, profileServices.userProfileList);
router.patch(routers.allRouters.updatePassword, profileServices.updatePassword);
router.patch(routers.allRouters.updateAddress, profileServices.updateAddress);

/* consumers */
router.post(routers.allRouters.newConsumer, consumerServices.createConsumer);
router.get(routers.allRouters.listConsumers, consumerServices.listConsumers);
router.get(routers.allRouters.consumerItem, consumerServices.getConsumer);
router.delete(routers.allRouters.consumerItem, consumerServices.deleteConsumer);

/* catagories */
router.post(routers.allRouters.newCategory, categoryServices.createCategory);
router.get(routers.allRouters.listCategory, categoryServices.listCategories);
router.get(routers.allRouters.categoryItem, categoryServices.getCategory);
router.delete(routers.allRouters.categoryItem, categoryServices.deleteCategory);

module.exports = {
  v1Routes: router,
};
