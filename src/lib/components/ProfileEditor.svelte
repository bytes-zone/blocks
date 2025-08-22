<script lang="ts">
  import type { Profile } from '$lib/schema';

  const { profile }: { profile: Profile } = $props();
</script>

<form class="w-lg">
  <label class="label">
    <span class="label-text">Name</span>
    <input
      class="input"
      placeholder="Kermit the Frog"
      type="text"
      value={profile.name}
      oninput={(ev) => (profile.name = ev.currentTarget.value)}
    />
  </label>
</form>
