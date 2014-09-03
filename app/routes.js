module.exports = function(app, model, controller) {

// static routes ===================
  app.route('/')
  	.get( controller.static_pages.index )
  	.post(function(req, res) { res.send('hi this is a post to /'); });

// MERCHANTS ======================
  // RESTful API ==================
  app.route('/merchants')
    .get(function(req, res) { controller.merchant.index(req, res, model); })
   	.post(function(req, res) { controller.merchant.create(req, res, model); })

   app.route('/merchants/:id([0-9]+)')
   	.get(function(req, res) { controller.merchant.show(req, res, model); })
   	.put(function(req, res) { controller.merchant.update(req, res, model) })
   	.delete(function(req, res) { controller.merchant.destroy(req, res, model) });

  app.route('/merchants/new')
  	.get(function(req, res) { controller.merchant.new(req, res); });

   app.route('/merchants/:id([0-9]+)/edit')
   	.get(function(req, res) { controller.merchant.edit(req, res, model); });

};
