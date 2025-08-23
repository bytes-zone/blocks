<script lang="ts">
  import { Account } from '$lib/schema/account';
  import { Icon, Inbox, LogOut } from '@lucide/svelte';
  import { AccountCoState } from 'jazz-tools/svelte';
  import { page } from '$app/state';

  let account = new AccountCoState(Account, {
    resolve: { profile: true, root: { inbox: true } },
  });
</script>

{#snippet link(
  url: string,
  label: string,
  active: boolean,
  icon: typeof Icon,
  iconColor: string,
  rhs: string = '',
)}
  {@const CurrentIcon = icon}
  <li class="px-4 py-1" class:bg-primary-50-950={active}>
    <a href={url} class="flex w-full cursor-pointer items-center justify-between">
      <div class="flex gap-2">
        <CurrentIcon class="w-5 {iconColor}" />
        {label}
      </div>
      <div class="text-surface-700-300">{rhs}</div>
    </a>
  </li>
{/snippet}

<div
  class="flex min-h-screen w-xs flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
>
  <div class="grow-1 py-4">
    <nav aria-label="primary">
      <ol class="flex flex-col gap-2">
        {@render link(
          '/inbox',
          'Inbox',
          page.route.id === '/inbox',
          Inbox,
          'text-primary-300-700',
          account.current?.root?.inbox && account.current.root.inbox.length > 0
            ? account.current.root.inbox.length.toString()
            : '',
        )}
      </ol>
    </nav>
  </div>
  <div
    class="flex shrink-1 items-center justify-between border-t border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900"
  >
    {#if account.current && account.isAuthenticated}
      <p>
        Logged in as {account.current.profile.name}
      </p>
      <button class="btn-icon btn" onclick={() => account.logOut()}>
        <span class="sr-only">Log out</span>
        <LogOut class="text-surface-500" />
      </button>
    {:else}
      Not signed in!
    {/if}
  </div>
</div>
