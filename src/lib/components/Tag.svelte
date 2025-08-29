<script lang="ts">
  import type { Icon } from '@lucide/svelte';
  import type { Snippet } from 'svelte';
  import Colors from 'open-props/src/colors';

  type Theme =
    | 'gray'
    | 'stone'
    | 'red'
    | 'pink'
    | 'purple'
    | 'violet'
    | 'indigo'
    | 'blue'
    | 'cyan'
    | 'teal'
    | 'green'
    | 'lime'
    | 'yellow'
    | 'orange'
    | 'choco'
    | 'brown'
    | 'sand'
    | 'camo'
    | 'jungle';

  type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

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

  const color = (num: Shade) => Colors[`--${theme}-${num}`];

  function lightDark(prop: string, light: Shade, dark: Shade): string {
    if (light === dark) {
      return `${prop}: ${color(light)};`;
    } else {
      return `${prop}: light-dark(${color(light)}, ${color(dark)})`;
    }
  }

  const CurrentIcon = icon;
</script>

<div class={{ tag: true, implicit }} style={lightDark('border-color', 3, 9)}>
  <div class="icon" style={lightDark('background-color', 3, 9)}>
    <CurrentIcon aria-hidden="true" style={lightDark('color', 10, 2)} />
  </div>
  <div>
    {@render children()}
  </div>
</div>

<style>
  .tag {
    font-size: var(--font-size-1);
    display: flex;
    align-items: center;
    gap: var(--size-1);
    border-radius: var(--size-1);
    border-width: 1px;

    padding-right: var(--size-1);

    &.implicit {
      border-style: dashed;
    }
  }

  .icon {
    padding: var(--size-1);
    width: var(--size-5);
  }
</style>
