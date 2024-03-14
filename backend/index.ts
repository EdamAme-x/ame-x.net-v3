import { Hono } from "hono";
import { notFoundRouter } from "./404";
import { errorRouter } from "./500";
import { myinfoRouter } from "./myinfo";
import { proxyRouter } from "./proxy";
console.log(
	`\x1b[90m${new Date().toLocaleTimeString().split(" ")[0]}\x1b[0m \x1b[31m[hono]\x1b[0m Hono Initlizing...\x1b[0m`,
);
const beforeLoadTime = performance.now();
const router = new Hono().basePath("/api");

let Routes = router.get("/whoami", c => c.text(c.req.header("User-Agent") ?? "Who? 🤔"));

Routes = notFoundRouter(Routes);
Routes = errorRouter(Routes);
Routes = myinfoRouter(Routes);
Routes = proxyRouter(Routes);
console.log(
	`\x1b[90m${new Date().toLocaleTimeString().split(" ")[0]}\x1b[0m \x1b[31m[hono]\x1b[0m Hono Initlized\x1b[0m \x1b[90m${Math.floor((performance.now() - beforeLoadTime) * 100) * 10}μs\x1b[0m`,
);
export default router;
export type RPC = typeof Routes;
