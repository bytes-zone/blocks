<script lang="ts">
  import type { Icon } from '@lucide/svelte';
  import type { Snippet } from 'svelte';

  type Theme = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'surface';

  const {
    theme,
    implicit = false,
    children,
    icon,
  }: {
    theme: Theme;
    implicit?: boolean;
    children: Snippet;
    icon: typeof Icon;
  } = $props();

  type Style = {
    implicitBorder: string;
    explicitBorder: string;
    implicitBg: string;
    explicitBg: string;
    iconColor: string;
  };

  const styles: Record<Theme, Style> = {
    primary: {
      implicitBorder: 'border-primary-200-800',
      explicitBorder: 'border-primary-500',
      implicitBg: 'bg-primary-200-800',
      explicitBg: 'bg-primary-500',
      iconColor: 'text-primary-50-950',
    },
    secondary: {
      implicitBorder: 'border-secondary-200-800',
      explicitBorder: 'border-secondary-500',
      implicitBg: 'bg-secondary-200-800',
      explicitBg: 'bg-secondary-500',
      iconColor: 'text-secondary-50-950',
    },
    tertiary: {
      implicitBorder: 'border-tertiary-200-800',
      explicitBorder: 'border-tertiary-500',
      implicitBg: 'bg-tertiary-200-800',
      explicitBg: 'bg-tertiary-500',
      iconColor: 'text-tertiary-50-950',
    },
    success: {
      implicitBorder: 'border-success-200-800',
      explicitBorder: 'border-success-500',
      implicitBg: 'bg-success-200-800',
      explicitBg: 'bg-success-500',
      iconColor: 'text-success-50-950',
    },
    warning: {
      implicitBorder: 'border-warning-200-800',
      explicitBorder: 'border-warning-500',
      implicitBg: 'bg-warning-200-800',
      explicitBg: 'bg-warning-500',
      iconColor: 'text-warning-50-950',
    },
    error: {
      implicitBorder: 'border-error-200-800',
      explicitBorder: 'border-error-500',
      implicitBg: 'bg-error-200-800',
      explicitBg: 'bg-error-500',
      iconColor: 'text-error-50-950',
    },
    surface: {
      implicitBorder: 'border-surface-200-800',
      explicitBorder: 'border-surface-500',
      implicitBg: 'bg-surface-200-800',
      explicitBg: 'bg-surface-500',
      iconColor: 'text-surface-50-950',
    },
  };

  const style = styles[theme];

  const CurrentIcon = icon;
</script>

<div
  class="order-2 flex items-center gap-1 rounded-base border-1 p-0 pr-1 text-xs {implicit
    ? `border-dashed ${style.implicitBorder}`
    : style.explicitBorder}"
>
  <div class="px-1 {implicit ? style.implicitBg : style.explicitBg}">
    <CurrentIcon class="w-4 {style.iconColor}" aria-hidden="true" />
  </div>
  <div>
    {@render children()}
  </div>
</div>
