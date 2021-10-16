import { lazy, Component } from 'solid-js';
import { useRoutes, RouteDefinition } from 'solid-app-router';
import { Meta } from 'solid-meta';
import './styles/global.scss';

export const pages = import.meta.glob('./routes/**/*.tsx');

export const routes = Object.keys(pages).map((fPath): RouteDefinition => {
	const page = pages[fPath] as () => Promise<{
		default: Component<any>;
		[key: string]: any;
	}>;
	const rawPath = fPath.match(/\.\/routes(\/.*?)(?:[Ii]ndex)?\.tsx$/)![1];
	return {
		path: rawPath!, // TODO: Transform path
		component: lazy(page),
	};
});

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
