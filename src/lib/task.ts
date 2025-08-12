import { co, z } from 'jazz-tools';
import * as chrono from 'chrono-node';

export const Task = co.map({
  title: co.plainText(),
  notes: co.richText(),

  blocks: z.int().min(0),

  due: z.optional(z.date()),
  wait: z.optional(z.date()),

  completed: z.boolean(),

  get children() {
    return co.list(Task);
  },
  get blockers() {
    return co.list(Task);
  },
});

export type Task = co.loaded<typeof Task>;

const blocksRe = /\s?\bblocks:(\d+)/g;

const dueRe = /(\s?\bdue:)(\w+)/g;

const waitRe = /(\s?\bwait:)(\w+)/g;

export function parseTask(
  input: string,
): Pick<Task, 'blocks' | 'due' | 'wait'> & { title: string } {
  let title = input;

  const rawBlocks = blocksRe.exec(title)?.[1];
  let blocks = 0;
  if (rawBlocks) {
    blocks = parseInt(rawBlocks, 10);
    title = title.replace(blocksRe, '');
  }

  let due = undefined;
  due: for (const match of title.matchAll(dueRe)) {
    const dateStart = match.index + match[0].length - match[2].length;
    for (const date of chrono.parse(title)) {
      if (date.index === dateStart) {
        due = date.start.date();
        title = title.replace(`${match[1]}${date.text}`, '');

        break due;
      }
    }
  }

  let wait = undefined;
  wait: for (const match of title.matchAll(waitRe)) {
    const dateStart = match.index + match[0].length - match[2].length;
    for (const date of chrono.parse(title)) {
      if (date.index === dateStart) {
        wait = date.start.date();
        title = title.replace(`${match[1]}${date.text}`, '');

        break wait;
      }
    }
  }

  return { title: title.trim(), blocks, due, wait };
}
