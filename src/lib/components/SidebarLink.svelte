<script lang="ts">
  import type { Icon } from '@lucide/svelte';
  import Colors from 'open-props/src/colors';

  type Color = keyof typeof Colors;

  const {
    href,
    label,
    active = false,
    icon,
    iconColor = '--gray-6',
    iconColorDark,
    iconColorLight,
    rhs = '',
  }: {
    href: string;
    label: string;
    active: boolean;
    icon: typeof Icon;
    iconColor?: Color;
    iconColorDark?: Color;
    iconColorLight?: Color;
    rhs?: string;
  } = $props();

  const dark = Colors[iconColorDark ?? iconColor];
  const light = Colors[iconColorLight ?? iconColor];

  const iconStyle = dark == light ? `color: ${dark}` : `color: light-dark(${light}, ${dark})`;

  const CurrentIcon = icon;
</script>

<li class:active>
  <a {href}>
    <div class="caption">
      <CurrentIcon aria-hidden="true" style={iconStyle} />
      {label}
    </div>
    {#if rhs}
      <div class="extra-info">{rhs}</div>
    {/if}
  </a>
</li>

<style>
  li {
    padding: var(--size-1) var(--size-4);

    &.active {
      background-color: light-dark(var(--gray-3), var(--gray-9));
    }
  }

  a {
    color: unset;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;

    & > .caption {
      display: flex;
      gap: var(--size-2);
    }

    & > .extra-info {
      color: light-dark(var(--gray-8), var(--gray-4));
    }
  }
</style>
