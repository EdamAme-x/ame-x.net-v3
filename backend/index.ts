import { Hono } from "hono";

const app = new Hono();

const Routes = app.get("/hey", c => c.text("hi!")).get("/whoami", c => c.text("who"));

export default app;
export type RPC = typeof Routes;
