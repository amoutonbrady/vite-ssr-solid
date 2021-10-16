import { hydrate } from 'solid-js/web';
import Browser from './Browser';

hydrate(() => <Browser />, document.getElementById('app')!);
