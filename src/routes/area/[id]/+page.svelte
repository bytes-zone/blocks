<script lang="ts">
  import { page } from '$app/state';
  import { Area } from '$lib/schema/area';
  import { Archive, ArchiveRestore, Ellipsis } from '@lucide/svelte';
  import Grid_2x2 from '@lucide/svelte/icons/grid-2x2';
  import { CoState } from 'jazz-tools/svelte';
  import MenuPopover from '$lib/components/MenuPopover.svelte';
  import Button from '$lib/components/Button.svelte';

  let state = $derived(
    new CoState(Area, page.params.id, {
      resolve: {
        title: true,
        notes: true,
        projects: { $each: true },
      },
    }),
  );

  let id = $props.id();
  let optionsId = `options-${id}`;

  let area = $derived(state.current);
</script>

{#if area === undefined}
  <p>Loading…</p>
{:else if area === null}
  <p>Area not found or unaccessible by your account.</p>
{:else}
  <div class="area">
    <h1>
      <Grid_2x2 aria-hidden="true" size="0.9em" />
      <span class:line-through={area.archived}>{area.title}</span>
      <Button popovertarget={optionsId}>
        <Ellipsis aria-hidden="true" />
        <span class="sr-only">Options</span>
      </Button>
    </h1>
    <p>{area.notes.toString() || 'No notes'}</p>
  </div>

  <MenuPopover id={optionsId}>
    {#if !area.archived}
      <Button onclick={() => area.$jazz.set('archived', new Date())}>
        <Archive />
        Archive {area.title}
      </Button>
    {:else}
      <Button onclick={() => area.$jazz.delete('archived')}>
        <ArchiveRestore />
        Restore {area.title}
      </Button>
    {/if}
  </MenuPopover>
{/if}

<style>
  .area {
    display: flex;
    flex-direction: column;
    gap: var(--between-items);
  }

  h1 {
    display: flex;
    align-items: center;
    gap: var(--between-items);
    font-size: var(--font-size-6);
    max-inline-size: var(--size-header-3);
  }
</style>
