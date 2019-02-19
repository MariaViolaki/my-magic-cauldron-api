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
	const profile = [];

	db.select('*')
	.from('recipes')
	.where('element', '=', element)
	.andWhere('flower', '=', flower)
	.andWhere('crystal', '=', crystal)
	.then(potion => {
		if (username.length > 0) {
			return updatePotions(
				db, username, potion[0].code
			)
			.then(() => {
				return db('users')
				.select('*')
				.where('username', '=', username)
				.then(user => profile.push(user[0]))
				.then(() => {
					return db('potions')
					.select('*')
					.where('username', '=', username)
					.then(potions => profile.push(potions[0]))
					.then(() => res.json(profile));
				})
			})
		} else {
			res.json(potion[0].code);
		}
	})
	.catch(err => {
		if (username.length > 0) {
			return updatePotions(
				db, username, 'veiledpanacea'
			)
			.then(() => {
				return db('users')
				.select('*')
				.where('username', '=', username)
				.then(user => profile.push(user[0]))
				.then(() => {
					return db('potions')
					.select('*')
					.where('username', '=', username)
					.then(potions => profile.push(potions[0]))
					.then(() => res.json(profile));
				})
			})
		} else {
			res.json('veiledpanacea');
		}
	});
};

module.exports = {
	handleGame: handleGame
};