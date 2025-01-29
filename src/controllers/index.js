const { getHealth } = require('./health.controller');
const {
  userSignup,
  userSignin,
} = require('./auth.controller');
const {
  userProfile,
  updatePassword,
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
  },
  profileServices: {
    userProfile,
    updatePassword,
  },
  categoryServices: {
    createCategory,
    listCategories,
    getCategory,
    deleteCategory,
  },
};
