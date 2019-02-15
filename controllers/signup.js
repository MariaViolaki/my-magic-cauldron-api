const handleSignUp = (req, res, db, bcrypt) => {
	const { 
		name, username, email, password
	} = req.body;

	const hash = bcrypt.hashSync(password);

	if (name.length > 0 &&
			username.length > 0 &&
			email.length > 0 &&
			password.length > 0) {

		// Add data to all 3 databases
		db('users')
		.insert({
			name: name,
			username: username,
			email: email,
			joined: new Date()
		})
		.then(() => {
			return db('login')
			.insert({
				username: username,
				email:email,
				hash: hash
			})
			.then(() => {
				return db('potions')
				.insert({
					username: username
				});
			});
		})
		.then(() => {
			return db('users')
				.select('*')
				.where('username', '=', username)
				.then(user => {
					res.json(user[0]);
			});
		})
		.catch(err => {
			res.status(400).json('Could not sign up');
		});
	} else {
		res.status(400).json('Empty fields not allowed');
	}
}

module.exports = {
	handleSignUp
};