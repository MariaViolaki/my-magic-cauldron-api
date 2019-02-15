const handleLogIn = (req, res, db, bcrypt) => {
	const { username_email, password } = req.body;
	
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
					res.json(user[0]);
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
