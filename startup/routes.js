module.exports = app => {
  app.use('/pages', require('../routes/pages'));
  app.use('/api/genres/', require('../routes/genres'));
  app.use('/api/customers', require('../routes/customers'));
  app.use('/api/movies', require('../routes/movies'));
  app.use('/api/users', require('../routes/users'));
  app.use('/api/auth', require('../routes/auth'));
  app.set('view engine', 'pug');
  app.set('views', '../views');
};
