import { renderToString, generateHydrationScript } from "solid-js/web";
import { renderTags } from "solid-meta";
import Server, { TagDescription } from "./Server";

export function render(url: string) {
  let tags: TagDescription[] = [];
  const body = renderToString(() => <Server tags={tags} />);
  const hydration = generateHydrationScript();
  const head = renderTags(tags);
  return {
    head,
    hydration,
    body,
  };
}
