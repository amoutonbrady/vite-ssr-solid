import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

export default defineConfig({
	plugins: [
		{
			...typescriptPaths(),
			enforce: 'pre',
			//! TODO: Fix Typescript Paths!
		},
		solid({ ssr: true }),
	],
	build: {
		manifest: true,
		ssrManifest: true,
	},
	resolve: {
		preserveSymlinks: true, // Avoid errors with pnpm linking
	},
	ssr: {
		// Vite attempts to load this as a Commonjs dependency
		noExternal: ['solid-meta'],
	},
	cacheDir: 'node_modules/.cache/vite',
	assetsInclude: [/\/static\/.*$/],
});
