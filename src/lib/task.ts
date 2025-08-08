import { co, z } from 'jazz-tools';

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

const blocksRe = /\s?&(\d+)/g;

const dueRe = /\s?!(\d{4}-\d{2}-\d{2})/g;

const waitRe = /\s?>(\d{4}-\d{2}-\d{2})/g;

export function parseTask(
  input: string,
): Pick<Task, 'blocks' | 'due' | 'wait'> & { title: string } {
  const rawBlocks = blocksRe.exec(input)?.[1];
  const blocks = rawBlocks ? parseInt(rawBlocks, 10) : 0;

  const rawDue = dueRe.exec(input)?.[1];
  const due = rawDue ? new Date(rawDue) : undefined;

  const rawWait = waitRe.exec(input)?.[1];
  const wait = rawWait ? new Date(rawWait) : undefined;

  return {
    title: input.replaceAll(blocksRe, '').replaceAll(dueRe, '').replaceAll(waitRe, '').trim(),
    blocks,
    due,
    wait,
  };
}
