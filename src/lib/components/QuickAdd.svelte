<script lang="ts">
  import { parseTask, type DraftTask } from '$lib/schema/task';

  let { addTask }: { addTask: (draft: DraftTask) => void } = $props();

  let input = $state('');
  let task = $derived(parseTask(input));
  let valid = $derived(task.title !== '');

  function onSubmit() {
    if (!valid) return;

    addTask(task);

    input = '';
  }
</script>

<form class="flex gap-2" onsubmit={onSubmit}>
  <input type="text" class="input" bind:value={input} placeholder="What do you need to do?" />
  <button type="submit" disabled={!valid} class="btn preset-filled-primary-500">Add</button>
</form>
