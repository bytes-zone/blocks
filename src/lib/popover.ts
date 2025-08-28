import { autoPlacement, autoUpdate, computePosition } from '@floating-ui/dom';
import type { Attachment } from 'svelte/attachments';

export const popover: Attachment<HTMLElement> = (target) => {
  target.popover = target.popover || 'auto';

  let cleanup: (() => void) | null = null;

  const startUpdatingPosition = (ev: ToggleEvent) => {
    const anchor = document.querySelector(`[popovertarget=${target.id}]`) as HTMLElement | null;
    if (!anchor) return;

    const updatePosition = () => {
      computePosition(anchor, target, {
        middleware: [autoPlacement({ allowedPlacements: ['top', 'top-start', 'bottom'] })],
      }).then(({ x, y }) => {
        Object.assign(target.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    };

    if (ev.newState === 'open') {
      cleanup = autoUpdate(anchor, target, updatePosition);
    } else if (ev.newState === 'closed' && cleanup) {
      cleanup();
      cleanup = null;
    }
  };

  target.addEventListener('toggle', startUpdatingPosition);
  return () => target.removeEventListener('toggle', startUpdatingPosition);
};
