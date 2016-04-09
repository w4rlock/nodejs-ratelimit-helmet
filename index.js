var ratelimit = require('express-rate-limit');
var express = require('express')
var app = express();

// max 5 password (30 seconds)
var limiter = ratelimit({
	max: 5,
	windowMs: 1000 * 30,
	handler: (req, res) => {

		//store possible hacker info in log db ?
		console.log('Banned: ' + req.ip);
		res.status(429).json({ message: 'to many request' });
	}
});

//gzip
app.use(require('compression')());

//security practices
app.use(require('helmet')());


app.use('/auth/', limiter);

app.post('/auth/login', (req, res) => {
	res.json({ msg: 'please wait...'});
});

app.route('/product')
	 .get((req, res) => {
			res.json({ id: 1, name: 'heineken' });
		})
	 .post((req, res) => {

		})
	 .put((req, res) => {

		});


app.listen(6661);
