import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import { useEffect, useState } from "react";

hljs.registerLanguage("typescript", typescript);

let base = `import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
    return c.text('Welcome to Amex Net!');
});

export default app;
`;

let index = 0;
let lastindex = base.length - 1;

export function EditorTyper() {
	const [code, setCode] = useState("");

	const highlightedCode = hljs.highlight(code, { language: "typescript" }).value;

	useEffect(() => {
		if (index > lastindex) {
			return;
		}

		const intervalId = setTimeout(() => {
			index++;
			setCode(base.slice(0, index));
		}, 25 * Math.random());

		return () => {
			clearTimeout(intervalId);
		};
	}, [code]);

	return (
		<div
			className="backdrop-blur-lg bg-white/1 rounded-lg shadow-lg dark:shadow-xl dark:shadow-white/10 px-3 py-2 h-full overflow-x-hidden"
			dangerouslySetInnerHTML={{
				__html: `<pre><code class="language-typescript">${highlightedCode}</code></pre>`,
			}}
		></div>
	);
}
