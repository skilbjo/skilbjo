// set up =====================
var 
    http            = require('http')
    , flash           = require('connect-flash')
    , express         = require('express')
    , app             = express()
    , morgan          = require('morgan')
    , favicon         = require('serve-favicon')
    , cookieParser    = require('cookie-parser')
    , methodOverride  = require('method-override')
    , session         = require('express-session')
    , errorHandler    = require('errorhandler')
    , bodyParser      = require('body-parser')
    , hbs  	          = require('hbs')
    , db              = require('./app/model/index.js')
    , config          = require('./config/config.js')
    , stripe          = require('stripe')(process.env.STRIPE_TEST_SECRET)
    , newrelic        = require('newrelic')
    , env             = (process.env.NODE_ENV || 'development');

// configuration ==============
  // boilerplate
app.use(cookieParser()); app.use(methodOverride()); app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); app.use(errorHandler()); app.use(morgan('dev'));  app.use(flash());

app.set('port', process.env.PORT || 8080);
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/public', express.static('public'));

// view template engine
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/view');

// models
app.set('models', require('./app/model'));

// handlebars helpers =========
hbs.handlebars = require('handlebars');  
hbs.registerPartials(__dirname + '/app/view/template');
hbs.registerHelper('compare', function (lvalue, operator, rvalue, options) {
    var operators, result;
    if (options === undefined) { options = rvalue; rvalue = operator; operator = "==="; }
    operators = {
        '=='    : function (l, r) { return l == r; }, '==='   : function (l, r) { return l === r; },
        '!='    : function (l, r) { return l != r; }, '!=='   : function (l, r) { return l !== r; },
        '<'     : function (l, r) { return l < r; }, '>'      : function (l, r) { return l > r; },
        '<='    : function (l, r) { return l <= r; }, '>='    : function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    if (!operators[operator]) { throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator); }
    result = operators[operator](lvalue, rvalue);
    if (result) { return options.fn(this); } else { return options.inverse(this); }
});

// MVC Definitions =============
// models =============
var model = {
  merchant      : app.get('models').Merchant,
  transaction   : app.get('models').Transaction
};

// controllers ========
var controller = {
  static_pages  : require('./app/controller/static_pages.js'),
  merchant      : require('./app/controller/merchant.js'),
  transaction   : require('./app/controller/transaction.js')
};

// routes =============
require('./app/routes.js')(app
  , model
  , controller
  , stripe
  );

// launch ===================
db.sequelize.sync({ force: true }).complete(function(err) {
  if (err) { throw err[0] ; } else {
    http.createServer(app).listen(app.get('port'), function(){ 
      console.log('The magic happens on port ' + app.get('port'));
    });
  }
});

