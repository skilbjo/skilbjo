// GET, /merchants, index
exports.index = function(req, res, model) {
  model.merchant.findAll().success(function(merchants) {
    res.json(merchants);
  });
};

// GET, /merchants/new, new
exports.new = function(req, res) {
  res.render('merchant/new');
};

// POST, /merchants, create
exports.create = function(req, res, model) {
  model.merchant
  .create({ 
    MerchantId: req.body.merchant_id, 
    Name: req.body.merchant_name 
  })
  .complete(function(err, merchant) {
    if(err || !merchant) {
      res.json(err); return;
    } else {
      res.json(merchant);
    }
  });
};

// GET, /merchants/:id, show
exports.show = function(req, res, model) {
  model.merchant
  .find({ where: { MerchantId: req.params.id } })
  .complete(function(err, merchant) {
    if(err || !merchant) {
      res.json(err); return;
    } else {
      res.json(merchant);
    }
  });
};  

// GET, /merchants/:id/edit
exports.edit = function(req, res, model) {
  model.merchant
  .find({ where: { MerchantId: req.params.id } })
  .complete(function(err, merchant) {
    if(err || !merchant) {
      res.json(err); return;
    } else {
      console.log(merchant.Name);
      res.render('merchant/edit', { 
        merchantId: merchant.MerchantId,
        merchantName: merchant.Name
      });
    }
  });
};

// PUT, /merchants/:id, update
exports.update = function(req, res, model) {
  model.merchant
  .find({ where: { MerchantId: req.body.merchant_id } })
  .complete(function(err, merchant) {
    if(err || !merchant) {
      res.json(err); return;
    } else {
      merchant.set('Name', req.body.merchant_name);
      merchant.save();
      res.json(merchant);
    }
  });
};

// DELETE, /users/:id, destroy
exports.destroy = function (req, res, model) {
  model.merchant
  .destroy({ MerchantId: req.params.id } )
  .success(function() {
      res.json({ message: 'Deleted' });
  });
};

// HTTP;  PATH;           METHOD;       DESCRIPTION
// GET    /users          index         list all users
// GET    /users/new      new           form to create new users
// POST   /users          create        process the new user form submission
// GET    /users/:id      show          show a user's profile
// GET    /users/:id/edit edit          form to edit user's profile
// PUT    /users/:id      update        process the user edit form submission
// DELETE /users/:id      destroy       deletes a user with :id