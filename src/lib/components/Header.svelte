<script lang="ts">
	import { Account } from '$lib/schema';
	import { AccountCoState, usePasskeyAuth } from 'jazz-tools/svelte';

	let { appName = 'Blocks' } = $props();
	const account = new AccountCoState(Account, {
      resolve: {
        profile: true
      }
	});

	let profile = $derived(account.current?.profile);

	const { current, state } = $derived(usePasskeyAuth({ appName }));

	const isAuthenticated = $derived(state === 'signedIn');
</script>

<header>
	<nav aria-label="Global" class="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
		<div class="lg:flex lg:gap-x-12">
			<a href="/product" class="text-sm/6 font-semibold">Product</a>
			<a href="/features" class="text-sm/6 font-semibold">Features</a>
		</div>
		<div class="lg:flex lg:flex-1 lg:justify-end">
			{#if !isAuthenticated}
				<button
					onclick={() => current.logIn()}
					type="button"
					class="btn hover:preset-tonal-primary"
				>
					Log in
				</button>

				<button
					onclick={() => current.signUp('')}
					type="button"
					class="btn hover:preset-tonal-primary"
				>
					Sign Up
				</button>
			{:else}
				Hello {profile?.name || "Mysterious Stranger"}!

				<button onclick={() => account.logOut()} type="button" class="btn hover:preset-tonal-primary">
					Log out
				</button>
			{/if}
		</div>
	</nav>
</header>
