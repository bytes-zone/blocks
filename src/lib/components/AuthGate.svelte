<script lang="ts">
  import { usePasskeyAuth } from 'jazz-tools/svelte';
  import type { Snippet } from 'svelte';

  const { children, allowAnonymous }: { children: Snippet; allowAnonymous: boolean } = $props();

  const { current, state: authState } = $derived(usePasskeyAuth({ appName: 'Blocks' }));

  let email = $state('');
  let cleanEmail = $derived(email.trim());
  let emailIsValid = $derived(cleanEmail.match(/.+@.+/));
</script>

{#if authState === 'signedIn' || allowAnonymous}
  {@render children()}
{:else}
  <div class="centerer">
    <div class="auth-gate">
      <h1 class="h1">Hi! 👋</h1>
      <p>Please register or log in to continue.</p>

      <button onclick={() => current.logIn()}>Log In</button>

      <p>or</p>

      <form
        onsubmit={(ev) => {
          ev.preventDefault();

          if (!emailIsValid) return;

          current.signUp(email);
        }}
      >
        <label>
          <span>Email</span>
          <input type="email" placeholder="you@youremail.com" bind:value={email} />
        </label>

        <button type="submit" disabled={!emailIsValid}>Register</button>
      </form>
    </div>
  </div>
{/if}

<style>
  .centerer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .auth-gate {
    width: min(100vw, var(--size-sm));

    box-shadow: var(--shadow-3);

    background-color: var(--blue-11);
    border-radius: var(--size-2);
    padding: var(--size-2);

    display: flex;
    flex-direction: column;
    gap: var(--size-6);

    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);

    label {
      display: flex;
      flex-direction: column;
      gap: var(--size-2);
    }
  }
</style>
