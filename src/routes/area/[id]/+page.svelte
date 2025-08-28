<script lang="ts">
  import { page } from '$app/state';
  import { Area } from '$lib/schema/area';
  import { Archive, ArchiveRestore, Ellipsis } from '@lucide/svelte';
  import Grid_2x2 from '@lucide/svelte/icons/grid-2x2';
  import { CoState } from 'jazz-tools/svelte';
  import { popover } from '$lib/popover';

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
  <div class="flex flex-col gap-4">
    <h1 class="flex items-center gap-4 h3">
      <Grid_2x2 aria-hidden="true" class="h-8 w-8 text-primary-300-700" />
      <span class:line-through={area.archived}>{area.title}</span>
      <button class="area-options-anchor -ml-4 btn-icon btn py-2" popovertarget={optionsId}>
        <Ellipsis class="h-12 w-12 text-surface-700-300" />
        <span class="sr-only">Options</span>
      </button>
    </h1>
    <p>{area.notes}</p>
  </div>

  <div id={optionsId} class="rounded-base p-2" {@attach popover}>
    {#if !area.archived}
      <button class="btn-primary btn" onclick={() => (area.archived = new Date())}>
        <Archive class="h-8 w-8 text-error-500" />
        Archive {area.title}
      </button>
    {:else}
      <button class="btn-primary btn" onclick={() => (area.archived = undefined)}>
        <ArchiveRestore class="h-8 w-8 text-success-500" />
        Restore {area.title}
      </button>
    {/if}
  </div>
{/if}
