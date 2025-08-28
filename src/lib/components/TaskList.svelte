<script lang="ts">
  import type { Task } from '$lib/schema/task';
  import { co } from 'jazz-tools';
  import SingleTask from './SingleTask.svelte';

  let { list }: { list: co.loaded<co.List<typeof Task>> } = $props();
</script>

<ol class="flex flex-col gap-2">
  {#each list as task (task?.$jazz.id)}
    {#if task}
      <li>
        <SingleTask {task} />
      </li>
    {/if}
  {/each}
</ol>
