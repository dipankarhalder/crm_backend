const allRouters = {
  /* base route */
  base: '/api',
  v1Base: '/v1',

  /* health check */
  health: '/health',

  /* auth */
  signup: '/auth/signup',
  signin: '/auth/signin',
  signout: '/auth/signout',

  /* profile */
  getProfile: '/profile/me',
  updatePassword: '/profile/update-password',
  updateAddress: '/profile/update-address',

  /* consumers */
  newConsumer: '/consumer/new',
  listConsumers: '/consumer/list',
  ConsumerItem: '/consumer/:id',

  /* catagories */
  newCategory: '/category/new',
  listCategory: '/category/list',
  categoryItem: '/category/:id',
};

module.exports = {
  allRouters,
};
