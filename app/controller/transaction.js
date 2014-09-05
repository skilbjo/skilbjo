// GET, /transactions, index
exports.index = function(req, res, model) {
  console.log('index');
  model.transaction.findAll().success(function(transactions) {
    res.json(transactions);
  });
};

// GET, /transactions/new, new
exports.new = function(req, res) {
  res.render('transaction/new');
};

// POST, /transactions, create
exports.create = function(req, res, model, stripe) {
  var token = req.body.stripe_token;   //  || req.param('id'); // this is correct

  model.transaction
  .create({ 
    Amount: 1.00 
  })
  .complete(function(err, transaction) {
    if(err || !transaction) {
      res.json(err); return;
    } else {
      res.json(transaction);
    }
};


  // model.transaction
  // .create({ 
  //   MerchantId: id, 
  //   Name: name 
  // })
  // .complete(function(err, merchant) {
  //   if(err || !merchant) {
  //     res.json(err); return;
  //   } else {
  //     res.json(merchant);
  //   }


/*
https://stripe.com/docs/api/node

  stripe.charges.create({
  amount: 400,
  currency: "usd",
  card: "tok_2xMip06Pyco4ZO", // obtained with Stripe.js
  metadata: {'order_id': '6735'}
});

*/

// GET, /transactions/:id, show
// exports.show = function(req, res, model) {
//   model.merchant
//   .find({ where: { MerchantId: req.params.id } })
//   .complete(function(err, merchant) {
//     if(err || !merchant) {
//       res.json(err); return;
//     } else {
//       res.json(merchant);
// //     }
// //   });
// // };  

// // GET, /transactions/:id/edit
// exports.edit = function(req, res, model) {
//   model.merchant
//   .find({ where: { MerchantId: req.params.id } })
//   .complete(function(err, merchant) {
//     if(err || !merchant) {
//       res.json(err); return;
//     } else {
//       console.log(merchant.Name);
//       res.render('merchant/edit', { 
//         merchantId: merchant.MerchantId,
//         merchantName: merchant.Name
//       });
//     }
//   });
// };

// // PUT, /transactions/:id, update
// exports.update = function(req, res, model) {
//   model.merchant
//   .find({ where: { MerchantId: req.body.merchant_id } })
//   .complete(function(err, merchant) {
//     if(err || !merchant) {
//       res.json(err); return;
//     } else {
//       merchant.set('Name', req.body.merchant_name);
//       merchant.save();
//       res.json(merchant);
//     }
//   });
// };

// // DELETE, /transactions/:id, destroy
// exports.destroy = function (req, res, model) {
//   model.merchant
//   .destroy({ MerchantId: req.params.id } )
//   .success(function() {
//       res.json({ message: 'Deleted' });
//   });
// };


// HTTP;  PATH;           METHOD;       DESCRIPTION
// GET    /users          index         list all users
// GET    /users/new      new           form to create new users
// POST   /users          create        process the new user form submission
// GET    /users/:id      show          show a user's profile
// GET    /users/:id/edit edit          form to edit user's profile
// PUT    /users/:id      update        process the user edit form submission
// DELETE /users/:id      destroy       deletes a user with :id