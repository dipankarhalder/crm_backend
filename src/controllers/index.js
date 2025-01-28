const { getHealth } = require('./health.controller');
const {
  userSignup,
  userSignin,
  userProfile,
  updatePassword,
} = require('./auth.controller');
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
