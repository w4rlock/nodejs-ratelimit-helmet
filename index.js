let ratelimit = require('express-rate-limit');
let app = require('express')();

//gzip
app.use(require('compression')());

//security http headers
app.use(require('helmet')());

// max 5 password (30 seconds)
app.use('/auth', ratelimit({
	max: 5,
	windowMs: 1000 * 30,
	handler: (req, res) => {
		//store possible hacker info in log db ?
		console.log('Banned: ' + req.ip);
		res.status(429).json({ message: 'to many request' });
	}
});

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


app.listen(6661, () => {
	console.log('Server listing on 6661');
});

