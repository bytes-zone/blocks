<script lang="ts">
	import { Account, Profile } from '$lib/schema';
	import { AccountCoState, CoState } from 'jazz-tools/svelte';

	const me = new AccountCoState(Account);
	const profile = new CoState(Profile, me.current?._refs.profile?.id);
</script>

{JSON.stringify(profile)}
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
