<script lang="ts">
  import { page } from '$app/state';
  import favicon from '$lib/assets/favicon.svg';
  import AuthGate from '$lib/components/AuthGate.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { Account } from '$lib/schema/account';
  import type { SyncConfig } from 'jazz-tools';
  import { JazzSvelteProvider } from 'jazz-tools/svelte';
  import '../app.css';

  let demo = page.url.searchParams.has('demo');
  let sync: SyncConfig = {
    peer: 'wss://cloud.jazz.tools/?key=blockstodo@brianthicks.com',
    when: demo ? 'signedUp' : 'never',
  };
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<JazzSvelteProvider {sync} AccountSchema={Account}>
  <AuthGate allowAnonymous={demo}>
    <div class="flex gap-4">
      <Sidebar />
      <main class="mx-auto max-w-7xl p-2 lg:px-8">
        {@render children?.()}
      </main>
    </div>
  </AuthGate>
</JazzSvelteProvider>
