import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { CubeIcon } from "@radix-ui/react-icons";

export function WhoamiCard() {
	return (
		<>
			<Alert>
				<CubeIcon className="h-4 w-4" />
				<AlertTitle>Who am i?</AlertTitle>
				<AlertDescription>I'm a Web Developer, FullStack Developer & OSS Developer</AlertDescription>
			</Alert>
		</>
	);
}
