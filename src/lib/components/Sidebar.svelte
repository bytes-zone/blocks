<script lang="ts">
  import { Account } from '$lib/schema/account';
  import { CirclePlus, Grid2x2, House, Icon, Inbox, LogOut, MapPlus } from '@lucide/svelte';
  import { AccountCoState } from 'jazz-tools/svelte';
  import { page } from '$app/state';
  import QuickAdd from './QuickAdd.svelte';
  import AreaForm from './AreaForm.svelte';
  import Grid_2x2Plus from '@lucide/svelte/icons/grid-2x2-plus';

  let account = new AccountCoState(Account, {
    resolve: {
      profile: true,
      root: {
        inbox: { $each: true },
        areas: {
          $each: {
            title: true,
            projects: { $each: true },
          },
        },
      },
    },
  });

  let root = $derived(account.current?.root);

  let quickAdd: HTMLDialogElement;
  let newArea: HTMLDialogElement;
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
        <CurrentIcon class="w-5 {iconColor}" aria-hidden="true" />
        {label}
      </div>
      <div class="text-surface-700-300">{rhs}</div>
    </a>
  </li>
{/snippet}

<header
  class="flex min-h-screen w-xs flex-col border-r border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950"
>
  <div class="flex grow-1 flex-col gap-6 py-4">
    <nav aria-label="primary">
      <ol class="flex flex-col gap-2">
        {@render link('/', 'Home', page.route.id === '/', House, 'text-surface-300-700')}

        {@render link(
          '/inbox',
          'Inbox',
          page.route.id === '/inbox',
          Inbox,
          'text-primary-300-700',
          root?.inbox && root.inbox.length > 0 ? root.inbox.length.toString() : '',
        )}
      </ol>
    </nav>

    <nav aria-label="areas">
      {#if !root?.areas}
        <div class="flex flex-col gap-2">
          {#each { length: 5 }}
            <div class="mx-2 h-4 placeholder animate-pulse py-1"></div>
          {/each}
        </div>
      {:else}
        <ol class="flex flex-col gap-4">
          {#each root.areas as area (area.id)}
            {@render link(
              `/area/${area.id}`,
              area.title?.toString(),
              page.route.id === `/area/${area.id}`,
              Grid2x2,
              'text-surface-300-700',
              area.projects.length > 0 ? area.projects.length.toString() : '',
            )}
          {/each}
        </ol>
      {/if}
    </nav>
  </div>
  <div
    class="flex shrink-1 items-center justify-between border-t border-gray-200 bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900"
  >
    <button class="btn" onclick={() => quickAdd.showModal()}>
      <CirclePlus class="w-4 text-success-500" aria-hidden="true" />
      <span class="sr-only">Add item</span>
    </button>

    <button class="btn" onclick={() => newArea.showModal()}>
      <Grid_2x2Plus class="w-4 text-success-500" aria-hidden="true" />
      <span class="sr-only">Add area</span>
    </button>

    {#if root && account.isAuthenticated}
      <button type="button" class="btn-icon btn" onclick={() => account.logOut()}>
        <span class="sr-only">Log out</span>
        <LogOut class="text-surface-500" aria-hidden="true" />
      </button>
    {:else}
      Not signed in!
    {/if}
  </div>
</header>

<dialog
  bind:this={quickAdd}
  closedby="any"
  class="top-1/2 left-1/2 -translate-1/2 rounded-container"
>
  <QuickAdd
    onadd={(task) => {
      if (root?.inbox) root.inbox.push(task);
      quickAdd.close();
    }}
  />
</dialog>

<dialog
  bind:this={newArea}
  closedby="any"
  class="top-1/2 left-1/2 -translate-1/2 rounded-container"
>
  <AreaForm
    onsave={(area) => {
      if (root?.areas) root.areas.push(area);
      newArea.close();
    }}
  />
</dialog>
