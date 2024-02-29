import app from "@/backend";

export function GET({ request }: { request: Request }) {
	return app.fetch(request);
}

export function POST({ request }: { request: Request }) {
	return app.fetch(request);
}
