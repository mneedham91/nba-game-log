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

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Factory = require('./module.factory.js');
var nodemailer = require('nodemailer');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/gamelogdb');
var db = mongoose.connection;

var factory = new Factory(Schema,mongoose);
factory.createSchemas();

var crypto = require('crypto');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
jwtOptions.secretOrKey = factory.secretOrKey();

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
	var promise = factory.lookupUser(jwt_payload.id);
	console.log('normal JwtStrategy called');
	promise.then(function(result) {
		return done(null, result);
	});
});
var admin_strategy = new JwtStrategy(jwtOptions, function(jwt_payload, done) {
	var promise = factory.lookupUser(jwt_payload.id);
	console.log('admin JwtStrategy called');
	promise.then(function(result) {
		console.log(result);
		if (result.role == 'admin') {
			return done(null, result);
		} else {
			return done(null, false);
		}
	});
});
passport.use('user-rule', strategy);
passport.use('admin-rule', admin_strategy);
app.use(passport.initialize());

var base_url = '/api/v1/';

app.post(base_url + 'login', function(req, res) {
	var resp = factory.login(req.body.email, req.body.password,res);
});

app.get(base_url + 'entry/:id', function(req, res) {
	var resp = factory.getEntry(req.params.id,res);
});

app.get(base_url + 'entry', function(req, res) {
	var resp = factory.getEntries({},res);
});

app.post(base_url + 'entry', passport.authenticate('user-rule', {session: false}), function(req, res) {
	var resp = factory.createEntry(req.body, res);
});

app.put(base_url + 'entry/:id', passport.authenticate('user-rule', {session: false}), function(req, res) {
	var resp = factory.updateEntry(req.body, res);
});

app.delete(base_url + 'entry/:id', passport.authenticate('admin-rule', {session: false}), function(req,res) {
	var resp = factory.deleteEntry(req.params.id,res);
});

app.get(base_url + 'entry/user/:id/games/:team', function(req, res) {
	var resp = factory.getGamesCount(req.params.id, req.params.team, res);
});

app.get(base_url + 'entry/user/:id/quarters/:team', function(req, res) {
	var resp = factory.getQuartersSum(req.params.id, req.params.team, res);
});

app.get(base_url + 'user/:id', function(req, res) {
	var resp = factory.getUser(req.params.id,res);
});

app.get(base_url + 'user', passport.authenticate('admin-rule', {session: false}), function(req, res) {
	var resp = factory.getUsers({},res);
});

app.post(base_url + 'user', function(req, res) {
	var resp = factory.createUser(req.body, res);
});

app.put(base_url + 'user/:id', passport.authenticate('admin-rule', {session: false}), function(req, res) {
	var resp = factory.updateUser(req.body, res);
});

app.delete(base_url + 'user/:id', passport.authenticate('admin-rule', {session: false}), function(req,res) {
	var resp = factory.deleteUser(req.params.id,res);
});

app.get(base_url + 'tag/:id', function(req, res) {
	var resp = factory.getTag(req.params.id,res);
});

app.get(base_url + 'tag', function(req, res) {
	var resp = factory.getTags({},res);
});

app.get(base_url + 'tag/entry/:id', function(req, res) {
	var resp = factory.getTagsByEntry(req.params.id,res);
});

app.post(base_url + 'tag', function(req, res) {
	var resp = factory.createTag(req.body, res);
});

app.put(base_url + 'tag/:id', passport.authenticate('user-rule', {session: false}), function(req, res) {
	var resp = factory.updateTag(req.body, res);
});

app.delete(base_url + 'tag/:id', passport.authenticate('user-rule', {session: false}), function(req,res) {
	var resp = factory.deleteTag(req.params.id, res);
});

app.get(base_url + 'player', function(req, res) {
	var resp = factory.getPlayers(res);
});

app.get(base_url + 'player/:id', function(req, res) {
	var resp = factory.getPlayer(req.params.id,res);
});

app.post(base_url + 'player', function(req, res) {
	var resp = factory.createPlayer(req.body, res);
});

app.put(base_url + 'player/:id', function(req, res) {
	var resp = factory.updatePlayer(req.body, res);
});

app.get(base_url + 'team/:team', function(req, res) {
	var resp = factory.getTeam(req.params.team, res);
});

app.post(base_url + 'forgot', function(req, res) {
	var resp = factory.requestReset(req.body.email, res);
});

app.get(base_url + 'reset/:token', function(req, res) {
	var resp = factory.checkResetToken(req.params.token, res);
})

app.post(base_url + 'reset/:token', function(req, res) {
	var resp = factory.resetPassword(req.body.password, req.params.token, res);
})

app.use('/*',function(req, res) {
    res.sendfile(__dirname + '/dist/index.html');
});

//app.listen(process.env.PORT || 8080);
app.listen(process.env.PORT || 3000);

db.on('error', function callback() {
	console.log('Connection Error');
});

db.once('open', function callback() {
	console.log('Mongo working!');
});
