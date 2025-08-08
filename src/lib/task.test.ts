import { describe, it, expect } from 'vitest';
import { parseTask } from './task';

describe('task parsing from string', () => {
  it('should have a title', () => {
    const task = parseTask('buy milk');
    expect(task.title).toEqual('buy milk');
  });

  it('should strip custom elements', () => {
    const task = parseTask('buy milk &1 !2026-01-01 >2025-08-15');
    expect(task.title).toEqual('buy milk');
  });

  it('should parse blocks', () => {
    const task = parseTask('buy milk &2');
    expect(task.blocks).toEqual(2);
  });

  it('should parse due date', () => {
    const task = parseTask('buy milk !2026-01-01');
    expect(task.due).toEqual(new Date('2026-01-01'));
  });

  it('should parse wait date', () => {
    const task = parseTask('buy milk !2026-08-15');
    expect(task.due).toEqual(new Date('2026-08-15'));
  });
});
