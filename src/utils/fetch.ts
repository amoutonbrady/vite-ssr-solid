import nFetch from 'node-fetch';
import { isServer } from 'solid-js/web';
// TODO: Custom Fetch to shortcircuit the server
//* https://www.semicolonworld.com/question/46552/is-it-possible-to-call-express-router-directly-from-code-with-a-ldquo-fake-rdquo-request
export default isServer ? nFetch : fetch;
