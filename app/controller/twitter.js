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

  console.log(JSON.stringify(tweets));

  var listTweets = function(err, tweets) {
    for (var i = 0; i < Object.keys(tweets).length; i++) {
      console.log('Tweet #%s: ' +tweets[i].text, i+1);
    };
  }

  listTweets(err, tweets);


  // var arr = [];

  // var listTweets = function(err, arr, list) {
  //   for (var i = 0; i < Object.keys(tweets).length; i++) {
  //     arr.push('Tweet #%s: ' +list[i].text, i+1);
  //   }
  // };
  // listTweets(err, arr, tweets);

  // console.log(arr);


    // console.log(tweets[0].text);
    // console.log('-----');

    // res.json(tweets[0]);
    // var arr = [];

    // // var listTweets = function( arr ) {
    // //   arr.map( function(tweet) { return arr.push(tweet.text); });
    // // };

    // // listTweets(arr);

    // // console.log(arr);
    // var listTweets(arr) {
    //   for (i = 0; i <= 3; i++) {
    //     result.push(arr[i].text);
    //   };
    // };

    // res.json(listTweets())

    // function event() {
    //   res.json(listTweets(arr));
    // };
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
