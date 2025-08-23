<script lang="ts">
  import { Account } from '$lib/schema/account';
  import { LogOut } from '@lucide/svelte';
  import { AccountCoState } from 'jazz-tools/svelte';

  let account = new AccountCoState(Account, { resolve: { profile: true } });
</script>

<div
  class="flex min-h-screen w-xs flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
>
  <div class="grow-1 p-4">
    <p>Hey</p>
  </div>
  <div
    class="flex shrink-1 items-center justify-between border-t border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900"
  >
    {#if account.current}
      <p>
        Logged in as {account.current.profile.name}
      </p>
      <button class="btn-icon btn" onclick={() => account.logOut()}>
        <span class="sr-only">Log out</span>
        <LogOut class="text-surface-500" />
      </button>
    {:else}
      Currently anonymous!
    {/if}
  </div>
</div>
