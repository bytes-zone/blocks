import { Task } from './task';
import { co, z } from 'jazz-tools';

export const Project = co.map({
  title: co.plainText(),
  notes: co.richText(),

  due: z.optional(z.date()),
  wait: z.optional(z.date()),

  completed: z.boolean(),

  tasks: co.list(Task),

  // TODO: blockers, a discriminated union of Project and Task
});

export type Project = co.loaded<typeof Project>;
