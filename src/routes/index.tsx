import { createSignal } from 'solid-js';
import { Title, Link } from 'solid-meta';
import styles from '../styles/routes/index.module.scss';

const Index = () => {
	const [count, setCount] = createSignal(0);

	return (
		<>
			<Title>Solid.js & Vite - SSR</Title>
			<Link rel='shortcut icon' type='image/svg+xml' href='/favicon.svg' />
			<main class={styles['main']}>
				<div class={styles['core']}>
					<button class={styles['btn']} onClick={() => setCount(count() + 1)}>
						Click me
					</button>
					<p class={styles['txt']}>
						The Button Has been clicked <code>{count()}</code>{' '}
						{
							`time${count() === 1 ? '' : 's'}.`
							//? FIXME: The width of the container will snap!
						}
					</p>
				</div>
			</main>
		</>
	);
};

export default Index;
