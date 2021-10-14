import { createSignal } from "solid-js";
import { Title, Link } from "solid-meta";
import favicon from "../static/favicon.svg?url";

export const App = () => {
	const [count, setCount] = createSignal(0);

	const counts = (Count: () => number): string => {
		const count = Count();
		return `${count} time${count === 1 ? "" : "s"}`;
	};

	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel="shortcut icon" type="image/svg+xml" href={favicon} />
			<div>
				<button onClick={() => setCount(count() + 1)}>Click me</button>
				<p> The Button Has been clicked {counts(count)}</p>
			</div>
		</>
	);
};

export default App;
