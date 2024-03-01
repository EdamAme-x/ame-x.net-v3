import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { SunIcon } from "@radix-ui/react-icons";

export function RecordCard() {
	return (
			<Alert>
				<SunIcon className="h-4 w-4" />
				<AlertTitle className="font-bold mb-2">What do I have achievement ?</AlertTitle>
				<AlertDescription className="text-xs md:text-sm my-1">I'm a Web Developer, FullStack Developer & OSS Developer.</AlertDescription>
				<AlertDescription className="text-xs md:text-sm my-1">I have experience in building web applications & useful tool.</AlertDescription>
			</Alert>
	);
}
