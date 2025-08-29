<script lang="ts">
  import type { Profile } from '$lib/schema/profile';

  const { profile }: { profile: Profile } = $props();
</script>

<form>
  <label>
    <span>Name</span>
    <input
      class="input"
      placeholder="Kermit the Frog"
      type="text"
      value={profile.name}
      oninput={(ev) => profile.$jazz.set('name', ev.currentTarget.value)}
    />
  </label>
</form>
