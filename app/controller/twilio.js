var 
  twilio = require('twilio')(process.env.TWILIO_LIVE_ACCOUNT_SID, process.env.TWILIO_LIVE_AUTH_TOKEN);

// GET, /twitter, index
exports.index = function(req, res, model) {
  res.render('twilio/index');
};

// POST, /twilio/sms, sms
exports.sms = function(req, res) {
  twilio.messages.create({
    body: req.body.sms_message,
    to: req.body.sms_number,
    from: process.env.TWILIO_LIVE_NUMBER
  }, function(err, message) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        "sid": message.sid
        , "date": message.date_created
        , "to": message.to
        , "from": message.from
        , "message": message.body
        , "status": message.status
        , "direction": message.direction
      });
    }
  });
};