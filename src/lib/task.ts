import { co, z } from 'jazz-tools';

export const Task = co.map({
  title: co.plainText(),
  description: co.richText(),

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
