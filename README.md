##TXN

###Dev Startup

```
nf start -x 8080 -e lib/env/dev.env
```


###What

Messing around with various APIs (Stripe), technologies (AJAX calls w/ client side jQuery), and monitoring and analytics platforms.

For example, wouldn't it be cool if you set an SMS alert to notify you when there's a new craigslist post on super hard-to-find apartments in SF?

Or if you receive a payment on Stripe, send a Twitter message saying `#WINRAR` ?


###Integration list

- Stripe: [API](https://stripe.com/docs/api/node), [library](https://www.npmjs.org/package/stripe)
- Twitter: [API](https://dev.twitter.com/docs/api/1.1), [library](https://www.npmjs.org/package/twit)
- NewRelic: [library](https://www.npmjs.org/package/newrelic)
- Google Analytics: [docs](https://developers.google.com/analytics/devguides/)

###Stack

- Javascript library:			[jQuery](http://api.jquery.com/)
- Templating engine:			[handlebars.js](http://handlebarsjs.com/)
- MVC framework:				[express](http://expressjs.com/api.html)
- Server side language:			[node.js](http://nodejs.org/api/)
- Object-relational mapping: 	[sequlize.js](https://github.com/sequelize/sequelize/wiki/API-Reference)
- Database:  					[PostgreSQL](http://www.postgresql.org/docs/9.3/static/index.html)

###Install

Clone the repository

	$ git clone https://github.com/skilbjo/txn.git
	
Install modules and dependencies
	
	$ npm install
	
Add secret API keys from the super secret email
	
	$ vim .env
	
Configure the database (assuming `postgres` is running at `/usr/local/var/postgres`)

	$ postgres -D /usr/local/var/postgres
	
Ensure the following returns a list of dbs: 

	$ psql
	
	> skilbjo=# \list
	
Configuration is now done... time to run the app :D

	$ node server.js
	
Then view the app your browser:  `http://localhost:8080`

###Deploy

```
git commit -am 'heroku' && git push && git push heroku master

heroku ps

heroku logs -t

heroku open
```

###Follow Up

- Switch to jade for templating
- Twilio API
- Paypal API
- Write tests (make tests, Makefile)
- Use Flash messages

###Useful tricks

If for some reason you get something like this:

```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: listen EADDRINUSE
```

there are likely two `node` servers running. Close a terminal window and start again. But in case that doesn't work... `$ killall node`


Another issue gets you this error:
```
events.js:72
        throw er; // Unhandled 'error' event
              ^
Error: failed to connect to [localhost:27017]
```

Just run this: `$ postgres -D /usr/local/var/postgres --fork` or `$ postgres -D /usr/local/var/postgres` to start the database (and to kill the database process, run `$ killall postgres`)