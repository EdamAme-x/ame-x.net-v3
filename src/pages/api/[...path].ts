export function GET({ request }: { request: Request }) {
	console.log(request);
	return new Response("hi");
}
