import type { Hono } from "hono";

export const proxyRouter = (router: Hono) => {
	router.get("/proxy", async c => {
		const url = c.req.query("url");

		if (!url) {
			return c.notFound();
		}

		const res = await fetch(url);
		const text = await res.text();
		return c.text(text);
	});

	return router;
};
