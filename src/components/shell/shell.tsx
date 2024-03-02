import { Fragment, useEffect, useState } from "react";
import { isClient } from "./isClient.ts";
import { parseCurlToRequest } from "./parseCurlToFetch.ts";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import Terminal, { ColorMode, TerminalOutput } from "react-terminal-ui";
import { Card } from "@/src/components/ui/card";

hljs.registerLanguage("json", json);

export function Shell() {
	return (
		<div className="w-full h-[0px] md:h-[410px]">
			<ShellTerminal />
		</div>
	);
}

function ShellTerminal() {
	const [terminalLineData, setTerminalLineData] = useState([
		<Fragment key={0}>
			<TerminalOutput>{`Welcome to the Amex Shell!\nhelp can be found at \`$ help\``}</TerminalOutput>
		</Fragment>,
	]);

	const [width, setWidth] = useState(0);

	useEffect(() => {
		setWidth(window.innerWidth);
		window.addEventListener("resize", () => {
			setWidth(window.innerWidth);
		});
	}, []);

	if (width < 768) {
		return <></>;
	}

	let latestCommand: string | false =
		typeof terminalLineData[terminalLineData.length - 1]?.props.children.props.children === "string" &&
		terminalLineData[terminalLineData.length - 1]?.props.children.props.children.startsWith("$")
			? terminalLineData[terminalLineData.length - 1]?.props.children.props.children
			: false;
	if (latestCommand) {
		const latestCommandArray = latestCommand.split("$ ").reverse();
		latestCommandArray.pop();
		latestCommand = latestCommandArray.reverse().join("$ ");

		switch (latestCommand.split(" ")[0]) {
			case "clear":
				setTerminalLineData([
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{"Welcome to the Amex Shell!\nhelp can be found at `$ help`"}</TerminalOutput>
					</Fragment>,
				]);
				break;
			case "cowsay":
				const cowsayArray = latestCommand.split("cowsay ");
				cowsayArray.shift();
				const cowsay = cowsayArray.join("cowsay ");
				const len = cowsay.length;

				if (len > 20) {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`Amex shell: ${len} length is too long :(`}</TerminalOutput>
						</Fragment>,
					]);
					break;
				}

				const base = `cowsay ${cowsay}
${" " + `-`.repeat(len + 2)}
< ${cowsay} >
${" " + `-`.repeat(len + 2)}
        \\   ^__^    
         \\  (oo)\\_______    
            (__)\\       )\\/\\    
               ||----w |   
               ||     ||    `;

				setTerminalLineData([
					...terminalLineData,
					...base.split("\n").map((line, index) => (
						<Fragment key={terminalLineData.length + 1 + index}>
							<TerminalOutput>{line}</TerminalOutput>
						</Fragment>
					)),
				]);

				break;
			case "deno":
			case "bun":
			case "node":
				const code = latestCommand.split(" ");
				code.shift();

				if (code.join(" ").trim() === "") {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`Amex shell: e.g.: \`${
								latestCommand.split(" ")[0]
							}  11 * 199\` :(`}</TerminalOutput>
						</Fragment>,
					]);
					break;
				}

				let result = "";
				try {
					result = new Function("return " + code.join(" "))();
				} catch (e) {
					result = "Error :(";
					result += `\ne.g.: \`${latestCommand.split(" ")[0]}  11 * 199\` :(`;
				}

				try {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`fake ${latestCommand.split(" ")[0]} version: -1.0 :(`}</TerminalOutput>
						</Fragment>,
						<Fragment key={terminalLineData.length + 2}>
							<TerminalOutput>{result.toString()}</TerminalOutput>
						</Fragment>,
					]);
				} catch {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`unknown error`}</TerminalOutput>
						</Fragment>,
					]);
				}

				break;
			case "reload":
				window.location.reload();
				break;
			case "echo":
				const echoArray = latestCommand.split("echo ");
				echoArray.shift();
				const echo = echoArray.join("echo ");
				setTerminalLineData([
					...terminalLineData,
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{echo}</TerminalOutput>
					</Fragment>,
				]);

				break;
			case "whoami":
				setTerminalLineData([
					...terminalLineData,
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{window.navigator.userAgent}</TerminalOutput>
					</Fragment>,
				]);
				break;
			case "curl":
				const curlText = latestCommand;
				let req: Request = new Request("https://ame-x.net", {});

				try {
					req = parseCurlToRequest(curlText);
				} catch (_e) {
					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{`Amex shell: \`${curlText}\` is in a wrong format :(`}</TerminalOutput>
						</Fragment>,
					]);
					break;
				}

				fetch(req.url, {
					...req,
				})
					.then(res => {
						if (res.ok) {
							res.text().then(text => {
								try {
									const result = JSON.parse(text);

									setTerminalLineData([
										...terminalLineData,
										<Fragment key={terminalLineData.length + 1}>
											<TerminalOutput>
												<div
													dangerouslySetInnerHTML={{
														__html: hljs.highlight(JSON.stringify(result, null, 2), {
															language: "json",
														}).value,
													}}
												></div>
											</TerminalOutput>
										</Fragment>,
									]);
								} catch (_e) {
									setTerminalLineData([
										...terminalLineData,
										<Fragment key={terminalLineData.length + 1}>
											<TerminalOutput>{text}</TerminalOutput>
										</Fragment>,
									]);
								}
							});
						} else {
							setTerminalLineData([
								...terminalLineData,
								<Fragment key={terminalLineData.length + 1}>
									<TerminalOutput>{`Amex shell: bad status code: ${res.status} :(`}</TerminalOutput>
								</Fragment>,
							]);
						}
					})
					.catch(_e => {
						setTerminalLineData([
							...terminalLineData,
							<Fragment key={terminalLineData.length + 1}>
								<TerminalOutput>{`Amex shell: ANY ERROR ;; (CORS, Redirect, 404, etc...)`}</TerminalOutput>
							</Fragment>,
						]);
					});

				break;
			case "help":
				const helps: {
					name: string;
					description: string;
				}[] = [
					{
						name: "curl",
						description: "communication with url command",
					},
					{
						name: "whoami",
						description: "who am I (show IP)",
					},
					{
						name: "reload",
						description: "reload the page",
					},
					{
						name: "echo",
						description: "echo <text>",
					},
					{
						name: "help",
						description: "show help",
					},
					{
						name: "cowsay <text>",
						description: "Let the cow ASCII art speak",
					},
					{
						name: "node",
						description: "node <script> (as (deno|bun))",
					},
				];
				setTerminalLineData([
					...terminalLineData,
					...helps.map((help, i) => {
						return (
							<Fragment key={terminalLineData.length + i + 1}>
								<TerminalOutput>{` \$ ${help.name} - ${help.description}`}</TerminalOutput>
							</Fragment>
						);
					}),
					<Fragment key={terminalLineData.length + helps.length + 1}>
						<TerminalOutput>{` Please send feature requests to @amex2189 :)`}</TerminalOutput>
					</Fragment>,
				]);
				break;
			default:
				setTerminalLineData([
					...terminalLineData,
					<Fragment key={terminalLineData.length + 1}>
						<TerminalOutput>{`Amex shell: ${latestCommand.split(" ")[0]} is 404 :(`}</TerminalOutput>
					</Fragment>,
				]);
				break;
		}
	}

	const uuid = `scoped_${crypto.randomUUID()}`;
	const height = "300px";

	return (
		<Card className={"container w-3/4 h-[" + height + "] overflow-y-none opacity-75"} id={uuid}>
			<Terminal
				name="Amex Shell"
				colorMode={ColorMode.Dark}
				onInput={terminalInput => {
					if (terminalInput.trim() === "") {
						return;
					}

					setTerminalLineData([
						...terminalLineData,
						<Fragment key={terminalLineData.length + 1}>
							<TerminalOutput>{"$ " + terminalInput}</TerminalOutput>
						</Fragment>,
					]);
				}}
				prompt={"$"}
				startingInputValue={
					"curl -X GET " + (!isClient() ? "https://localhost" : window.location.origin) + "/api/myinfo"
				}
				height={height}
			>
				{terminalLineData}
			</Terminal>
			<style>
				{`
						#${uuid} {
							border: 2.5px solid transparent;
  							border-image: linear-gradient(to bottom right, #b827fccc 0%, #2c90fccc 25%, #b8fd33cc 50%, #fec837cc 75%, #fd1892cc 100%);
							border-image-slice: 1;
						}

						#${uuid} .react-terminal-wrapper {
							background: var(--background) !important;
							color: var(--foreground) !important;
						}

						#${uuid} .react-terminal-line {
							opacity: 1 !important;
						}
					`}
			</style>
		</Card>
	);
}
