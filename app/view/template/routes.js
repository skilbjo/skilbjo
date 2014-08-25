module.exports = function(app, passport, models, controllers) {

// static routes ===============================================================
  app.get('/', controllers.static_pages.index);

// MERCHANTS ======================
  // RESTful API ======================
  app.get('/merchants', function(req, res) { controllers.merchants.index(req, res, models); }); //index method (path is /users) is made available only for admin users and is in hbs view logic

  // app.get('/users/new', isLoggedIn, function(req, res) { controllers.users.new(req, res, models); });

  // app.post('/users', isLoggedIn,    function(req, res) { controllers.users.create(req, res, models); } ); // add in the additional fields

  // app.get('/users/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.show(req, res, models); });

  // app.get('/users/:id/edit', controllers.users.edit );

  // app.post('/users/:id([0-9]+)', isLoggedIn, function(req, res) { controllers.users.update(req, res, models); });

  //app.delete('/users/:id', users.destroy) destroy will not be made available from the application


