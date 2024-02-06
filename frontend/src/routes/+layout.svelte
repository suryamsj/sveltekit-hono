<script>
	import '@picocss/pico/css/pico.min.css';
	import '../global.css';
	import Theme from '$lib/components/Theme.svelte';
</script>

<svelte:head>
	<title>Sveltekit with Hono JS</title>
</svelte:head>

<main class="container">
	<slot />

	<Theme />
</main>
