const handleNewUsername = (req, res, db) => {
	const { username, newUsername } = req.body;
	const profile = [];

	db('users')
	.where('username', '=', username)
	.update({
		username: newUsername
	})
	.then(() => {
		return db('login')
		.where('username', '=', username)
		.update({
			username: newUsername
		})
		.then(() => {
			return db('potions')
			.where('username', '=', username)
			.update({
				username: newUsername
			})
			.then(() => {
				return db('users')
				.select('*')
				.where('username', '=', newUsername)
				.then((user) => profile.push(user[0]))
				.then(() => {
					return db('potions')
					.select('*')
					.where('username', '=', newUsername)
					.then((potions) => profile.push(potions[0]))
					.then(() => res.json(profile));
				})
			})
		})
	})
	.catch((err) => res.status(400).json(err));
}

module.exports = {
	handleNewUsername: handleNewUsername
}