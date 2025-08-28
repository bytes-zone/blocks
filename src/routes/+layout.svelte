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
    <div class="panes">
      <Sidebar />
      <main>
        {@render children?.()}
      </main>
    </div>
  </AuthGate>
</JazzSvelteProvider>

<style>
  .panes {
    display: flex;
    flex-direction: row;
    gap: var(--size-4);
  }

  main {
    margin: 0 auto;
    max-width: var(--size-content-3);
    padding: var(--size-4);

    @media (--lg-n-above) {
      min-width: var(--size-sm);
      padding: var(--size-8) var(--size-8) 0;
    }
  }

  :global(.sr-only) {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
