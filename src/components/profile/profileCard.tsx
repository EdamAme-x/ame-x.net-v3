import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Separator } from "@/src/components/ui/separator";
import { useEffect, useState } from "react";
import { parseNumWithSplit } from "./parseNumWithSplit";
import { Timeline } from "./timeline";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import ParticleOptions from "./particles.json"
import { Badge } from "@/src/components/ui/badge";

function Particle() {
    const [ init, setInit ] = useState(false);

	useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    return (
         init && <Particles
            id="tsparticles"
            options={ParticleOptions as any}
			className="absolute z-[-2]"
        />
	);
};

const nitter = "https://nitter.mint.lgbt/amex2189";
const zenn = "https://zenn.dev/ame_x";
const github = "https://api.github.com/users/EdamAme-x";

export function ProfileCard() {
	const [following, setFollowing] = useState(0);

	const fetchFollowing = async () => {
		if (localStorage.getItem("_cache_following") !== null) {
			const object = JSON.parse(localStorage._cache_following);
			if (object.date + 12 * 60 * 60 * 1000 > Date.now()) {
				console.log("%c[Cache] Use cache", "color: #bada55; font-weight: bold;");
				setFollowing(parseInt(object.value.replace(/\,/g, "")) ?? "0");
				return;
			}
		}

		const nitterRes = await fetch("/api/proxy?url=" + encodeURIComponent(nitter));
		const nitterDOM = new DOMParser().parseFromString(await nitterRes.text(), "text/html");

		const nitterFollowing = parseInt(
			(
				nitterDOM.querySelector(
					"body > div > div > div.profile-tab.sticky > div > div.profile-card-extra > div.profile-card-extra-links > ul > a:nth-child(3) > li > span.profile-stat-num",
				)?.innerHTML ?? "2189"
			).replace(/\,/g, ""),
		);

		const zennRes = await fetch("/api/proxy?url=" + zenn);
		const zennDOM = new DOMParser().parseFromString(await zennRes.text(), "text/html");

		const zennFollowing =
			parseInt(
				(
					zennDOM.querySelector(
						"#__next > header:nth-child(2) > div > div > div > div > div > button:nth-child(2) > span",
					)?.innerHTML ?? "2189"
				).replace(/\,/g, ""),
			) +
			parseInt(
				(
					document.querySelector(
						"#__next > header:nth-child(2) > div > div > div > div > div > button:nth-child(1) > span",
					)?.innerHTML ?? "2189"
				).replace(/\,/g, ""),
			);

		const githubRes = await fetch(github);
		const githubFollowing = parseInt((await githubRes.json()).followers);

		localStorage.setItem(
			"_cache_following",
			JSON.stringify({
				value: parseNumWithSplit(following + nitterFollowing + zennFollowing + githubFollowing),
				date: Date.now(),
			}),
		);

		console.log("%c[Cache] Update cache", "color: #bada55; font-weight: bold;");
		console.log(nitterFollowing, zennFollowing, githubFollowing);

		setFollowing(nitterFollowing + zennFollowing + githubFollowing);
	};

	useEffect(() => {
		fetchFollowing();
	}, []);

	return (
		<div className="w-full relative z-[2]">
			<Particle />
			<div className="w-full flex justify-between">
			<Avatar className="w-20 h-20 md:w-40 md:h-40 ml-[10%] md:ml-[15%]">
				<AvatarImage src="https://avatars.githubusercontent.com/u/121654029?v=4" alt="@EdamAme-x" />
				<AvatarFallback>AMEX</AvatarFallback>
			</Avatar>
			<a href="https://twitter.com/amex2189" target="_blank" className="w-5 h-5 md:w-20 md:h-20 pt-5 relative right-20 md:right-50">
				<Badge variant="secondary" className="text-sm md:text-lg bg-[hsl(var(--foreground))] text-[hsl(var(--background))] hover:bg-[hsl(var(--foreground))] font-medium py-2 px-5 mt-10">
					Contact
				</Badge>
			</a>
			</div>
			<Separator className="relative z-[-1] bottom-10 md:bottom-20" />
			<div className="w-full min-h-[75vh] relative bottom-10 md:bottom-20 z-[-1] pt-10 md:pt-20 bg-card">
				<h1 className="text-3xl font-bold ml-[10%] md:ml-[15%]">
					Ame-x <span className="text-gray-400 font-normal text-sm">(@amex2189)</span>
				</h1>
				<div className="ml-[10%] md:ml-[15%] pr-5 mx-auto h-full flex flex-col justify-center items-start">
					<div>
						<p className="mt-2 text-sm md:text-lg">
							I'm a <span className=" mx-1">Web Developer</span>,{" "}
							<span className="mx-1">FullStack Developer</span> &{" "}
							<span className="mx-1">OSS Developer</span>.
						</p>
						<p className="mt-1 text-sm md:text-md">
							Self-taught in <span className="text-yellow-400 mx-1 text-md md:text-lg">JavaScript</span>{" "}
							and <span className="text-blue-400 mx-1 text-md md:text-lg">TypeScript</span>, I develop{" "}
							<span className="text-red-400 mx-1 text-md md:text-lg">OSS, websites and tools</span>.
						</p>
					</div>
				</div>
				<div className="mt-5 ml-[10%] md:ml-[15%] flex text-sm text-gray-600 dark:text-gray-200">
					Followers: {parseNumWithSplit(following)}
				</div>
				<Separator className="my-5" />
				<div className="w-full flex justify-center items-center">
					<Timeline />
				</div>
			</div>
		</div>
	);
}
