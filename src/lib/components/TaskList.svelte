<script lang="ts">
  import type { Task } from '$lib/schema/task';
  import { co } from 'jazz-tools';
  import SingleTask from './SingleTask.svelte';

  let { list }: { list: co.loaded<co.List<typeof Task>> } = $props();
</script>

<ol>
  {#each list as task (task?.$jazz.id)}
    {#if task}
      <li>
        <SingleTask {task} />
      </li>
    {/if}
  {/each}
</ol>

<style>
  ol {
    list-style-type: none;
    padding: none;
  }
</style>
