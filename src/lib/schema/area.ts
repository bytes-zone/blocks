import { co, z } from 'jazz-tools';
import { Project } from './project';

export const Area = co.map({
  title: co.plainText(),
  notes: co.richText(),

  projects: co.list(Project),

  archived: z.optional(z.date()),
});

export type Area = co.loaded<typeof Area>;
