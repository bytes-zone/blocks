import { co } from 'jazz-tools';
import { Project } from './project';

export const Area = co.map({
  title: co.plainText(),
  notes: co.richText(),

  projects: co.list(Project),
});

export type Area = co.loaded<typeof Area>;
