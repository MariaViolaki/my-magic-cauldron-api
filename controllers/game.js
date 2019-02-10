const updateUser = (db, username, potion) => {
	return db('potions')
		.select('*')
		.where('username', '=', username)
		.then(potionList => {
			if (!potionList[0][potion]) {
				return db('users')
				.where('username', '=', username)
				.increment('potions', 1)
			}
		});	
}

const updatePotions = (db, username, potion) => {
	return db('potions')
		.where('username', '=', username)
		.update(potion, true)
		.then(updateUser(db, username, potion));
}

const handleGame = (req, res, db) => {
	const {
		username, element, flower, crystal
	} = req.body;

	db.select('*')
	.from('recipes')
	.where('element', '=', element)
	.andWhere('flower', '=', flower)
	.andWhere('crystal', '=', crystal)
	.then(potion => {
		res.json(potion[0].code);
		if (username.length > 0) {
			return updatePotions(
				db, username, potion[0].code
			);
		}
	})
	.catch(err => {
		res.json('veiledpanacea');
		if (username.length > 0) {
			return updatePotions(
				db, username, 'veiledpanacea'
			);
		}
	});
};

module.exports = {
	handleGame: handleGame
};