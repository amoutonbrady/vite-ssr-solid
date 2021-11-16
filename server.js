// @ts-check
// file deepcode ignore Utf8Literal: Web uses utf-8
const { readFileSync } = require('fs');
const path = require('path');
const express = require('express');
const assert = require('assert');

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;
const PORT = process.env.PORT || '3000';

async function createServer(
	root = process.cwd(),
	isProd = process.env.NODE_ENV === 'production',
) {
	/** @param {string} p */
	const resolve = (p) => path.resolve(__dirname, p);

	const indexProd = isProd
		? readFileSync(resolve('dist/client/index.html'), 'utf-8')
		: '';

	/** @type {import('./src/entry-server')} */
	const ProdEntry = isProd ? require('./dist/server/entry-server.js') : null;

	/** @type {import('./src/entry-server').render} */
	const ProdRenderer = isProd ? ProdEntry.render : null;

	/** @type {import('./src/entry-server').handlers} */
	const ProdApi = isProd ? ProdEntry.handlers : null;

	const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {};
	/** @type {import('./src/typings/user').Users} */ // @ts-expect-error
	const users = require('./static/users.json');

	const app = express().disable('x-powered-by');

	app.get('/index.html', (_, r) => r.redirect('/', 301));

	/** @type {import('vite').ViteDevServer} */
	let vite;

	if (!isProd) {
		vite = await require('vite').createServer({
			root,
			logLevel: isTest ? 'error' : 'info',
			server: {
				middlewareMode: true,
			},
		});
		// use vite's connect instance as middleware
		app.use(vite.middlewares);
	} else {
		app.use(require('compression'));
		app.use(
			require('serve-static')(resolve('dist/client'), {
				index: false,
				extensions: false,
			}),
		);
	}

	// TODO: Api handlers
	//app.all('/api')

	app.all('/api/v1/users/:uid', (req, res) => {
		let sent = false;
		/** @type {import('./src/typings/user').Users} */ // @ts-expect-error
		const Users = isProd ? users : require('./static/users.json');
		Object.keys(Users).some((uid) => {
			const isUser = uid === req.params.uid;
			if (isUser && !sent) {
				const user = users[uid];
				if (user) {
					res.json({ data: user });
					sent = isUser;
				}
			}
			return sent;
		});
		if (!sent) {
			res.status(404).json({ error: { status: 404 } });
		}
	});
	app.get('/api/v1/users', (req, res) => {
		/** @type {import('./src/typings/user').Users} */ // @ts-expect-error
		const Users = isProd ? users : require('./static/users.json');
		// TODO: Pagination
		return res.json({ data: Users });
	});

	app.get('/favicon.ico', (_, r) => r.redirect('/favicon.svg'));

	// deepcode ignore NoRateLimitingForExpensiveWebOperation: only used in dev
	app.use('*', async (req, res) => {
		try {
			const url = req.originalUrl;

			/**
			 * always read the fresh template in dev
			 * @type {string}
			 */
			const template = isProd
				? indexProd
				: await vite.transformIndexHtml(
						url,
						readFileSync(resolve('index.html'), 'utf-8'),
				  );
			/**
			 * always get fresh components in dev
			 * @type {import('./src/entry-server').render}
			 */
			const render = isProd
				? ProdRenderer
				: (await vite.ssrLoadModule('/src/entry-server.tsx')).render;

			//console.log('Renderer:\n', render)
			assert(typeof render === 'function', '"render" is not a function!');

			/** @type {import('solid-app-router').RouterOutput} */ // @ts-expect-error
			const ctx = {};
			const html = render(url, ctx);

			console.log(`Request '${req.originalUrl}' out:\n`, ctx);
			assert(
				ctx.matches,
				"'ctx.matches' doesn't exist,\nsomething probably went wrong!\nDid you try restarting nodemon?",
			);

			// TODO: 404 if ctx matches wrong

			if (ctx.url) {
				res.redirect(ctx.url, 302);
			} else {
				const appHtml = template // TODO: Improve insert (don't rely on comments)
					.replace(`<!--app-head-->`, html.head + html.hydration)
					.replace(`<!--app-html-->`, html.body);

				// deepcode ignore XSS: url only used to render page, deepcode ignore ServerLeak: Doesn't happen here
				res
					.status(200)
					.set({ 'Content-Type': 'text/html;charset=utf-8' })
					.end(appHtml);
			}
		} catch (e) {
			vite && vite.ssrFixStacktrace(e);
			console.error('Error handling request:', req, res, e);
			res.status(500);
			// Don't leak data in prod
			if (!isProd) {
				// deepcode ignore XSS: url only used in dev, deepcode ignore ServerLeak: not done in prod
				res.end(e.stack);
			} else {
				// TODO: Send back a nice error page
			}
		}
	});

	return { app, vite };
}

// FIXME: only run if the file isn't required by another file
if (!isTest) {
	createServer()
		.then(({ app }) =>
			app.listen(PORT, () => {
				console.log(`http://localhost:${PORT}`);
			}),
		)
		.catch((err) => {
			console.error('Error Starting Server:\n', err);
			process.exit(1);
		});
}

// for test use
exports.createServer = createServer;
