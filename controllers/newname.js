const handleNewName = (req, res, db) => {
	const { username, newName } = req.body;
	const profile = [];

	db('users')
	.where('username', '=', username)
	.update({
		name: newName
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
	.catch((err) => res.status(400).json(err));
}

module.exports = {
	handleNewName: handleNewName
}