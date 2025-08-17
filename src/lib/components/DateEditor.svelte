<script lang="ts">
  import { tick, type Snippet } from 'svelte';
  import * as chrono from 'chrono-node';

  let {
    label,
    value,
    update,
    absent,
    present,
  }: {
    label: string;
    value: Date | undefined;
    update: (newValue: Date | undefined) => void;
    absent: Snippet;
    present: Snippet<[Date]>;
  } = $props();

  const uid = $props.id();
  const buttonId = `${uid}-button`;
  const inputId = `${uid}-input`;

  let editing = $state(false);

  let draftValue = $state(value?.toLocaleString() || '');

  async function startEditing() {
    editing = true;
    await tick();
    document.getElementById(inputId)?.focus();
  }

  async function submitForm(e: Event) {
    e.preventDefault();
    save();
    await tick();
    document.getElementById(buttonId)?.focus();
    console.log(document.activeElement);
  }

  async function save() {
    editing = false;

    if (draftValue.trim() === '') {
      update(undefined);
    } else {
      const parsed = chrono.parseDate(draftValue);
      draftValue = parsed?.toLocaleString() || '';
      update(parsed || undefined);
    }
  }
</script>

<button
  type="button"
  aria-expanded={editing}
  aria-controls={inputId}
  id={buttonId}
  onclick={startEditing}
  hidden={editing}
>
  {#if value}
    {@render present(value)}
  {:else}
    {@render absent()}
  {/if}
</button>

<form onsubmit={submitForm} hidden={!editing}>
  <input
    aria-label="Edit {label}"
    class="input"
    type="text"
    id={inputId}
    bind:value={draftValue}
    onblur={save}
  />
</form>
