var auth = require('./auth.js');

module.exports =  {
	'url': 'postgres://'+ 
			auth.username +'@' + auth.host + ':' + 
			auth.hostport +'/mpr',
	'host': auth.host,
	'DBport': auth.DBport		
};