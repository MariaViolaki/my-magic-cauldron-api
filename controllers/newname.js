const handleNewName = (req, res, db) => {
	const { username, newName } = req.body;
	db('users')
	.where('username', '=', username)
	.update({
		name: newName
	})
	.then(() => {
		return db('users')
		.select('*')
		.where('username', '=', username)
		.then((data) => res.json(data[0]));
	})
	.catch((err) => res.status(400).json(err));
}

module.exports = {
	handleNewName: handleNewName
}