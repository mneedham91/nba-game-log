var async = require('async');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var jwtOptions = {}
jwtOptions.secretOrKey = crypto.randomBytes(32).toString('hex');
var nodemailer = require('nodemailer');
var teams = require('./teams.json');

var Factory = function(Schema,mongoose) {
	this.Schema = Schema;
	this.mongoose = mongoose;
	this.Item = null;
	
	this.createSchemas = function() {
		EntrySchema = new this.Schema({
			home: String,
			away: String,
			notes: String,
			date: Date,
			userid: Schema.ObjectId,
			length: Number,
			privacy: String
		}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} });
		this.Entry = mongoose.model('Entry', EntrySchema);
		UserSchema = new this.Schema({
			email: { type: String, required: true, unique: true },
			password: { type: String, required: true},
			hash: String,
			username: String,
			first_name: String,
			last_name: String,
			role: String,
			resetPasswordToken: String,
			resetPasswordExpires: Date
		}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} });
		UserSchema.pre('save', function(next) {
			var user = this;

			if (!user.isModified('password')) return next();

			bcrypt.genSalt(10, function(err, salt) {
				if (err) return next(err);

				bcrypt.hash(user.password, salt, function(err, hash) {
					if (err) return next(err);

					user.password = hash;
					next();
				});
			});
		});
		UserSchema.methods.comparePassword = function(candidatePassword, cb) {
			bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
				if (err) return cb(err);
				cb(null, isMatch);
			});
		};
		this.User = mongoose.model('User', UserSchema);
		TagSchema = new this.Schema({
			entryid: Schema.ObjectId,
			playerid: String,
			userid: Schema.ObjectId,
			team: String
		}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} });
		this.Tag = mongoose.model('Tag', TagSchema);
		PlayerSchema = new this.Schema({
			nba_id: Number,
			first_name: String,
			last_name: String,
			team: String
		});
		this.Player = mongoose.model('Player', PlayerSchema);
	}

	this.login = function(email, password, res) {
		this.User.findOne({ email: email }, function(err, user) {
			if (err) {
				res.json({err});
			}
			user.comparePassword(password, function(err, isMatch) {
				if (err) {
					res.json({err});
				}
				if (isMatch) {
					var token = jwt.sign({id: user._id}, jwtOptions.secretOrKey);
					return res.json({success: true, token: token, user: user, expiresIn: 120 });
				} else {
					return res.status(401).json({message: 'invalid password'});
				}
			});
		});
	}

	this.requestReset = function(email, res) {
		async.waterfall([
			function(done) {
				crypto.randomBytes(20, function(err, buf) {
					var token = buf.toString('hex');
					done(err, token);
				});
			},
			function(token, done) {
				this.User.findOne({ email: email }, function(err, user) {
					if (err) {
						res.json(err);
					}
					user.resetPasswordToken = token;
					user.resetPasswordExpires = Date.now() + 3600000;
					user.save(function(err) {
						done(err, token, user);
					});
				});
			},
			function(token, user, done) {
				var smtpTransport = nodemailer.createTransport('SMTP', {
					host: 'mail.betterdataservices.com',
					port: 465,
					secure: false, // upgrade later with STARTTLS
					auth: {
						user: 'noreply@betterdataservices.com',
						pass: process.env.emailPWord
					}
				});
				var mailOptions = {
					to: email,
					from: 'noreply@betterdataservices.com',
					subject: 'Your Password Reset',
					text: 'Click here to reset your password: http://nba-game-log.herokuapp.com/reset/' + token,
				}
				smtpTransport.sendMail(mailOptions, function(err) {
					done(err, 'done');
				});
			}
			], function(err) {
				if (err) return next(err);
				res.json(err);
			});
	}

	this.checkResetToken = function(token, res) {
		this.User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			if (!user) {
				res.json('no user found');
			} else {
				res.json(user);
			}
		});
	}

	this.resetPassword = function(password, token, res) {
		this.User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
			if (!user) {
				res.json('error: no user found');
			}
			bcrypt.genSalt(10, function(err, salt) {
				if (err) return next(err);

				bcrypt.hash(user.password, salt, function(err, hash) {
					if (err) return next(err);

					user.password = hash;
					next();
				});
			});
			user.resetPasswordToken = undefined;
			user.resetPasswordExpires = undefined;
			user.save();
		});
	}
	
	this.lookupUser = function(id) {
		this.User.findOne({_id: id}).exec(function(err, user) {
			if (err) {
				return err;
			} else {
				return user;
			}
		});
	}

	this.getEntry = function(id,res) {
		this.Entry.findById(id, function(error,output) {
			res.json(output);
		});
	}

	this.getEntries = function(query,res) {
		this.Entry.find({}, null, {sort: {date: -1 }}, function(error,output) {
			res.json(output);
		});
	}

	this.createEntry = function(params,res) {
		var newEntry = new this.Entry({
			home: params.home,
			away: params.away,
			notes: params.notes,
			date: params.date,
			length: params.length,
			userid: params.userid
		});
		newEntry.save(function(error,output) {
			return res.json(output);
		});
	}

	this.updateEntry = function(params,res) {
		this.Entry.findOneAndUpdate({_id: params._id}, {
			home: params.home,
			away: params.away,
			notes: params.notes,
			date: params.date,
			length: params.length
		}, function(error, output) {
			return res.json(output);
		});
	}

	this.deleteEntry = function(id,res) {
		this.Entry.findOneAndDelete({_id: id}, function(error, output) {
			return res.json(output);
		});
	}

	this.getGamesCount = function(id,team,res) {
		this.Entry.find({$and: [{userid: id},{$or: [{away: team},{home: team}]}]}, function(error, output) {
			return res.json({'games': output.length});
		});
	}

	this.getQuartersSum = function(id,team,res) {
		this.Entry.aggregate([
			{$match: {$and: [{userid: new this.mongoose.Types.ObjectId(id)},{$or:[{home: team},{away: team}] }]}}, 
			{ $group: {_id: null, total: {$sum: "$length"} } } ], 
				function(error, output) {
					if (error) {
						console.log('error', err);
					}
					if (output.length > 0) {
						return res.json({'quarters': output[0]['total']});
					} else {
						return res.json({'quarters': 0});
					}
				}
		);
	}
	
	this.getUser = function(id,res) {
		this.User.findById(id, function(error,output) {
			res.json(output);
		});
	}

	this.getUsers = function(query,res) {
		this.User.find({}, function(error,output) {
			res.json(output);
		});
	}
	
	this.createUser = function(params,res) {
		var newUser = new this.User({
			email: params.email,
			password: params.password,
			username: params.email,
			first_name: '',
			last_name: '',
			role: 'user'
		});
		newUser.save(function(error,output) {
			return res.json(output);
		});
	}

	this.updateUser = function(params,res) {
		this.User.findOneAndUpdate({_id: params._id}, {
			email: params.email,
			username: params.username,
			first_name: params.first_name,
			last_name: params.last_name
		}, function(error, output) {
			return res.json(output);
		});
	}

	this.deleteUser = function(id,res) {
		this.User.findOneAndDelete({_id: id}, function(error, output) {
			return res.json((output));
		});
	}

	this.getTag = function(id,res) {
		this.Tag.findById(id, function(error,output) {
			res.json(output);
		});
	}

	this.getTags = function(query,res) {
		this.Tag.find({}, function(error,output) {
			res.json(output);
		});
	}

	this.getTagsByEntry = function(entryId,res) {
		this.Tag.find({entryid: entryId}, function(error,output) {
			res.json(output);
		});
	}
	
	this.createTag = function(params,res) {
		var newTag = new this.Tag({
			entryid: params.entryid,
			playerid: params.playerid,
			userid: params.userid,
			team: params.team
		});
		newTag.save(function(error,output) {
			return res.json(output);
		});
	}

	this.updateTag = function(params,res) {
		this.Tag.findOneAndUpdate({_id: params._id}, {
			playerid: params.playerid,
			team: params.team
		}, function(error, output) {
			return res.json(output);
		});
	}

	this.deleteTag = function(id, res) {
		this.Tag.findOneAndDelete({_id: id}, function(error, output) {
			return res.json((output));
		});
	}

	this.getPlayer = function(id, res) {
		this.Player.findById(id, function(error,output) {
			res.json(output);
		});
	}

	this.getPlayers = function(res) {
		this.Player.find({}, function(error,output) {
			res.json(output);
		});
	}

	this.createPlayer = function(params,res) {
		var newPlayer = new this.Player({
			nba_id: params.nba_id,
			first_name: params.first_name,
			last_name: params.last_name,
			team: params.team
		});
		newPlayer.save(function(error,output) {
			return res.json(output);
		});
	}

	this.updatePlayer = function(params,res) {
		this.Player.findOneAndUpdate({_id: params._id}, {
			team: params.team,
		}, function(error, output) {
			return res.json(output);
		});
	}

	this.getTeam = function(qteam, res) {
		this.Player.find({team: qteam}, function(error,output) {
			res.json(output);
		});
	}

	this.secretOrKey = function() {
		return jwtOptions.secretOrKey;
	}
}

module.exports = Factory;
