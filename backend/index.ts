import { Hono } from "hono";
import { notFoundRouter } from "./404";
import { errorRouter } from "./500";
import { myinfoRouter } from "./myinfo";
import { proxyRouter } from "./proxy";
console.log("hono setup");
const router = new Hono().basePath("/api");

let Routes = router.get("/whoami", c => c.text(c.req.header("User-Agent") ?? "Who? 🤔"));

Routes = notFoundRouter(Routes);
Routes = errorRouter(Routes);
Routes = myinfoRouter(Routes);
Routes = proxyRouter(Routes);

export default router;
export type RPC = typeof Routes;
