const handleNewUsername = (req, res, db) => {
	const { username, newUsername } = req.body;
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
				.then((data) => res.json(data[0]));
			})
		})
	})
	.catch((err) => res.status(400).json(err));
}

module.exports = {
	handleNewUsername: handleNewUsername
}