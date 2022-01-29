<script>
	import Router from 'svelte-spa-router';
	import routes from './router/routes.js';
	import { SvelteToast } from '@zerodevx/svelte-toast'

	const app = new SvelteToast({
		target: document.body,
		props: {
			options: {
				duration: 3000,
			}
		}
	});
</script>

<Router {routes} />

<main>
	
</main>

<style>
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>