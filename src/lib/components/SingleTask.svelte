<script lang="ts">
  import { reldate } from '$lib/reldate';
  import type { Task } from '$lib/task';
  import { ClockFading, ClockAlert, Cuboid } from '@lucide/svelte';
  import { co } from 'jazz-tools';
  import Tag from './Tag.svelte';
  import * as chrono from 'chrono-node';

  let { task }: { task: co.loaded<typeof Task> } = $props();

  let row: HTMLElement;
  let modal: HTMLDialogElement;

  function openEdit() {
    if (!modal || !row) return;

    modal.showModal();
    modal.style.left = row.offsetLeft + 'px';
    modal.style.top = row.offsetTop + 'px';
    modal.style.width = row.clientWidth + 'px';
  }

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
</script>

<div class="todo-item flex items-center gap-2 rounded-container px-2 py-1" bind:this={row}>
  <div class="order-2">
    {task.title}
  </div>

  <input
    type="checkbox"
    bind:checked={task.completed}
    aria-label="Mark {task.title} {task.completed ? 'incomplete' : 'complete'}"
    class="order-1"
  />

  <Tag icon={Cuboid} theme="primary" implicit={task.plannedBlocks == 0}>
    {#if task.plannedBlocks > 0 || task.completedBlocks > 0}
      {task.completedBlocks} <span class="sr-only">blocks completed</span> / {task.plannedBlocks}
      <span class="sr-only">blocks planned</span>
    {:else}
      &lt; 1 <span class="sr-only">block planned</span>
    {/if}
  </Tag>

  {#if task.wait && task.wait > new Date()}
    <Tag icon={ClockFading} theme="surface">
      <span class="sr-only">start</span>
      {reldate(task.wait)}
    </Tag>
  {/if}

  {#if task.due && task.due > new Date()}
    <Tag icon={ClockAlert} theme="warning">
      <span class="sr-only">due</span>
      {reldate(task.due)}
    </Tag>
  {/if}

  <button class="edit-todo-button" onclick={openEdit}>
    <span class="sr-only">Edit {task.title}</span>
  </button>
</div>

<dialog
  bind:this={modal}
  closedby="any"
  class="rounded-container backdrop:backdrop-blur-[.5px] backdrop:backdrop-saturate-50"
>
  <div class="flex flex-col gap-2 px-2 py-1">
    <div class="flex items-center gap-2">
      <label class="order-2 label">
        <span class="sr-only label-text">Title</span>
        <input
          class="input"
          type="text"
          bind:value={
            () => task.title?.toString(),
            (val) => {
              if (val) task.title?.applyDiff(val);
            }
          }
        />
      </label>

      <input
        type="checkbox"
        bind:checked={task.completed}
        aria-label="Mark {task.title} {task.completed ? 'incomplete' : 'complete'}"
        class="order-1"
      />
    </div>

    <div class="flex gap-2">
      <div class="flex flex-col gap-2">
        <label class="label">
          <span class="label-text">Planned Blocks</span>
          <input
            type="number"
            class="input"
            min="0"
            placeholder="Blocks"
            bind:value={task.plannedBlocks}
          />
        </label>

        <label class="label">
          <span class="label-text">Wait</span>
          <input
            type="text"
            class="input"
            placeholder="Date"
            bind:value={waitDraft}
            onblur={parseAndSave(
              waitDraft,
              (v) => (task.wait = v),
              () => (waitDraft = task.wait?.toLocaleString() || ''),
            )}
          />
        </label>

        <label class="label">
          <span class="label-text">Due</span>
          <input
            type="text"
            class="input"
            placeholder="Date"
            bind:value={dueDraft}
            onblur={parseAndSave(
              dueDraft,
              (v) => (task.due = v),
              () => (dueDraft = task.due?.toLocaleString() || ''),
            )}
          />
        </label>
      </div>

      <label class="label">
        <span class="label-text">Notes</span>
        <textarea class="textarea h-auto" placeholder="Notes (not saved for now)" value=""
        ></textarea>
      </label>
    </div>
  </div>
</dialog>

<style>
  .todo-item {
    position: relative;
  }

  .todo-item > input {
    z-index: 2;
  }

  .edit-todo-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    z-index: 1;
  }

  dialog {
    /* override some browser styles */
    max-width: unset;
    max-height: unset;
  }
</style>
