import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress"

export function TechCard() {
	return (
		<Card className="w-full h-4/5 sm:h-3/4 min-h-[400px] bg-transparent backdrop-blur-sm">
			<CardHeader>
				<CardTitle className="inline-flex gap-x-2">Technologies</CardTitle>
			</CardHeader>
			<CardContent className="w-full flex flex-col justify-center items-center gap-y-3">
				<div className="flex gap-x-2">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/denojs/denojs-original.svg"
						width="60"
						alt="deno icon"
						className="bg-white rounded-full"
					/>
                    <Progress />
				</div>
				<div className="flex gap-x-2">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
						width="60"
						alt="typescript icon"
						className="rounded-md"
					/>
                    <Progress />
				</div>
				<div className="flex gap-x-2">
					<img
						src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
						width="60"
						alt="react icon"
					/>
                    <Progress />
				</div>
				<div className="flex gap-x-2">
					<img src="https://github.com/honojs.png" width="60" alt="hono icon" />
                    <Progress />
				</div>
			</CardContent>
		</Card>
	);
}
