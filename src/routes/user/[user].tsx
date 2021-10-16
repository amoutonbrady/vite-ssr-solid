import {} from 'solid-app-router';
import { Title, Link } from 'solid-meta';

const Profile = () => {
	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel='shortcut icon' type='image/svg+xml' href='/favicon.svg' />
			<h1>User Needs doing!</h1>
		</>
	);
};

export default Profile;
