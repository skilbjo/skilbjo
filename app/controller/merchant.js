// GET, /merchants, index
exports.index = function(req, res, models) {
  res.send('hi');
  // models.merchants.find( {} , function(err, merchants) {
  //   res.json(merchants);
  // });
};
/*
// GET, /users/news, new
exports.new = function(req, res, models) {
  var id = req.user._id;
  models.users.find( { _id : id } , function(err, users) {
    var user = users[0];
    res.render('user/addinfo', {
      user      : user,
      message   : req.flash('signupMessage')
    });
  });
};

// POST, /users, create
exports.create = function(req, res, models) { 
  var id = req.user._id;
  models.users.find({ _id : id }, function(err, users) {
    if (!users.length) {
      res.send('User with an id of ' + id + ' not found.');
      return;
    }

    var user = users[0]; // mongo returns an array of the objects
    user.info.firstName     = req.body.firstname;
    user.info.lastName      = req.body.lastname;
    user.info.mobileNo      = req.body.mobile;
    user.info.streetAddress = req.body.street;
    user.info.cityAddress   = req.body.city;
    user.info.stateAddress  = req.body.state;
    user.save();

    res.redirect('/users/' + req.user._id);   
  });
};

// GET, /users/:id, show
exports.show = function (req, res, models) {
  var id = req.params.id;
  var user = req.user;

  if (!user.info.firstName) {
    res.redirect('/users/new');
    return;
  }
  models.users.find( {} , function(req, users) { 
    var users = users;
    models.companies.find( {} , function (req, companies) {
      res.render('user/profile', {       // this doesn't work
        user          : user,
        users         : users,
        companies     : companies
      });
    });
  });
};

// GET, users/:id/edit, edit
exports.edit = function (req, res) {
  res.render('user/edit', { user : req.params.id });
};

// PUT, users/:id, update
exports.update = function (req, res, models) {
  var id = req.params.id;
  models.users.find({ _id : id }, function(err, users) {
    if (!users.length) {
      res.send('User with an id of ' + id + ' not found.');
      return;
    }

    var user = users[0]; // mongo returns an array of the objects
    user.info.firstName     = req.body.firstname;
    user.info.lastName      = req.body.lastname;
    user.info.mobileNo      = req.body.mobile;
    user.info.streetAddress = req.body.street;
    user.info.cityAddress   = req.body.city;
    user.info.stateAddress  = req.body.state;
    user.save();

    res.redirect('/users/' + req.user._id);   
  });
};

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

// POST, /users/:id/associate/:companyId, associatePost
exports.associatePost = function (req, res, models) {
  var userId    = req.params.id;
  var companyId = req.params.companyId;  // is ok if null?

  console.log(companyId);

  if (companyId === undefined) { // did the user create a new business, if so, logic here
    var Company = models.companies;
    console.log(Company);

    var newCompany            = new Company();
    newCompany.name           = req.body.companyname;
    newCompany.email          = req.body.companyemail;
    newCompany.phoneNumber    = req.body.companymobile;
    newCompany.streetAddress  = req.body.companystreet;
    newCompany.cityAddress    = req.body.companycity;
    newCompany.stateAddress   = req.body.companystate;
    newCompany.users          = userId;

    console.log(newCompany);

    newCompany.save();

    models.users.find({ _id : userId }, function(err, users) {
      var user = users[0]; // mongo returns an array of the objects
      user.company     = 1;
      user.save(); 
    });
    // res.redirect('/users/' + req.user._id + '?associated=success');  
  }

};

exports.unlinkLocal = function (req, res) {
  var user            = req.user;
  user.local.email    = undefined;
  user.local.password = undefined;
  user.save();
  res.redirect('/users/' + req.user._id);
};

exports.unlinkFacebook = function (req, res) {
  var user            = req.user;
  user.facebook.token = undefined;
  user.save();
  res.redirect('/users/' + req.user._id);
};

exports.unlinkTwitter = function (req, res) {
  var user            = req.user;
  user.twitter.token = undefined;
  user.save();
  res.redirect('/users/' + req.user._id);
};

exports.unlinkGoogle = function (req, res) {
  var user            = req.user;
  user.google.token = undefined;
  user.save();
  res.redirect('/users/' + req.user._id);
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