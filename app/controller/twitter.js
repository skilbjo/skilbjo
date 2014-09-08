var  Twit   = require('twit')
    , T     = new Twit({
      consumer_key: process.env.TWITTER_API_KEY
      , consumer_secret: process.env.TWITTER_API_SECRET
      , access_token: process.env.TWITTER_ACCESS_TOKEN_KEY
      , access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET });

// GET, /twitter, index
exports.index = function(req, res, model) {
  res.render('twitter/index');
};

// POST, /twitter/search/user, user
exports.user = function(req, res) {
  T.get('statuses/user_timeline', { screen_name: req.body.user, count: 5, include_rts: false }, function(err, tweets, response) {
    console.log(tweets[0]);
    // console.log(tweets[0].text);
    var result = [];
    // for (i = 0; i <= 3; i++) {
      result.push(tweets[0].text);
    // };
    res.json(result);
  });
};

exports.topic = function(req, res) {
  T.get('search/tweets', { q: req.body.topic }, function(err, data, response) {
    res.json(data);
  });
};

exports.stream = function(req, res) {
  var stream = T.stream('statuses/filter', { track: req.body.stream, language: 'en' });

  res.json({ message: 'Check the server side console for streaming tweets on ' + req.body.stream });

  stream.on('tweet', function(tweet) {
    console.log(tweet.text);
  });
};
