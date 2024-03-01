import type { Hono } from "hono";

export const myinfoRouter = (router: Hono) => {
	router.get("/myinfo", c =>
		c.json({
			name: "ame_x",
			icon: "https://github.com/EdamAme-x.png",
			twitterId: `@amex2189`,
			githubId: `@EdamAme-x`,
			zennId: `@ame_x`,
			message: `please follow me on Twitter @amex2189 :)`,
			age: 14,
			ltc: "ltc1qj3f3ragm568j7lw062743w6r4k7n929ddjgq6r",
		}),
	);

	return router;
};
