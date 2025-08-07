<script lang="ts">
  import type { Profile } from '$lib/schema';

  const { profile }: { profile: Profile } = $props();
</script>

<form>
  <label for="name">Name:</label>
  <input
    id="name"
    type="text"
    value={profile.name}
    onchange={(ev) => (profile.name = ev.target?.value)}
  />
</form>
