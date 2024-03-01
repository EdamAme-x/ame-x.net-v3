import { Alert, AlertDescription, AlertTitle } from "@/src/components/ui/alert";
import { SunIcon } from "@radix-ui/react-icons";

export function RecordCard() {
	return (
			<Alert>
				<SunIcon className="h-4 w-4" />
				<AlertTitle className="font-bold mb-2">What do I have achievement ?</AlertTitle>
				<AlertDescription className="text-xs md:text-sm my-1">I have achivement in operating a service that serves 5,000 people a day.</AlertDescription>
				<AlertDescription className="text-xs md:text-sm my-1">The OSS I created has been used by people.</AlertDescription>
			</Alert>
	);
}
