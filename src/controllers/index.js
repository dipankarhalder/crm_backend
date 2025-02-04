const { getHealth } = require('./health.controller');
const { userSignup, userSignin, userLogout } = require('./auth.controller');
const { userProfile, userProfileList, updatePassword, updateAddress } = require('./profile.controller');
const { createCategory, getCategory, listCategories, deleteCategory } = require('./category.controller');

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
};
