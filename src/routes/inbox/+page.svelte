<script lang="ts">
  import TaskList from '$lib/components/TaskList.svelte';
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
  <TaskList list={inbox} />
{/if}
