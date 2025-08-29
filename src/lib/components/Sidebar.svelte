<script lang="ts">
  import { Account } from '$lib/schema/account';
  import { CirclePlus, Grid2x2, House, Icon, Inbox, LogOut } from '@lucide/svelte';
  import { AccountCoState } from 'jazz-tools/svelte';
  import { page } from '$app/state';
  import QuickAdd from './QuickAdd.svelte';
  import AreaForm from './AreaForm.svelte';
  import Grid_2x2Plus from '@lucide/svelte/icons/grid-2x2-plus';
  import { popover } from '$lib/popover';
  import SidebarLink from './SidebarLink.svelte';

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

  let id = $props.id();
  let addId = `add-${id}`;
</script>

<header>
  <div class="menu">
    <nav aria-label="primary">
      <ol>
        <SidebarLink
          href="/"
          label="Home"
          active={page.route.id === '/'}
          icon={House}
          iconColorDark="--gray-4"
          iconColorLight="--gray-8"
        />

        <SidebarLink
          href="/inbox"
          label="Inbox"
          active={page.route.id === '/inbox'}
          icon={Inbox}
          iconColor="--blue-6"
        />
      </ol>
    </nav>

    <nav aria-label="areas">
      {#if root?.areas}
        <ol>
          {#each root.areas.filter((area) => !area.archived) as area (area.$jazz.id)}
            <SidebarLink
              href={`/area/${area.$jazz.id}`}
              label={area.title?.toString()}
              active={page.route.id === '/area/[id]' && page.params.id === area.$jazz.id}
              icon={Grid2x2}
              iconColorDark="--gray-8"
              iconColorLight="--gray-4"
              rhs={area.projects.length > 0 ? area.projects.length.toString() : ''}
            />
          {/each}
        </ol>
      {/if}
    </nav>
  </div>
  <div class="actions shrink-1">
    <button popovertarget={addId}>
      <!-- intent: green -->
      <CirclePlus aria-hidden="true" />
      <span class="sr-only">New item</span>
    </button>

    {#if root && account.isAuthenticated}
      <button type="button" class="btn-icon btn" onclick={() => account.logOut()}>
        <!-- intent: mid-gray -->
        <LogOut aria-hidden="true" />
        <span class="sr-only">Log out</span>
      </button>
    {:else}
      Not signed in!
    {/if}
  </div>
</header>

<div id={addId} class="rounded-base" {@attach popover}>
  <div class="flex flex-col gap-2 p-2">
    <button class="btn" onclick={() => quickAdd.showModal()}>
      <Inbox class="w-4 text-success-500" aria-hidden="true" />
      Quick add
    </button>

    <button class="btn" onclick={() => newArea.showModal()}>
      <Grid_2x2Plus class="w-4 text-success-500" aria-hidden="true" />
      Add area
    </button>
  </div>
</div>

<dialog
  bind:this={quickAdd}
  closedby="any"
  class="top-1/2 left-1/2 -translate-1/2 rounded-container"
>
  <QuickAdd
    onadd={(task) => {
      if (root?.inbox) root.inbox.$jazz.push(task);
      quickAdd.close();
    }}
  />
</dialog>

<dialog
  bind:this={newArea}
  closedby="any"
  class="top-1/2 left-1/2 -translate-1/2 rounded-container p-4"
>
  <AreaForm
    onsave={(area) => {
      if (root?.areas) root.areas.$jazz.push(area);
      newArea.close();
    }}
  />
</dialog>

<style>
  header {
    min-height: 100vh;
    width: var(--size-xs);

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    border-right: 1px solid light-dark(var(--gray-2), var(--gray-10));
    background: light-dark(var(--gray-1), var(--gray-11));

    & > .menu {
      display: flex;
      flex-direction: column;
      gap: var(--size-4);
      padding-top: var(--size-4);
    }

    & > .actions {
      display: flex;
      justify-content: space-between;
      background: light-dark(var(--gray-2), var(--gray-10));
      padding: var(--size-2);
    }
  }

  nav > ol {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);

    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
