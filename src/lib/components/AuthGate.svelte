<script lang="ts">
  import { usePasskeyAuth } from 'jazz-tools/svelte';
  import type { Snippet } from 'svelte';
  import FormButton from './FormButton.svelte';

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

      <FormButton onclick={() => current.logIn()}>Log In</FormButton>

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

        <FormButton type="submit" disabled={!emailIsValid}>Register</FormButton>
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

    background-color: light-dark(var(--blue-2), var(--blue-11));
    padding: var(--box-padding);
    border-radius: var(--box-radius);

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
    gap: var(--between-items);

    label {
      display: flex;
      flex-direction: column;
      gap: var(--between-items);
    }
  }
</style>
