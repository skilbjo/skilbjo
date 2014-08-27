var auth = require('./auth.js');

module.exports =  {
	'url': 'postgres://'+ auth.username +'@localhost:8080/mpr'
};