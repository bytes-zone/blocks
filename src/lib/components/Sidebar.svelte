<script lang="ts">
  import { Account } from '$lib/schema/account';
  import { AccountCoState } from 'jazz-tools/svelte';

  const account = new AccountCoState(Account);
</script>

<button class="btn preset-outlined-primary-500" onclick={() => account.logOut()}>Log Out</button>
