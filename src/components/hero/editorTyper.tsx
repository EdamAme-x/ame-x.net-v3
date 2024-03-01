import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', typescript);

export function EditorTyper() {
    const highlightedCode = hljs.highlight(
        'const foo = 1;',
        { language: 'typescript' }
      ).value

	return (
        <div className="backdrop-blur-sm rounded-lg shadow-lg dark:shadow-xl dark:shadow-white/10 px-2 py-1 h-full overflow-x-hidden" dangerouslySetInnerHTML={{ __html: highlightedCode }}></div>
	);
}
