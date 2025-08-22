<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { JazzSvelteProvider } from 'jazz-tools/svelte';
  import { Account } from '$lib/schema/account';
  import Header from '$lib/components/Header.svelte';

  let sync = { peer: 'wss://cloud.jazz.tools/?key=blockstodo@brianthicks.com' };
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<JazzSvelteProvider {sync} AccountSchema={Account}>
  <Header />
  <main class="mx-auto max-w-7xl p-2 lg:px-8">
    {@render children?.()}
  </main>
</JazzSvelteProvider>
