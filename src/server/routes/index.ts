import { isLogined } from "../api/isLogined";
import { auth } from "../middlewares/auth";
import { Router } from "express";
import { isError } from "../types/typeGuards/isError";
import { isRegisterToken } from "../api/isRegisterToken";

const router = Router();

router.get("/", auth, async (req, res) => {
  const html = await req.renderPage(
    "/",
    `
  <title>Календарь</title>
  `
  );
  return res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/login", async (req, res, next) => {
  try {
    const id = await isLogined(req.cookies.token);
    if (id) return res.redirect("/");
  } catch (error) {
    if (isError(error) && error.code !== 401) {
      res.redirect("/server-error");
      return next(error);
    }
  }
  const html = await req.renderPage(
    "/login",
    `
  <title>Вход в личный кабинет</title>
  `
  );
  return res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/register", async (req, res, next) => {
  const token = req.query.token;
  if (typeof token === "string" && token.length === 64) {
    try {
      await isRegisterToken(token);
    } catch (error) {
      if (isError(error) && error.code === 401)
        return res.redirect("/not-found");

      res.redirect("/server-error");
      return next(error);
    }
    try {
      const id = await isLogined(req.cookies.token);
      if (id) return res.redirect("/");
    } catch (error) {
      if (isError(error) && error.code !== 401) {
        res.redirect("/server-error");
        return next(error);
      }
    }
    const html = await req.renderPage(
      "/register",
      `
    <title>Регистрация</title>
    `
    );
    return res.status(200).set({ "Content-Type": "text/html" }).end(html);
  }
  return res.redirect("/not-found");
});

router.get("/settings", async (req, res) => {
  const html = await req.renderPage(
    "/settings",
    `
  <title>Настройки</title>
  `
  );
  return res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/server-error", async (req, res) => {
  const html = await req.renderPage(
    "/server-error",
    `
  <title>Непредвиденная ошибка</title>
  `
  );
  res.status(500).set({ "Content-Type": "text/html" }).end(html);
});

router.get("*", async (req, res) => {
  const html = await req.renderPage(
    "/not-found",
    `
  <title>Страница не найдена</title>
  `
  );
  res.status(404).set({ "Content-Type": "text/html" }).end(html);
});

export default router;
