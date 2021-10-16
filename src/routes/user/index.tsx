import { For, createResource } from 'solid-js';
import { Title, Link } from 'solid-meta';
import nFetch from '../../utils/fetch';
import UserPreview from '../../components/User/Preview';
import type { Users as IUsers, User as IUser } from '../../typings/user';

const Users = () => {
	const [users, { mutate, refetch }] = createResource<IUsers, true>(
		() =>
			nFetch('localhost:3000/api/v1/users').then(
				(res) => res.json() as Promise<IUsers>,
			),
		{ initialValue: {}, name: 'User' },
	);

	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel='shortcut icon' type='image/svg+xml' href='/favicon.svg' />
			<h1>Users:</h1>
			<ul>
				<For each={Object.keys(users)}>
					{(item) => (
						<li>
							<UserPreview uid={item} user={users()[item]!} />
						</li>
					)}
				</For>
			</ul>
		</>
	);
};

export default Users;
