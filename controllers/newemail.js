const handleNewEmail = (req, res, db) => {
	const { username, newEmail } = req.body;
	const profile = [];

	db('users')
	.where('username', '=', username)
	.update({
		email: newEmail
	})
	.then(() => {
		return db('login')
		.where('username', '=', username)
		.update({
			email: newEmail
		})
		.then(() => {
			return db('users')
			.select('*')
			.where('username', '=', username)
			.then((user) => profile.push(user[0]))
			.then(() => {
				return db('potions')
				.select('*')
				.where('username', '=', username)
				.then((potions) => profile.push(potions[0]))
				.then(() => res.json(profile));
			})
		})
	})
	.catch((err) => res.status(400).json(err));
}

module.exports = {
	handleNewEmail: handleNewEmail
}