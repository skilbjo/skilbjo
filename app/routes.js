var db = require('./model')

module.exports = function(app, model, controller) {

// static routes ===============================================================
  // app.get('/', controller.static_pages.index);
  app.route('/')
  	.get( controller.static_pages.index )
  	.post(function(req, res) { res.send('hi this is a post to /'); });

// MERCHANTS ======================
  // RESTful API ======================
  app.get('/merchants', function(req, res) { controller.merchant.index(req, res, model, app, db); }); 

};
