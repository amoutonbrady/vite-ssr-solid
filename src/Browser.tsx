import type { Component } from 'solid-js';
import { Router } from 'solid-app-router';
import { MetaProvider } from 'solid-meta';
import { App } from './App';

const Browser: Component = () => {
	return (
		<MetaProvider>
			<Router>
				<App />
			</Router>
		</MetaProvider>
	);
};

export default Browser;
