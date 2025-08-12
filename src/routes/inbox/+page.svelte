<script lang="ts">
  import TaskLine from '$lib/components/TaskLine.svelte';
  import { Account } from '$lib/schema';
  import { AccountCoState } from 'jazz-tools/svelte';

  const account = new AccountCoState(Account, {
    resolve: {
      root: {
        inbox: {
          $each: true,
        },
      },
    },
  });

  const inbox = $derived(account.current?.root?.inbox);
</script>

{#if inbox}
  <div class="flex flex-col gap-1">
    {#each inbox as task (task.id)}
      <TaskLine {task} />
    {/each}
  </div>
{/if}
