<script lang="ts">
  import type { Snippet } from 'svelte';

  const {
    children,
    onclick,
    disabled,
    type = 'button',
  }: {
    children: Snippet;
    onclick?: (ev: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => void;
    disabled?: boolean;
    type?: 'button' | 'submit';
  } = $props();
</script>

<button {type} {onclick} {disabled}>
  {@render children()}
</button>

<style>
  button {
    min-width: 44px;
    min-height: 44px;
    margin: 0;
    padding: var(--size-2) var(--size-4);
    border-radius: var(--size-1);
    box-shadow: var(--shadow-1);

    @media (--OSdark) {
      background-color: var(--gray-9);

      &:hover {
        background-color: var(--gray-8);
      }

      &[disabled] {
        background-color: var(--gray-8);
        color: var(--gray-4);
      }
    }

    @media (--motionOK) {
      transition: all 0.2s ease-in-out;
    }
  }
</style>
