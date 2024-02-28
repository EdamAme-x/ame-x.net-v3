import { Hono } from "hono";
import { notFoundRouter } from "./404";
import { errorRouter } from "./500";

const router = new Hono().basePath("/api");

const Routes = router
	.get("/whoami", c => c.text(c.req.header("User-Agent") ?? "Who? 🤔"))
	.all("*", c => notFoundRouter.fetch(c.req.raw))
	.all("*", c => errorRouter.fetch(c.req.raw));

export default router;
export type RPC = typeof Routes;
