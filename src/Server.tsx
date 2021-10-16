import type { Component } from 'solid-js';
import { Router, RouteDataFunc } from 'solid-app-router';
import { MetaProvider } from 'solid-meta';
import { App } from './App';

export interface TagDescription {
	tag: string;
	props: Record<string, unknown>;
}

export interface ServerProps {
	tags: TagDescription[];
	url: string;
	out?: object | {};
	data?: RouteDataFunc;
}

const Server: Component<ServerProps> = (props) => {
	return (
		<MetaProvider tags={props.tags}>
			<Router url={props.url} out={props.out} data={props.data}>
				<App />
			</Router>
		</MetaProvider>
	);
};

export default Server;
