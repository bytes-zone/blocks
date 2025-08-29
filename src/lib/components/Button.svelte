<script lang="ts">
  import type { Snippet } from 'svelte';

  const {
    children,
    onclick,
    popovertarget,
    disabled,
  }: {
    children: Snippet;
    onclick?: (ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
    popovertarget?: string;
    disabled?: boolean;
  } = $props();
</script>

<button type="button" {onclick} {disabled} {popovertarget}>
  {@render children()}
</button>

<style>
  button {
    margin: 0;
    padding: var(--size-2) var(--size-2);
    border-radius: var(--size-1);
    border-width: 1px;
    border-color: transparent;

    display: flex;
    align-items: center;
    gap: var(--size-2);

    background: none;

    &:hover {
      border-color: var(--gray-6);
    }

    @media (--motionOK) {
      transition: all 0.2s ease-in-out;
    }
  }
</style>
