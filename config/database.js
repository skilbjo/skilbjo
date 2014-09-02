var auth = require('./auth.js');

module.exports =  {
	'url': 'postgres://'+ 
			auth.username +'@' + auth.host + ':' + 
			auth.hostport +'/' + auth.database,
	'host': auth.host,
	'DBport': auth.DBport,
	'database': auth.database,
	'username': auth.username,
	'password': auth.password,
	'dialect': auth.dialect
};