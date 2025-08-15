<script lang="ts">
  import TaskList from '$lib/components/TaskList.svelte';
  import { Account } from '$lib/schema';
  import { AccountCoState } from 'jazz-tools/svelte';

  const account = new AccountCoState(Account, {
    resolve: {
      root: {
        collection: {
          $each: true,
        },
      },
    },
  });

  const tasks = $derived(account.current?.root?.collection);
</script>

{#if tasks}
  <TaskList list={tasks} />
{/if}
