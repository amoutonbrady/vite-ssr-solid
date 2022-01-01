import { useRoutes } from 'solid-app-router';
import { Meta } from 'solid-meta';
import routes from './routes';
import './styles/global.scss';

export const App = () => {
	const Routes = useRoutes(routes);
	return (
		<>
			<Meta name='viewport' content='width=device-width, initial-scale=1' />
			<Routes />
		</>
	);
};

export default App;
