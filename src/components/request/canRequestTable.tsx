import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";

const canRequestTableData = [
	{
		title: "Web Development",
		priority: "High",
		speed: "Fast",
		amount: "$0.00 ~",
	},
    {
		title: "Library Development",
		priority: "Low",
		speed: "Fast",
		amount: "$25.00 ~",
	},
    {
        title: "OSS Development",
        priority: "Medium",
        speed: "Slow",
        amount: "$10.00 ~",
    },

    {
        title: "Desktop Development",
        priority: "Medium",
        speed: "Slow",
        amount: "$50.00 ~",
    },
    {
        title: "Advice",
        priority: "High",
        speed: "Fast",
        amount: "$0.00 ~",
    },
    {
        title: "Private Request",
        priority: "High",
        speed: "Fast",
        amount: "$200.00 ~",
    }
];

export default function canRequestTable() {
	return (
		<>
			<Table>
				<TableCaption>A list of what you can request</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[150px]">Title</TableHead>
						<TableHead>Priority</TableHead>
						<TableHead>Speed</TableHead>
						<TableHead className="text-right">Amount</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{canRequestTableData.map((data, index) => (
						<TableRow key={index}>
							<TableCell className="font-medium px-1">{data.title}</TableCell>
							<TableCell>{data.priority}</TableCell>
							<TableCell>{data.speed}</TableCell>
							<TableCell className="text-right">{data.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
