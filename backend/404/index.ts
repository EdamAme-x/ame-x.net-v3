import { Hono } from "hono";

const router = new Hono().basePath("/api");

const createEqTotal404 = () => {
	const zeroToNotFound = Math.floor(Math.random() * 404);

	return `${zeroToNotFound} + ${404 - zeroToNotFound}`;
};

router.notFound(c =>
	c.text(`${createEqTotal404()} :(
but you can follow @amex2189 🎁`),
);

export const notFoundRouter = router;
