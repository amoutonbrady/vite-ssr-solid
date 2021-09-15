// @ts-check
const { readFileSync } = require("fs");
const path = require("path");
const express = require("express");

const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;

async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  /**
   * @param {string} p
   */
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? readFileSync(resolve("dist/client/index.html"), "utf-8")
    : "";

  // @ts-ignore
  const manifest = isProd ? require("./dist/client/ssr-manifest.json") : {};

  const app = express();

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;

  if (!isProd) {
    vite = await require("vite").createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
      },
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use(require("compression"));
    app.use(
      require("serve-static")(resolve("dist/client"), {
        index: false,
      })
    );
  }

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;

      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = readFileSync(resolve("index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = require("./dist/server/entry-server.js").render;
      }

      const solidWeb = require("solid-js/web");
      const html = render(url, manifest);

      const appHtml = template
        .replace(`<!--app-head-->`, solidWeb.generateHydrationScript())
        .replace(`<!--app-html-->`, html);

      res.status(200).set({ "Content-Type": "text/html" }).end(appHtml);
    } catch (e) {
      vite && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log("http://localhost:3000");
    })
  );
}

// for test use
exports.createServer = createServer;
