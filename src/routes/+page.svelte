<script lang="ts">
	import { MyAccount, MyProfile } from '$lib/schema';
	import { AccountCoState, CoState } from 'jazz-tools/svelte';

	const me = new AccountCoState(MyAccount);
	const profile = new CoState(MyProfile, me.current?._refs.profile?.id);

	$inspect('me', me);
	$inspect(profile);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
