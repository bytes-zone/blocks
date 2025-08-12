<script lang="ts">
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
  <table>
    <thead>
      <tr>
        <th>Completed</th>
        <th>Title</th>
        <th>Notes</th>
        <th>Wait</th>
        <th>Due</th>
        <th>ID</th>
      </tr>
    </thead>
    <tbody>
      {#each inbox as task (task.id)}
        <tr>
          <td>{task.completed}</td>
          <td>{task.title}</td>
          <td>{task.notes}</td>
          <td>{task.wait}</td>
          <td>{task.due}</td>
          <td>{task.id}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
