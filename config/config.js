/*var auth = require('./auth.js') || {};*/

module.exports =  {
	'url': process.env.DATABASE_URL
	, 'host' 			: (process.env.HOST 		/*|| auth.host*/)
	, 'db_port'		: (process.env.DB_PORT 	/*|| auth.db_port*/)
	, 'db_host'		: (process.env.DB_HOST 	/*|| auth.db_host*/)
	, 'username' 	: (process.env.USERNAME /*|| auth.username*/)
	, 'password'	: (process.env.PASSWORD /*|| auth.password*/)
	, 'dialect'		: ('postgres' 	/*|| auth.dialect*/)
	, 'stripe' 		: (process.env.STRIPE_TEST_SECRET /*|| auth.stripeTestSecret*/)
};