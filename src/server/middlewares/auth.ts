import { Request, Response, NextFunction } from "express";
import { isLogined } from "../api/isLogined";
import { isError } from "../types/typeGuards/isError";

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await isLogined(req.cookies.token);
    if (id) {
      return next();
    }
    throw new Error("Authentication failed");
  } catch (error) {
    if (isError(error) && error.code === 401) {
      return res.redirect("/login");
    }
    return res.redirect("/server-error");
  }
}
