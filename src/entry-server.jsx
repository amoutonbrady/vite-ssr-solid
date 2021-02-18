import { renderToString } from "solid-js/web";
import { App } from "./app.tsx";

export function render() {
  return renderToString(() => <App />);
}
