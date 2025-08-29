<script lang="ts">
  import { reldate } from '$lib/reldate';
  import type { Task } from '$lib/schema/task';
  import { ClockFading, ClockAlert, Cuboid } from '@lucide/svelte';
  import { co } from 'jazz-tools';
  import Tag from './Tag.svelte';
  import * as chrono from 'chrono-node';

  let { task }: { task: co.loaded<typeof Task> } = $props();

  let modal: HTMLDialogElement;

  let waitDraft = $state(task.wait?.toLocaleString() || '');
  let dueDraft = $state(task.due?.toLocaleString() || '');

  function parseAndSave(value: string, save: (date: Date | undefined) => void, reset: () => void) {
    return () => {
      const clean = value.trim();

      if (clean === '') {
        save(undefined);
      } else {
        const parsed = chrono.parseDate(clean);
        if (parsed) {
          save(parsed);
          reset();
        }
      }
    };
  }

  let now = $state(new Date());
  $effect(() => {
    const interval = setInterval(() => {
      now = new Date();
    }, 60 * 1000);

    return () => clearInterval(interval);
  });
</script>

<div class="todo-item">
  <div class="title">
    {task.title}
  </div>

  <input
    type="checkbox"
    checked={task.completed}
    onchange={(ev) => task.$jazz.set('completed', ev.currentTarget.checked)}
    aria-label="Mark {task.title} {task.completed ? 'incomplete' : 'complete'}"
    style="order: -1"
  />

  <Tag icon={Cuboid} theme="blue" implicit={task.plannedBlocks == 0}>
    {#if task.plannedBlocks > 0 || task.completedBlocks > 0}
      {task.completedBlocks} <span class="sr-only">blocks completed</span> / {task.plannedBlocks}
      <span class="sr-only">blocks planned</span>
    {:else}
      &lt; 1 <span class="sr-only">block planned</span>
    {/if}
  </Tag>

  {#if task.wait && task.wait > now}
    <Tag icon={ClockFading} theme="gray">
      <span class="sr-only">start</span>
      {reldate(task.wait)}
    </Tag>
  {/if}

  {#if task.due && task.due > now}
    <Tag icon={ClockAlert} theme="yellow">
      <span class="sr-only">due</span>
      {reldate(task.due)}
    </Tag>
  {/if}

  <button class="edit-todo-button" onclick={() => modal.showModal()}>
    <span class="sr-only">Edit {task.title}</span>
  </button>
</div>

<dialog bind:this={modal} closedby="any">
  <form>
    <fieldset class="task">
      <legend class="sr-only">Basic Information</legend>
      <label>
        <span class="sr-only">Completed</span>
        <input
          type="checkbox"
          checked={task.completed}
          onchange={(ev) => task.$jazz.set('completed', ev.currentTarget.checked)}
          aria-label="Mark {task.title} {task.completed ? 'incomplete' : 'complete'}"
        />
      </label>

      <label>
        <span class="sr-only">Title</span>
        <input
          class="input"
          type="text"
          name="title"
          bind:value={
            () => task.title?.toString(),
            (val) => {
              if (val) task.title?.$jazz.applyDiff(val);
            }
          }
        />
      </label>
    </fieldset>

    <fieldset class="plan">
      <legend class="sr-only">Planning</legend>
      <label class="label">
        Planned Blocks
        <input
          type="number"
          class="input"
          min="0"
          placeholder="Blocks"
          value={task.plannedBlocks}
          onchange={(ev) => task.$jazz.set('plannedBlocks', parseInt(ev.currentTarget.value))}
        />
      </label>

      <label class="label">
        Wait
        <input
          type="text"
          class="input"
          placeholder="Date"
          bind:value={waitDraft}
          onblur={parseAndSave(
            waitDraft,
            (v) => task.$jazz.set('wait', v),
            () => (waitDraft = task.wait?.toLocaleString() || ''),
          )}
        />
      </label>

      <label class="label">
        Due
        <input
          type="text"
          class="input"
          placeholder="Date"
          bind:value={dueDraft}
          onblur={parseAndSave(
            dueDraft,
            (v) => task.$jazz.set('due', v),
            () => (dueDraft = task.due?.toLocaleString() || ''),
          )}
        />
      </label>
    </fieldset>

    <fieldset class="notes">
      <label class="label">
        <span class="label-text">Notes</span>
        <textarea
          name="notes"
          class="textarea h-auto"
          placeholder="Notes (not saved for now)"
          value=""
        ></textarea>
      </label>
    </fieldset>
  </form>
</dialog>

<style>
  .todo-item {
    display: flex;
    align-items: center;
    gap: var(--between-items);
    border-radius: var(--box-radius);
    /*padding: var(--size-2) var(--size-1);*/

    position: relative;
  }

  .todo-item > input {
    z-index: 2;
  }

  .edit-todo-button {
    background-color: transparent;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }

  dialog {
    & > form {
      display: grid;
      gap: var(--between-groups);
      padding: var(--size-2) var(--size-1);

      grid-template:
        'task task'
        'plan notes';

      fieldset {
        padding: 0;
        border: none;

        display: flex;
        gap: var(--between-items);

        &.task {
          grid-area: task;
          align-items: center;
        }

        &.plan {
          grid-area: plan;
          flex-direction: column;
        }

        &.notes {
          grid-area: notes;
        }
      }

      label {
        display: flex;
        flex-direction: column;
        gap: var(--size-1);
      }

      label:has(input[name='title']) {
        flex-grow: 1;
      }

      textarea[name='notes'] {
        height: 100%;
      }
    }
  }
</style>
