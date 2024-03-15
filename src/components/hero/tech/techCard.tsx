import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";
import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from "react";

export function TechCard() {
	const [hev, setHev] = useState(-100);

	useEffect(() => {
		if (hev === 0) {
			return;
		}

		const intervalId = setTimeout(
			() => {
				setHev(hev + 2);
			},
			25 - hev / 5,
		);

		return () => {
			clearTimeout(intervalId);
		};
	}, [hev]);

	return (
		<Card className="w-full h-4/5 sm:h-3/4 min-h-[400px] bg-transparent backdrop-blur-sm">
			<CardHeader>
				<CardTitle className="inline-flex gap-x-2">Technologies</CardTitle>
			</CardHeader>
			<CardContent className="w-full flex flex-col justify-center items-center gap-y-3">
				<div className="flex gap-x-4 w-full">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/denojs/denojs-original.svg"
						width="60"
						alt="deno icon"
						className="bg-white rounded-full"
					/>
					<div className="w-full flex flex-col justify-around items-start">
						<p className="text-lg">Deno</p>
						<Progress value={90 + hev} className="w-full" />
					</div>
				</div>
				<div className="flex gap-x-4 w-full">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
						width="60"
						alt="typescript icon"
						className="rounded-md"
					/>
					<div className="w-full flex flex-col justify-around items-start">
						<p className="text-lg">TypeScript</p>
						<Progress value={80 + hev} className="w-full" />
					</div>
				</div>
				<div className="flex gap-x-4 w-full">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
						width="60"
						alt="react icon"
					/>
					<div className="w-full flex flex-col justify-around items-start">
						<p className="text-lg">React</p>
						<Progress value={85 + hev} className="w-full" />
					</div>
				</div>
				<div className="flex gap-x-4 w-full">
					<img src="https://github.com/honojs.png" width="60" alt="hono icon" />
					<div className="w-full flex flex-col justify-around items-start">
						<p className="text-lg">Hono</p>
						<Progress value={95 + hev} className="w-full" />
					</div>
				</div>
				<a href="/projects">
					<Button variant="outline">See more</Button>
				</a>
			</CardContent>
		</Card>
	);
}
