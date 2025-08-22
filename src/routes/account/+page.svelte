<script>
  import ProfileEditor from '$lib/components/ProfileEditor.svelte';
  import { Account } from '$lib/schema/account';
  import { AccountCoState } from 'jazz-tools/svelte';

  const account = new AccountCoState(Account, {
    resolve: {
      profile: true,
    },
  });

  let profile = $derived(account.current?.profile);
</script>

{#if profile}
  <ProfileEditor {profile} />
{:else}
  <p>No profile found. Are you logged in?</p>
{/if}
