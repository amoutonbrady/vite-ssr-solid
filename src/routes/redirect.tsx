import { useNavigate } from 'solid-app-router';
import { Title, Link } from 'solid-meta';

const Redirect = () => {
	useNavigate()('/');

	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel='shortcut icon' type='image/svg+xml' href='/favicon.svg' />
		</>
	);
};

export default Redirect;
