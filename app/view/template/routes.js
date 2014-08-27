module.exports = function(app) {

// static routes ===============================================================
  app.get('/', controllers.static_pages.index);

// MERCHANTS ======================
  // RESTful API ======================
  app.get('/merchants', function(req, res) { controllers.merchants.index(req, res, models); });
};
