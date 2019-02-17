const handleLogIn = (req, res, db, bcrypt) => {
	const { username_email, password } = req.body;
	const profile = [];
	
	if (username_email.length > 0 && password.length > 0) {

		db('login')
		.select('*')
		.where('username', '=', username_email)
		.orWhere('email', '=', username_email)
		.then(data => {
			const isValid = bcrypt.compareSync(
				password, data[0].hash
			);
			if (isValid) {
				return db('users')
				.select('*')
				.where('username', '=', username_email)
				.orWhere('email', '=', username_email)
				.then(user => {
					profile.push(user[0]);
				})
				.then(() => {
					return db('potions')
					.select('*')
					.where('username', '=', profile[0].username)
					.then(potions => {
						profile.push(potions[0]);
						console.log(profile);
						res.json(profile);
					})
					.catch(err => {
						res.status(400).json('Unable to get potions');
					});
				})
				.catch(err => {
					res.status(400).json('Unable to get user');
				});
			} else {
				res.status(400).json('Wrong credentials');
			}
		})
		.catch(err => {
			res.status(400).json('Wrong credentials');
		});

	}	else {
		res.status(400).json('Empty fields not allowed');
	}
}

module.exports = {
	handleLogIn
}
