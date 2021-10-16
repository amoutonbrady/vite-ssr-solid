// @ts-check
const fs = require('fs');
const path = require('path');
const faker = require('faker');

const USERS = 200;
const users = {};

for (let i = 0; i < USERS; i++) {
	faker.seed(i);

	const gender = faker.datatype.boolean() ? 'male' : 'female'; // We need a definite gender for the name
	const firstName = faker.name.firstName(gender === 'male' ? 0 : 1);
	const lastName = faker.name.lastName(gender === 'male' ? 0 : 1);
	const bioLength = faker.datatype.number({ min: 15, max: 255 });

	const user = {
		person: {
			firstName: firstName,
			lastName: lastName,
			gender: gender,
		},
		user: {
			email: faker.unique(faker.internet.email, [firstName, lastName]),
			username: faker.unique(faker.internet.userName, [firstName, lastName]),
			password: faker.internet.password(undefined, faker.datatype.boolean()),
			bio: bioLength === 15 ? false : faker.lorem.words(bioLength),
		},
		address: {
			country: faker.address.country(),
			city: faker.address.city(),
			address: `${faker.address.streetName()} ${HouseNumber()}`,
			zip: faker.address.zipCode(),
		},
	};

	users[faker.unique(faker.datatype.uuid)] = user;
}

fs.writeFileSync(
	path.join(__dirname, 'static/users.json'),
	JSON.stringify(users),
);

/*{
	const gender = faker.datatype.boolean() ? 'male' : 'female'; // We need a definite gender for the name
	const firstName = faker.name.firstName(gender);
	const lastName = faker.name.lastName(gender);
	const bioLength = faker.datatype.number({ min: 15, max: 255 });

	const user = {
		person: {
			firstName: firstName,
			lastName: lastName,
			gender: gender,
		},
		user: {
			email: faker.unique(faker.internet.email, [firstName, lastName]),
			username: faker.unique(faker.internet.userName, [firstName, lastName]),
			password: faker.internet.password(undefined, faker.datatype.boolean()),
			bio: faker.lorem.words(bioLength === 15 ? 0 : bioLength),
		},
		address: {
			country: faker.address.country(),
			city: faker.address.city(),
			address: `${faker.address.streetName()} ${HouseNumber()}`,
			zip: faker.address.zipCode(),
		},
		uuid: faker.datatype.uuid(),
	};

	console.log(user);
}*/

function HouseNumber() {
	const base = Math.random() + 1; // have the number be above one

	const multiplier = (Math.random() + 1) * Math.random() * 5;

	return Math.max(
		1,
		Math.round(Math.pow(Math.log(base * 100) * multiplier, 1.5)),
	);
}

/*for (let i = 0; i < USERS; i++) {
	console.log(`Attempt ${i}: `, HouseNumber());
}*/
