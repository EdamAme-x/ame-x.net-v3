import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from '@tsparticles/slim';
import ParticleOptions from "./particles.json";
import { useState, useEffect } from "react";

export function BackgroundNyanCatParticle() {
	const [init, setInit] = useState(false);

	useEffect(() => {
		initParticlesEngine(async engine => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	return init && <Particles id="tsparticles" options={ParticleOptions as any} className="absolute z-[-1]" />;
}