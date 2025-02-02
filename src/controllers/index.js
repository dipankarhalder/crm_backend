const { getHealth } = require('./health.controller');
const {
  userSignup,
  userSignin,
  userLogout,
} = require('./auth.controller');
const {
  userProfile,
  updatePassword,
  updateAddress,
} = require('./profile.controller');
const {
  createCategory,
  getCategory,
  listCategories,
  deleteCategory,
} = require('./category.controller');

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
