<script lang="ts">
  import { createFromDraft, parseTask, type Task } from '$lib/schema/task';

  const { onadd }: { onadd: (task: Task) => void } = $props();

  let text = $state('');
</script>

<form
  class="mx-auto rounded-base bg-gray-100 dark:bg-gray-900"
  onsubmit={(e) => {
    e.preventDefault();
    onadd(createFromDraft(parseTask(text)));
    text = '';
  }}
>
  <input type="text" class="input w-sm text-xl" placeholder="What needs doing?" bind:value={text} />
</form>
