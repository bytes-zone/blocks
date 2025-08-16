import { describe, it, expect } from 'vitest';
import { parseTask } from './task';
import * as chrono from 'chrono-node';

describe('task parsing from string', () => {
  it('should have a title', () => {
    const task = parseTask('buy milk');

    expect(task.title).toEqual('buy milk');
  });

  it('should parse blocks', () => {
    const task = parseTask('buy milk blocks:2');

    expect(task.plannedBlocks).toEqual(2);
  });

  it('should parse due date', () => {
    const task = parseTask('buy milk due:friday');

    expect(task.due).toEqual(chrono.parseDate('friday'));
    expect(task.title).toEqual('buy milk');
  });

  it('should parse wait date', () => {
    const task = parseTask('buy milk wait:tomorrow 10am');

    expect(task.wait).toEqual(chrono.parseDate('tomorrow 10am'));
    expect(task.title).toEqual('buy milk');
  });
});
