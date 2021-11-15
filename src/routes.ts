import { lazy } from 'solid-js';
import type { Component } from 'solid-js';
import type { RouteDefinition, RouteDataFunc } from 'solid-app-router';
import { mapPath } from './utils/path';
import NotFound from './404';

export type PageMod<P = unknown, D = unknown> = {
	data?: RouteDataFunc<D>;
	default: Component<P>;
};

export const data = import.meta.globEager('./routes/**/*.tsx');
export const pages = import.meta.glob('./routes/**/*.tsx');

const routes = Object.keys(pages).map((Path): RouteDefinition => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const rawPath = Path.match(/\.\/routes(\/.*?)(index)?\.tsx/)![1]!;
	// TODO: custom layouts and 404/5xx error pages
	return {
		path: mapPath(rawPath),
		component: lazy(pages[Path] as () => Promise<PageMod>),
		data: data['data'] as RouteDataFunc,
	};
});

routes.push({ path: '**', component: NotFound });

if (import.meta.env.DEV) console.log('Routes:\n', routes);

export default routes;
