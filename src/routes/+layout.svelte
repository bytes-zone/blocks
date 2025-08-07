<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { JazzSvelteProvider } from 'jazz-tools/svelte';
	import { MyAccount } from '$lib/schema';
	import Header from '$lib/components/Header.svelte';

	let sync = { peer: 'wss://cloud.jazz.tools/?key=you@example.com' };
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<JazzSvelteProvider {sync} AccountSchema={MyAccount}>
	<Header />
	{@render children?.()}
</JazzSvelteProvider>
