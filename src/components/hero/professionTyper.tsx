import { TypeAnimation } from "react-type-animation";

export function ProfessionTyper() {
	return (
		<>
			<TypeAnimation
				sequence={["Web Developer", 1500, "FullStack Developer", 1500, "OSS Developer", 2500]}
				wrapper="span"
				speed={50}
				repeat={Infinity}
			/>
		</>
	);
}
