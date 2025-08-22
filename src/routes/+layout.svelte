<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.svg';
  import { JazzSvelteProvider } from 'jazz-tools/svelte';
  import { Account } from '$lib/schema/account';
  import AuthGate from '$lib/components/AuthGate.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';

  let sync = { peer: 'wss://cloud.jazz.tools/?key=blockstodo@brianthicks.com' };
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<JazzSvelteProvider {sync} AccountSchema={Account}>
  <AuthGate>
    <div class="flex gap-4">
      <Sidebar />
      <main class="mx-auto max-w-7xl p-2 lg:px-8">
        {@render children?.()}
      </main>
    </div>
  </AuthGate>
</JazzSvelteProvider>
