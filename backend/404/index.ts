import { Hono } from "hono";

const createEqTotal404 = () => {
	const zeroToNotFound = Math.floor(Math.random() * 404);

	return `${zeroToNotFound} + ${404 - zeroToNotFound}`;
};

export const notFoundRouter = (router: Hono) => {
	router.notFound(c =>
		c.text(`${createEqTotal404()} :(
	but you can follow @amex2189 🎁`),
	);

	return router;
};
