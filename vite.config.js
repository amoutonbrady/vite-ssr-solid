import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default defineConfig({
	plugins: [solid({ ssr: true }), typescriptPaths()],
	ssr: {
		// Vite attempts to load this as a Commonjs dependency
		noExternal: ["solid-meta"],
	},
	assetsInclude: [/\/static\/.*$/],
});
