const deleteFromDb = (db, table, username) => {
	return db(table)
		.where('username', '=', username)
		.del();
};

const handleDeactivate = (req, res, db) => {
	const { username } = req.body;

	deleteFromDb(db, 'users', username)
	.then(() => {
		return deleteFromDb(db, 'login', username);
	})
	.then(() => {
		return deleteFromDb(db, 'potions', username);
	})
	.then(() => {
		res.json('Profile deleted');
	})
	.catch(err => {
		res.status(400).json('Could not delete');
	});
};

module.exports = {
	handleDeactivate: handleDeactivate
};