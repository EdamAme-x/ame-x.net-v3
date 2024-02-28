import { Hono } from "hono";

const router = new Hono().basePath("/api");

const createEqTotal500 = () => {
	const zeroToNotFound = Math.floor(Math.random() * 500);

	return `${zeroToNotFound} + ${500 - zeroToNotFound}`;
};

router.onError((_err, c) =>
	c.text(`${createEqTotal500()} :(
but you can follow @amex2189 🎁`),
);

export const errorRouter = router;
