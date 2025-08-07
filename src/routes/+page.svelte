<script lang="ts">
  import { Account } from '$lib/schema';
  import { AccountCoState } from 'jazz-tools/svelte';

  const account = new AccountCoState(Account, { resolve: { profile: true, root: true } });
  let profile = $derived(account.current?.profile);
</script>

<pre>{JSON.stringify(profile, null, 2)}</pre>
<pre>{JSON.stringify(account.current?.root, null, 2)}</pre>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
