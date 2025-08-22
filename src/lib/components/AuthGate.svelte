<script lang="ts">
  import { usePasskeyAuth } from 'jazz-tools/svelte';
  import type { Snippet } from 'svelte';

  const { children }: { children: Snippet } = $props();

  const { current, state: authState } = $derived(usePasskeyAuth({ appName: 'Blocks' }));

  let email = $state('');
  let cleanEmail = $derived(email.trim());
  let emailIsValid = $derived(cleanEmail.match(/.+@.+/));
</script>

{#if authState === 'signedIn'}
  {@render children()}
{:else}
  <div class="inset-0 flex min-h-screen items-center justify-center">
    <div class="flex flex-col gap-6 card preset-tonal-primary p-8">
      <h1 class="h1">Hi! 👋</h1>
      <p>Please register or log in to continue.</p>

      <button class="btn preset-filled-primary-500" onclick={() => current.logIn()}>Log In</button>

      <hr class="hr" />

      <form
        class="form flex grow-0 flex-col gap-4"
        onsubmit={(ev) => {
          ev.preventDefault();

          if (!emailIsValid) return;

          current.signUp(email);
        }}
      >
        <label class="label">
          <span class="label-text">Email</span>
          <input
            type="email"
            class="input bg-surface-50-950 placeholder:text-surface-300-700"
            placeholder="you@youremail.com"
            bind:value={email}
          />
        </label>

        <button type="submit" class="btn preset-filled-primary-500" disabled={!emailIsValid}>
          Register
        </button>
      </form>
    </div>
  </div>
{/if}
