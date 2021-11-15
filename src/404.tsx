import { Meta } from 'solid-meta';
import { Link as A } from 'solid-app-router';
import styles from './styles/404.module.scss'

export default function NotFound() {
	// FIXME: This needs to return a 404.
	// TODO: Make this look nicer
	return (
		<main class=''>
			<section class=''>
				<Meta name='robots' content='noindex follow' />
				<h1 class=''>404: Not Found</h1>
				<p class=''>
					Couldn't find the page.
					<br />
					Did you type the URL wrong?
					<br />
				</p>
				<A
					href='/'
					class={styles['textCenter']}>
					Homepage
				</A>
			</section>
		</main>
	);
}
