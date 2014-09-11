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
  T.get('statuses/user_timeline', { screen_name: req.body.user, count: 20, include_rts: false }, function(err, tweets, response) {

  var arr = []; var listTweetText = function(err, tweets) {
    for (var i = 0; i < Object.keys(tweets).length; i++) { arr.push(tweets[i].text, i); }
  }; listTweetText(err, tweets);

  res.json(arr);
  });
};

// POST, /twitter/topic, topic
exports.topic = function(req, res) {
  T.get('search/tweets', { q: req.body.topic, count: 2 }, function(err, tweets, response) {

  var arr = []; var listTweetText = function(err, tweets) {
    for (var i = 0; i < Object.keys(tweets).length; i++) { arr.push(tweets.statuses[i].text, i); }
  }; listTweetText(err, tweets);

  res.json(arr);
  });
};

exports.streamOn = function(req, res) {
  var stream = T.stream('statuses/filter', { track: req.body.stream, language: 'en' });
  var toggle = req.body.toggle;

  var streamOn = function() { 
    stream.on('tweet', function(tweet) { 
      console.log(tweet.text); 
    });
  };

  var streamOff = function() {
    stream.stop();
  };

  if (toggle) {
    res.json({ message: 'Check the server side console for streaming tweets on ' + req.body.stream });
    streamOn();
  } 
  // else { 
  //   res.json({ message: 'Turn that noise off!' });
  //   streamOff(); 
  // }

};

