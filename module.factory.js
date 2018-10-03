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
		this.Entry = mongoose.model('Entry',EntrySchema);
		UserSchema = new this.Schema({
			email: String,
			password: String,
			username: String,
			first_name: String,
			last_name: String,
		}, { timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'} });
		this.User = mongoose.model('User',UserSchema);
	}
	
	this.login = function(qemail) {
		var query = this.User.findOne({email: qemail}).exec();
		return query;
	}
	
	this.lookupUser = function(id) {
		var query = this.User.findOne({_id: id}).exec();
		return query;
	}
	
	this.getUser = function(id,res) {
		this.User.findById(id, function(error,output) {
			res.json(output);
		});
	}
	
	this.getEntry = function(id,res) {
		this.Entry.findById(id, function(error,output) {
			res.json(output);
		});
	}
	
	this.getEntries = function(query,res) {
		this.Entry.find({}, function(error,output) {
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
	
	this.createUser = function(params,res) {
		var newUser = new this.User({
			email: params.email,
			password: params.password
		});
		newUser.save(function(error,output) {
			return res.json(output);
		});
	}

	this.updateUser = function(params,res) {
		this.Entry.findOneAndUpdate({_id: params._id}, {
			email: params.home,
			username: params.username,
			first_name: params.first_name,
			last_name: params.last_name
		}, function(error, output) {
			return res.json(output);
		});
	}
	
	this.getUsers = function(query,res) {
		this.User.find({}, function(error,output) {
			res.json(output);
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
			return res.json((output));
		});
	}
}

module.exports = Factory;
