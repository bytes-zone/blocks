<script lang="ts">
  import { Account } from '$lib/schema';
  import { AccountCoState, usePasskeyAuth } from 'jazz-tools/svelte';
  import { page } from '$app/state';
  import QuickAdd from './QuickAdd.svelte';
  import { createFromDraft, type DraftTask } from '$lib/schema/task';

  let { appName = 'Blocks' } = $props();

  const account = new AccountCoState(Account, {
    resolve: {
      root: {
        inbox: {
          $each: true,
        },
      },
    },
  });

  const inbox = $derived(account.current?.root?.inbox);

  function addTask(task: DraftTask) {
    inbox?.push(createFromDraft(task));
  }

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
  <nav aria-label="Global" class="mx-auto flex max-w-7xl justify-between p-2 lg:px-8">
    <div class="lg:flex lg:items-center lg:gap-x-6">
      {@render link('/', 'Home')}
      {@render link('/inbox', `Inbox (${account.current?.root?.inbox?.length ?? 0})`)}
      <QuickAdd {addTask} />
    </div>
    <div class="lg:flex lg:items-center lg:justify-end lg:gap-x-6">
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
        {@render link('/account', 'Account')}

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
