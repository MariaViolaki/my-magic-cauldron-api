const handleNewEmail = (req, res, db) => {
	const { username, newEmail } = req.body;
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
			.then((data) => res.json(data[0]));
		})
	})
	.catch((err) => res.status(400).json(err));
}

module.exports = {
	handleNewEmail: handleNewEmail
}