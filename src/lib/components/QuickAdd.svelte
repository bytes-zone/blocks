<script lang="ts">
  import { createFromDraft, parseTask, type Task } from '$lib/schema/task';

  const { onadd }: { onadd: (task: Task) => void } = $props();

  let text = $state('');
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onadd(createFromDraft(parseTask(text)));
    text = '';
  }}
>
  <input type="text" placeholder="What needs doing?" bind:value={text} />
</form>
