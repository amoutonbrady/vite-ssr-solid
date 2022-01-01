import { For, createResource } from 'solid-js';
import { Title, Link } from 'solid-meta';
//import nFetch from '../../utils/fetch';
import UserPreview from '../../components/User/Preview';
import type { Users as IUsers, User as IUser } from '../../typings/user';

const Users = () => {
	const [users, { mutate, refetch }] = createResource<IUsers, true>(
		() =>
			fetch('http://localhost:3000/api/v1/users')
				/*nFetch('localhost:3000/api/v1/users')*/ .then((res) => {
					const users = res.json() as Promise<IUsers>;
					console.log('Fetched Users:', users);
					return users;
				})
				.catch((err) => {
					console.log('Error Fetching users:\n', err);
					throw err;
				}),
		{ initialValue: {}, name: 'User' },
	);

	const logUser = (uid: string) => {
		const user = users()[uid];
		console.log(`Mapping user '${uid}':`, user);
		return user;
	};

	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel='shortcut icon' type='image/svg+xml' href='/favicon.svg' />
			<h1>Users:</h1>
			<ul>
				<For each={Object.keys(users)}>
					{(item) => (
						<li>
							<UserPreview uid={item} user={logUser(item)!} />
						</li>
					)}
				</For>
			</ul>
		</>
	);
};

export default Users;
