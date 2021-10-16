import { renderToString, generateHydrationScript } from 'solid-js/web';
import { renderTags } from 'solid-meta';
import Server, { TagDescription } from './Server';

export function render(url: string, out?: object | {}) {
	let tags: TagDescription[] = [];
	const body = renderToString(() => <Server tags={tags} url={url} out={out} />);
	const hydration = generateHydrationScript();
	const head = renderTags(tags);
	return {
		head,
		hydration,
		body,
	};
}

export const handlers = import.meta.globEager('./routes/api/*.ts');
export const pages = import.meta.globEager('./routes/*.tsx');
