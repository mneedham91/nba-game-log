var express = require('express');
var app = express();

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = '43';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require('./module.factory.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gamelogdb');
var db = mongoose.connection;

var factory = new Factory(Schema,mongoose);
factory.createSchemas();

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
	var promise = factory.lookupUser(jwt_payload.id);
	promise.then(function(result) {
		return done(null, result);
	});
});
passport.use(strategy);
app.use(passport.initialize());

app.post('/api/v1/login', function(req, res) {
	var password = req.body.password;
	var promise = factory.login(req.body.email);
	promise.then(function(result) {
		if (!result) {
			res.status(401).json({message: 'login failure'});
		} else if (result.password === password) {
			var payload = {id: result._id};
			var token = jwt.sign(payload, jwtOptions.secretOrKey);
			res.json({success: true, token: token, userid: result._id, expiresIn: 120 });
		} else {
			res.status(401).json({message: 'invalid password'});
		}
	});
});

app.get('/api/v1/entry', passport.authenticate('jwt', {session: false}), function(req, res) {
	var resp = factory.getEntries({},res);
});

app.get('/api/v1/entry/:id', function(req, res) {
	var resp = factory.getEntry(req.params.id,res);
});

app.post('/api/v1/user', function(req, res) {
	var resp = factory.createUser(req.body, res);
});

app.get('/api/v1/user', function(req, res) {
	var resp = factory.getUsers({},res);
});

app.get('/api/v1/user/:id', function(req, res) {
	var resp = factory.getUser(req.params.id,res);
});

app.post('/api/v1/entry', passport.authenticate('jwt', {session: false}), function(req, res) {
	var resp = factory.createEntry(req.body, res);
});

app.put('/api/v1/entry/:id', passport.authenticate('jwt', {session: false}), function(req, res) {
	var resp = factory.updateEntry(req.body, res);
});

app.delete('/api/v1/entry/:id', passport.authenticate('jwt', {session: false}), function(req,res) {
	var resp = factory.deleteEntry(req.params.id,res);
});

app.use('/*',function(req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

app.listen(process.env.PORT || 8080);

db.on('error', function callback() {
	console.log('Connection Error');
});

db.once('open', function callback() {
	console.log('Mongo working!');
});
