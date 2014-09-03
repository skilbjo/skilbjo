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
  var id = req.body.merchant_id;       //  || req.param('id');
  var name = req.body.merchant_name;   //  || req.param('name');
  console.log(req.body);

  model.merchant
  .create({ 
    MerchantId: id, 
    Name: name 
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
  // logic here to read the submitted form and update the DB
  
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

// DELETE, users/:id, destroy
exports.destroy = function (req, res, model) {
  model.merchant
  .destroy({ MerchantId: req.params.id } )
  .success(function() {
      res.json({ message: 'Deleted' });
  });

  //   .find({ where: { MerchantId: req.body.merchant_id } })
  // .on('success', function(m) {
  //   m.destroy({ where: { MerchantId: req.body.merchant_id } })
  //   .success(function() {
  //     console.log('deleted');
  //   });
  // });
};


/*

// DELETE, users/:id, destroy
exports.destroy = function (req, res, models) {
  var id = req.params.id;
    models.users.find({ _id : id}, function(err, user) {
      user.remove({ _id : id } );
      res.redirect('/?delete=true');   
  });
};

// not RESTful API
// GET, /users/:id/associate, associate
exports.associate = function (req, res, models) {
  var id = req.params.id;
  models.companies.find({}, function(err, companies) {
     res.render('user/associate', {
      user            : req.user,
      companies       : companies
     });   
  });
};

exports.logout = function (req, res) {
  req.logout;
  res.redirect('/?logout=true');
};
*/

// HTTP;  PATH;           METHOD;       DESCRIPTION
// GET    /users          index         list all users
// GET    /users/new      new           form to create new users
// POST   /users          create        process the new user form submission
// GET    /users/:id      show          show a user's profile
// GET    /users/:id/edit edit          form to edit user's profile
// PUT    /users/:id      update        process the user edit form submission
// DELETE /users/:id      destroy       deletes a user with :id