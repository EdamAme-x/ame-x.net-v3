import { Hono } from "hono";

const createEqTotal500 = () => {
	const zeroToNotFound = Math.floor(Math.random() * 500);

	return `${zeroToNotFound} + ${500 - zeroToNotFound}`;
};
export const errorRouter = (router: Hono) => {
	router.onError((_err, c) =>
		c.text(`${createEqTotal500()} :(
but you can follow @amex2189 🎁`),
	);

	return router;
};
