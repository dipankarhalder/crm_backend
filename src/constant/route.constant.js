const endPoints = {
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
  getProfileLists: '/profile',
  updatePassword: '/profile/update-password',
  updateAddress: '/profile/update-profile',

  /* consumers */
  newConsumer: '/consumer/new',
  listConsumers: '/consumer/list',
  consumerItem: '/consumer/:id',

  /* catagories */
  newCategory: '/category/new',
  listCategory: '/category/list',
  categoryItem: '/category/:id',

  /* event */
  newEvent: '/event/new',
  listEvents: '/event/list',
  eventItem: '/event/:id',

  /* transaction */
  newTransaction: '/transaction/new',
  listTransactions: '/transaction/list',
  transactionItem: '/transaction/:id',
};

module.exports = {
  endPoints,
};
