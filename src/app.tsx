import { createSignal } from "solid-js";

export const App = () => {
  const [count, setCount] = createSignal(0);

  return <button onClick={() => setCount(count() + 1)}>{count()}</button>;
};
