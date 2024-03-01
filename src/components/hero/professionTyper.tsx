import { TypeAnimation } from "react-type-animation";

export function ProfessionTyper() {
	return (
		<>
			<TypeAnimation
				sequence={[
					"We produce food for Mice",
					1000,
					"We produce food for Hamsters",
					1000,
					"We produce food for Guinea Pigs",
					1000,
					"We produce food for Chinchillas",
					1000,
				]}
				wrapper="span"
				speed={50}
				style={{ fontSize: "2em", display: "inline-block" }}
				repeat={Infinity}
			/>
		</>
	);
}
