import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getOrder } from "../api/getOrder";

const router = Router();

router.get("/", auth, async (req, res) => {
  const html = await req.renderPage(
    "/orders",
    `
  <title>Открытые заказы</title>
  `
  );
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/old", auth, async (req, res) => {
  const html = await req.renderPage(
    "/orders/old",
    `
  <title>Завершённые заказы</title>
  `
  );
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/new", auth, async (req, res) => {
  const html = await req.renderPage(
    "/orders/new",
    `
  <title>Новая запись</title>
  `
  );
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/:id", auth, async (req, res, next) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).redirect("/not-found");
  try {
    const order = await getOrder(req.cookies.token, id);
    if (!order) return res.redirect("/not-found");
    const html = await req.renderPage(
      `/orders/${id}`,
      `
    <title>Заказ № ${id}</title>
    `,
      { order }
    );
    return res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    res.redirect("/server-error");
    return next(error);
  }
});

export default router;
