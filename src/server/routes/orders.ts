import { Router } from "express";
import { auth } from "../middlewares/auth";
import { getOrder } from "../api/getOrder";

const router = Router();

router.get("/", auth, async (req, res) => {
  const html = await req.renderPage("/orders", "");
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/old", auth, async (req, res) => {
  const html = await req.renderPage("/orders/old", "");
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/new", auth, async (req, res) => {
  const html = await req.renderPage("/orders/new", "");
  res.status(200).set({ "Content-Type": "text/html" }).end(html);
});

router.get("/:id", auth, async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).redirect("/not-found");
  try {
    const order = await getOrder(req.cookies.token, id);
    if (!order) return res.redirect("/not-found");
    const html = await req.renderPage(`/orders/${id}`, "", { order });
    return res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (error) {
    console.error(error);
    return res.status(500).redirect("/server-error");
  }
});

export default router;
