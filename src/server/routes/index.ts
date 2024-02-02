import { isLogined } from "../api/isLogined";
import { auth } from "../middlewares/auth";
import { Router } from "express";
import { isError } from "../types/typeGuards/isError";
import { isRegisterToken } from "../api/isRegisterToken";

const router = Router();

router.get("/", auth, async (req, res) => {
  const html = await req.renderPage("/", "");
  return res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/login", async (req, res) => {
  try {
    const id = await isLogined(req.cookies.token);
    if (id) return res.redirect("/");
  } catch (error) {
    if (isError(error) && error.code !== 401) {
      console.error(error);
      return res.redirect("/server-error");
    }
  }
  const html = await req.renderPage("/login", "");
  return res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/register", async (req, res) => {
  const token = req.query.token;
  if (typeof token === "string" && token.length === 64) {
    try {
      await isRegisterToken(token);
    } catch (error) {
      if (isError(error) && error.code === 401)
        return res.redirect("/not-found");
      console.error(error);
      return res.redirect("/server-error");
    }
    try {
      const id = await isLogined(req.cookies.token);
      if (id) return res.redirect("/");
    } catch (error) {
      if (isError(error) && error.code !== 401) {
        console.error(error);
        return res.redirect("/server-error");
      }
    }
    const html = await req.renderPage("/register", "");
    return res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } else return res.redirect("/not-found");
});

router.get("/settings", async (req, res) => {
  const html = await req.renderPage("/settings", "");
  return res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("*", async (req, res) => {
  const html = await req.renderPage("/not-found", "");
  res.status(404).set({ "Content-Type": "text/html" }).end(html);
});

export default router;
