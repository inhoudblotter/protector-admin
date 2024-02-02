import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import compression from "compression";
import { createServer as createViteServer } from "vite";
import cookieParser from "cookie-parser";
import { renderPage } from "./middlewares/renderPage";
import router from "./routes";
import ordersRouter from "./routes/orders";

import "dotenv/config";
import { IRender } from "./types/IRender";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const isProd = process.env.NODE_ENV === "production";
const isVercel = process.env.DEPLOYMENT_ENV === "vercel";

export const resolve = (p: string) => path.resolve(__dirname, p);

export async function getStyles() {
  try {
    const assetpath = resolve("public");
    const files = await fs.readdir(assetpath);
    const cssAssets = files.filter((l) => l.endsWith(".css"));
    const allContent = [];
    for (const asset of cssAssets) {
      allContent.push(
        `<link rel="stylesheet" href="${path.join(assetpath, asset)}">`
      );
    }
    return allContent.join("\n");
  } catch {
    return "";
  }
}

async function createServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true, hmr: !isProd },
    appType: "custom",
    logLevel: isTest ? "error" : "info",
    root: isProd ? "dist" : "",
    optimizeDeps: {
      include: ["./public/assets/**/*"],
    },
  });

  app.use(vite.middlewares);

  app.use(
    express.static(isProd ? resolve("../public") : resolve("../../public"))
  );

  app.use(cookieParser(process.env.SECRET));

  if (isProd) {
    app.use(compression());
  }

  const baseTemplate = await fs.readFile(
    isProd ? resolve("./index.html") : resolve("../../index.html"),
    "utf-8"
  );

  const styles = await getStyles();
  const productionBuildPath = path.join(__dirname, "./entry.server.js");
  const devBuildPath = path.join(__dirname, "../client/app/entry.server.tsx");
  const buildModule = isProd ? productionBuildPath : devBuildPath;
  const { render } = (await vite.ssrLoadModule(buildModule)) as {
    render: IRender;
  };
  app.use(renderPage(vite, baseTemplate, render, styles));

  app.use("/orders", ordersRouter);
  app.use("/", router);

  const PORT = process.env.PORT || 5173;

  if (!isVercel) {
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  }

  return app;
}

export default createServer();
