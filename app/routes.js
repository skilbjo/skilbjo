module.exports = function(app, model, controller) {

// static routes ===================
  app.route('/')
  	.get( controller.static_pages.index )
  	.post(function(req, res) { res.send('hi this is a post to /'); });

// MERCHANTS ======================
  // RESTful API ==================
  app.route('/merchants')
    .get(function(req, res) { controller.merchant.index(req, res, model); })
    .post(function(req, res) { res.send('post to /merchants'); } );

   app.route('/merchants/:id')
   	.get(function(req, res) { controller.merchant.show(req, res, model); })
   	.post(function(req, res) { controller.merchant.create(req, res, model); })
   	.put(function(req, res) { res.send('put to /merchants ' + req.params.id ); })
   	.delete(function(req, res) { res.send('delete to /merchants ' + req.params.id ); });

};
