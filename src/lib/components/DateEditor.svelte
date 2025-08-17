<script lang="ts">
  import { tick, type Snippet } from 'svelte';
  import * as chrono from 'chrono-node';
  import { CalendarOff } from '@lucide/svelte';

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

  let buttonNode: HTMLButtonElement | null;
  let inputNode: HTMLInputElement | null;

  let editing = $state(false);

  let draftValue = $state(value?.toLocaleString() || '');

  async function startEditing() {
    editing = true;
    await tick();
    inputNode?.focus();
  }

  async function submitForm(e: Event) {
    e.preventDefault();
    save();
    await tick();
    buttonNode?.focus();
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

<div class="flex items-center gap-4">
  <button
    type="button"
    class="flex"
    aria-expanded={editing}
    aria-controls={inputId}
    id={buttonId}
    onclick={startEditing}
    hidden={editing}
    bind:this={buttonNode}
  >
    {#if value}
      {@render present(value)}
    {:else}
      {@render absent()}
    {/if}
  </button>

  {#if value}
    <button
      type="button"
      class="btn-icon preset-filled-surface-100-900"
      title="Clear {label}"
      aria-label="Clear {label}"
      onclick={() => {
        draftValue = '';
        save();
      }}
    >
      <CalendarOff />
    </button>
  {/if}
</div>

<form onsubmit={submitForm} hidden={!editing}>
  <input
    aria-label={label}
    class="input"
    type="text"
    id={inputId}
    bind:value={draftValue}
    bind:this={inputNode}
    onblur={save}
  />
</form>
