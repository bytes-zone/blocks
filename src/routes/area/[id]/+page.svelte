<script lang="ts">
  import { page } from '$app/state';
  import { Area } from '$lib/schema/area';
  import Grid_2x2 from '@lucide/svelte/icons/grid-2x2';
  import { CoState } from 'jazz-tools/svelte';

  let state = $derived(
    new CoState(Area, page.params.id, {
      resolve: {
        title: true,
        notes: true,
        projects: { $each: true },
      },
    }),
  );

  let area = $derived(state.current);
</script>

{#if area === undefined}
  <p>Loading…</p>
{:else if area === null}
  <p>Area not found or unaccessible by your account.</p>
{:else}
  <h1 class="flex items-center gap-4 h3">
    <Grid_2x2 aria-hidden="true" class="h-8 w-8 text-primary-300-700" />
    {area.title}
  </h1>
  <p>{area.notes}</p>
{/if}
