<script lang="ts">
  import { Account } from '$lib/schema';
  import { AccountCoState, usePasskeyAuth } from 'jazz-tools/svelte';
  import { page } from '$app/state';

  let { appName = 'Blocks' } = $props();
  const account = new AccountCoState(Account);

  const { current, state } = $derived(usePasskeyAuth({ appName }));

  const isAuthenticated = $derived(state === 'signedIn');
</script>

{#snippet link(path: string, caption: string)}
  <a
    href={path}
    class="anchor"
    class:underline={page.url.pathname === path}
    aria-current={page.url.pathname === path}>{caption}</a
  >
{/snippet}

<header>
  <nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
    <div class="lg:flex lg:gap-x-12">
      {@render link('/', 'Home')}
      {#if isAuthenticated}
        {@render link('/account', 'Account')}
      {/if}
    </div>
    <div class="lg:flex lg:flex-1 lg:justify-end">
      {#if !isAuthenticated}
        <button
          onclick={() => current.logIn()}
          type="button"
          class="btn hover:preset-tonal-primary"
        >
          Log in
        </button>

        <button
          onclick={() => current.signUp('')}
          type="button"
          class="btn hover:preset-tonal-primary"
        >
          Sign Up
        </button>
      {:else}
        <button
          onclick={() => account.logOut()}
          type="button"
          class="btn hover:preset-tonal-primary"
        >
          Log out
        </button>
      {/if}
    </div>
  </nav>
</header>
