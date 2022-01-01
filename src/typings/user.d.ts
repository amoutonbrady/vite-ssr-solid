export type Email = `${string}@${string}.${string}`;

export type Gender = 'male' | 'female'; // faker does't allow for differently gendered names, sorry

export interface Person {
	firstName: string;
	lastName: string;
	gender: Gender;
}

export interface UserData {
	email: Email;
	username: string;
	password: string;
	bio: string | false;
}

export interface Address {
	country: string;
	city: string;
	address: string;
	zip: string;
}

export interface User {
	person: Person;
	user: UserData;
	address: Address;
}

export interface Users {
	[key: string]: User;
}
