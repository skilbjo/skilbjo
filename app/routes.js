module.exports = function(app
	, model
	, controller
	, stripe
	) {

// static routes ===================
  app.route('/')
  	.get( controller.static_pages.index )
  	.post(function(req, res) { res.send('hi this is a post to /'); });

// MERCHANTS ======================
  // RESTful API ==================
  app.route('/merchants')
    .get(function(req, res) { controller.merchant.index(req, res, model); })
   	.post(function(req, res) { controller.merchant.create(req, res, model); });

   app.route('/merchants/:id([0-9]+)')
   	.get(function(req, res) { controller.merchant.show(req, res, model); })
   	.put(function(req, res) { controller.merchant.update(req, res, model); })
   	.delete(function(req, res) { controller.merchant.destroy(req, res, model); });

  app.route('/merchants/new')
  	.get(function(req, res) { controller.merchant.new(req, res); });

   app.route('/merchants/:id([0-9]+)/edit')
   	.get(function(req, res) { controller.merchant.edit(req, res, model); });

// TRANSACTIONS ======================
  // RESTful API ==================
  app.route('/transactions')
    .get(function(req, res) { controller.transaction.index(req, res, model); })
   	.post(function(req, res) { controller.transaction.create(req, res, model, stripe); });

   app.route('/transactions/:id([0-9]+)')
   	.get(function(req, res) { controller.transaction.show(req, res, model); })
   	.put(function(req, res) { res.json({ message: 'Sorry, no update path'}); })
   	.delete(function(req, res) { controller.transaction.destroy(req, res, model); });

  app.route('/transactions/new')
  	.get(function(req, res) { controller.transaction.new(req, res); });

   app.route('/transactions/:id([0-9]+)/edit')
   	.get(function(req, res) { res.json({ message: 'Sorry, no edit path.'}); });
};
