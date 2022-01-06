const authRoute = require('./auth');
const categoryRoute = require('./category');

function route(app) {
  app.use('/api/auth', authRoute);
  app.use('/api/categories', categoryRoute);
}

module.exports = route;
