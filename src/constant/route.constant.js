const allRouters = {
  /* base route */
  base: '/api',
  v1Base: '/v1',

  /* health check */
  health: '/health',

  /* auth */
  signup: '/auth/signup',
  signin: '/auth/signin',

  /* profile */
  getProfile: '/profile/me',
  updatePassword: '/profile/update-password',

  /* catagories */
  newCategory: '/category/new',
  listCategory: '/category/list',
  categoryItem: '/category/:id',
};

module.exports = {
  allRouters,
};
