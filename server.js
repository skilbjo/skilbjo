// server.js

// set up ======================================================================
var 
    http            = require('http'),
    flash           = require('connect-flash'),
    express         = require('express'),
    app             = express(),
    morgan          = require('morgan'),
    favicon         = require('serve-favicon'),
    cookieParser    = require('cookie-parser'),
    methodOverride  = require('method-override'),
    session         = require('express-session'),
    errorHandler    = require('errorhandler'),
    bodyParser      = require('body-parser'),
    router          = express.Router(),
    hbs  	          = require('hbs'),
    Sequelize       = require('sequelize'),
    configDB        = require('./config/database.js'),
    env             = (process.env.NODE_ENV || 'development');

// configuration ===============================================================
app.set('port', process.env.PORT || 8080);
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(cookieParser());
app.use(methodOverride());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(errorHandler());
app.use(morgan('dev'));
app.use('/public', express.static('public'));
app.use(flash());

var sequelize = new Sequelize(configDB.url, {
  host: 'localhost',
  port: '5432',
  dialect: 'postgres'
});

// handlebars engine for templating :-}
app.set('view engine', 'hbs');
app.set('views', __dirname + '/app/views');

// register handlebars helpers =================================================
hbs.handlebars === require('handlebars');
hbs.registerPartials(__dirname + '/app/views/templates');
hbs.registerHelper('compare', function (lvalue, operator, rvalue, options) {
    var operators, result;
    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }
    operators = {
        '=='    : function (l, r) { return l == r; },
        '==='   : function (l, r) { return l === r; },
        '!='    : function (l, r) { return l != r; },
        '!=='   : function (l, r) { return l !== r; },
        '<'     : function (l, r) { return l < r; },
        '>'     : function (l, r) { return l > r; },
        '<='    : function (l, r) { return l <= r; },
        '>='    : function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };
    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }
    result = operators[operator](lvalue, rvalue);
    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});

// routes ======================================================================
// models =============
var model = {
  merchant       : require('./app/model/merchant.js')
};

// controllers ========
var controller = {
  static_pages  : require('./app/controller/static_pages.js'),
  merchant      : require('./app/controller/merchant.js')
};


require('./app/routes.js')(app, model, controller);
// require('./config/passport')(passport); // pass passport for configuration

// launch ===========
app.listen(app.get('port'), function(){
  console.log('The magic happens on port ' + app.get('port'));
});

